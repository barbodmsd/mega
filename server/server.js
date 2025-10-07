import mongoose from "mongoose";
import app from "./app.js";
import { configDotenv } from "dotenv";
configDotenv({ path: "config.env" });

// connect to mondoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log(`DB IS CONNECT.`))
  .catch((err) => console.log(err));

//   port
const port = process.env.PORT || 7001;

app.listen(port, () => console.log(`server is run on port : ${port}`));
