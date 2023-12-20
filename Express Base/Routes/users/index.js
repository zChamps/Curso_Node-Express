const express = require("express")

// Criando o administrador das rotas dos usuarios
const router = express.Router()


//Chamando o path para lidar com os caminhos
const path = require("path")

//Definindo o caminho base da aplicação para os templates
const basePath = path.join(__dirname, "../../templates")



// Rota GET para o form onde é feito o envio dos dados para o backend
router.get("/add", (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})


// Rota POST para onde são enviados os dados pela "action" do formulário
router.post("/save", (req, res) => {
    console.log(req.body)


    res.sendFile(`${basePath}/userform.html`)
})

// Cria a rota GET users e recebe o parametro passado nela
router.get("/:id", (req, res) => {

    const id = req.params.id
    console.log(id)


    res.sendFile(`${basePath}/usuario.html`)
})


module.exports = router