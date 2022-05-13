const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("PlanPremium", {
        idPlanPremium: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        namePlanPremium: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        priceMembership: {
        type: DataTypes.FLOAT,
        allowNull: false,
        },
        numberOfMonths: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
    },{timestamps: false});
};
