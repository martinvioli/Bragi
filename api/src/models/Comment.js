const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Comment', {
        IdComment: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        DateComment:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        CommentContent:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        IdUserComment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserNameComment: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}