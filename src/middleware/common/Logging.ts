import * as winston from "winston"

export const logger = new winston.Logger()
const env = "development"

// Development Logger
if (env === "development") {
    logger.add(winston.transports.Console)
}

process.on("unhandledRejection", function (reason, p) {
    logger.warn(
        "system level exceptions at, Possibly Unhandled Rejection at: Promise ",
        p,
        " reason: ",
        reason
    )
})
