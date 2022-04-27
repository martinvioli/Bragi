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
        titlePost: {
            type: DataTypes.STRING,
            allowNull: false
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
        descriptionPost: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        linkContent: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nameStatusPost: {
            type: DataTypes.ENUM('Paused', 'Edited', 'Deleted'),
            allowNull: false,
            defaultValue: 'Posted'
        },
    })
}