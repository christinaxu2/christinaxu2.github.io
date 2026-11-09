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
  "2026-2027-issue-i": [
    "https://thepolitic.org/a-razor-thin-path-the-cockroach-janta-partys-digital-war-for-indian-democracy/",
    "https://thepolitic.org/ai-remember-whos-in-control/",
    "https://thepolitic.org/hey-lets-build-your-best-baby/",
    "https://thepolitic.org/moscow-is-betting-nato-will-hesitate-ambiguity-is-its-weapon/",
    "https://thepolitic.org/we-want-to-see-change-seven-yale-students-on-the-issues-driving-their-midterm-votes/",
  ],
  "2025-2026-issue-iv": [
  ],
  "2025-2026-issue-iii": [
  ],
  "2025-2026-issue-ii": [
  ],
  "2025-2026-issue-i": [
  ],
};

// The home page's main (Featured) story rotates: each visit shows one of these at random.
// Add or remove article links to change the selection. Stories without a photo are skipped.
const homeFeaturedRotation = [
  "https://thepolitic.org/article/a-razor-thin-path-the-cockroach-janta-partys-digital-war-for-indian-democracy/",
  "https://thepolitic.org/article/ai-remember-whos-in-control/",
  "https://thepolitic.org/article/hey-lets-build-your-best-baby/",
  "https://thepolitic.org/article/moscow-is-betting-nato-will-hesitate-ambiguity-is-its-weapon/",
  "https://thepolitic.org/article/wheres-my-opportunity-americans-search-for-upward-mobility-in-2026/",
  "https://thepolitic.org/article/navigating-crises-behind-the-scenes-an-interview-with-janah-ncube/",
  "https://thepolitic.org/article/the-woman-behind-the-pink-sari-a-conversation-with-sampat-pal-devi/",
  "https://thepolitic.org/article/she-never-came-home-russias-abduction-of-ukrainian-children/",
  "https://thepolitic.org/article/between-settlement-and-emergency-the-post-2022-ukrainian-diaspora/",
  "https://thepolitic.org/article/grokaideepfakes/",
  "https://thepolitic.org/article/we-want-to-see-change-seven-yale-students-on-the-issues-driving-their-midterm-votes/",
  "https://thepolitic.org/article/a-small-alabama-county-is-betting-on-a-33-billion-data-center-residents-fear-the-cost/",
  "https://thepolitic.org/article/death-by-a-thousand-cuts-in-the-ai-revolution/",
  "https://thepolitic.org/article/when-rebels-govern-the-case-for-m23s-statebuilding-project/",
  "https://thepolitic.org/article/la-sangre-de-los-angeles-testimony-of-ms-13-and-transnational-gang-violence-from-el-salvador-to-los-angeles/",
  "https://thepolitic.org/article/when-the-world-walks-away-sudan-and-the-failures-of-global-leadership/",
  "https://thepolitic.org/article/operations-that-start-in-the-market-surgical-survival-in-sub-saharan-africa/",
  "https://thepolitic.org/article/learning-to-fly-in-temascaltepec-how-free-flight-transformed-a-community/",
  "https://thepolitic.org/article/after-assad-framing-syrias-next-chapter/",
];
