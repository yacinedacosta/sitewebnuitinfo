import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/views"));

app.get("/", (req, res) => {
  res.render("home", {
    title: "Acceuil",
    home: true,
  });
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log("Server on : ", 3000);
});
