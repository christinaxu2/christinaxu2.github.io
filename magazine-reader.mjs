// Original PDF pages, presented as a book. No third-party reader or uploads.
export function magazineSpreads(total, coverPage=1, twoPages=true) {
  total=Math.max(1,Math.trunc(total));
  coverPage=Math.min(total,Math.max(1,Math.trunc(coverPage)||1));
  if(!twoPages)return Array.from({length:total},(_,i)=>[i+1]);
  const spreads=[];
  for(let p=1;p<coverPage;p++)spreads.push([null,p]);
  spreads.push([null,coverPage]);
  for(let p=coverPage+1;p<=total;p+=2)spreads.push([p,p+1<=total?p+1:null]);
  return spreads;
}

export function createMagazineReader(node,{pdfjs,coverPage=1,host=window}) {
  const doc=node.ownerDocument;
  let pdf,task,timeout,resizeObserver,disposed=false,generation=0,position=0;
  let spreads=[],twoPages=!host.matchMedia('(max-width: 700px)').matches,manualLayout=false,zoom=1;
  let work=Promise.resolve(),lastWidth=0,resizeTimer,touchStart;
  const renders=new Set(),animations=new Set(),listeners=[];
  const on=(target,type,fn,options)=>{target.addEventListener(type,fn,options);listeners.push(()=>target.removeEventListener(type,fn,options));};
  const clampPage=value=>Math.min(pdf.numPages,Math.max(1,Math.trunc(Number(value)||1)));
  const cancelRenders=()=>{for(const render of renders)render.cancel();renders.clear();};
  const destroy=()=>{
    if(disposed)return;disposed=true;generation++;
    clearTimeout(timeout);clearTimeout(resizeTimer);resizeObserver?.disconnect();
    listeners.forEach(off=>off());cancelRenders();
    for(const animation of animations)animation.cancel();animations.clear();
    task?.destroy();
  };
  let book,viewport,status,input,layout,zoomControl;

  function controls() {
    const pages=spreads[position].filter(Boolean),cover=pages.length===1&&pages[0]===coverPage;
    status.textContent=(cover?'Cover · ':'')+'PDF '+(pages.length>1?'pages '+pages.join('–'):'page '+pages[0])+' of '+pdf.numPages;
    input.value=String(pages[0]);
    node.querySelectorAll('[data-book-prev]').forEach(b=>b.disabled=position===0);
    node.querySelectorAll('[data-book-next]').forEach(b=>b.disabled=position===spreads.length-1);
  }

  function pageTurn(direction) {
    if(!direction||host.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const pages=[...book.querySelectorAll('.magazine-page')];
    const outgoing=direction>0?pages.at(-1):pages[0];
    const source=outgoing?.querySelector('canvas');
    if(!source?.width||!outgoing.animate)return;
    const rect=outgoing.getBoundingClientRect(),bounds=viewport.getBoundingClientRect();
    const leaf=doc.createElement('div'),canvas=doc.createElement('canvas');
    canvas.width=source.width;canvas.height=source.height;
    canvas.getContext('2d').drawImage(source,0,0);
    leaf.className='magazine-turn-leaf';leaf.setAttribute('aria-hidden','true');leaf.append(canvas);
    Object.assign(leaf.style,{left:rect.left-bounds.left+viewport.scrollLeft+'px',top:rect.top-bounds.top+viewport.scrollTop+'px',width:rect.width+'px',height:rect.height+'px',transformOrigin:direction>0?'left center':'right center'});
    viewport.append(leaf);
    return ()=>{
      const animation=leaf.animate([
        {transform:'perspective(1500px) rotateY(0deg)',opacity:1},
        {transform:'perspective(1500px) rotateY('+(direction>0?'-':'')+'100deg)',opacity:0.15}
      ],{duration:420,easing:'cubic-bezier(.22,.7,.22,1)',fill:'forwards'});
      animations.add(animation);
      animation.finished.catch(()=>{}).finally(()=>{animations.delete(animation);leaf.remove();canvas.width=0;});
    };
  }

  async function show(index,direction=0) {
    if(disposed)return;
    position=Math.min(spreads.length-1,Math.max(0,index));
    const version=++generation,spread=spreads[position];
    cancelRenders();controls();node.setAttribute('aria-busy','true');
    const busy=node.querySelector('[data-book-loading]');busy.textContent='Loading pages…';
    try {
      const pages=await Promise.all(spread.map(n=>n?pdf.getPage(n):null));
      if(disposed||version!==generation)return;
      const sample=pages.find(Boolean).getViewport({scale:1});
      const available=Math.max(220,viewport.clientWidth-40);
      const fitHeight=Math.max(320,host.innerHeight-260);
      const slotWidth=Math.min(available/spread.length,fitHeight*sample.width/sample.height)*zoom;
      const leaves=await Promise.all(pages.map(async(page,i)=>{
        const leaf=doc.createElement('div');
        leaf.className=page?'magazine-page':'magazine-blank';
        if(!page){leaf.setAttribute('aria-hidden','true');return leaf;}
        leaf.dataset.page=String(spread[i]);
        const natural=page.getViewport({scale:1});leaf.style.aspectRatio=natural.width+'/'+natural.height;
        const canvas=doc.createElement('canvas');canvas.setAttribute('role','img');canvas.setAttribute('aria-label','PDF page '+spread[i]);
        const scale=slotWidth/natural.width*Math.min(host.devicePixelRatio||1,2);
        const view=page.getViewport({scale});canvas.width=Math.round(view.width);canvas.height=Math.round(view.height);
        const render=page.render({canvasContext:canvas.getContext('2d',{alpha:false}),viewport:view});
        renders.add(render);
        try{await render.promise;}finally{renders.delete(render);}
        if(disposed||version!==generation){canvas.width=0;return leaf;}
        leaf.append(canvas);return leaf;
      }));
      if(disposed||version!==generation)return;
      const turn=pageTurn(direction);
      book.style.width=slotWidth*spread.length+'px';
      book.style.gridTemplateColumns='repeat('+spread.length+', minmax(0,1fr))';
      book.classList.toggle('is-spread',pages.filter(Boolean).length===2);
      book.replaceChildren(...leaves);book.dataset.pages=spread.filter(Boolean).join(',');
      if(zoom===1){viewport.scrollLeft=0;viewport.scrollTop=0;}
      turn?.();busy.textContent='';
    }catch(error){
      if(disposed||version!==generation)return;
      busy.textContent='These pages could not load. Try another page or use Open PDF / print above.';
      // Do not label the previous spread as the newly requested pages.
      book.replaceChildren();book.dataset.pages='';
    }finally{if(!disposed&&version===generation)node.setAttribute('aria-busy','false');}
  }
  const navigate=(index,direction=0)=>(work=show(index,direction));
  const goToPage=value=>{const p=clampPage(value);return navigate(spreads.findIndex(s=>s.includes(p)));};
  const flip=direction=>{const next=position+direction;if(next>=0&&next<spreads.length)navigate(next,direction);};
  function changeLayout(next) {
    const page=spreads[position].find(Boolean);twoPages=next;
    spreads=magazineSpreads(pdf.numPages,coverPage,twoPages);layout.value=twoPages?'spread':'single';
    goToPage(page);
  }

  async function initialize() {
    try{
      task=pdfjs.getDocument({url:node.dataset.pdfUrl,withCredentials:false});
      pdf=await Promise.race([task.promise,new Promise((_,reject)=>{timeout=setTimeout(()=>reject(Error('PDF host timed out')),25000);})]);
      clearTimeout(timeout);if(disposed)return;
      coverPage=Math.min(pdf.numPages,Math.max(1,Math.trunc(coverPage)||1));
      spreads=magazineSpreads(pdf.numPages,coverPage,twoPages);
      node.classList.add('magazine-reader');node.setAttribute('role','region');node.setAttribute('aria-label','Magazine reader');
      node.innerHTML='<div class="magazine-toolbar"><div class="magazine-turn-controls"><button type="button" data-book-prev aria-label="Previous pages">←</button><span class="magazine-page-status" role="status" aria-live="polite"></span><button type="button" data-book-next aria-label="Next pages">→</button></div><form class="magazine-jump"><label>PDF page <input type="number" min="1" max="'+pdf.numPages+'" step="1" aria-label="Go to PDF page"></label><button type="submit">Go</button></form><label class="magazine-select">View <select aria-label="Page layout"><option value="spread">Two pages</option><option value="single">One page</option></select></label><label class="magazine-select">Zoom <select aria-label="PDF zoom"><option value="1">Fit</option><option value="1.25">125%</option><option value="1.5">150%</option><option value="2">200%</option></select></label></div><div class="magazine-viewport" tabindex="0" role="group" aria-label="Magazine pages. Use the left and right arrow keys to turn pages."><div class="magazine-book"></div></div><div class="magazine-loading" role="status" data-book-loading></div><div class="magazine-footer"><button type="button" data-book-prev aria-label="Turn to previous pages">← Previous</button><span>Use ← → or swipe to turn pages</span><button type="button" data-book-next aria-label="Turn to next pages">Next →</button></div>'+(coverPage>1?'<p class="magazine-source-note">Opens at the magazine cover. PDF page 1 is Yale’s archive sheet.</p>':'');
      book=node.querySelector('.magazine-book');viewport=node.querySelector('.magazine-viewport');
      status=node.querySelector('.magazine-page-status');input=node.querySelector('input');
      layout=node.querySelector('[aria-label="Page layout"]');zoomControl=node.querySelector('[aria-label="PDF zoom"]');
      layout.value=twoPages?'spread':'single';
      node.querySelectorAll('[data-book-prev]').forEach(b=>on(b,'click',()=>flip(-1)));
      node.querySelectorAll('[data-book-next]').forEach(b=>on(b,'click',()=>flip(1)));
      on(node.querySelector('form'),'submit',event=>{event.preventDefault();goToPage(input.value);});
      on(layout,'change',()=>{manualLayout=true;changeLayout(layout.value==='spread');});
      on(zoomControl,'change',()=>{zoom=Number(zoomControl.value);viewport.classList.toggle('is-zoomed',zoom>1);navigate(position);});
      on(node,'keydown',event=>{
        if(event.altKey||event.ctrlKey||event.metaKey||/^(INPUT|SELECT|TEXTAREA)$/.test(event.target.tagName))return;
        if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();flip(event.key==='ArrowRight'?1:-1);}
        if(event.key==='Home'||event.key==='End'){event.preventDefault();navigate(event.key==='Home'?0:spreads.length-1);}
      });
      on(viewport,'pointerdown',event=>{if(event.pointerType==='touch'&&zoom===1)touchStart={x:event.clientX,y:event.clientY};},{passive:true});
      on(viewport,'pointerup',event=>{
        if(!touchStart)return;const dx=event.clientX-touchStart.x,dy=event.clientY-touchStart.y;touchStart=null;
        if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)flip(dx<0?1:-1);
      },{passive:true});
      on(viewport,'pointercancel',()=>{touchStart=null;},{passive:true});
      lastWidth=viewport.clientWidth;
      if(host.ResizeObserver){
        resizeObserver=new host.ResizeObserver(()=>{
          if(Math.abs(viewport.clientWidth-lastWidth)<20)return;
          lastWidth=viewport.clientWidth;clearTimeout(resizeTimer);
          resizeTimer=setTimeout(()=>{
            if(disposed)return;
            const next=!host.matchMedia('(max-width: 700px)').matches;
            if(!manualLayout&&next!==twoPages)changeLayout(next);else navigate(position);
          },120);
        });resizeObserver.observe(viewport);
      }
      await navigate(spreads.findIndex(s=>s.includes(coverPage)));
    }catch(error){
      clearTimeout(timeout);task?.destroy();
      if(!disposed){node.classList.add('pdf-reader-failed');node.innerHTML='<div class="issue-reader-empty"><h2>The PDF could not load inside this reader.</h2><p>Try “Open PDF / print” above. If available, the alternate Issuu reader is below.</p></div>';}
    }
  }
  return {destroy,ready:initialize(),get settled(){return work;}};
}
