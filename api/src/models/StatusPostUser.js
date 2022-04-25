const sequelize = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('StatusPostUser',{
        IdStatusPost: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        NameStatusPost: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DateStatusPost:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    })
}