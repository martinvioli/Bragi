const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("RowReport", {
        idRowReport: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        idUserReporter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idPostCommentUser: {
            type: DataTypes.STRING,
            allowNull: false
        },
        causeReport:{
            type: DataTypes.ENUM("Discrimnation", "Verbal Abuse", "Blasphemous Dialog", "Sexual Situations or Dialog"),
            allowNull: false
        }
    });
};
