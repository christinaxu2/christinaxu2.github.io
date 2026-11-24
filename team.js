const teamBios = [
  {
    "name": "Hanna Klingbeil Canale",
    "role": "Editor-in-Chief",
    "section": "EDITORIAL",
    "bio": "Hanna Klingbeil Canale is a junior studying Ethics, Politics, and Economics with a Certificate in Global Health Studies. Hanna joined The Politic as a staff writer, served as Multimedia Manager, and is currently the Editor-in-Chief. Her writing and interviews focus on Latin American politics, conflict reporting, and local stories with a photojournalism focus.",
    "image": "/assets/team/hanna-klingbeil-canale.webp"
  },
  {
    "name": "Brandon Gerosa",
    "role": "Senior Managing Editor",
    "section": "EDITORIAL",
    "bio": "",
    "image": ""
  },
  {
    "name": "Sheena Bakare",
    "role": "Managing Editor",
    "section": "EDITORIAL",
    "bio": "",
    "image": ""
  },
  {
    "name": "Kushan Mahesh",
    "role": "Managing Editor",
    "section": "EDITORIAL",
    "bio": "",
    "image": ""
  },
  {
    "name": "Suren Clark",
    "role": "Publisher",
    "section": "PUBLISHING",
    "bio": "",
    "image": ""
  },
  {
    "name": "William Shiu",
    "role": "Director of Business · Associate Editor",
    "section": "BUSINESS & EDITORIAL",
    "bio": "William is a Business Director, Associate Editor, and Staff Writer of The Politic. He is a sophomore from Brooklyn interested in understanding how political culture and historical memory shape the ambitions of modern states. His past investigations focus on Sino-U.S. relations and what the rivalry means for the daily lives of people in both countries.",
    "image": "/assets/team/william-shiu.webp"
  },
  {
    "name": "Eleanor Belinfanti",
    "role": "Communications Director",
    "section": "COMMUNICATIONS",
    "bio": "Eleanor Belinfanti is the Communications Director of The Yale Politic. She is from Brooklyn, NY, and her reporting focuses on US politics and culture.",
    "image": ""
  },
  {
    "name": "Kellin Henry",
    "role": "Communications Team Member · Associate Editor",
    "section": "COMMUNICATIONS",
    "bio": "Kellin Henry is a Communications Team Member and Associate Editor at The Yale Politic. A Washington State native, he reports on international politics with historical context, especially how citizens of smaller states have been shaped by traditional centers of power.",
    "image": "/assets/team/kellin-henry.webp"
  },
  {
    "name": "Rory Schoenberger",
    "role": "Multimedia Managing Director",
    "section": "MULTIMEDIA",
    "bio": "Rory Schoenberger is the Multimedia Managing Director of The Politic. She is from Brooklyn, New York. Her reporting, photojournalism, and interviews focus on political polarization, the relationship between arts and political activism, and graffiti.",
    "image": "/assets/team/rory-schoenberger.webp"
  },
  {
    "name": "Pola Jancewicz",
    "role": "Editor-in-Chief",
    "section": "EDITORIAL",
    "bio": "Pola Jancewicz is the Editor-in-Chief of The Yale Politic. Her reporting and interviews focus on international conflict, European affairs, and the changing world order. She proudly calls Warsaw, Poland, home.",
    "image": "/assets/team/pola-jancewicz.webp"
  },
  {
    "name": "Mattie Epstein",
    "role": "Associate Editor · Staff Writer · Multimedia Deputy",
    "section": "EDITORIAL & MULTIMEDIA",
    "bio": "Mattie Epstein is an Associate Editor, Staff Writer, and Multimedia Deputy of The Yale Politic. She is a Global Affairs major from Los Angeles, CA, who reports on political accountability and gender disparity. She has freelanced for Slate, The Bulwark, and Washingtonian and works directly under former CNN chief White House correspondent Jessica Yellin as an intern with New Not Noise.",
    "image": "/assets/team/mattie-epstein.webp"
  },
  {
    "name": "Christina Xu",
    "role": "Tech Director",
    "section": "TECHNOLOGY",
    "bio": "Christina is a Tech Director for The Politic. She is a junior from Nebraska studying Computer Science and Economics.",
    "image": "/assets/team/christina-xu.webp"
  }
];

