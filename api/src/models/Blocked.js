const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("BlockedUser", {
        IdBlocked: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        UserProfileBlocked: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        UserNameBlocked: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DateBlocked: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        IsBlocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
};
