import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath to convert __filename to a path
import say from "say";
import fs from "fs";

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
  let text = gettext();
  console.log(text);
  // Speak the text
  // Below 1.0 is the speed, which can be increased
  say.speak(text, "Alex", 1.0, (err) => {
    if (err) {
      console.error("Error speaking:", err);
    } else {
      console.log("Text spoken successfully.");
    }
  });
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log("Server on : ", 3000);
});

function gettext() {
  try {
    // Read the content of main.handlebars synchronously
    const filePath = path.join(__dirname, "src/views/main.handlebars");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Extract text from the file content (you may need to adjust this based on your actual HTML structure)
    const text = extractTextFromHTML(fileContent);

    return text;
  } catch (error) {
    console.error("Error reading main.handlebars:", error);
    return "Error reading file.";
  }
}

// Function to extract text from HTML content (a simple example, you may need to improve it)
function extractTextFromHTML(htmlContent) {
  // Use a library like cheerio or a more sophisticated HTML parsing approach
  // This is a basic example that removes HTML tags using a regular expression
  return htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
}
