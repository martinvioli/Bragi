const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
// defino el modelo
    sequelize.define("User", {
        idUser: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female', 'Non binary', 'Other'),
            allowNull: false,
        },
        telephone: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "Hey there! I'm using Bragi!"
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        userName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        profileImage:{
            type: DataTypes.BLOB,
            allowNull: false,
            defaultValue: 'https://i.pinimg.com/564x/e5/91/dc/e591dc82326cc4c86578e3eeecced792.jpg'
        },
        nameTypeUser: {
            type: DataTypes.ENUM('Premium', 'Standard', 'Admin', 'Artist'),
            allowNull: false,
            defaultValue: 'Standard'
        },
        nameStateUser: {
        type: DataTypes.ENUM('Active', 'Banned', 'Inactive', 'Pending'),
        allowNull: false,
        defaultValue: 'Pending'
        },
        validationCode:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        token:{
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });
};