const {DataTypes} = require("sequelize")

const db = require("../db/conn")

//Criação da tabela User no banco 
const User = db.define("User", {

    //Campos da tabela e suas particularidades, como o tipo, se pode ser nulo ou não, etc

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation: {
        type: DataTypes.STRING,
        required: true
    },
    newsletter: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = User