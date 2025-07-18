
// JSL02 CHALLENGE:
// get user information from a prompt() (title, description, status)
// make sure the status in lower case
// then assign that info to a variable
// from that info use conditional logic to check both task title and task status
// both should be true for code to run
// status has 3 possible outcomes: todo , in progress , done
// depending on which status different code will run
// todo: print No tasks completed, let's get to work! to the console
// in progress and done: print title and status to console
// if both title and status is empty alert; Invalid status. Please enter 'todo', 'in progress' or 'done'. until a condition is met



// Prompt the user to enter details (title, description, status) for two separate tasks and store them in variables.
// Convert all status inputs to lowercase automatically for consistency.
// Validate the status input to allow only "todo", "doing", or "done" and repeatedly prompt the user until a valid status is entered.

// TASK 1:
let taskOneTitle = prompt('Enter task 1 title:');
let taskOneDescripttion = prompt('Enter your task 1 description:');
let taskOneStatus = prompt('Enter your task 1 status:').toLowerCase();
while(!taskOneStatus === 'todo' && !taskOneStatus === 'in progress' && !taskOneStatus === 'done') {
  alert(`Invalid status. Please enter 'todo', 'in progress' or 'done'.`);
  taskOneStatus = prompt('Enter your task 1 status:').toLowerCase();
}

console.log(` Title: ${taskOneTitle}, Description: ${taskOneDescripttion}, Status: ${taskOneStatus}`);

// TASK 2:
let taskTwoTitle = prompt('Enter task 2 title:');
let taskTwoDescripttion = prompt('Enter your task 2 description:');
let taskTwoStatus = prompt('Enter your task 2 status:').toLowerCase();
while(!taskTwoStatus === 'todo' && !taskTwoStatus === 'in progress' && !taskTwoStatus === 'done') {
  alert(`Invalid status. Please enter 'todo', 'in progress' or 'done'.`);
  taskTwoStatus = prompt('Enter your task 2 status:').toLowerCase();
}

console.log(` Title: ${taskTwoTitle}, Description: ${taskTwoDescripttion}, Status: ${taskTwoStatus}`);

// Display the title and status of completed tasks (status: "done") in the console.
// If no tasks are marked as "done", show a motivational message in the console: "No tasks completed, let's get to work!".






// JSL03 CHALLENGE:

// Store tasks as objects inside an array
// Users hsould be able to add up to 3 new task to exisiting array
// Each task should have an unique ID

/* 
const tasks = [
  {
    title: '',
    description: '',
    status: '',
    id: 'taskOne',
  },
  {

  }
]
*/ 

// then use task.push to push new tasks entered by user via prompts to the existing array

// Users will enter task details(title, description, status) via prompts stroing them in an object
// Alert users when they reach the task limit with the message: "There are enough tasks on your board, please check them in the console."
// Implement a filter function to display only completed tasks (status; done)

function completedTasks() {}

// Log all tasks in the console with a clear label for easy review.
// Log only completed tasks (status: "done") in the console under a "Completed Tasks" label for quick reference.