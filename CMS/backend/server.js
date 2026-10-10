import express from "express";
import { ENV } from "./env.js";
import AdminRoutes from "./src/Routes/admin-routes.js";

const app = express();
const Port = ENV.PORT || 5000;

app.use(express.json());
app.use("/api/admin", AdminRoutes);

app.listen(Port, () => {
  console.log(`server is running at port ${Port}`);
});
