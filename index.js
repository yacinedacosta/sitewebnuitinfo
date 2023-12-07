import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import { dirname } from 'path';

import { fileURLToPath } from 'url'; // Import fileURLToPath to convert __filename to a path

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, 'src/views'));

app.get('/', (req, res) => {
    res.render("home", {
        title: "Acceuil",
        home: true
    })
})

app.get("*", (req, res) => {
    res.sendStatus(404);
})


const port = 3000;
app.listen(port, () => {
        console.log("Server on : ", port)
})