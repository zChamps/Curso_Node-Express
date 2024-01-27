const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("cursonodemvc", "root", "", {
    host: "Localhost",
    dialect: "mysql"
})

try {
    
    sequelize.authenticate()
    console.log("conectamos ao banco!")


} catch (error) {
    console.log("NÂO FOI POSSIVEL AUTENTICAR: ", error)
}

module.exports = sequelize