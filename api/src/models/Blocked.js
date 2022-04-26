const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("BlockedUser", {
        idBlocked: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        userProfileBlocked: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        userNameBlocked: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateBlocked: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
};
