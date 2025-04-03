import {Command} from "commander";
import {PrismaClient} from "@prisma/client";


const program = new Command();
const client = new PrismaClient();

program
    .name("todo-cli-app")
    .version("1.0.0")
    .description("My first CLI app")

    const addTaskCommand = program.command("add-task");
    addTaskCommand.description("Add a task");
    addTaskCommand.requiredOption("-t, --title <value>", "Task title");
    addTaskCommand.requiredOption("-d, --description <value>", "Task description");
    addTaskCommand.requiredOption("-s, --status <value>", "Task status");

    addTaskCommand.action(async function(options) {
        const title = options.title;
        const description = options.description;
        const status = options.status;
        try {
            const newTask = await client.task.create({
                data: {
                    id: 1,
                    title,
                    description,
                    status
                }
            });
            console.log(`New task added successfully, task id: ${newTask.id}`);

        } catch (error) {
            console.log(`There was an error adding a new task, please try again later`);
        }
    });

    


    const listTaskCommand = program.command("list-task");
    listTaskCommand.description("List all tasks");
    listTaskCommand.option("-t, --title <value>", "Task title");
    listTaskCommand.option("-d, --description <value>", "Task description");
    listTaskCommand.option("-s, --status <value>", "Task status");

    listTaskCommand.action((asyncfunction(options)) ({
        const title = options.title;
        const description = options.description;
        const status = options.status;
        try{
            const tasks =await client.task.findMany({
                where: {
                    title,
                    description,
                    status
                }
            })

        }catch(error){
            console.log(`There was an error listing tasks, please try again later`);
        }
    });
    const deleteTaskCommand = program.command("delete-task");
    deleteTaskCommand.description("Delete a task");
    deleteTaskCommand.requiredOption("-t, --title <value>", "Task title");
    deleteTaskCommand.requiredOption("-d, --description <value>", "Task description");
    deleteTaskCommand.requiredOption("-s, --status <value>", "Task status");
    deleteTaskCommand.action(()  {
    try{}
    catch{}
        
    });
    const updateTaskCommand = program.command("update-task");
    updateTaskCommand.description("Update a task");
    updateTaskCommand.action(() => {    
        console.log("Update a task");
    });
    const completeTaskCommand = program.command("complete-task");    
    completeTaskCommand.description("Complete a task");
    completeTaskCommand.action(() => {
        console.log("Complete a task");
    });
     const deleteAllTaskCommand = program.command("delete-all-task");    
    deleteAllTaskCommand.description("Delete all tasks");
    deleteAllTaskCommand.action(() => {
        console.log("Delete all tasks");
    });
    
    program.parse();