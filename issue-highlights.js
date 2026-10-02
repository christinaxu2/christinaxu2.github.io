// The main (print) articles of each issue, in the order they should appear.
//
// These lead the issue's page, its article list, and "In this issue" on the home page.
// Everything else in the issue follows in the usual newest-first order.
//
// HOW TO UPDATE (no coding needed):
//   1. Find the issue below, or add a new line for it. The name on the left is the last part
//      of the issue's address: for https://…/section/2025-2026-issue-iv/ it is "2025-2026-issue-iv".
//   2. Between the [ ] brackets, paste the link to each main article, in order. Put each link in
//      "quotes" and end the line with a comma. Links from this site or from thepolitic.org both work.
//   3. Save (on GitHub: "Commit changes"). The site updates a few minutes after the change is merged.
//
// To list an issue's articles with their links, run:  npm run issue:articles -- 2025-2026-issue-iv
// `npm test` checks that every link here is a real article in that issue (at most 6 per issue).
//
// Example:
//   "2025-2026-issue-iv": [
//     "https://thepolitic.org/dashing-for-dollars-how-the-gig-economy-leaves-workers-paying-the-price/",
//     "https://thepolitic.org/another-main-article/",
//   ],
const issueMainArticles = {
  "2025-2026-issue-iv": [
  ],
  "2025-2026-issue-iii": [
  ],
  "2025-2026-issue-ii": [
  ],
  "2025-2026-issue-i": [
  ],
};
