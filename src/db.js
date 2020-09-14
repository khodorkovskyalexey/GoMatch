const { Sequelize, Model, DataTypes } = require('sequelize')
require('dotenv').config()

const db = new Sequelize(process.env.DB_CONN)

const User = db.define('user', {
    token: Sequelize.UUID,
    name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    own_region: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    bio: Sequelize.TEXT,
    review: { type: Sequelize.REAL, defaultValue: 0 },
    counter_trip: { type: Sequelize.INTEGER, defaultValue: 0 },
})

const Car = db.define('car', {
    owner: Sequelize.UUID,
    name: Sequelize.STRING,
    year: Sequelize.INTEGER,
})

const Carpool = db.define('carpool', {
    carpool_id: Sequelize.UUID,
    owner: Sequelize.UUID,
    departure_time: Sequelize.DATE,
    match_id: Sequelize.INTEGER,
    own_region: Sequelize.STRING,
    location : Sequelize.STRING,
    seats_total : Sequelize.INTEGER,
})

const Request = db.define('request', {
    user_id : Sequelize.UUID,
    carpool_id : Sequelize.UUID,
    count: { type: Sequelize.INTEGER, defaultValue: 1 },
    approved: { type: Sequelize.BOOLEAN, defaultValue: false },
    author_role: Sequelize.INTEGER, // 1 - пассажир, 2 - водитель
})

const Passenger = db.define("freepassenger", {
    match_id: Sequelize.INTEGER,
    user_id: Sequelize.UUID,
    departure_time: Sequelize.DATE,
    location : Sequelize.STRING,
})

const Region = db.define("region", {
    name: Sequelize.STRING,
})

const Area = db.define("area", {
    region_name: Sequelize.STRING,
    name: Sequelize.STRING,
})

db.sync()

module.exports = {
    db,
    User,
    Car,
    Carpool,
    Request,
    Region,
    Passenger,
    Area,
}
