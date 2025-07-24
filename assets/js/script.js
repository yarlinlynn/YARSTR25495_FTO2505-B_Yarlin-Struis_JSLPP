// JSL03 Challenge:
// Store tasks as objects inside an array for structured data management.
// Allow users to add up to three new tasks to the existing task list.
// Ensure each new task has a unique incremental ID based on the last task in the array.
// Prompt users to enter task details (title, description, status) and store them in an object.
// Alert users when they reach the task limit with the message: "There are enough tasks on your board, please check them in the console." Implement a filter function to display only tasks with the status "done".
// Log all tasks in the console with a clear label for easy review.
// Log only completed tasks (status: "done") in the console under a "Completed Tasks" label for quick reference.

// create an empty array to store objects
// hard code 3 task into your array
const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript",
    description: "Get comfortable with the fundamentals",
    status: "in progress",
  },
  {
    id: 3,
    title: "Contribute to Open Source Projects",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
];
// create a function that asks for user task title, description and status, use id in function parameters
function TaskDetails(id) {

  // calculate the id of task entered by user and have it start at 3

  // user prompts for title, description and status
  let title = prompt(`Enter the title for task #${id}:`);
  let description = prompt(`Enter the description for task #${id}:`);
  let status = prompt(`Enter the status for task #${id} (e.g., "todo", "in progress", "done"):`);
  // also checking for vaild status of todo, in progress and done
  while(status !== 'todo' && status !== 'in progress' && status !== 'done') {
    alert(`Invalid status. Please enter 'todo', 'in progress' or 'done'.`);
    status = prompt('Enter your task 1 status:').toLowerCase().trim();
  }


  return {
    id: id,
    title: title,
    description: description,
    status: status
  };
}

for(let i = 0; i < 4; i++) {

  // loop throgh to get 3 tasks from the user and push that to our array

  // if i===4 alert user: "There are enough tasks on your board, please check them in the console."  
}

// include the while loop to check if the status is vaild
// return user info as an object
// loop through prompt() 4 times
// log all tasks: console.log(tasks)
console.log("All Tasks:");
for (let task of tasks) {
  console.log(`Title: ${task.title}, Status: ${task.status}`);
}
// filter to only log completed task (for of loop)

let doneTasks = task.filter(task => task.status === "done")
// then i need to loop through and log all completed tasks 
// if task.status is equal to done we log completed task
// else we console.log("No tasks completed, let's get to work");

// let task = [];

// Ask the user for the title and description of task 1
let taskOneTitle = prompt('Enter task 1 title:');
let taskOneDescripttion = prompt('Enter your task 1 description:');

// Ask for the status of task 1 and convert it to lowercase
let taskOneStatus = prompt('Enter your task 1 status:').toLowerCase().trim();

// Keep asking until the user enters a valid status for task 1
while(taskOneStatus !== 'todo' && taskOneStatus !== 'in progress' && taskOneStatus !== 'done') {
  alert(`Invalid status. Please enter 'todo', 'in progress' or 'done'.`);
  taskOneStatus = prompt('Enter your task 1 status:').toLowerCase().trim();
}

//push title, description and status as an object to my array
task.push({
  title: taskOneTitle, 
  description: taskOneDescripttion, 
  status: taskOneStatus
});

// Display the title and status of completed tasks (status: "done") in the console.

if(task[0].status === 'done') {
  console.log("Title: " + task[0].title + ", " + "Status:" + " " + task[0].status);
}

// TASK 2:
// Ask the user for the title and description of task 2
let taskTwoTitle = prompt('Enter task 2 title:');
let taskTwoDescripttion = prompt('Enter your task 2 description:');

// Ask for the status of task 2 and convert it to lowercase
let taskTwoStatus = prompt('Enter your task 2 status:').toLowerCase().trim();

// Keep asking until the user enters a valid status for task 1
while(taskTwoStatus !== 'todo' && taskTwoStatus !== 'in progress' && taskTwoStatus !== 'done') {
  alert(`Invalid status. Please enter 'todo', 'in progress' or 'done'.`);
  taskTwoStatus = prompt('Enter your task 2 status:').toLowerCase().trim();
}

//push title, description and status as an object to my array
task.push({
  title: taskTwoTitle, 
  description: taskTwoDescripttion, 
  status: taskTwoStatus
});

// Display the title and status of completed tasks (status: "done") in the console.

if(task[1].status === 'done') {
  console.log("Title: " + task[1].title + ", " + "Status:" + " "+ task[1].status);
}

// If no tasks are marked as "done", show a motivational message in the console: "No tasks completed, let's get to work!".

if(task[0].status !== 'done' && task[1].status !== 'done') {
  console.log("No tasks completed, let's get to work");
}

