const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("ReportPostCommentUser", {
        idReport: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        typeReport: {
        type: DataTypes.ENUM("comment", "post","user"),
        allowNull: false,
        },
    });
};
