const express = require('express')
const router = express.Router()

//Chamando todos os controllers das Tasks
const TaskController = require("../controllers/TaskController")


// Criando todas as rotas a partir de http://localhost:3000/tasks e setando os controllers responsáveis por cada rota
router.get("/add", TaskController.createTask)
router.post("/add", TaskController.createTaskSave)
router.post("/delete", TaskController.deleteTask)
router.get("/edit/:id", TaskController.editTask)
router.post("/edit", TaskController.editTaskEdited)
router.post("/updatestatus", TaskController.toggleTaskStatus)
router.get("/", TaskController.showTasks)

module.exports = router