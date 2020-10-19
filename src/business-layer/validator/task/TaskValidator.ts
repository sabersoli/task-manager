import { TaskValidationSchema } from "./TaskValidationSchema"
import { validate, ValidationError } from "class-validator"
import { Task } from "../../../service-layer/controller/OrderController"

export function validateTask(task: Task): Promise<ValidationError[]> {
    return validate(new TaskValidationSchema(task))
}

export function compressErros(errors: ValidationError[]): string {
    let message = ""
    errors.forEach((error) => (message += error.toString()))
    return message
}
