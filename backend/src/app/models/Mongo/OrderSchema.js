import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    total: Number,
    user_id: String,
    status: String,
    createdAt: Date,
    updatedAt: Date,
    // Adicione outros campos conforme a estrutura da sua coleção 'orders' no MongoDB
}, { timestamps: true });

export default OrderSchema;