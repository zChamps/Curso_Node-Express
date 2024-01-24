const express = require("express")


const app = express()
const exphbs = require("express-handlebars")
const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.use(express.static("public"))



app.get("/blog", function (req, res) {
    const posts = [
      {
        title: "Aprender Node.js",
        category: "Node.js",
        body: "Node.js é muito utilizado na programação hoje em dia",
        comments: 4,
      },
      {
        title: "PHP ainda vale a pena?",
        category: "PHP",
        body: "",
        comments: 12,
      },
      {
        title: "Os segredos de JavaScript",
        category: "JavaScript",
        body: "",
        comments: 5,
      },
    ];
  
    res.render("blog", { posts });
  });

app.get("/dashboard", (req, res) => {

    const ArrayItems = ["Item 1", "Item 2", "Item 3", "Item 4"]

    res.render("dashboard", {ArrayItems})
})

app.get("/post", (req, res) => {
    const post = {
        title: "Aprender Node.js",
        category: "Node.js",
        body: "Node.js é muito utilizado na programação hoje em dia",
        comments: 4,
      };

      res.render("blogpost", {post})
})


app.get("/", (req, res) => {
    const user = {
        name: "Willian",
        surname: "Deschamps"
    }

    const palavra = "Qualquer coisa"

    const auth = true
    const approved = true

    res.render("home", {user, palavra, auth, approved})
})




app.listen(3000, () => {
    console.log("App funcionando na porta http://localhost:3000")
})