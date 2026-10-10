import express from "express";
import { ENV } from "./env";

const app = express();
const Port = ENV.PORT || 5000;

app.use(express.json);

app.listen(Port, () => {
  "server  is running ";
});
