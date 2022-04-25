const sequelize = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("TypeUser", {
        IdTypeUser: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        NameTypeUser: {
        type: DataTypes.ENUM('Premium', 'Standard'),
        allowNull: false,
        },
        DateTypeUser: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    });
};
