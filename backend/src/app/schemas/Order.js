import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true, // Corrigido "require" para "required"
        },
      },
    ],
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Agora no lugar correto
  }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;
