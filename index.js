import express from "express"
import path from "path"
import { engine } from "express-handlebars"

const app = express()

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

app.get("*", (req, res) => {
    res.sendStatus(404);
})


const port = 3000;
app.listen(port, () => {
        console.log("Server on : ", port)
})