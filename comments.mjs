export function mountComments(root) {
  root.innerHTML = '<h2 id="comments-heading">Comments</h2><p class="comments-note">Comments are paused on this GitHub Pages preview.</p>';
  return {destroy() {}};
}
