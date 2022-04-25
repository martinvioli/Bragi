const sequelize = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("StateUser", {
        IdStateUser: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        NameStateUser: {
        type: DataTypes.ENUM('Active', 'Banned', 'Inactive'),
        allowNull: false,
        },
        DateStateUser: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    });
};
