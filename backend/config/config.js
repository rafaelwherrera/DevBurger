module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "devburguer",
    host: "localhost",
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
      underscored_all: true
    }
  }
};
