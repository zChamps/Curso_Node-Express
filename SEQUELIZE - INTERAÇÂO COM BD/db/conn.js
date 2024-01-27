//Criando a conexão com o banco de dados MYSQL
const {Sequelize} = require("sequelize")

//Passando as configis              BD                 user    senha
const sequelize = new Sequelize("cursonodesequelize", "root",   "", {
    host: "localhost",
    dialect: "mysql"
})

    // try {
    //     sequelize.authenticate()
    //     console.log("Conectado com sucesso!")
    // } catch (error) {
    //     console.log("Não foi possivel conectar: ",error)
    // }

module.exports = sequelize