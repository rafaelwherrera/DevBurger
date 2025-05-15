import Sequelize from "sequelize";
import mongoose from "mongoose";

const config = require('../../config/config');

import User from "../app/models/User";
import Product from "../app/models/Product";
import Category from "../app/models/Category";

const models = { User, Product, Category };

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        const environment = process.env.NODE_ENV || 'development';
        const configDatabase = config[environment];
        this.connection = new Sequelize(configDatabase);

        Object.values(models)
            .map((model) => model.init(this.connection))
            .map((model) => model.associate && model.associate(this.connection.models));
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/devburguer',
        );
    }
}

export default new Database();