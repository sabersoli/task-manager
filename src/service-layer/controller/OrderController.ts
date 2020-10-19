import { Controller, Get, Post, Body, Res, Delete, BadRequestError, HttpCode, Param, NotFoundError, JsonController, Put } from "routing-controllers"
import { Response, response } from "express"
import { validateTask, compressErros } from "../../business-layer/validator/task/TaskValidator"
import * as uuid from "uuid"
import { logger } from "../../middleware/common/Logging"

export interface Task {
    id: string
    date: string
    owner: string
    status: string
    title: string
    description: string
}

@JsonController("/")
export class HelloWorld {
    tasks: Task[]

    constructor() {
        this.tasks = []
    }

    @Get("task/:id")
    async getOne(@Param("id") id: string): Promise<Task> {
        const task = this.tasks.find(item => item.id === id)
        if(!task) throw new NotFoundError(`task with ID ${id} not found`)
        return task
    }



    @Get("tasks")
    async get(): Promise<Task[]> {
        return this.tasks
    }

    @Post("tasks")
    async post(@Body() task: Task, @Res() response: Response) {
        task = { ...task, id: uuid.v4() }
        const validationErrors = await validateTask(task)

        if (validationErrors.length > 0) throw new BadRequestError(compressErros(validationErrors))

        this.tasks.push(task)
        return response.status(201).json({taskId: task.id})
    }

    @Put("task/:id")
    async put(@Param("id") id: string, @Body() task: Task, @Res() response: Response) {
        logger.info(`PUT endpoint called with: ${id}`)
        const currentTask = this.tasks.find((item) => item.id === id)
        if(!currentTask) throw new NotFoundError(`task with ID ${id} not found`)
        this.tasks.find((item, index) => {
            if(item.id === id) {
                this.tasks[index] = {...task}
            }
        })
        return "Task updated"        

    }

    @Delete("tasks")
    @HttpCode(205)
    async delete() {
        this.tasks = []
        return "deleting tasks..."
    }
}
