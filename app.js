const navItems = [
  ["LOCAL", "/section/local/"], ["NATIONAL", "/section/national/"], ["WORLD", "/section/world/"],
  ["CULTURE", "/section/culture/"], ["OPINION", "/section/opinion/"], ["INTERVIEWS", "/section/interviews/"],
  ["MULTIMEDIA", "/multimedia/"], ["ISSUES", "/archive/"]
];
// Placeholder for the newest issue; shell() resolves it from the loaded data on every render.
const CURRENT_ISSUE = {currentIssue:true};
const navMenus = {
  LOCAL: [["Yale & New Haven", "/section/local/"], ["Campus politics", "/topic/campus-politics/"], ["New Haven", "/topic/new-haven/"], ["History & archive", "/archive/"]],
  NATIONAL: [["National desk", "/section/national/"], ["Elections", "/topic/elections/"], ["Congress", "/topic/congress/"], ["Policy and courts", "/topic/policy-and-courts/"]],
  WORLD: [["World desk", "/section/world/"], ["Africa", "/topic/africa/"], ["Asia", "/topic/asia/"], ["Europe", "/topic/europe/"], ["Foreign affairs", "/topic/foreign-affairs/"]],
  CULTURE: [["Culture desk", "/section/culture/"], ["Campus life", "/topic/campus-life/"], ["Photojournalism", "/section/photojournalism/"], ["Culture", "/topic/culture/"]],
  OPINION: [["Opinion desk", "/section/opinion/"], ["Essays", "/topic/essays/"], ["Columns", "/topic/columns/"], ["Democracy", "/topic/democracy/"]],
  INTERVIEWS: [["All interviews", "/section/interviews/"], ["Conversations", "/topic/conversations/"], ["Profiles", "/topic/profiles/"]],
  MULTIMEDIA: [["Multimedia hub", "/multimedia/"], ["Photojournalism", "/section/photojournalism/"], ["Podcasts", "/section/podcasts/"], ["Print archive", "/archive/"]],
  ISSUES: [["Current issue", CURRENT_ISSUE], ["History & archive", "/archive/"], ["Yale digital archive", "https://elischolar.library.yale.edu/politic/"], ["Search issue articles", "/search/?type=issues"]]
};
const topicDefinitions = {
  "campus-politics": {title:"Campus Politics", description:"Reporting on student voices, campus debates, and the politics shaping life at Yale.", terms:["campus"], nav:"LOCAL"},
  "new-haven": {title:"New Haven", description:"Reporting on the people, institutions, and civic life of New Haven.", terms:["new haven"], nav:"LOCAL"},
  elections: {title:"Elections", description:"Coverage of campaigns, voting, and the choices shaping public life.", terms:["elections","election"], nav:"NATIONAL"},
  congress: {title:"Congress", description:"Reporting and analysis on Congress, its debates, and the decisions before it.", terms:["congress"], nav:"NATIONAL"},
  "policy-and-courts": {title:"Policy & Courts", description:"Coverage of public policy, the courts, and the institutions that shape American life.", terms:["policy","courts"], nav:"NATIONAL"},
  africa: {title:"Africa", description:"Reporting and perspectives on politics, society, and change across Africa.", terms:["africa"], nav:"WORLD"},
  asia: {title:"Asia", description:"Reporting and perspectives on politics, society, and change across Asia.", terms:["asia"], nav:"WORLD"},
  europe: {title:"Europe", description:"Reporting and perspectives on politics, society, and change across Europe.", terms:["europe"], nav:"WORLD"},
  "foreign-affairs": {title:"Foreign Affairs", description:"Reporting on diplomacy, conflict, and the forces shaping the world beyond our borders.", terms:["foreign policy","foreign affairs"], nav:"WORLD"},
  "campus-life": {title:"Campus Life", description:"Stories about campus communities, student life, and the ideas being debated at Yale.", terms:["campus life","campus"], nav:"CULTURE"},
  culture: {title:"Culture", description:"Essays and reporting on the cultural forces shaping how we live and see the world.", terms:["culture"], sections:["culture"], nav:"CULTURE"},
  essays: {title:"Essays", description:"Arguments, reflections, and ideas from The Politic’s opinion writers.", terms:["opinion"], sections:["opinion"], nav:"OPINION"},
  columns: {title:"Columns", description:"Recurring perspectives and commentary from Politic writers.", terms:["columns","column"], nav:"OPINION"},
  democracy: {title:"Democracy", description:"Reporting and ideas about democratic institutions, participation, and public trust.", terms:["democracy"], nav:"OPINION"},
  conversations: {title:"Conversations", description:"Interviews with the people shaping politics, culture, and public life.", terms:["interviews","conversation"], sections:["interviews"], nav:"INTERVIEWS"},
  profiles: {title:"Profiles", description:"Meet the people behind the ideas, movements, and decisions in the news.", terms:["profiles","profile"], sections:["interviews"], nav:"INTERVIEWS"}
};
function shell(content, active) {
  let links = navItems.map(function (item) {
    const children = navMenus[item[0]] || [];
    const menuId='nav-menu-'+item[0].toLowerCase();
    const submenu=children.length?'<button class="nav-toggle" data-nav-toggle aria-label="Open '+item[0].toLowerCase()+' menu" aria-controls="'+menuId+'" aria-expanded="false">⌄</button><div class="nav-dropdown nav-compact" data-nav-menu id="'+menuId+'" hidden>'+children.map(child=>'<a href="'+esc(child[1]===CURRENT_ISSUE?currentIssueHref():child[1])+'">'+child[0]+'<span aria-hidden="true">→</span></a>').join('')+'</div>':'';
    return '<div class="nav-item" data-nav-item data-nav-section="'+item[0].toLowerCase()+'" data-has-menu="'+Boolean(children.length)+'"><a class="nav-trigger '+(active===item[0]?'active':'')+'" data-nav-trigger href="'+item[1]+'">'+item[0]+'</a>'+submenu+'</div>';
  }).join("");
  return "<div class=\"site\"><a class=\"skip-link\" href=\"#main-content\" data-skip>Skip to content</a><header class=\"site-header\"><div class=\"utility shell\"><span>" + date(new Date().toISOString(), true).toUpperCase() + "</span><span class=\"utility-center\">THE YALE JOURNAL OF POLITICS <b>•</b> SINCE 1947</span><div class=\"utility-actions\"><button class=\"text-button\" data-search>⌕ &nbsp;SEARCH</button><button class=\"join-button\" data-join>INTERESTED IN JOINING?</button></div></div><div class=\"masthead shell\"><a class=\"wordmark\" href=\"/\">The Politic</a></div><nav class=\"primary-nav shell\"><button class=\"mobile-menu\" data-menu>MENU</button><div class=\"nav-links\">" + links + "</div></nav></header><main id=\"main-content\" tabindex=\"-1\">" + content + "</main><footer class=\"site-footer\"><div class=\"shell footer-main\"><div><a class=\"footer-mark\" href=\"/\">The Politic</a><p>Yale's political journal since 1947.<br>Independent voices and student reporting.</p></div><div><h4>EXPLORE</h4><a href=\"/section/local/\">Local</a><a href=\"/section/national/\">National</a><a href=\"/section/world/\">World</a><a href=\"/archive/\">Archive</a></div><div><h4>CONNECT</h4><a href=\"/team/\">The people behind The Politic</a><a href=\"/competition/\">High school competition</a><a href=\"/join/\">Interested in joining?</a><a href=\"/pages/\">All pages &amp; projects</a><a href=\"/alumni/\">Alumni directory</a><a href=\"/authors/\">All contributors</a><a href=\"/page/contact/\">Contact</a></div></div><div class=\"shell footer-bottom\"><span>© " + new Date().getFullYear() + " The Politic</span><span>Truth. Analysis. Yale.</span></div></footer></div>";
}

