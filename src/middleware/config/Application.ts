import { logger } from "../common/Logging"
import { ExpressConfig } from "./Express"

export class Application {
    server: any
    express: ExpressConfig

    constructor() {
        this.express = new ExpressConfig()

        const port = 5555
        this.server = this.express.app.listen(port, () => {
            logger.info(`Server Started! Express: http://localhost:${port}`)
        })
    }
}
