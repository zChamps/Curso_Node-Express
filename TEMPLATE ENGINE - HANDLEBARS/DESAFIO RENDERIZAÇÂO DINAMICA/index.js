const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.use(express.static("public"))

const viagensIntergalacticas = [
    { id: 1, destino: 'Planeta Alfa Centauri', duracao: '6 meses', preco: '$1.5 milhões' },
    { id: 2, destino: 'Lua de Júpiter, Europa', duracao: '4 meses', preco: '$1.2 milhões' },
    { id: 3, destino: 'Nebulosa de Orion', duracao: '8 meses', preco: '$2 milhões' },
    { id: 4, destino: 'Anel de Asteroides', duracao: '3 meses', preco: '$800 mil' },
    { id: 5, destino: 'Colônia em Marte', duracao: '9 meses', preco: '$2.5 milhões' }
  ];


app.get("/carddetails/:id", (req, res) => {
    const id = req.params.id

    const data = viagensIntergalacticas.filter(dado => {
        return dado.id === Number(id)
    })
    res.render("cardDetails", {data})
})



app.get("/", (req, res) => {

    



    res.render("home", {viagensIntergalacticas})
})


app.listen(3000, () => {
    console.log("App funcionando na porta http://localhost:3000")
})