const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
// defino el modelo
    sequelize.define("User", {
        IdUser: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        Name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Gender: {
            type: DataTypes.ENUM('Male', 'Female', 'Non binary', 'Other'),
            allowNull: false,
        },
        Telephone: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Birthday: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        UserName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        ProfileImage:{
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'https://i.pinimg.com/564x/e5/91/dc/e591dc82326cc4c86578e3eeecced792.jpg'
        },
        IsAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
};