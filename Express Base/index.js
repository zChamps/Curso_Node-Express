// Importando o Express
const express = require("express")
// Instanciando o Exprees
const app = express()
// Definindo a porta que será usada
const port = 3000

//Chamando as rotas dos usuarios
const userRoutes = require("./Routes/users")

//configurando a pasta dos arquivos estáticos
app.use(express.static("public"))

const path = require("path")
const basePath = path.join(__dirname, "templates")

// Ler o body
app.use(
    express.urlencoded({
        extended: true
    })
)

//Transformar toda requisição recebida pelo body em JSON
app.use(express.json())








//Criando um middleware
const checkAuth = (req, res, next) => {
    req.authStatus = true
    if (req.authStatus){
        // console.log("Está logado")
        next()
    }else{
        // console.log("Não está logado")
        next()
    }
}

//Usando o Middleware criado
app.use(checkAuth)


// Utilizando as rotas criadas na pasta das rotas
app.use("/users", userRoutes)



// Na rota home, estamos enviando o arquivo index.html ao usuario como resposta (sempre deixar essa rota por ultimo)
app.get("/", (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})


//Criando middleware para a página 404
app.use((req, res) => {
    res.status(404).sendFile(`${basePath}/404.html`)
    
})

//Fazendo o servidor escutar na porta 3000
app.listen(port, () => {
    console.log("http://localhost:" + port)
})