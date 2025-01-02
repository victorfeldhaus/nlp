import express from "express";
import { middlewares } from "./middlewares";

export const server =  () => {
    const app = express();

    middlewares(app);

    app.listen(3333, () => console.log("Server is running..."));
}
