const sequelize = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Post',{
        IdPost: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        TitlePost: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DatePost:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        ContentPost: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        DescriptionPost: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        LinkContent: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}