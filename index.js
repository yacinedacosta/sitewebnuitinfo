import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
// require say moudle
import say from "say";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("home", {
    title: "Acceuil",
    home: true,
  });
});

// API to change the text to voice over link http://localhost:3000/speak
app.get("/speak", (req, res) => {
  let text =
    "Welcome in our wonderful web site where we will talk about ecology ! yeay yeay yeay yeay !";
  // below 1.0 is the speed which can be increased
  say.speak(text, "Alex", 1.0, (err) => {
    if (err) {
      return res.json({ message: err, error: true });
    }
    return res.json({ message: "Text spoken.", error: false });
  });
});

app.get("/", (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log("Server on : ", 3000);
});
