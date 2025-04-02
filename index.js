import {command} from "commander";

const program = new command();
program
    .name("todo-cli-app")
    .version("1.0.0")
    .description("My first CLI app")
    const addTaskCommand = program.command("add-task");
    addTaskCommand.description("Add a task");
    addTaskCommand.action(() => {
        console.log("Add a task");
    });
    const listTaskCommand = program.command("list-task");
    listTaskCommand.description("List all tasks");
    listTaskCommand.action(() => {
        console.log("List all tasks");
    });
    const deleteTaskCommand = program.command("delete-task");
    deleteTaskCommand.description("Delete a task");
    deleteTaskCommand.action(() => {
        console.log("Delete a task");
    });
    program.parse();
