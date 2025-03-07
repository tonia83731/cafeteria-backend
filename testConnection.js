const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DIGITALOCEAN_DATABASE_URL, {
  dialect: "mysql",
  logging: console.log,
});

sequelize
  .authenticate()
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.error("Database connection failed:", err));
