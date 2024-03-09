import { app } from "./app.js";
import {connectDB} from "./data/db.js"

connectDB();

app.listen(process.env.PORT, ()=> {
    console.log(`Server is Working on Port ${process.env.PORT} in ${process.env.NODE_ENV} MOde`)
})