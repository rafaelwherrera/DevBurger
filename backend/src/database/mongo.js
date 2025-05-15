console.log("Arquivo mongo.js carregado!");
import mongoose from 'mongoose';
import OrderSchema from '../app/models/Mongo/OrderSchema'; 

mongoose.connect('mongodb://localhost:27017/devburguer', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

export const OrderMongo = mongoose.model('OrderMongo', OrderSchema, 'orders');