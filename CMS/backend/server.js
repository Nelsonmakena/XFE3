import express from "express";
import { ENV } from "./env.js";
import AdminRoutes from "./src/Routes/admin-routes.js";
import EmployeeRoutes from "./src/Routes/employeeRoutes.js";
import AuthRoutes from "./src/Routes/auth-routes.js";
import cookieParser from "cookie-parser";

const app = express();
const Port = ENV.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", AuthRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/employee", EmployeeRoutes);

app.listen(Port, () => {
  console.log(`server is running at port ${Port}`);
});
