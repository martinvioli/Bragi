const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("MembershipUser", {
        idMembershipUser: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        statePlan: {
        type: DataTypes.ENUM('Active', 'Debtor', 'Outstanding', 'Inactive'),
        allowNull: false,
        default: 'Inactive'
        },
        dateStart: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateExpiry: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    },{timestamps: false});
};
