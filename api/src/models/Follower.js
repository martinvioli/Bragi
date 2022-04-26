const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Follower", {
        IdFollower: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        UserProfileFollower: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        UserNameFollower: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
