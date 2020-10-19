import { IsString, IsNotEmpty, Validate, ValidatorConstraintInterface, ValidationArguments, ValidatorConstraint} from "class-validator"
import { Task } from "../../../data-layer/models/Task"
import { TaskStatus } from "../../../data-layer/types/TaskStatus"
import { logger } from "../../../middleware/common/Logging"

@ValidatorConstraint({ name: "Task Status Validator", async: false })
class TaskStatusValidator implements ValidatorConstraintInterface {

    validate(text: string, args: ValidationArguments) {
        return text in TaskStatus
    }
 
    defaultMessage(args: ValidationArguments) { 
        return "Text ($value) is too short or too long!";
    }
 
}

export class TaskValidationSchema {
    @IsNotEmpty()
    id: string

    @IsString()
    date: string

    @IsString()
    owner: string

    @Validate(TaskStatusValidator)
    status: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    constructor(task: Task) {
        this.id = task.id
        this.date = task.date
        this.owner = task.owner
        this.status = task.status
        this.title = task.title
        this.description = task.description
    }
}
