# Kanban – Task Management Made Simple

A **modern task management web application** built with **JavaScript** and **Tailwind CSS**. The app allows users to create, organize, and prioritize tasks with an intuitive interface and dark/light theme support.  

This project was developed as part of my **JavaScript bootcamp journey**, showcasing the concepts and skills I’ve learned along the way. It reflects my growth in building interactive applications, handling data persistence, and creating user-friendly interfaces.  

## 📸 Screenshots

![Figma Design for Challenge 5](<assets/design /JSL05 challenge.png>)

<br/>

### Video Presentation

<br/>

### Features  

#### Task Management  
- Create new tasks via a dynamic modal form.  
- Each task includes:  
  - Title  
  - Description  
  - Status (Todo, In Progress, Done)  
  - Priority (High, Medium, Low)  
- Tasks are automatically sorted by priority for better organization.  
- Validation ensures a task cannot be created without a title.  

#### User Interface  
- Fully styled using **Tailwind CSS** for a responsive, clean, and modern look.  
- Dark and light mode with smooth toggle functionality:  
  - Syncs theme preference across both desktop and mobile toggles.  
  - User’s theme choice is saved to **localStorage** and persists on reload.  
- Mobile-friendly navigation:  
  - Slide-out mobile menu with backdrop overlay.  
  - Includes theme toggle, close button, and board listing.  

#### Sidebar Management  
- Show/hide sidebar functionality for distraction-free task focus.  
- Sidebar state is toggleable with smooth button interaction.  

#### Data Persistence  
- Tasks are saved in **localStorage** so data persists across page reloads.  
- Newly created tasks are automatically stored and re-rendered into the DOM. 

<br/>

### 🛠️ Technologies Used  

- **JavaScript (ES6+)**: Handles app logic, DOM manipulation, modals, and data persistence.  
- **Tailwind CSS**: Provides utility-first styling for responsiveness and modern design.  
- **HTML5**: Semantic structure for accessibility and maintainability.  
- **LocalStorage API**: Stores tasks and theme preference persistently. 

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

#### Key Highlights

- Clean, accessible UI with responsive design.
- Custom modal components for navigation and task creation.
- JSDoc-style documentation for all major functions to improve maintainability.
- Designed for scalability, enabling easy addition of new features like boards or subtasks in the future.

<br/>

#### Learning Outcomes

- This project demonstrates:
  - Applying modular JavaScript and DOM manipulation for interactive UIs.
  - Implementing dark/light theme toggling with persistent state.
  - Using Tailwind CSS to rapidly build responsive layouts.
  - Ensuring good coding practices with inline validation and error handling.
  - Documenting code professionally with JSDoc and writing structured project documentation.

#### License
This project is for educational use only.

<br/>

#### Credits
Design provided by **CodeSpace** via [Figma Reference File](https://www.figma.com/design/y7bFCUYL5ZHfPeojACBXg2/Challenges-%7C-JSL?node-id=6033-11092&t=XbQhBWPYxXDAqp3x-1)