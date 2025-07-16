

// have a prompt() where users insert task title and status
// from that prompt() the value should be assigned to a variable and ensure it's in lower case
// const taskOne = prompt(`Enter task 1 title:`).toLowerCase();
// console.log(taskOne);

// let taskStatus = prompt(`Enter your status:`).toLowerCase();
// console.log(taskStatus);

//use conditional logic to find out if the title and status are =

let taskOne = true;
let taskTwo = true;

while (taskOne) {
  let title = prompt("Enter the task title:").toLowerCase();
  let status = prompt("Enter the task status (todo, in progress, done):").toLowerCase();

  if (title && status === 'todo') {
    console.log(
    `
    Title: ${title}, status: ${status}
    No tasks completed, let's get to work!
    `);
    taskOne = false; // Exit the loop
  } else if (title && status === 'in progress') {
    console.log(`Title: ${title}, status: ${status}`);
    taskOne = false; // Exit the loop
  } else if (title && status === 'done') {
    console.log(`Title: ${title}, status: ${status}`);
    taskOne = false; // Exit the loop
  } else if(title === '' || status === "") {
    alert(`Invalid status. Please enter 'todo', 'in progress' or 'done'.`);
  } else {
    alert(`Invalid status. Please enter 'todo', 'in progress' or 'done'.`);
  }
}


while (taskTwo) {
  let title = prompt("Enter the task title:").toLowerCase();
  let status = prompt("Enter the task status (todo, in progress, done):").toLowerCase();

  if (title && status === 'todo') {
    console.log(
    `
    Title: ${title}, status: ${status}
    No tasks completed, let's get to work!
    `);
    taskTwo = false; // Exit the loop
  } else if (title && status === 'in progress') {
    console.log(`Title: ${title}, status: ${status}`);
    taskTwo = false; // Exit the loop
  } else if (title && status === 'done') {
    console.log(`Title: ${title}, status: ${status}`);
    taskTwo = false; // Exit the loop
  } else if(title === '' || status === "") {
    alert(`Invalid status. Please enter 'todo', 'in progress' or 'done'.`);
  } else {
    alert(`Invalid status. Please enter 'todo', 'in progress' or 'done'.`);
  }
}

// logic that checks both taskOne and taskTwo.
// Check below code, probably incorrect and won't run

while(taskOne && taskTwo) {
    let title = prompt("Enter the task title:").toLowerCase();
    let status = prompt("Enter the task status (todo, in progress, done):").toLowerCase();

    if(title && status === 'todo') {
        console.log(
        `
        Title: ${title}, status: ${status}
        No tasks completed, let's get to work!
        `);
        taskOne = false; 
        taskTwo = false; 
    } else if(title && status === 'in progress') {
        console.log(
            `
            Title: ${title}, status: ${status}
            `);
        taskOne = false; 
        taskTwo = false; 
    } else if(title && status === 'done') {
        console.log(
        `
        Title: ${title}, status: ${status}
        Well done completing this task. Keep up the great work
        `);
    } else if(title === '' || status === '') {
        alert(`Invalid status. Please enter 'todo', 'in progress' or 'done'.`);
    } else {
        alert(`Invalid status. Please enter 'todo', 'in progress' or 'done'.`);
    }
}