const app=document.querySelector('#app');
const modalRoot=document.querySelector('#modal-root');
let state={posts:[],pages:[],authors:{},articles:{},media:{}}, manifest={}, issueCatalog=[], issueCovers={}, route={}, routeVersion=0, pdfCleanup=()=>{}, commentsCleanup=()=>{}, modalReturn=null;
const chunkPromises=new Map();
const searchShards={}, searchPromises=new Map();
// Must match tokens() in scripts/build-search-shards.mjs.
const searchTokens=text=>String(text||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/['’]/g,'').match(/[a-z0-9]+/g)||[];
const searchShardKey=token=>/[a-z]/.test(token[0])?token[0]:'0';
function loadSearchShards(query) {
  const keys=[...new Set(searchTokens(query).filter(t=>t.length>=2).map(searchShardKey))].filter(key=>!searchShards[key]);
  return Promise.all(keys.map(key=>{
    if(!searchPromises.has(key))searchPromises.set(key,fetchJson('/data/search-index/'+key+'.json').then(data=>{searchShards[key]=data;}).catch(error=>{searchPromises.delete(key);throw error;}));
    return searchPromises.get(key);
  }));
}
// Post ids whose article text contains a word starting with every token of `word`, or null if the text can't decide.
function bodyMatches(word) {
  const tokens=searchTokens(word).filter(t=>t.length>=2);
  if(!tokens.length)return null;
  let result=null;
  for(const token of tokens){
    const shard=searchShards[searchShardKey(token)];if(!shard)return null;
    const ids=new Set();
    for(const term in shard){
      if(!term.startsWith(token))continue;
      let id=0;for(const delta of shard[term].split(','))ids.add(id+=parseInt(delta,36));
    }
    result=result?new Set([...result].filter(id=>ids.has(id))):ids;
  }
  return result;
}
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const strip=v=>{ const t=document.createElement('template');t.innerHTML=String(v||'');const fragment=t.content;fragment.querySelectorAll('script,style').forEach(n=>n.remove());return [...fragment.childNodes].map(n=>n.textContent||'').join(' ').replace(/\s+/g,' ').trim(); };
const date=(v,long=false)=>{const d=new Date(v);return Number.isNaN(d.getTime())?'':new Intl.DateTimeFormat('en-US',{month:long?'long':'short',day:'numeric',year:'numeric'}).format(d);};
const mainSlugs=['local','national','world','culture','opinion','interviews','podcasts','documentary','photojournalism','photo-essay'];
const category=p=>p?.categories?.find(c=>mainSlugs.includes(c.slug))?.name||p?.categories?.find(c=>c.slug!=='homepage-featured'&&!/issue/.test(c.slug))?.name||'The Politic';
const label=p=>{const section=p?.categories?.find(c=>mainSlugs.includes(c.slug))?.name;return (section||(p?.categories?.some(c=>c.slug==='homepage-featured')?'FEATURED':category(p))).toUpperCase();};
const href=p=>'/article/'+encodeURIComponent(p.slug)+'/';
const authorHref=p=>p?.author?.slug?'/author/'+encodeURIComponent(p.author.slug)+'/':'/authors/';
const byline=p=>'BY <a href="'+authorHref(p)+'">'+esc(p.author?.name||'The Politic')+'</a><span> · </span><time datetime="'+esc(p.date)+'">'+date(p.date)+'</time>';
const deck=p=>{let text=p?.excerpt||'';text=text.replace(/^[^.!?]{2,90}\s\/\s(?:The New York Times|Associated Press|Reuters|AP|Getty Images|Bloomberg|AFP)(?:\s|,|$)\s*/i,'').replace(/^(?:Photo(?:graph)?(?:y)?\s+by|Image\s+by|Photo\s+credit:)\s*[^.!?]{2,90}[.!?]?\s*/i,'');if(text.length<=230)return text;const sentence=text.match(/^.+?[.!?](?=\s|$)/);return sentence?.[0]||text.slice(0,227).replace(/\s+\S*$/,'')+'…';};
const canonical=v=>{try{const u=new URL(String(v).replaceAll('&amp;','&'), 'https://thepolitic.org');if(['thepolitic.org','www.thepolitic.org','3.133.126.219'].includes(u.hostname)){u.hostname='thepolitic.org';u.protocol='https:';u.search='';u.hash='';}return u.href;}catch{return '';}};
const localMedia=v=>String(v||'').startsWith('/assets/')?v:manifest[canonical(v)]===null?'/assets/image-unavailable.svg':manifest[canonical(v)]||canonical(v);
const decodedSlug=value=>{try{return decodeURIComponent(value||'');}catch{return value;}};
const hasCategory=(p,slug)=>p.categories.some(c=>c.slug===slug||c.parent===state.categoryIds?.[slug]);
const photo=(p,cls='card-image')=>p?.featured_media?.url?'<a class="'+cls+'" href="'+href(p)+'"><img src="'+esc(localMedia(p.featured_media.url))+'" alt="'+esc(p.featured_media.alt||'')+'" loading="lazy"></a>':'';
const card=(p,compact=false)=>p?'<article class="story-card'+(compact?' compact':'')+(!p.featured_media?' no-image':'')+'">'+photo(p)+'<div class="story-card-copy"><div class="eyebrow">'+esc(label(p))+'</div><h3><a href="'+href(p)+'">'+esc(p.title)+'</a></h3><p class="post-subtitle">'+esc(deck(p))+'</p><div class="byline">'+byline(p)+'</div></div></article>':'';
const listItem=p=>'<article class="list-item'+(!p.featured_media?' no-image':'')+'">'+photo(p,'list-thumb')+'<div class="list-copy"><div class="eyebrow">'+esc(label(p))+'</div><h3><a href="'+href(p)+'">'+esc(p.title)+'</a></h3><p>'+esc(deck(p))+'</p><div class="byline">'+byline(p)+'</div></div></article>';
const sectionRule=(title,note='')=>'<div class="section-rule"><span>'+esc(title)+'</span><i></i><small>'+esc(note)+'</small></div>';
const sectionHeader=(title,description='',eyebrow='')=>'<div class="section-header">'+(eyebrow?'<div class="eyebrow">'+esc(eyebrow)+'</div>':'')+'<h1>'+esc(title)+'</h1>'+(description?'<p>'+esc(description)+'</p>':'')+'</div>';
const issueDisplayName=issue=>String(issue?.title||'').replace(/^(?:The )?Yale Political Journal;\s*A Magazine of Student Opinion\s*/i,'').replace(/^(?:The )?Yale Political (?:Quarterly|Monthly|Magazine)\s*/i,'').replace(/^The Politic\s*/i,'').replace(/\b(19\d{2}|20\d{2})-(19\d{2}|20\d{2})\b/g,'$1–$2').replace(/\bIssue IIII\b/gi,'Issue IV').replace(/\b((?:19|20)\d{2})\s+(January|February|March|April|May|June|July|August|September|October|November|December|Spring|Summer|Fall|Winter)\b/gi,'$2 $1').replace(/\s+/g,' ').trim();
function updateMeta(attribute,key,value) {
  let node=document.head.querySelector('meta['+attribute+'="'+key+'"]');
  if(!node){node=document.createElement('meta');node.setAttribute(attribute,key);document.head.append(node);}
  node.content=value||'';
}
function setCanonical(url) {
  let node=document.head.querySelector('link[rel="canonical"]');
  if(!node){node=document.createElement('link');node.rel='canonical';document.head.append(node);}
  node.href=url;
}
const siteRobots=document.head.querySelector('meta[name="robots"]')?.content||'';
function pageMeta(title,description) {
  const cleanPath=location.pathname||'/';
  const canonicalUrl=location.origin+cleanPath;
  description=description||(cleanPath!=='/'?document.head.querySelector('meta[name="description"]')?.content:'')||'The Politic — Yale’s political journal since 1947.';
  const fullTitle=title==='The Politic'?'The Politic':title+' | The Politic';
  document.title=fullTitle;
  updateMeta('name','description',description);
  updateMeta('property','og:title',fullTitle);
  updateMeta('property','og:description',description);
  updateMeta('property','og:type','website');
  updateMeta('property','og:url',canonicalUrl);
  updateMeta('property','og:image',location.origin+'/assets/capitol-reporting.png');
  updateMeta('name','twitter:title',fullTitle);
  updateMeta('name','twitter:description',description);
  updateMeta('name','twitter:card','summary_large_image');
  updateMeta('name','twitter:image',location.origin+'/assets/capitol-reporting.png');
  setCanonical(canonicalUrl);
  if(siteRobots)updateMeta('name','robots',siteRobots);
  else document.head.querySelector('meta[name="robots"]')?.remove();
}
const shellBeforePagesCleanup=shell;
shell=(content,active)=>shellBeforePagesCleanup(content,active).replace('<a href="/pages/">All pages &amp; projects</a>','');
const pageWrap=(title,html,active='',description)=>{pageMeta(title,description);return shell('<div class="shell page">'+html+'</div>',active);};
const notFound=()=>{
  const html=pageWrap('Page not found',sectionHeader('Page not found','We couldn’t find that page.')+'<a class="button button-solid" href="/search/">Search the archive →</a>');
  updateMeta('name','robots','noindex');
  return html;
};
function routeLink(name,value='',params={}) {
  // Search terms travel as ?q= so slashes or percent signs never end up in a path segment.
  if(name==='search'&&value){params={q:value,...params};value='';}
  const query=new URLSearchParams(Object.entries(params).filter(([key,v])=>key!=='anchor'&&v!==''&&v!=null)).toString();
  return '/'+(name?name+'/':'')+(value?encodeURIComponent(value)+'/':'')+(query?'?'+query:'');
}
function routeFrom(pathname,search,hash) {
  const parts=pathname.split('/').filter(Boolean).map(decodedSlug);
  const params=new URLSearchParams(search);
  const name=parts[0]||'';let value=parts.slice(1).join('/');
  if(name==='search'&&params.has('q')){value=params.get('q');params.delete('q');}
  // Older links used ?anchor=; a normal #fragment is preferred now.
  const anchor=hash.length>1?decodedSlug(hash.slice(1)):params.get('anchor')||'';params.delete('anchor');
  return {name,value,params,anchor};
}
function parseRoute() {
  return routeFrom(location.pathname,location.search,location.hash);
}
// Converts a former hash route (#/world, #/article/slug?anchor=x) to its permanent address.
function legacyHashPath(hash) {
  const raw=String(hash).replace(/^#\/?/,'');const split=raw.indexOf('?');
  const part=split<0?raw:raw.slice(0,split),search=split<0?'':raw.slice(split);
  const [name='',...bits]=part.split('/');
  const value=decodedSlug(bits.join('/'));
  const old=routeFrom('/'+name+'/',search,'');
  const params=Object.fromEntries(old.params);
  const anchor=old.anchor?'#'+encodeURIComponent(old.anchor):'';
  if(['article','opinion','interview'].includes(name)&&value)return routeLink('article',value,params)+anchor;
  if(['world','culture','photojournalism','opinion','interviews'].includes(name))return routeLink('section',name,params)+anchor;
  if(name==='us-politics')return routeLink('section','national',params)+anchor;
  if(name==='interview')return routeLink('section','interviews',params)+anchor;
  if(['issues','history'].includes(name))return routeLink('archive','',params)+anchor;
  if(name==='high-school-competition')return routeLink('competition','',params)+anchor;
  return routeLink(name,value,params)+anchor;
}
function latestIssueCategory() {
  const latest=new Map();
  for(const c of Object.values(state.categories||{}))if(/issue/.test(c.slug)&&c.count>0)latest.set(c.slug,{category:c,date:-Infinity});
  for(const p of state.posts)for(const c of p.categories){const entry=latest.get(c.slug);if(entry)entry.date=Math.max(entry.date,Date.parse(p.date));}
  return [...latest.values()].sort((a,b)=>b.date-a.date)[0]?.category;
}
function currentIssueHref() {
  const current=latestIssueCategory();
  if(!current)return '/archive/';
  const issue=issueCatalog.find(i=>i.categorySlug===current.slug&&(i.pdf||issueEmbedUrl(i)));
  return issue?'/issue/'+encodeURIComponent(issue.id)+'/':'/section/'+encodeURIComponent(current.slug)+'/';
}
function go(url) {
  history.pushState({},'',url);navigate();
}
function paginate(rows,size=20) {
  const pages=Math.max(1,Math.ceil(rows.length/size));
  const current=Math.min(pages,Math.max(1,Number.parseInt(route.params.get('page'),10)||1));
  const link=n=>routeLink(route.name,route.value,{...Object.fromEntries(route.params),page:n});
  const controls=pages>1?'<nav class="pagination" aria-label="Pagination">'+(current>1?'<a href="'+link(current-1)+'">← Previous</a>':'<span></span>')+'<span>Page '+current+' of '+pages+' · '+rows.length+' results</span>'+(current<pages?'<a href="'+link(current+1)+'">Next →</a>':'<span></span>')+'</nav>':'';
  return {rows:rows.slice((current-1)*size,current*size),controls,current,total:rows.length};
}
function internalUrl(value) {
  if(!value)return '';
  if(value.startsWith('#/'))return legacyHashPath(value);
  if(value.startsWith('#'))return value;
  if(/^(mailto:|tel:)/i.test(value))return value;
  let u;try{u=new URL(value,'https://thepolitic.org');}catch{return '';}
  if(!['http:','https:'].includes(u.protocol))return '';
  if(!['thepolitic.org','www.thepolitic.org','3.133.126.219'].includes(u.hostname))return u.href;
  if(u.pathname.includes('/wp-content/uploads/'))return localMedia(u.href);
  const id=u.searchParams.get('p')||u.searchParams.get('page_id');
  const item=id&&[...state.posts,...state.pages].find(p=>p.id===Number(id));
  const parts=u.pathname.split('/').filter(Boolean).map(x=>{try{return decodeURIComponent(x);}catch{return x;}});
  const last=parts.at(-1);
  const post=item&&state.posts.includes(item)?item:state.posts.find(p=>decodedSlug(p.slug)===last);
  if(post)return href(post)+u.hash;
  const page=item||state.pages.find(p=>decodedSlug(p.slug)===last);
  if(page)return '/page/'+encodeURIComponent(page.slug)+'/';
  if(parts.includes('author'))return '/author/'+encodeURIComponent(last)+'/';
  if(parts.includes('category')&&Object.values(state.categories).some(c=>c.slug===last))return '/section/'+encodeURIComponent(last)+'/';
  if(parts.includes('tag'))return routeLink('search','',{tag:last});
  const media=Object.values(state.media).find(m=>m.link&&new URL(m.link).pathname===u.pathname);
  if(media)return localMedia(media.url);
  if(!last)return '/';
  return 'https://thepolitic.org'+u.pathname+u.search+u.hash;
}
function safeHtml(value) {
  let html=String(value||'').replace(/\[gallery[^\]]*ids=["']([\d, ]+)["'][^\]]*\]/gi,(_,ids)=>'<div class="gallery">'+ids.split(',').map(id=>state.media[id.trim()]).filter(Boolean).map(m=>'<figure><img src="'+esc(m.url)+'" alt="'+esc(m.alt)+'"><figcaption>'+m.caption+'</figcaption></figure>').join('')+'</div>');
  html=html.replace(/\[\/?(?:vc_[\w]+|caption|embed)[^\]]*\]/gi,'');
  const t=document.createElement('template');t.innerHTML=html;const fragment=t.content;
  fragment.querySelectorAll('script,style,link,meta,base,object,embed,svg,math').forEach(n=>n.remove());
  for(const n of fragment.querySelectorAll('*')) {
    for(const a of [...n.attributes]) {
      if(/^on/i.test(a.name)||['style','srcdoc','srcset','sizes','data-settings','formaction','action'].includes(a.name)||a.name.startsWith('data-'))n.removeAttribute(a.name);
    }
    if(n.tagName==='A'||n.tagName==='AREA') {
      const url=internalUrl(n.getAttribute('href'));if(url)n.setAttribute('href',url);else n.removeAttribute('href');
      n.removeAttribute('target');n.setAttribute('rel','noopener noreferrer');
    }
    if(['IMG','AUDIO','VIDEO','SOURCE'].includes(n.tagName)) {
      const src=n.getAttribute('src');if(src){const url=localMedia(src);if(/^https?:|^\/assets\//.test(url))n.setAttribute('src',url);else n.removeAttribute('src');}
      if(n.tagName==='IMG'){n.loading='lazy';n.removeAttribute('height');n.removeAttribute('width');}
      if(['AUDIO','VIDEO'].includes(n.tagName)){n.setAttribute('controls','');n.removeAttribute('autoplay');n.setAttribute('preload','metadata');}
    }
    if(n.tagName==='IFRAME') {
      let u;try{u=new URL(n.getAttribute('src'),'https://thepolitic.org');}catch{n.remove();continue;}
      const allow=['www.youtube.com','www.youtube-nocookie.com','player.vimeo.com','w.soundcloud.com'];
      if(u.protocol==='https:'&&allow.includes(u.hostname)) {
        n.setAttribute('src',u.href);n.setAttribute('title',n.title||'Embedded media');n.setAttribute('loading','lazy');n.setAttribute('allowfullscreen','');n.setAttribute('sandbox','allow-scripts allow-same-origin allow-presentation');n.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
      } else {
        const issue=/issuu/.test(u.hostname)&&issueCatalog.find(i=>i.documentSlug===(u.searchParams.get('d')||u.pathname.split('/docs/')[1]));
        const a=document.createElement('a');a.className='embed-source';a.href=issue?'/issue/'+encodeURIComponent(issue.id)+'/':['http:','https:'].includes(u.protocol)?u.href:'/archive/';a.rel='noopener noreferrer';a.textContent=issue?(issue.pdf?'Read this edition in the print reader →':'View this edition’s archive record →'):/issuu/.test(u.hostname)?'Print edition source — PDF not available for this embedded item ↗':'Open this interactive feature on its original host ↗';n.replaceWith(a);
      }
    }
    if(['FORM','INPUT','BUTTON','TEXTAREA','SELECT'].includes(n.tagName)) {
      if(n.tagName==='FORM'){const p=document.createElement('p');p.textContent='For subscriptions or submissions, contact the editorial team at thepolitic@yale.edu.';n.replaceWith(p);}else n.remove();
    }
  }
  const container=document.createElement('div');container.append(fragment);return container.innerHTML;
}
function currentIssueFeature(current,excluded=new Set()) {
  if(!current)return '';
  const allStories=state.posts.filter(p=>hasCategory(p,current.slug));
  const stories=allStories.filter(p=>!excluded.has(p.id));
  const collection='/section/'+encodeURIComponent(current.slug)+'/';
  const issue=issueCatalog.find(i=>i.categorySlug===current.slug);
  const issueHref=issue?'/issue/'+encodeURIComponent(issue.id)+'/':collection;
  const name=current.name.replace(/\b(19\d{2}|20\d{2})-(19\d{2}|20\d{2})\b/g,'$1–$2');
  const number=name.match(/\bIssue\s+(.+)$/i)?.[1]||'';
  const year=name.replace(/\s*Issue\s+.+$/i,'');
  return '<section class="issue-band current-issue-feature" aria-label="Current issue">'+sectionRule('Current Issue','STUDENT VOICES. A WIDER CONVERSATION.')
    +'<div class="current-issue-grid"><figure class="current-issue-cover"><a class="current-issue-jacket" href="'+issueHref+'" aria-label="Read '+esc(name)+'"><span class="issue-jacket-wordmark">The Politic</span><span class="issue-jacket-year">'+esc(year)+'</span><span class="issue-jacket-number"><small>ISSUE</small>'+esc(number||name)+'</span><span class="issue-jacket-footer">Yale’s political journal<br>Since 1947</span></a></figure>'
    +'<div class="current-issue-details"><p class="current-issue-edition">'+esc(year)+'</p><h2>'+esc(name)+'</h2><p class="current-issue-deck">Reporting and analysis from Yale and beyond. Explore '+allStories.length+' stories on politics, culture, and the forces shaping our world.</p><span class="current-issue-accent" aria-hidden="true"></span><a class="button button-solid current-issue-read" href="'+collection+'">Explore the collection <span aria-hidden="true">⟶</span></a><a class="current-issue-archive-link" href="/archive/">Browse past issues <span aria-hidden="true">→</span></a></div>'
    +'<nav class="current-issue-toc" aria-label="In this issue"><h3>In this issue</h3><ol>'+stories.slice(0,4).map(p=>'<li><a href="'+href(p)+'"><span class="current-issue-story-title">'+esc(p.title)+'</span><span class="current-issue-story-author">'+esc(p.author?.name||'The Politic')+'</span></a></li>').join('')+'</ol><a class="current-issue-all" href="'+collection+'">View all '+allStories.length+' articles <span aria-hidden="true">→</span></a></nav></div></section>';
}
function home() {
  const lead=state.posts.find(p=>hasCategory(p,'homepage-featured'))||state.posts[0];
  if(!lead)return pageWrap('The Politic',sectionHeader('The Politic','No published articles are available.'));
  const rest=state.posts.filter(p=>p.id!==lead.id);
  const current=latestIssueCategory();
  const homeSide=rest.slice(0,3);
  const used=new Set([lead,...homeSide].map(p=>p.id));
  const currentIssue=currentIssueFeature(current,used);
  if(current)state.posts.filter(p=>hasCategory(p,current.slug)&&!used.has(p.id)).slice(0,4).forEach(p=>used.add(p.id));
  const latest=rest.filter(p=>!used.has(p.id)).slice(0,3);latest.forEach(p=>used.add(p.id));
  const local=state.posts.filter(p=>hasCategory(p,'local')&&!used.has(p.id)).slice(0,3);local.forEach(p=>used.add(p.id));
  const more=state.posts.filter(p=>!used.has(p.id)).slice(0,6);
  return pageWrap('The Politic',sectionRule('Featured','POLITICS LIVES HERE')+'<section class="home-lead"><article class="hero-story">'+photo(lead,'hero-image')+'<div class="eyebrow">'+esc(label(lead))+'</div><h1><a href="'+href(lead)+'">'+esc(lead.title)+'</a></h1><p class="hero-deck">'+esc(deck(lead))+'</p><div class="byline">'+byline(lead)+'</div></article><div class="home-side">'+homeSide.map(p=>card(p,true)).join('')+'</div></section>'
    +currentIssue
    +'<section class="subsection">'+sectionRule('Latest','NEWS. PERSPECTIVE. ALWAYS.')+'<div class="analysis-grid">'+latest.map(p=>card(p)).join('')+'</div></section><section class="subsection">'+sectionRule('Yale & New Haven','OUR CITY. A WIDER WORLD.')+'<div class="analysis-grid">'+local.map(p=>card(p)).join('')+'</div></section><section class="subsection">'+sectionRule('More Reporting')+more.map(listItem).join('')+'<a class="button button-outline centered" href="/search/">Browse all '+state.posts.length.toLocaleString()+' articles →</a></section>','HOME');
}
function sectionPage(slug) {
  slug=slug==='us-politics'?'national':slug;
  const cat=Object.values(state.categories).find(c=>c.slug===slug);
  if(!cat)return notFound();
  const matches=state.posts.filter(p=>hasCategory(p,slug)||(slug==='photojournalism'&&hasCategory(p,'photo-essay')));
  const result=paginate(matches,16);
  const rows=result.rows;
  const lead=rows[0];
  let content=sectionHeader(cat.name,strip(cat.description)||'Reporting and ideas from The Politic.')+'<div class="result-count">'+matches.length+' articles</div>';
  if(lead&&result.current===1)content+='<section class="landing-grid"><article class="landing-lead">'+photo(lead,'hero-image')+'<div class="eyebrow">'+esc(label(lead))+'</div><h2><a href="'+href(lead)+'">'+esc(lead.title)+'</a></h2><p class="large-deck">'+esc(deck(lead))+'</p><div class="byline">'+byline(lead)+'</div></article><div class="landing-side">'+rows.slice(1,4).map(p=>card(p,true)).join('')+'</div></section><div class="article-list">'+rows.slice(4).map(listItem).join('')+'</div>';
  else content+=rows.map(listItem).join('')||'<p>No published articles in this section yet.</p>';
  return pageWrap(cat.name,content+result.controls,slug.toUpperCase());
}
function topicPage(slug) {
  const topic=topicDefinitions[slug];if(!topic)return notFound();
  const bodyResults=topic.terms.map(bodyMatches);
  const matches=state.posts.filter(post=>{
    if(topic.sections?.some(section=>hasCategory(post,section)))return true;
    const metadata=new Set(searchTokens([post.title,post.excerpt,post.author?.name,...post.categories.map(c=>c.name),...post.tags.map(t=>t.name)].join(' ')));
    return topic.terms.some((term,index)=>{
      const tokens=searchTokens(term).filter(token=>token.length>=2);
      return tokens.length>0&&tokens.every(token=>metadata.has(token))||bodyResults[index]?.has(post.id);
    });
  });
  const result=paginate(matches,16),rows=result.rows,lead=rows[0];
  let content=sectionHeader(topic.title,topic.description)+'<div class="result-count">'+matches.length+' articles</div>';
  if(lead&&result.current===1)content+='<section class="landing-grid"><article class="landing-lead">'+photo(lead,'hero-image')+'<div class="eyebrow">'+esc(label(lead))+'</div><h2><a href="'+href(lead)+'">'+esc(lead.title)+'</a></h2><p class="large-deck">'+esc(deck(lead))+'</p><div class="byline">'+byline(lead)+'</div></article><div class="landing-side">'+rows.slice(1,4).map(p=>card(p,true)).join('')+'</div></section><div class="article-list">'+rows.slice(4).map(listItem).join('')+'</div>';
  else if(rows.length)content+=rows.map(listItem).join('');
  else content+='<p class="empty-state">There are no articles in this collection yet. Explore the <a href="/section/'+esc(topic.nav.toLowerCase())+'/">'+esc(topic.nav==='LOCAL'?'Local':topic.nav==='NATIONAL'?'National':topic.nav==='WORLD'?'World':topic.nav==='CULTURE'?'Culture':topic.nav==='OPINION'?'Opinion':'Interviews')+' desk</a> for more reporting.</p>';
  return pageWrap(topic.title,'<div class="section-page topic-page">'+content+result.controls+'</div>',topic.nav);
}
function multimedia() {
  return pageWrap('Listen & Watch',sectionHeader('Listen & Watch','Podcasts, films, and photojournalism from The Politic.')+['documentary','podcasts','photojournalism'].map(slug=>'<section class="subsection">'+sectionRule(slug==='documentary'?'Documentary':slug==='podcasts'?'Podcasts':'Photojournalism')+'<div class="analysis-grid">'+state.posts.filter(p=>hasCategory(p,slug)||(slug==='photojournalism'&&hasCategory(p,'photo-essay'))).slice(0,3).map(p=>card(p)).join('')+'</div><a class="button button-outline" href="/section/'+slug+'/">Browse all '+slug+' →</a></section>').join('')+'<section class="subsection">'+sectionRule('Print editions')+'<p>Read available PDFs in the website.</p><a class="button button-solid" href="/archive/">Explore the archive →</a></section>','MULTIMEDIA');
}
function authorInfo(author) {
  return {...author,...(teamBios.find(p=>p.name.toLowerCase()===author?.name?.toLowerCase())||{})};
}
function guestComments(post) {
  return '<section class="comments-section" data-comments-post="'+post.id+'" aria-labelledby="comments-heading"><h2 id="comments-heading">Join the conversation</h2><p>Loading guest comments…</p></section>';
}
function authorPage(slug) {
  const author=Object.values(state.authors).find(a=>a.slug===slug);if(!author)return notFound();
  const person=authorInfo(author), result=paginate(state.posts.filter(p=>p.author.id===author.id));
  const portrait=person.image?'<img src="'+esc(person.image)+'" alt="'+esc(person.name)+'">':'';
  return pageWrap(person.name,'<section class="author-hero real-author'+(!portrait?' no-portrait':'')+'">'+portrait+'<div><div class="eyebrow">Contributor</div><h1>'+esc(person.name)+'</h1>'+(person.role?'<h2>'+esc(person.role)+'</h2>':'')+'<p>'+esc(person.bio||person.description||'Reporting and contributions to The Politic.')+'</p><p>'+result.total+' published articles</p></div></section><section class="subsection">'+sectionRule('Articles')+result.rows.map(listItem).join('')+result.controls+'</section>');
}
function articlePage(slug) {
  const post=state.posts.find(p=>p.slug===slug);if(!post)return notFound();
  const body=state.articles[slug];if(!body)throw new Error('The article text could not be loaded.');
  const author=authorInfo(post.author);
  const related=state.posts.filter(p=>p.id!==post.id&&p.categories.some(c=>post.categories.some(other=>c.id===other.id))).slice(0,3);
  const description=articleDeck(post,body.content);
  const canonicalUrl=location.origin+'/article/'+encodeURIComponent(post.slug)+'/';
  const shareUrl=encodeURIComponent(canonicalUrl),shareTitle=encodeURIComponent(post.title);
  pageMeta(post.title,description||post.excerpt||'Reporting and analysis from The Politic.');
  setCanonical(canonicalUrl);
  const image=post.featured_media?.url?localMedia(post.featured_media.url):'/assets/capitol-reporting.png';
  updateMeta('property','og:type','article');
  updateMeta('property','og:url',canonicalUrl);
  updateMeta('property','og:image',new URL(image,location.origin).href);
  updateMeta('name','twitter:card','summary_large_image');
  updateMeta('name','twitter:image',new URL(image,location.origin).href);
  const saved=readSaved().includes(post.id);
  return shell('<div class="shell article-page"><div class="article-layout"><article class="article-main"><div class="eyebrow">'+esc(label(post))+'</div><h1>'+esc(post.title)+'</h1>'+(description?'<p class="article-deck">'+esc(description)+'</p>':'')+'<div class="article-byline">'+byline(post)+'<span> · </span>'+post.readingMinutes+' MIN READ</div><div class="share-row"><button data-copy>Copy link</button><a href="https://twitter.com/intent/tweet?url='+shareUrl+'&amp;text='+shareTitle+'" target="_blank" rel="noopener noreferrer">Share on X</a><a href="https://www.facebook.com/sharer/sharer.php?u='+shareUrl+'" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.linkedin.com/sharing/share-offsite/?url='+shareUrl+'" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="mailto:?subject='+shareTitle+'&amp;body='+shareUrl+'">Email</a><button data-save="'+post.id+'" aria-pressed="'+saved+'">'+(saved?'Saved':'Save article')+'</button><a href="/saved/">Saved articles</a><a href="'+href(post)+'#comments-heading">Comments</a><span class="share-status" role="status"></span></div>'+(post.featured_media?'<figure class="article-hero"><img src="'+esc(localMedia(post.featured_media.url))+'" alt="'+esc(post.featured_media.alt||'')+'">'+(post.featured_media.caption?'<figcaption>'+safeHtml(post.featured_media.caption)+'</figcaption>':'')+'</figure>':'')+'<div class="article-body">'+safeHtml(body.content)+'</div><div class="article-author">'+(author.image?'<img src="'+esc(author.image)+'" alt="'+esc(author.name)+'">':'')+'<div><div class="eyebrow">About the author</div><h3><a href="'+authorHref(post)+'">'+esc(author.name)+'</a></h3><p>'+esc(author.bio||author.description||'Explore this contributor’s reporting.')+'</p></div><a class="button button-outline" href="'+authorHref(post)+'">View all articles →</a></div></article></div>'+guestComments(post)+'<section class="subsection related-coverage">'+sectionRule('Related Coverage')+'<div class="analysis-grid">'+related.map(p=>card(p)).join('')+'</div></section>'+(body.comments?.length?'<section class="discussion">'+sectionRule('Archived Comments')+body.comments.map(c=>'<article><h3>'+esc(c.author_name)+'</h3><time>'+date(c.date)+'</time>'+safeHtml(c.content.rendered)+'</article>').join('')+'</section>':'')+'</div>',category(post).toUpperCase());
}
function articleDeck(post,content) {
  const summary=deck(post).trim();
  if(!summary)return '';
  const template=document.createElement('template');template.innerHTML=content||'';
  const first=strip(template.content.querySelector('p')?.textContent||'');
  const normalize=text=>text.toLowerCase().replace(/[“”"'’.,!?;:—–-]/g,'').replace(/\s+/g,' ').trim();
  const excerpt=normalize(summary),opening=normalize(first);
  return opening&&(opening.startsWith(excerpt)||excerpt.startsWith(opening))?'':summary;
}
function pageContent(slug) {
  const page=state.pages.find(p=>p.slug===slug);if(!page)return notFound();
  let content=safeHtml(page.content);
  if(!strip(content))content='<p>This page has no additional text available.</p><a href="/search/" class="button button-outline">Search articles →</a>';
  const signup=slug==='contact'?'<section class="newsletter"><h2>Join the mailing list</h2><p>Subscribe through The Politic’s existing Mailchimp list.</p><form method="post" action="https://ThePolitic.us10.list-manage.com/subscribe/post?u=3295399f1c9bdc03fe6a62f57&amp;id=58e3584e9e" target="_blank" rel="noopener"><label for="newsletter-email">Email address</label><input id="newsletter-email" name="EMAIL" type="email" autocomplete="email" required><div class="signup-honeypot" aria-hidden="true"><input name="b_3295399f1c9bdc03fe6a62f57_58e3584e9e" tabindex="-1" autocomplete="off"></div><button class="button button-solid" type="submit">Subscribe on Mailchimp ↗</button></form><p class="small-note">Your address is sent to Mailchimp only when you submit this form. Confirmation opens in a new tab.</p></section>':'';
  return pageWrap(page.title,sectionHeader(page.title)+'<div class="source-page article-body">'+content+signup+'</div>');
}
const competitionSemiFinalists=['Aadya Jain','Andrew Larsen','Arin Lee','Aritra Ray','Astrid Ferrante Gomes','Brianna Tang','Elina Jadhav','Elliott David','Gavin Reddy','Hoang Anh Tuan','Jack Tuomi','Jackson Scott','Johan Shyam','Kevin Diao','Krisha Madan','Lauren Schwartz','Leyth Sharaf','Marie Morali','Martin Ramirez Pachon','Medhavika Rai','Naisha Gupta','Niel Peddibhotla','Omar Mehboob','Rebecca Chen','Zaara Chinoy'];
function competitionPage() {
  const page=state.pages.find(p=>p.slug==='high-school-competition');if(!page)return notFound();
  const source=document.createElement('template');source.innerHTML=safeHtml(page.content);
  const resultsLink=source.content.querySelector('a[href*="drive.google.com/file/d/"]');
  const resultsUrl=resultsLink?.getAttribute('href')||'https://drive.google.com/file/d/1RN3bcGfAIbaBEhK9XHdrFdU0Vyo_dpRY/view?usp=sharing';
  const winnerHeading=[...source.content.querySelectorAll('p,h2,h3')].find(el=>/^top three winners\b/i.test(el.textContent.trim()));
  const winners=[...(winnerHeading?.nextElementSibling?.querySelectorAll('li')||[])].map(item=>{
    const link=item.querySelector('a[href]'),name=strip(link?.textContent||item.textContent);
    let post=null;
    try{
      const target=new URL(link?.getAttribute('href')||'',location.origin),parts=target.pathname.split('/').filter(Boolean);
      const localArticle=target.origin===location.origin&&parts[0]==='article';
      const slug=decodeURIComponent(localArticle?parts[1]||'':parts.at(-1)||'');
      if(localArticle||['thepolitic.org','www.thepolitic.org'].includes(target.hostname))post=state.posts.find(candidate=>candidate.slug===slug)||null;
    }catch{}
    return {name,post,href:post?'/article/'+encodeURIComponent(post.slug)+'/':''};
  }).filter(winner=>winner.name);
  const honorableHeading=[...source.content.querySelectorAll('p,h2,h3')].find(el=>/^\s*honorable mentions\b/i.test(el.textContent.trim()));
  const honorableMentions=[...(honorableHeading?.nextElementSibling?.querySelectorAll('li')||[])].map(item=>strip(item.textContent)).filter(Boolean);
  const winnerCards=winners.map((winner,index)=>{
    const post=winner.post,title=post?.title||winner.name;
    const image=post?.featured_media?.url?'<a class="competition-winner-image" href="'+winner.href+'"><img src="'+esc(localMedia(post.featured_media.url))+'" alt="'+esc(post.featured_media.alt||title)+'" loading="lazy"></a>':'';
    const excerpt=post?.excerpt?'<p>'+esc(post.excerpt)+'</p>':'';
    return '<article><strong>'+String(index+1)+'</strong>'+image+'<div class="competition-winner-copy"><h3><a href="'+winner.href+'">'+esc(title)+'</a></h3><p class="competition-winner-name">'+esc(winner.name)+'</p>'+excerpt+'<a class="arrow-link" href="'+winner.href+'">Read article →</a></div></article>';
  }).join('');
  const deadlineHeading=[...source.content.querySelectorAll('h2')].find(h=>/dates and deadlines/i.test(h.textContent));
  const deadlineTable=deadlineHeading?.nextElementSibling?.outerHTML||'';
  const rules=[...source.content.querySelectorAll('details')];
  for(const rule of rules)for(const link of rule.querySelectorAll('a[href*="buy.stripe.com"]'))link.replaceWith(document.createTextNode(link.textContent||'online payment'));
  const finalistRows=competitionSemiFinalists.map(name=>'<tr><td>'+esc(name)+'</td><td>Semi-finalist</td></tr>').join('');
  const rulesMarkup=rules.map(rule=>'<details class="competition-rule">'+rule.innerHTML+'</details>').join('');
  const html='<div class="competition-page">'+
    '<section class="competition-hero"><div class="competition-hero-copy"><div class="eyebrow red">Opportunities</div><h1>The Politic High School Essay Competition</h1><p>The Politic’s first-ever high school competition invited students to report on issues in their local communities. The 2026 competition has concluded; explore the published results and the original competition information below.</p><a class="competition-contact" href="mailto:competition.yale.politic@gmail.com">Questions? Contact the competition team →</a></div><figure><img src="/assets/uploads/1587a849e1b49b0d0aee.webp" alt="Students gather on Yale’s campus" fetchpriority="high"></figure></section>'+
    '<section class="competition-section"><div class="competition-section-heading"><h2>2026 Winners</h2><span>Young perspectives. A more thoughtful tomorrow.</span></div><div class="competition-highlights">'+(winnerCards||'<p class="competition-note">The published results are available in the official results document.</p>')+'</div><p class="competition-result-link"><a class="arrow-link" href="'+esc(resultsUrl)+'" target="_blank" rel="noopener noreferrer">View the official results →</a></p></section>'+
    (honorableMentions.length?'<section class="competition-section competition-mentions"><div class="competition-section-heading"><h2>Honorable Mentions</h2><span>No ranking beyond the top three</span></div><ul class="competition-mention-list">'+honorableMentions.map(name=>'<li>'+esc(name)+'</li>').join('')+'</ul></section>':'')+
    '<section class="competition-section competition-finalists"><div class="competition-section-heading"><h2>Semi-finalists</h2><span>Recognized in the inaugural competition</span></div><p class="competition-note">The names below are reproduced from the published results. The official document also lists quarter-finalists.</p><div class="competition-table-wrap"><table class="competition-finalist-table"><thead><tr><th scope="col">Student</th><th scope="col">Recognition</th></tr></thead><tbody>'+finalistRows+'</tbody></table></div><a class="arrow-link" href="'+esc(resultsUrl)+'" target="_blank" rel="noopener noreferrer">See semi-finalists and quarter-finalists in the official results →</a></section>'+
    '<section class="competition-section"><div class="competition-section-heading"><h2>How It Worked</h2><span>Ideas today. Leaders tomorrow.</span></div><div class="competition-steps"><article><b>1</b><div><h3>Report</h3><p>Students submitted original, community-rooted investigative journalism, 800–1,200 words in length.</p></div></article><article><b>2</b><div><h3>Review</h3><p>The Politic’s editorial team reviewed submissions under the published eligibility, standards, and judging rules.</p></div></article><article><b>3</b><div><h3>Recognize</h3><p>The competition published its semi-finalist and quarter-finalist results. Judging decisions are final.</p></div></article></div></section>'+
    '<section class="competition-contact-block"><span>Interested in future competitions?</span><a class="button button-solid" href="mailto:competition.yale.politic@gmail.com">Contact the competition team →</a></section>'+
    '<section class="competition-section competition-terms"><div class="competition-section-heading"><h2>2026 Rules &amp; Information</h2><span>Original terms from the inaugural competition</span></div><details class="competition-rule"><summary>2026 dates and deadlines</summary>'+safeHtml(deadlineTable)+'</details>'+rulesMarkup+'</section>'+
    '<p class="competition-disclaimer">The Yale Politic is published by Yale College students. Yale University is not responsible for the contents of The Politic or this competition.</p></div>';
  return pageWrap('The Politic High School Essay Competition',html,'','The Politic’s inaugural high school essay competition: published 2026 results, semi-finalists, and original rules.');
}
function authorsPage() {
  const result=paginate(Object.values(state.authors).sort((a,b)=>a.name.localeCompare(b.name)),40);
  return pageWrap('Contributors',sectionHeader('Contributors','Explore reporting by every Politic contributor.')+'<div class="contributors-grid">'+result.rows.map(a=>'<a href="/author/'+encodeURIComponent(a.slug)+'/">'+esc(a.name)+'</a>').join('')+'</div>'+result.controls);
}
function alumniPage() {
  const query=(route.params.get('q')||'').trim();
  const field=alumniFields.some(([id])=>id===route.params.get('field'))?route.params.get('field'):'';
  const normalize=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const terms=normalize(query).split(/\s+/).filter(Boolean);
  const people=alumniDirectory.filter(person=>{
    const text=normalize([person.name,...(person.aliases||[]),person.bio,person.role,person.years].join(' '));
    return (!field||person.field===field)&&terms.every(term=>text.includes(term));
  }).sort((a,b)=>a.sortName.localeCompare(b.sortName));
  const options=alumniFields.map(([id,label])=>'<option value="'+id+'"'+(field===id?' selected':'')+'>'+esc(label)+'</option>').join('');
  const cards=people.map(person=>{
    const names=[person.name,...(person.aliases||[])];
    const author=Object.values(state.authors).find(a=>names.includes(a.name)&&state.posts.some(p=>p.author?.id===a.id));
    return '<article class="alumni-card"><div class="eyebrow">'+esc(alumniFields.find(([id])=>id===person.field)[1])+'</div><h3>'+esc(person.name)+'</h3><p class="alumni-bio">'+esc(person.bio)+'</p><dl class="alumni-connection"><div><dt>The Politic</dt><dd>'+esc(person.role)+'</dd></div><div><dt>Archive</dt><dd>'+esc(person.years)+'</dd></div></dl><div class="alumni-card-links"><a href="'+esc(person.source)+'" target="_blank" rel="noopener noreferrer" aria-label="Biography of '+esc(person.name)+' (opens in a new tab)">Biography <span aria-hidden="true">↗</span></a>'+(author?'<a href="/author/'+encodeURIComponent(author.slug)+'/">Articles in The Politic <span aria-hidden="true">→</span></a>':'')+'</div></article>';
  }).join('');
  return pageWrap('Alumni Directory','<section class="alumni-intro"><div><div class="eyebrow">Alumni directory</div><h1>Alumni &amp; Contributors</h1><p class="alumni-deck">A continuing conversation.</p></div><div class="alumni-intro-copy"><p>A selection of the editors, writers, and contributors who have shaped The Politic—and the conversations beyond its pages.</p><p>This directory includes former staff and guest contributors; not every person listed was a student alumnus. Archive dates refer to recorded issues, not graduation years or complete tenures.</p></div></section><form class="alumni-filters" data-alumni-filter role="search" aria-label="Search alumni directory"><label for="alumni-query">Search the directory<input id="alumni-query" type="search" name="q" value="'+esc(query)+'" placeholder="Name, work, or year"></label><label for="alumni-field">Field<select id="alumni-field" name="field"><option value="">All fields</option>'+options+'</select></label><button class="button button-solid" type="submit">Search directory</button>'+((query||field)?'<a class="alumni-clear" href="/alumni/">Clear filters</a>':'')+'</form><div class="alumni-directory-heading"><h2>Selected directory</h2><p role="status">'+people.length+' of '+alumniDirectory.length+' profiles · Alphabetical by surname</p></div>'+(people.length?'<div class="alumni-grid">'+cards+'</div>':'<div class="alumni-empty"><h3>No matching profiles</h3><p>Try a different name or field, or <a href="/alumni/">view the full selection</a>.</p></div>')+'<aside class="alumni-bottom"><div><h2>Explore the wider story</h2><p>This is a selected directory, not a complete list of everyone who has contributed to The Politic.</p></div><div><a href="/authors/">All contributors →</a><a href="/archive/">Read the archive →</a><a href="/team/">Meet the current team →</a></div></aside>');
}
function teamPage() {
  const leadershipNames=new Set(teamRows.flatMap(row=>row.names));
  const rows=[...teamRows.map(row=>({...row,people:row.names.map(name=>teamBios.find(p=>p.name===name))})),{id:'staff',title:'Editorial & Operations',people:teamBios.filter(p=>!leadershipNames.has(p.name))}];
  const personCard=(p,showPortrait)=>{
    const a=Object.values(state.authors).find(a=>a.name===p.name);
    const initials=p.name.split(/\s+/).filter(Boolean).map(part=>part[0]).slice(0,2).join('').toUpperCase();
    const portrait=p.image?'<img src="'+esc(p.image)+'" alt="'+esc(p.name)+'" loading="lazy">':showPortrait?'<div class="person-photo-placeholder" role="img" aria-label="No portrait supplied for '+esc(p.name)+'">'+esc(initials)+'</div>':'';
    return '<article class="team-bio-card">'+portrait+'<div class="eyebrow">'+esc(p.section)+'</div><h3>'+(a?'<a href="/author/'+encodeURIComponent(a.slug)+'/">'+esc(p.name)+'</a>':esc(p.name))+'</h3><p class="team-bio-role">'+esc(p.role)+'</p>'+(p.bio?'<p class="team-bio-copy">'+esc(p.bio)+'</p>':'')+'</article>';
  };
  return pageWrap('The People Behind The Politic',sectionHeader('The People Behind The Politic','A student newsroom. A stronger conversation.')+rows.map(row=>'<section class="team-roster-section" aria-labelledby="team-'+row.id+'-heading"><h2 class="team-row-heading" id="team-'+row.id+'-heading">'+esc(row.title)+'</h2><div class="team-bio-grid team-row-'+row.id+'">'+row.people.map(p=>personCard(p,row.id!=='managing')).join('')+'</div></section>').join('')+'<section class="subsection"><a class="button button-outline" href="/page/our-team/">Read the masthead →</a> <a class="button button-outline" href="/authors/">All contributors →</a> <a class="button button-outline" href="/alumni/">Alumni directory →</a></section>');
}
function archiveIssueCard(issue) {
  const cover=issueCovers[issue.id],titleId='issue-title-'+issue.id;
  const preview=cover?.url?'<img src="'+esc(cover.url)+'" alt="Front cover of '+esc(issue.title)+'" width="'+cover.width+'" height="'+cover.height+'" loading="lazy" decoding="async">':'<span class="image-unavailable">Cover preview unavailable</span>';
  return '<article class="issue-catalog-card"><a class="issue-catalog-link" href="/issue/'+esc(issue.id)+'/" aria-labelledby="'+esc(titleId)+'"><div class="issue-cover-preview">'+preview+'</div><h2 id="'+esc(titleId)+'">'+esc(issueDisplayName(issue))+'</h2></a><p>'+esc(issue.era)+(issue.pageCount?' · '+issue.pageCount+' pages':'')+'</p></article>';
}
function archive() {
  const year=route.params.get('year')||'',format=route.params.get('format')||'';
  const print=issueCatalog.filter(i=>i.pdf||issueEmbedUrl(i));
  const issues=print.filter(i=>(!year||i.era.includes(year))&&(!format||(format==='pdf'?i.pdf:!i.pdf&&issueEmbedUrl(i))));
  const collections=issueCatalog.filter(i=>!i.pdf&&!issueEmbedUrl(i)&&i.categorySlug&&(!year||i.era.includes(year)));
  const years=[...new Set(issueCatalog.flatMap(i=>i.era.match(/\d{4}/g)||[]))].sort().reverse();
  const filters='<form data-archive-filter class="filter-bar"><label>Year <select name="year"><option value="">All years</option>'+years.map(y=>'<option '+(y===year?'selected':'')+'>'+y+'</option>').join('')+'</select></label><label>Format <select name="format"><option value="">All print editions</option><option value="pdf" '+(format==='pdf'?'selected':'')+'>PDF editions</option><option value="issuu" '+(format==='issuu'?'selected':'')+'>Online reader</option></select></label><button class="button button-outline">Apply</button></form>';
  const sourceNote='<p>Browse print issues from The Politic’s archive. Select a cover to read the edition.</p>';
  const printGrid='<section class="subsection">'+sectionRule('Print Archive')+sourceNote+filters+'<p class="archive-result-count">'+issues.length+' print editions</p><div class="issue-catalog-grid issue-cover-grid">'+issues.map(archiveIssueCard).join('')+'</div>'+(!issues.length?'<p>No print editions match these filters.</p>':'')+'</section>';
  const articleGrid=!format&&collections.length?'<section class="subsection">'+sectionRule('Article Collections')+'<p>Explore articles published as part of these collections.</p><div class="issue-catalog-grid">'+collections.map(i=>'<article class="issue-catalog-card"><h2><a href="/issue/'+encodeURIComponent(i.id)+'/">'+esc(issueDisplayName(i))+'</a></h2></article>').join('')+'</div></section>':'';
  return pageWrap('History & Archive',sectionHeader('Since 1947','The Politic’s history, reporting, and print editions.')+'<div class="archive-intro"><p>A magazine of student opinion. Explore the publication’s history and its archive of student journalism.</p><a class="button button-outline" href="/page/our-history/">Read our history →</a> <a class="button button-outline" href="/search/">Search all articles →</a></div>'+printGrid+articleGrid,'ISSUES');
}
function issueEmbedUrl(issue) {
  if(!issue?.pdf&&issueCovers[issue?.id]?.status==='unavailable')return '';
  try{const u=new URL(issue.issuuEmbed||'');return u.protocol==='https:'&&u.hostname==='e.issuu.com'&&u.pathname==='/embed.html'&&['theyalepolitic','thepolitic'].includes(u.searchParams.get('u'))&&u.searchParams.get('d')?u.href:'';}catch{return '';}
}
function issuuFrameMarkup(issue) {
  const embed=issueEmbedUrl(issue);if(!embed)return '';
  return '<iframe class="issue-issuu-frame" title="'+esc(issue.title)+' — Issuu print reader" src="'+esc(embed)+'" loading="lazy" allow="fullscreen" allowfullscreen></iframe>';
}
function issuuReader(issue,optional=false) {
  const embed=issueEmbedUrl(issue);if(!embed)return '';
  const explanation=optional?'The publisher also offers this edition in a web reader.':'This digital edition is hosted by the publisher.';
  const action=optional?'<button class="button button-outline" data-load-issuu="'+esc(issue.id)+'">Open Issuu reader</button> ':'';
  const player=optional?'<div class="issuu-player-slot"></div>':issuuFrameMarkup(issue);
  return '<section class="issuu-fallback" aria-label="Digital edition"><h2>'+(optional?'Other reading option':'Read this edition')+'</h2><p>'+explanation+'</p><div class="issuu-reader-actions">'+action+'<a class="arrow-link" href="'+esc(issue.issuuSource)+'" target="_blank" rel="noopener">Open in a new tab ↗</a></div>'+player+'</section>';
}
function issuePage(id) {
  const issue=issueCatalog.find(i=>i.id===id||i.aliases?.includes(id));if(!issue)return notFound();
  const pdf=issue.pdf?localMedia(issue.pdf):'';
  const external=pdf&&new URL(pdf,location.href).origin!==location.origin;
  const collection=issue.categorySlug?'<p><a class="arrow-link" href="/section/'+esc(issue.categorySlug)+'/">Read this issue’s articles →</a></p>':'';
  const noScan=issue.categorySlug?'<div class="issue-reader-empty"><h2>Online articles are available for this issue.</h2><p>The digital scan is not available here yet. Browse stories from this collection instead.</p>'+collection+'</div>':'<div class="issue-reader-empty"><h2>This digital edition is not available online.</h2><p>We do not have a verified PDF or working Issuu reader for this edition yet.</p></div>';
  const reader=pdf?'<div class="reader-actions"><a class="button button-solid" href="'+esc(pdf)+'" target="_blank" rel="noopener">Open PDF / print ↗</a>'+(!external?'<a class="button button-outline" href="'+esc(pdf)+'" download>Download PDF</a>':'<p>Official Yale PDF'+(issue.sizeLabel?' · '+esc(issue.sizeLabel):'')+'. Yale may require opening its download in a separate tab.</p>')+'</div><div class="issue-reader-canvas"><div class="issue-pdf-reader" data-pdf-cover="'+(issue.record?2:1)+'" data-pdf-url="'+esc(pdf)+'"><p class="pdf-reader-loading" role="status">Loading the print edition…</p></div></div>'+issuuReader(issue,true):issueEmbedUrl(issue)?issuuReader(issue):noScan;
  return pageWrap(issueDisplayName(issue),'<div class="issue-reader-top"><div><div class="eyebrow">'+(pdf||issueEmbedUrl(issue)?'Print edition':'Article collection')+'</div><h1>'+esc(issueDisplayName(issue))+'</h1><p>'+esc(issue.era)+'</p></div><a class="button button-outline" href="/archive/">← Back to archive</a></div>'+reader+(pdf||issueEmbedUrl(issue)?collection:'')+'<p class="source-page-links">'+(issue.record?'<a href="'+esc(issue.record)+'" target="_blank" rel="noopener">View the Yale archive record ↗</a>':'')+'</p>','ISSUES');
}
function searchPage() {
  const q=route.value.trim().toLowerCase(),type=route.params.get('type')||'articles',section=route.params.get('section')||'',year=route.params.get('year')||'',tag=route.params.get('tag')||'';
  const words=q.split(/\s+/).filter(Boolean);
  const matches=text=>words.every(w=>text.toLowerCase().includes(w));
  const wordBodies=type==='articles'?words.map(bodyMatches):[];
  const articleMatches=p=>{const text=(p.title+' '+p.excerpt+' '+p.author.name+' '+p.categories.map(c=>c.name).join(' ')+' '+p.tags.map(t=>t.name).join(' ')).toLowerCase();return words.every((w,i)=>text.includes(w)||wordBodies[i]?.has(p.id));};
  let rows;
  if(type==='authors')rows=Object.values(state.authors).filter(a=>matches(a.name+' '+a.description)).map(a=>({title:a.name,url:'/author/'+encodeURIComponent(a.slug)+'/',description:a.description||''}));
  else if(type==='pages')rows=state.pages.filter(p=>matches(p.title+' '+strip(p.content))).map(p=>({title:p.title,url:'/page/'+encodeURIComponent(p.slug)+'/',description:p.excerpt}));
  else if(type==='issues')rows=issueCatalog.filter(i=>matches(issueDisplayName(i)+' '+i.era)).map(i=>({title:issueDisplayName(i),url:'/issue/'+i.id+'/',description:i.pdf?'Print edition':'Article collection'}));
  else rows=state.posts.filter(p=>(!year||p.date.startsWith(year))&&(!section||hasCategory(p,section))&&(!tag||p.tags.some(t=>t.slug===tag))&&articleMatches(p));
  const result=paginate(rows);
  const years=[...new Set(state.posts.map(p=>p.date.slice(0,4)))];
  const catOptions=Object.values(state.categories).filter(c=>c.count).sort((a,b)=>a.name.localeCompare(b.name));
  const tabs=['articles','authors','pages','issues'].map(t=>'<a class="'+(type===t?'active':'')+'" href="'+routeLink('search',route.value,t==='articles'?{type:t,year,section}:{type:t})+'">'+t+'</a>').join('');
  const filterForm=type==='articles'?'<form class="filter-bar" data-search-filters><label>Section<select name="section"><option value="">All sections</option>'+catOptions.map(c=>'<option value="'+esc(c.slug)+'"'+(section===c.slug?' selected':'')+'>'+esc(c.name)+'</option>').join('')+'</select></label><label>Year<select name="year"><option value="">All years</option>'+years.map(y=>'<option value="'+y+'"'+(year===y?' selected':'')+'>'+y+'</option>').join('')+'</select></label><button class="button button-outline">Apply filters</button><a href="'+routeLink('search',route.value)+'">Clear filters</a></form>':'';
  return pageWrap('Search The Politic',sectionHeader('Search The Politic','Search reporting, contributors, pages, and print issues.')+'<form class="search-box" data-search-form><input name="q" type="search" aria-label="Search The Politic" value="'+esc(route.value)+'" placeholder="Search the archive…"><button class="button button-solid">Search</button></form><nav class="search-tabs" aria-label="Result type">'+tabs+'</nav>'+filterForm+'<div class="result-count" role="status">'+rows.length+' results'+(q?' for “'+esc(route.value)+'”':'')+'</div>'+result.rows.map(p=>p.url?'<article class="directory-row"><h2><a href="'+p.url+'">'+esc(p.title)+'</a></h2><p>'+esc(p.description||'')+'</p></article>':listItem(p)).join('')+(!rows.length?'<div class="empty-state">No results. Try fewer words or clear the filters.</div>':'')+result.controls);
}
const readSaved=()=>{try{const value=JSON.parse(localStorage.getItem('politic-saved')||'[]');return Array.isArray(value)?value:[];}catch{return [];}};
function savedPage() {
  const ids=readSaved(),result=paginate(state.posts.filter(p=>ids.includes(p.id)));
  return pageWrap('Saved Articles',sectionHeader('Saved Articles','Saved in this browser only.')+(result.rows.length?result.rows.map(listItem).join(''):'<p>No saved articles yet. Use “Save article” while reading.</p>')+result.controls);
}
function joinPage() {
  return pageWrap('Join The Politic',sectionHeader('Join The Politic','Write. Edit. Report.')+'<div class="article-body"><p>Interested in contributing to The Politic? Contact the editorial team for current opportunities, meeting information, and submission guidelines.</p><p><a class="button button-solid" href="mailto:thepolitic@yale.edu?subject=Joining%20The%20Politic">Email thepolitic@yale.edu →</a></p><p><a href="/page/contact/">Contact and social accounts</a> · <a href="/competition/">High school competition</a></p></div>');
}
async function fetchJson(url) {
  if('DecompressionStream' in window){
    try{const packed=await fetch(url+'.gz',{cache:'no-cache'});if(packed.ok){if((packed.headers.get('content-encoding')||'').includes('gzip'))return await packed.json();return await new Response(packed.body.pipeThrough(new DecompressionStream('gzip'))).json();}}catch{/* Hosts without gzip assets use the ordinary JSON below. */}
  }
  const response=await fetch(url,{cache:'no-cache'});if(!response.ok)throw new Error('Could not load '+url+' ('+response.status+').');return response.json();
}
async function loadArticleChunk(slug) {
  const post=state.posts.find(p=>p.slug===slug);if(!post)return;
  const year=post.date.slice(0,4);
  if(!chunkPromises.has(year))chunkPromises.set(year,fetchJson('/data/articles/'+year+'.json').then(data=>Object.assign(state.articles,data)).catch(error=>{chunkPromises.delete(year);throw error;}));
  await chunkPromises.get(year);
}
function renderRoute() {
  const {name,value}=route;
  if(!name)return home();
  if(['article','interview'].includes(name))return value?articlePage(value):sectionPage('interviews');
  if(name==='opinion')return value?articlePage(value):sectionPage('opinion');
  if(name==='section')return sectionPage(value);
  if(name==='topic')return topicPage(value);
  if(['world','culture','us-politics','photojournalism'].includes(name))return sectionPage(name);
  if(name==='interviews')return sectionPage('interviews');
  if(name==='multimedia')return multimedia();
  if(['archive','issues','history'].includes(name))return archive();
  if(name==='issue')return issuePage(value);
  if(name==='author')return authorPage(value);
  if(name==='authors')return authorsPage();
  if(name==='alumni')return alumniPage();
  if(name==='team')return teamPage();
  if(name==='page')return pageContent(value);
  if(['competition','high-school-competition'].includes(name))return competitionPage();
  if(name==='search')return searchPage();
  if(name==='saved')return savedPage();
  if(name==='join')return joinPage();
  return notFound();
}
async function navigate() {
  const version=++routeVersion;
  renderedLocation=location.pathname+location.search;
  pdfCleanup();commentsCleanup();closeModal(false);
  try {
    route=parseRoute();
    if(['article','opinion','interview'].includes(route.name)&&route.value)await loadArticleChunk(route.value);
    if(route.name==='search'&&route.value&&(route.params.get('type')||'articles')==='articles'){
      app.setAttribute('aria-busy','true');await loadSearchShards(route.value);
    }
    if(route.name==='topic'&&topicDefinitions[route.value]){
      app.setAttribute('aria-busy','true');await loadSearchShards(topicDefinitions[route.value].terms.join(' '));
    }
    if(version!==routeVersion)return;
    app.innerHTML=renderRoute();app.removeAttribute('aria-busy');bind();
    const heading=app.querySelector('main h1');if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}
    if(route.anchor)requestAnimationFrame(()=>document.getElementById(route.anchor)?.scrollIntoView());
    else window.scrollTo(0,0);
  } catch(error) {
    if(version!==routeVersion)return;
    app.removeAttribute('aria-busy');
    app.innerHTML=shell('<div class="shell page empty-state"><h1>This page could not be loaded.</h1><p>Please try again. Your saved articles have not changed.</p><button class="button button-solid" data-retry>Retry</button> <a href="/">Return home</a></div>');
    app.querySelector('[data-retry]').addEventListener('click',navigate);console.error(error);
  }
}
function closeNavMenus(except) {
  document.querySelectorAll('[data-nav-item]').forEach(n=>{if(n!==except){n.classList.remove('open');n.querySelector('button')?.setAttribute('aria-expanded','false');const menu=n.querySelector('[data-nav-menu]');if(menu)menu.hidden=true;}});
}
function bindNavMenus() {
  document.querySelectorAll('[data-nav-item]').forEach(item=>{
    let timer;
    const toggle=item.querySelector('[data-nav-toggle]');
    const menu=item.querySelector('[data-nav-menu]');
    const set=open=>{clearTimeout(timer);if(open)closeNavMenus(item);item.classList.toggle('open',open);toggle?.setAttribute('aria-expanded',String(open));if(menu)menu.hidden=!open;};
    item.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')set(true);});
    item.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')timer=setTimeout(()=>set(false),120);});
    item.addEventListener('focusout',e=>{if(!item.contains(e.relatedTarget))set(false);});
    toggle?.addEventListener('click',()=>set(!item.classList.contains('open')));
    item.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{set(false);app.querySelector('.nav-links')?.classList.remove('open');app.querySelector('[data-menu]')?.setAttribute('aria-expanded','false');}));
    item.addEventListener('keydown',e=>{if(e.key==='Escape'){set(false);toggle?.focus();}if(e.key==='ArrowDown'){e.preventDefault();set(true);item.querySelector('[data-nav-menu] a')?.focus();}});
  });
}
function closeModal(restore=true) {if(!modalRoot.firstChild)return;modalRoot.innerHTML='';document.body.style.overflow='';if(restore)modalReturn?.focus();}
function openSearch() {
  modalReturn=document.activeElement;
  modalRoot.innerHTML='<div class="modal-backdrop"><div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="search-title"><button class="modal-close" aria-label="Close search">×</button><h2 id="search-title">Search The Politic</h2><form><label for="modal-query">Articles, authors, and ideas</label><input id="modal-query" name="q" type="search" required><button class="button button-solid">Search</button></form></div></div>';
  document.body.style.overflow='hidden';modalRoot.querySelector('input').focus();
  modalRoot.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const q=e.currentTarget.elements.q.value.trim();closeModal();go(routeLink('search',q));});
  modalRoot.querySelector('.modal-close').addEventListener('click',()=>closeModal());
  modalRoot.querySelector('.modal-backdrop').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal();});
  modalRoot.querySelector('[role=dialog]').addEventListener('keydown',e=>{
    if(e.key==='Escape')closeModal();
    if(e.key==='Tab'){const nodes=[...modalRoot.querySelectorAll('button,input')];const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
  });
}
async function mountPdfReader(node) {
  let disposed=false,reader;
  pdfCleanup=()=>{disposed=true;reader?.destroy();};
  try{
    const [pdfjs,book]=await Promise.all([import('/assets/pdfjs/pdf.min.mjs'),import('/magazine-reader.mjs?v=20260922-book')]);
    if(disposed)return;
    pdfjs.GlobalWorkerOptions.workerSrc='/assets/pdfjs/pdf.worker.min.mjs';
    reader=book.createMagazineReader(node,{pdfjs,coverPage:Number(node.dataset.pdfCover)||1});
    await reader.ready;
  }catch(error){
    if(!disposed){node.classList.add('pdf-reader-failed');node.innerHTML='<div class="issue-reader-empty"><h2>The reader could not load.</h2><p>Use “Open PDF / print” above to read the original PDF.</p></div>';}
  }
}
function loadIssuuReader(button) {
  const issue=issueCatalog.find(i=>i.id===button.dataset.loadIssuu),url=issue&&issueEmbedUrl(issue);
  if(!url)return;
  const slot=button.closest('.issuu-fallback')?.querySelector('.issuu-player-slot');if(!slot||slot.firstChild)return;
  const frame=document.createElement('iframe');frame.className='issue-issuu-frame';frame.title=issue.title+' — Issuu print reader';frame.src=url;
  frame.setAttribute('loading','lazy');frame.setAttribute('allow','fullscreen');frame.setAttribute('allowfullscreen','');
  slot.append(frame);button.disabled=true;button.textContent='Issuu reader loaded';
}
async function mountGuestComments(node) {
  let disposed=false,comments;
  commentsCleanup=()=>{disposed=true;comments?.destroy();};
  try {
    const module=await import('/comments.mjs?v=20260929-audit2');
    if(disposed)return;
    comments=module.mountComments(node);
  } catch(error) {
    if(!disposed)node.innerHTML='<h2 id="comments-heading">Join the conversation</h2><p>Comments could not load. Please refresh the page to try again.</p>';
  }
}
function bind() {
  bindNavMenus();
  app.querySelectorAll('[data-comments-post]').forEach(mountGuestComments);
  app.querySelectorAll('[data-search]').forEach(b=>b.addEventListener('click',openSearch));
  app.querySelectorAll('[data-join]').forEach(b=>b.addEventListener('click',()=>go('/join/')));
  const menu=app.querySelector('[data-menu]');menu?.setAttribute('aria-expanded','false');menu?.addEventListener('click',()=>{const links=app.querySelector('.nav-links');links.classList.toggle('open');const open=links.classList.contains('open');menu.setAttribute('aria-expanded',String(open));if(!open)closeNavMenus();});
  app.querySelector('[data-search-form]')?.addEventListener('submit',e=>{e.preventDefault();const params=Object.fromEntries(['type','year','section','text'].filter(k=>route.params.get(k)).map(k=>[k,route.params.get(k)]));go(routeLink('search',e.currentTarget.elements.q.value.trim(),params));});
  app.querySelector('[data-search-filters]')?.addEventListener('submit',e=>{e.preventDefault();const params=Object.fromEntries(new FormData(e.currentTarget));params.type='articles';go(routeLink('search',route.value,params));});
  app.querySelector('[data-archive-filter]')?.addEventListener('submit',e=>{e.preventDefault();go(routeLink('archive','',Object.fromEntries(new FormData(e.currentTarget))));});
  app.querySelector('[data-alumni-filter]')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;go(routeLink('alumni','',{q:form.elements.q.value.trim(),field:form.elements.field.value}));});
  app.querySelector('[data-copy]')?.addEventListener('click',async e=>{const url=location.origin+'/article/'+encodeURIComponent(route.value)+'/';try{await navigator.clipboard.writeText(url);e.target.textContent='Link copied';}catch{const status=app.querySelector('.share-status');status.textContent='Copy this address: '+url;}});
  app.querySelector('[data-save]')?.addEventListener('click',e=>{const id=Number(e.target.dataset.save);const list=readSaved();const saved=!list.includes(id);try{localStorage.setItem('politic-saved',JSON.stringify(saved?[...list,id]:list.filter(n=>n!==id)));e.target.textContent=saved?'Saved':'Save article';e.target.setAttribute('aria-pressed',String(saved));}catch{app.querySelector('.share-status').textContent='Saving is unavailable in this browser.';}});
  app.querySelectorAll('img').forEach(img=>{img.addEventListener('error',()=>{const note=document.createElement('span');note.className='image-unavailable';note.textContent='Image unavailable';img.replaceWith(note);},{once:true});});
  app.querySelectorAll('[data-pdf-url]').forEach(mountPdfReader);
  app.querySelectorAll('[data-load-issuu]').forEach(button=>button.addEventListener('click',()=>loadIssuuReader(button)));
  app.querySelector('[data-skip]')?.addEventListener('click',e=>{e.preventDefault();app.querySelector('main')?.focus();});
}
// Same-site page links render in place; files (PDFs, images, moderate.php) and the API load normally.
const isAppPath=pathname=>!/^\/(?:api|assets|data)\//.test(pathname)&&!/\.[a-z0-9]{2,5}$/i.test(pathname);
app.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');
  if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target||link.hasAttribute('download'))return;
  let url;try{url=new URL(link.href,location.href);}catch{return;}
  if(url.origin!==location.origin||!isAppPath(url.pathname))return;
  // An in-page anchor on the current page scrolls without re-rendering.
  if(url.pathname===location.pathname&&url.search===location.search&&url.hash&&!url.hash.startsWith('#/'))return;
  event.preventDefault();go(url.pathname+url.search+url.hash);
});
let renderedLocation='';
function locationChanged() {
  if(location.hash.startsWith('#/')){history.replaceState({},'',legacyHashPath(location.hash));navigate();return;}
  if(location.pathname+location.search===renderedLocation){
    if(location.hash.length>1)document.getElementById(decodedSlug(location.hash.slice(1)))?.scrollIntoView();
    return;
  }
  navigate();
}
document.addEventListener('pointerdown',e=>{if(!e.target.closest('[data-nav-item]'))closeNavMenus();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeNavMenus();const menu=app.querySelector('[data-menu]');app.querySelector('.nav-links')?.classList.remove('open');menu?.setAttribute('aria-expanded','false');}});
// The published index stores each category, tag, and author once; posts refer to them by id.
// Keep in step with hydrateIndex() in scripts/site-index-format.mjs.
function hydrateIndex(index) {
  if(index.format!==2)return index;
  for(const post of index.posts){
    post.author=index.authors[post.author]||{id:post.author,name:'The Politic'};
    post.categories=post.categories.map(id=>index.categories[id]).filter(Boolean);
    post.tags=post.tags.map(id=>index.tags[id]).filter(Boolean);
    post.link='https://thepolitic.org/'+post.slug+'/';
  }
  delete index.format;
  return index;
}
async function init() {
  try {
    const [index,media,issues,covers]=await Promise.all([fetchJson('/data/site-index.json'),fetchJson('/data/media-map.json'),fetchJson('/data/issues.json'),fetchJson('/data/issue-covers.json').catch(()=>({}))]);
    const data=hydrateIndex(index);
    state={...data,articles:{},categoryIds:Object.fromEntries(Object.values(data.categories).map(c=>[c.slug,c.id]))};manifest=media;issueCatalog=issues;issueCovers=covers;
    // Bookmarks and shared links from the earlier #/ version open at their permanent address.
    if(location.hash.startsWith('#/'))history.replaceState({},'',legacyHashPath(location.hash));
    window.addEventListener('popstate',locationChanged);window.addEventListener('hashchange',locationChanged);
    await navigate();
  }catch(error){app.innerHTML='<div class="shell page"><h1>The site could not load its content.</h1><p>Please refresh to try again.</p><button onclick="location.reload()">Retry</button></div>';console.error(error);}
}
init();
