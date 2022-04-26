const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Follower", {
        idFollower: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        userProfileFollower: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        userNameFollower: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
