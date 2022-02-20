const { createLogger, format, transports } = require("winston");
const { MONGO_URI } = process.env;
require('winston-mongodb');


module.exports = createLogger({
  transports: [
    new transports.File({
      filename: "logs/server.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
    }),
    // MongoDB transport
    new transports.MongoDB({
      level: "error",
      //mongo database connection link
      db: MONGO_URI,
      options: {
        useUnifiedTopology: true,
      },
      // A collection to save json formatted logs
      collection: "server_logs",
      format: format.combine(
        format.timestamp(),
        // Convert logs to a json format
        format.json()
      ),
    }),
  ],
});