const express = require("express")
const exphbs = require("express-handlebars")

//Importando a conexão com o BD
const conn = require("./db/conn")


//importando o Model User
const User = require("./models/User")
const Adress = require("./models/Adress")
const app = express()

//Setando a engine com oo handlebars
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")


app.use(
  express.urlencoded({
    extended: true,
  }),
)


//Transformar o retorno do body em json  
app.use(express.json())


//Setando a pasta public como pasta pai para os arquivos estáticos, como css
app.use(express.static("public"))




//Rota usada para o formulário que será usado para criar os dados no bd
app.get("/users/create", (req, res) => {
  res.render("adduser")
})


//Rota usada para a criação de dados do banco
app.post("/users/create", async (req, res) => {
  //Pegado os dados presentes no body do formulário, em "name" de cada input
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === "on") {
    newsletter = true
  } else {
    newsletter = false
  }


  //Criar usando o model criado em models com os dados da tabela "User"
  await User.create({ name, occupation, newsletter })
  res.redirect("/")
})






app.get("/users/:id", async (req, res) => {
  const id = req.params.id

  // Buscando usuário especifico com base em um dado
  const user = await User.findOne({ raw: true, where: { id: id } })

  res.render("userview", { user })
})



app.post("/users/delete/:id", async (req, res) => {
  const id = req.params.id

  //Excluindo um usuário com base no id passado pela url
  await User.destroy({ where: { id: id } })

  res.redirect("/")
})



app.get("/users/edit/:id", async (req, res) => {

  try {

    const id = req.params.id

    //Fazendo uma consulta para achar os dados do usuário onde o id é igual da requisiçao, alem de puxar os dados da tabela Endereços também onde o id do usuário de lá seja o mesmo
    const user = await User.findOne({ include: Adress, where: { id: id } })
    //Passando os dados da tabela useres e adresses para a view
    res.render("useredit", { user: user.get({ plain: true }) })


  } catch (error) {
    console.log(error)
  }

})


app.post("/users/edit/:id", async (req, res) => {
    //Pegado os dados presentes no body do formulário, em "name" de cada input
  const id = req.params.id
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === "on") {
    newsletter = true
  } else {
    newsletter = false
  }

  //Criando objeto com novos dados a serem atualizados
  const userData = {
    id,
    name,
    occupation,
    newsletter
  }

  //Atualizando dados
  await User.update(userData, { where: { id: id } })
  res.redirect("/")


})



app.post("/address/create", async (req, res) => {
  //Pegado os dados presentes no body do formulário, em "name" de cada input
  const UserId = req.body.UserId
  const street = req.body.street
  const number = req.body.number
  const city = req.body.city
  //Criando objeto com novos dados a serem atualizados
  const adress = {
    UserId,
    street,
    number,
    city
  }

  //Criando um novo dado no BD 
  await Adress.create(adress)

  //redirecionando
  res.redirect(`/users/edit/${UserId}`)
})

//Deletando um item do banco
app.post("/address/delete", async (req, res) => {
  const id = req.body.id
  const UserId = req.body.UserId

  await Adress.destroy({where:{id: id}})
  res.redirect(`/users/edit/${UserId}`)
})








//Rota home
app.get("/", async (req, res) => {

  //Retorno de todos os dados do Model/Tabela User
  const user = await User.findAll({ raw: true })
  console.log(user)


  res.render("home", { users: user })
})



//Criando tabela caso não exista e mantendo a conexao
conn
  // .sync({ force: true })   -- Atualiza as tabelas do banco deletando todos os dados da tabela quando inicia
  // .sync({ alter: true })    - Atualiza as tabelas do banco, sem perca de dados
  .sync()
  .then(() => {
    app.listen(3000)
  }).catch(err => console.log(err))


