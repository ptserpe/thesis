import * as http from "http";
import App from "./app";
import { connection } from "./config/db.config";
import { APILogger } from "./logger/api.logger";

const port = process.env.PORT || 3070;

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
    process.exit(1)
  });

App.set("port", port);
const server = http.createServer(App);
server.listen(port);

const logger = new APILogger();

server.on("listening", function(): void {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`, null);
 });

module.exports = App;