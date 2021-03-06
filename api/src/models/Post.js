const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Post',{
        idPost: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        datePost:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        contentPost: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        linkContent: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nameStatusPost: {
            type: DataTypes.ENUM('Paused', 'Edited', 'Deleted', 'Posted'),
            allowNull: false,
            defaultValue: 'Posted'
        },
        typeOfPost: {
            type: DataTypes.ENUM('Standard', 'Premium'),
            allowNull: true,
            defaultValue: 'Standard'
        },
        imagePost: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}