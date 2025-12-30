import express from "express";
import v1Router from "./routers/v1/index.router.js";
import { serverConfig } from "./config/index.js";

const app = express();

app.use("/api/v1", v1Router);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${serverConfig.PORT}`);
  console.log("Press Ctrl+C to stop server");
});
