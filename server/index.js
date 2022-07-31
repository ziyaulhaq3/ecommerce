import  express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

app.use("/user", userRouter);

const CONNECTION_URL = 'mongodb+srv://dbuser:dbuser@cluster0.9n5nw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT|| 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);