import { Command } from "commander";
import { PrismaClient } from "@prisma/client";

const program = new Command();
const client = new PrismaClient();

program
  .name("todo-cli-app")
  .version("1.0.0")
  .description("Manage your tasks using command prompt");


const addTaskCommand = program.command("add-task");
addTaskCommand.description("Add a task");
addTaskCommand.requiredOption("-t, --title <value>", "Task title");
addTaskCommand.requiredOption("-d, --description <value>", "Task description");
addTaskCommand.requiredOption("-s, --status <value>", "Task status");

addTaskCommand.action(async function (options) {
  const { title, description, status } = options;
  try {
    const newTask = await client.task.create({
      data: {
        title,
        description,
        status
      }
    });
    console.log(`New task added successfully, task id: ${newTask.id}`);
  } catch (error) {
    console.log("There was an error adding a new task, please try again later");
  }
});


const listTaskCommand = program.command("list-task");
listTaskCommand.description("List all tasks");
listTaskCommand.option("-t, --title <value>", "Task title");
listTaskCommand.option("-d, --description <value>", "Task description");
listTaskCommand.option("-s, --status <value>", "Task status");

listTaskCommand.action(async function (options) {
  const { title, description, status } = options;
  try {
    const tasks = await client.task.findMany({
      where: {
        title,
        description,
        status
      }
    });
    console.log("Tasks: ", tasks);
  } catch (error) {
    console.log("There was an error listing tasks, please try again later");
  }
});


const deleteTaskCommand = program.command("delete-task");
deleteTaskCommand.description("Delete a task");
deleteTaskCommand.requiredOption("-t, --title <value>", "Task title");
deleteTaskCommand.requiredOption("-d, --description <value>", "Task description");
deleteTaskCommand.requiredOption("-s, --status <value>", "Task status");

deleteTaskCommand.action(async function (options) {
  const { title, description, status } = options;
  try {
    const taskToDelete = await client.task.findFirst({
      where: {
        title,
        description,
        status
      }
    });

    if (!taskToDelete) {
      console.log("Task not found.");
      return;
    }

    await client.task.delete({
      where: {
        id: taskToDelete.id
      }
    });

    console.log(`Task with ID ${taskToDelete.id} deleted successfully`);
  } catch (error) {
    console.log("There was an error deleting the task, please try again later");
  }
});


const updateTaskCommand = program.command("update-task");
updateTaskCommand.description("Update a task");
updateTaskCommand.requiredOption("-t, --title <value>", "Task title");
updateTaskCommand.option("-d, --description <value>", "Task description");
updateTaskCommand.option("-s, --status <value>", "Task status");

updateTaskCommand.action(async function (options) {
  const { title, description, status } = options;
  try {
    const taskToUpdate = await client.task.findFirst({
      where: {
        title
      }
    });

    if (!taskToUpdate) {
      console.log("Task not found.");
      return;
    }

    const updatedTask = await client.task.update({
      where: {
        id: taskToUpdate.id
      },
      data: {
        description: description ?? taskToUpdate.description, 
        status: status ?? taskToUpdate.status  
      }
    });

    console.log(`Task updated successfully: ${updatedTask.id}`);
  } catch (error) {
    console.log("There was an error updating the task, please try again later");
  }
});


const completeTaskCommand = program.command("complete-task");
completeTaskCommand.description("Complete a task");
completeTaskCommand.requiredOption("-t, --title <value>", "Task title");

completeTaskCommand.action(async function (options) {
  const { title } = options;
  try {
    const taskToComplete = await client.task.findFirst({
      where: {
        title
      }
    });

    if (!taskToComplete) {
      console.log("Task not found.");
      return;
    }

    const completedTask = await client.task.update({
      where: {
        id: taskToComplete.id
      },
      data: {
        status: "completed"
      }
    });

    console.log(`Task completed successfully: ${completedTask.id}`);
  } catch (error) {
    console.log("There was an error completing the task, please try again later");
  }
});


const deleteAllTaskCommand = program.command("delete-all-task");
deleteAllTaskCommand.description("Delete all tasks");

deleteAllTaskCommand.action(async function () {
  try {
    await client.task.deleteMany({});
    console.log("All tasks deleted successfully");
  } catch (error) {
    console.log("There was an error deleting all tasks, please try again later");
  }
});

program.parse();
