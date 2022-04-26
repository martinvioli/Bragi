const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Followed", {
        idFollowed: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        userProfileFollowed: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        userNameFollowed: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
