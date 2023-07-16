const { sequelize } = require('../database/connect');
const Sequelize = require("sequelize");

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("../models/userModel");



module.exports = db;