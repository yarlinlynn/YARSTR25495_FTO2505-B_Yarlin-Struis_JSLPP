// JSL03 Challenge:
// Store tasks as objects inside an array for structured data management.
// Allow users to add up to three new tasks to the existing task list.
// Ensure each new task has a unique incremental ID based on the last task in the array.
// Prompt users to enter task details (title, description, status) and store them in an object.
// Alert users when they reach the task limit with the message: "There are enough tasks on your board, please check them in the console." Implement a filter function to display only tasks with the status "done".
// Log all tasks in the console with a clear label for easy review.
// Log only completed tasks (status: "done") in the console under a "Completed Tasks" label for quick reference.


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

// call getTaskDetails() to run 
while(initialTasks.length < 6) {
  getTaskDetails();

  // alerts user when they reach the task limit with the message
  if (initialTasks.length === 6) {
    alert("There are enough tasks on your board, please check them in the console." )
    // logs all tasks
    console.log('All Task:', initialTasks)
  } 
}

// create a function that asks for user task title, description and status, calculates the id and push object into []
function getTaskDetails() {

  // calculate the id of task entered by user and have it start at 3 and increase everytime the function is called
  let id = initialTasks[initialTasks.length - 1 ].id + 1

  // user prompts for title, description and status
  let title = prompt(`Enter your task title:`);
  let description = prompt(`Enter your task description:`);
  let status = prompt(`Enter your task status:`);

  // also checking for vaild status of todo, in progress and done
  while(status !== 'todo' && status !== 'in progress' && status !== 'done') {
    alert(`Invalid status. Please enter 'todo', 'in progress' or 'done'.`);
    status = prompt('Enter your task status:').toLowerCase().trim();
  }

  // push user info into initialTask[]
    initialTasks.push({
    id: id,
    title: title, 
    description: description, 
    status: status
  });

}

// use the filter() method to log all the completed tasks 
const completedTasks = initialTasks.filter(function (task) {
  return task.status === 'done'
});
// let doneTasks = initialTasks.filter(initialTasks => initialTasks.status === "done")
console.log('Completed Tasks:', completedTasks)



