const {DataTypes} = require("sequelize")

const db = require("../db/conn")

const User = require("./User")

// Criando o Modal/Tabela "Adress"
const Adress = db.define("Adress", {
    street:{
        type: DataTypes.STRING,
        required: true
    },
    number:{
        type: DataTypes.STRING,
        required: true
    },
    city:{
        type: DataTypes.STRING,
        required: true
    },
    

})

//Informando que o usuário tem varios endereços
User.hasMany(Adress)
//Criando o relacionamento entre as tabelas
Adress.belongsTo(User)


module.exports = Adress 