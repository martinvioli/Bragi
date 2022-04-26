const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("TypeUser", {
        idTypeUser: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        nameTypeUser: {
        type: DataTypes.ENUM('Premium', 'Standard'),
        allowNull: false,
        },
        dateTypeUser: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    });
};
