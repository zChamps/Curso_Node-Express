const express = require("express")
const app = express()


app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


app.get("/", (req, res) => {
    res.json({
        id: 1,
        name: "Deschamps"
    })
})

app.post("/createproduct", (req, res) => {
    const produto = req.body.produto
    const preco = req.body.preco

    if(!produto){
     res.status(422).json({
            message: "O campo produto é obrigatório"
        })
        return
    }

    res.status(201).json({
        message: `O produto ${produto} no valor de ${preco}, foi criado com sucesso!`
    })


})




app.listen(3000)