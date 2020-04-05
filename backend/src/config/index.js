
require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    JWT_SECRET: process.env.JWT_SECRET
}