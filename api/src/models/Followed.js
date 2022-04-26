const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Followed", {
        IdFollowed: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        UserProfileFollowed: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        UserNameFollowed: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
