const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("StateUser", {
        idStateUser: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        nameStateUser: {
        type: DataTypes.ENUM('Active', 'Banned', 'Inactive'),
        allowNull: false,
        },
        dateStateUser: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    });
};
