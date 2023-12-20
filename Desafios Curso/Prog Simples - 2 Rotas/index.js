const express = require("express")
const app = express()
const port = 5000

const path = require("path")
const basePath = path.join(__dirname, "templates")

const mainRoutes = require("./Routes/routes")


app.get("/", (req, res) => {
    res.sendFile(`${basePath}/home.html`)
})

app.use("/", mainRoutes)

app.listen(port)