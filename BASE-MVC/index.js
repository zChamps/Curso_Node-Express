const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

//Importando a conexão com o BD
const conn = require("./db/conn")

const Task = require("./models/Task")

const tasksRoutes = require("./routes/tasksRoutes")

//Setando a engine com oo handlebars
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")


app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use("/tasks", tasksRoutes)


//Transformar o retorno do body em json  
app.use(express.json())


//Setando a pasta public como pasta pai para os arquivos estáticos, como css
app.use(express.static("public"))



conn.sync().then(() => {
    app.listen(3000)
}).catch(error => console.log(error))