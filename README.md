# Kanban – Task Management Made Simple

A sleek, responsive Kanban board built with **Tailwind CSS** and semantic HTML. This is a challenge project aimed at progressing from a static UI to a fully interactive task management app using JavaScript.

## 📸 Screenshots

![Figma Design for Challenge 1-3](<assets/Figma Design.png>)


This project involves developing a **visually accurate and fully responsive Kanban board** that aligns with the provided **Figma design**. The board should be structured into multiple columns and include task cards, a static side panel, and a well-defined theme to ensure a **professional and polished user experience.**

<br/>

### JSL01 Challenge Key Objectives:

- [x] Implement a **favicon and page title** that match the application’s theme for a professional look.
- [x] Create a **Kanban board with multiple columns** (e.g., "To Do", "In Progress", "Done") that **exactly replicates** the Figma design layout.
- [x] Ensure the **board’s layout, colours, typography, and spacing** strictly follow the Figma specifications for visual consistency.
- [x] Develop a **fully responsive** board that adapts seamlessly to **both laptops and mobile devices**, mirroring the Figma design’s responsive behavior.
- [x] Display **tasks as individual cards** within their respective columns, ensuring their design (borders, shadows, padding) follows the Figma guidelines for clarity and appeal.
- [x] Include **titles on all task cards** to provide clear task descriptions.
- [x] Implement a **static side panel (in desktop view)** with the correct **icons, text, and branding elements** as per the Figma layout for a structured and professional appearance.

<br/>

### JSL02 Challenge Key Objectives:

#### Logic & User Interaction

- [x] Ensure the JavaScript file is correctly linked to the HTML document.
- [x] Prompt the user to enter details (title, description, status) for two separate tasks and store them in variables.
- [ ] Convert all status inputs to lowercase automatically for consistency.
- [ ] Validate the status input to allow only "todo", "doing", or "done" and repeatedly prompt the user until a valid status is entered.
- [ ] Display the title and status of completed tasks (status: "done") in the console.
- [ ] If no tasks are marked as "done", show a motivational message in the console: "No tasks completed, let's get to work!".

#### Code Quality & Maintainability

- [ ] Use descriptive variable names to enhance readability and maintainability.
- [ ] Include clear comments explaining complex logic and functionality for easier understanding.

<br/>

### Setup Instructions

To run the project locally:

1. Clone the repository
```
git clone https://github.com/YARSTR25495_FTO2505-B_Yarlin-Struis_JSL01.git
```
2. Install dependencies
```
yarlinlynn@Yarlins-MacBook-Air YARSTR25495_FTO2505-B_Yarlin-Struis_JSL01 % npm list tailwindcss
YARSTR25495_FTO2505-B_Yarlin-Struis_JSL01@ /Users/yarlinlynn/Downloads/YARSTR25495_FTO2505-B_Yarlin-Struis_JSL01
└── (empty)

yarlinlynn@Yarlins-MacBook-Air YARSTR25495_FTO2505-B_Yarlin-Struis_JSL01 % npm install -D tailwindcss
```
3. Watch Tailwind for changes
```
npm run watch
```

<br/>

###  File structure
```
├── index.html                     ← Main HTML entry point
├── README.md                      ← Project documentation
├── tailwind.config.js             ← Tailwind CSS config
├── dist/
│   └── style.css                  ← Compiled CSS output (from Tailwind)
├── src/
│   ├── styles/
│   │   └── input.css              ← Tailwind directives (@tailwind base, etc.)
│   └── js/
│       └── script.js              ← JavaScript logic for interactivity
├── assets/
│   └── js/
│       └── script.js
```

<br/>

### License
This project is for educational use only.

<br/>

### Credits
Design provided by **CodeSpace** via Figma; [https://www.figma.com/design/y7bFCUYL5ZHfPeojACBXg2/Challenge-1-%7C-JSL?node-id=0-1&t=yngAIXXKnJfH7Jj3-1](https://www.figma.com/design/y7bFCUYL5ZHfPeojACBXg2/Challenges-%7C-JSL?node-id=6033-10647&t=8uFG8HuyuOHVKluu-0)