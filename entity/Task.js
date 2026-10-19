const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Task=sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
    }, {
    tableName: 'tasks',
    timestamps: true
});

module.exports = Task;