// Keep editorial hierarchy separate from the order in which bios are received.
const teamRows = [
  {id: 'editors', title: 'Editors-in-Chief', names: ['Pola Jancewicz', 'Hanna Klingbeil Canale']},
  {id: 'managing', title: 'Managing Board', names: ['Brandon Gerosa', 'Sheena Bakare', 'Kushan Mahesh', 'Suren Clark']}
];

// Mastheads, newest first, as supplied by the editors (November 2026). The first one is shown at
// /masthead/; each year also has its own page (/masthead/2025-2026/). Write "(Lead)" after a name
// to show a note. Names that match a contributor's author page link to it automatically.
const mastheads = [
  {year: "2026-2027", roles: [
    ["Editors-in-Chief", ["Pola Jancewicz", "Hanna Klingbeil Canale"]],
    ["Senior Managing Editor", ["Brandon Gerosa"]],
    ["Managing Editors", ["Sheena Bakare", "Kushan Mahesh"]],
    ["Multimedia Managing Editor", ["Mattie Epstein"]],
    ["Publisher", ["Suren Clark"]],
    ["Associate Editors", ["Nyera Ali", "Natalia Armas Perez", "Eleanor Belinfanti", "Ben Szovati Coulter", "Logan Day-Richter", "Lucy Dreier", "David Dumontet", "Chantal Eulenstein", "Beatrice Formenton", "Kellin Henry", "Elaine Liu", "Nicole Manning", "Katerina Matta", "Natalie Miller", "Lily Scheckner", "Baala Shakya", "William Shiu", "Conor Webb", "Aubrie Williams"]],
    ["Creative Director", ["Katerina Matta"]],
    ["Multimedia Director", ["Rory Schoenberger"]],
    ["Creative Team", ["Mattie Epstein"]],
    ["Communications Team", ["Eleanor Belinfanti (Lead)", "Kellin Henry", "Isa Nascimento"]],
    ["Business Team", ["William Shiu (Lead)", "Taia Menefee", "Eve Youkana"]],
    ["Tech Director", ["Christina Xu"]],
    ["Staff Writers", ["Eleanor Belinfanti", "Rodrigo Cáceres Alburquerque", "Lena Cassidy", "Lily Scheckner", "Vlad Yatskiv"]],
    ["Contributing Writers", ["Jana Abualhuda", "Melissa Adamantidi", "Braelyn Bouton", "Floris Brocklebank", "Kai Bwor", "Nausicaa Chu", "David Dumontet", "Sahil Gupta", "Stanley Huang", "YeonJae Kim", "Rachel Kreth", "Jason Lee", "Marina Papalexopoulos", "Diana Razumova", "Mira Schulman", "Alice Sgibnev", "Lauren Sonnenfeld", "Kayla Swogger", "Jolynda Wang", "Zoe Zhang", "Anping Zhu"]],
    ["Political Cartoonist", ["Zach Granne"]]
  ]},
  {year: "2025-2026", roles: [
    ["Editors-in-Chief", ["Eliza Daunt", "Nicole Chen"]],
    ["Managing Editors", ["Hanna Klingbeil Canale", "Rory Schoenberger"]],
    ["Publisher", ["Suren Clark"]],
    ["Creative Directors", ["Ainslee Garcia", "Katerina Matta"]],
    ["Design Editors", ["Sarah Feng", "Ainslee Garcia", "Ruth Gulilat", "Jun Hung", "Katerina Matta", "Issy Po", "Rory Schoenberger", "Ajay Singreddy", "Nour Tantush"]],
    ["Technology Director", ["Dylan Bober"]],
    ["External Affairs Director", ["Conor Webb"]],
    ["Communications Director", ["Abyssinia Haile"]],
    ["Business Director", ["Sheena Bakare"]],
    ["Associate Editors", ["Natalia Armas Perez", "Sheena Bakare", "Phoenix Boggs", "Ben Szovati Coulter", "Logan Day-Richter", "Lucy Dreier", "Mira Dubler-Furman", "Emi Glass", "Pola Jancewicz", "Jaeha Jang", "Nicole Manning", "Natalie Miller", "Theo Sotoodehnia", "Conor Webb", "Aubrie Williams", "Kiran Yeh"]],
    ["Contributing Editors", ["Aarushi Dedhiya", "Mattie Epstein", "Beatrice Formenton"]],
    ["Staff Writers", ["Sheena Bakare", "Eleanor Belinfanti", "Brandon Gerosa", "Sarah Jacobs", "Pola Jancewicz", "Kushan Mahesh", "Lucy Dreier", "Baala Shakya"]],
    ["Contributing Writers", ["Hallie Black", "Rodrigo Cáceres Alburquerque", "Avni Kaur Chadha", "Julia Clauson", "Gagnado Diedhiou", "Kika Dunayevich", "Chantal de Macedo Eulenstein", "Kellin Henry", "Caitlin LaFerney", "Katerina Matta", "Taia Menefee", "Isa Nascimento Silva Pinto", "Vivian Quint", "Natalia Ramos", "Lily Scheckner", "William Shiu"]]
  ]},
  {year: "2024-2025", roles: [
    ["Editors-in-Chief", ["Samantha Moon", "Theo Sotoodehnia"]],
    ["Print Managing Editors", ["Alexia Dochnal", "Sovy Pham"]],
    ["Online Managing Editors", ["Grey Battle", "Phoenix Boggs"]],
    ["Multimedia Managing Editor", ["Eliza Daunt"]],
    ["Publisher", ["Owen Haywood"]],
    ["Associate Editors", ["Adnan Bseisu", "Nicole Chen", "Mira Dubler-Furman", "Sarah Jacobs", "Nicole Manning", "Alex McDonald", "Natalie Miller", "Rory Schoenberger", "Vittal Sivakumar", "Rebecca Wasserman"]],
    ["Staff Writers", ["Natalia Armas Perez", "Sheena Bakare", "Adnan Bseisu", "Nicole Chen", "Eliza Daunt", "Logan Day-Richter", "Lucy Dreier", "Emi Glass", "Aby Haile", "Jaeha Jang", "Hanna Klingbeil", "Nicole Manning", "Alex McDonald", "Natalie Miller", "Lily Belle Poling", "Karla Ramirez Gonzalez", "Conor Webb", "Aubrie Williams", "Kiran Yeh", "Pola Jancewicz"]],
    ["Contributing Writers", ["Lena Cassidy", "Sophia Liu", "Alessandra Pappalardi", "Yegor Rubanov", "Ben Szovati Coulter", "Victoria Vilton"]],
    ["Creative Director", ["Ainslee Garcia"]],
    ["Design Editors", ["Carter Cashen", "Penelope Day", "Alexa Druyanoff", "Malik Figaro", "Grace Randall", "Zack Reich", "Katie Shin", "Ajay Singreddy"]],
    ["Technology Director", ["Dylan Bober"]],
    ["Website Director", ["Andrew Alam-Nist"]],
    ["Communications Director", ["Mira Dubler-Furman"]],
    ["Business Director", ["Lauren Kim"]],
    ["Business Team", ["Alex McDonald"]]
  ]}
];
// Masthead names that differ from the name on the person's author page (nicknames, shortened names).
const mastheadAuthorLinks = {
  'Aby Haile': 'abyssiniahaile',
  'Avni Kaur Chadha': 'avni-chadha',
  'Chantal Eulenstein': 'chantal-de-macedo-eulenstein',
  'Hanna Klingbeil': 'hanna-klingbeil-canale',
  'Vlad Yatskiv': 'vladyat'
};
