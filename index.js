import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import { dirname } from 'path';

import { fileURLToPath } from 'url'; // Import fileURLToPath to convert __filename to a path

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, 'src/views'));

app.get('/', (req, res) => {
    res.render("home", {
        title: "Acceuil",
        home: true
    })
})

app.get('/NeRienFaire', (req, res) => {
  res.render("homesimplifie", {
      layout: "mainsimplifie",
      title: "Ne rien faire",
      home: true
  })
})

app.get("*", (req, res) => {
    res.sendStatus(404)
})

app.listen(3000, () => {
        console.log("Server on : ", 3000)
})