const express = require("express")

// Criando o administrador das rotas dos usuarios
const router = express.Router()


//Chamando o path para lidar com os caminhos
const path = require("path")

//Definindo o caminho base da aplicação para os templates
const basePath = path.join(__dirname, "../templates")


router.get("/about", (req, res) => {
    res.sendFile(`${basePath}/about.html`)
})

router.get("/school", (req, res) => {
    res.sendFile(`${basePath}/school.html`)
})




module.exports = router