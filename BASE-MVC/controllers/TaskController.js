// Model/Tabela referente as Tasks no BD
const Task = require("../models/Task")


//Controller responsável por mostrar a pagina para inserção dos dados
const createTask = (req, res) => {
    res.render("tasks/create")
}

//Controller que mostra todas as tarefas do BD na pagina
const showTasks = async (req, res) => {
    const tasks = await Task.findAll({raw: true})



    res.render("tasks/all", {tasks})
}


//Controller responsável por criar as tarefas no BD
const createTaskSave = (req, res) => {
    const task = {
        title: req.body.title,
        description: req.body.description,
        done: false
    }


    Task.create(task)
    res.redirect("/tasks")
}


//Controller responsável por deletar as tarefas no banco
const deleteTask = async (req, res) => {
    const id = req.body.id
    Task.destroy({where: {id: id}})
    res.redirect("/tasks")
}

//Controller responsável por mostrar os dados de uma tarefa especifica na hora de editar as tarefas
const editTask = async (req, res) => {
    const id = req.params.id
    const task = await Task.findOne({raw: true, where: {id: id}})
    
    res.render("tasks/edit", {task})
}

//Controler responsável por editar de fato as tarefas no banco
const editTaskEdited = async (req, res) => {
    const id = req.body.id
    const data = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description
    }
    
    await Task.update(data, {where: {id: id}})
    
    res.redirect("/tasks")
}

//Controller responsável por alterar o estado da tarefa para concluido, ou não
const toggleTaskStatus = async (req, res) => {
    const id = req.body.id

    const task = {
        done: req.body.done === "0" ? true : false
    }

    await Task.update(task, {where: {id: id}})

    res.redirect("/tasks")
}


//Exportando os controllers
module.exports = {
    createTask,
    showTasks,
    createTaskSave,
    deleteTask,
    editTask,
    editTaskEdited,
    toggleTaskStatus
}