import * as Yup from 'yup';
import Order from '../schemas/Order';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User'; // importa o User para buscar se é admin
import { emitNewOrder } from '../../server'; // Importe a função emitNewOrder

export const createOrder = async (req, res) => {
  try {
    const { total, user_id, products } = req.body;
    const newOrder = await OrderMongo.create({ total, user_id, products, status: 'Pendente' });

    // Emitir o evento de novo pedido para o dashboard
    emitNewOrder(newOrder);

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return res.status(500).json({ message: 'Erro ao criar pedido.' });
  }
};

class OrderController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          })
        )
        .required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { products } = request.body;

    const productsIds = products.map((product) => product.id);

    const findProducts = await Product.findAll({
      where: { id: productsIds },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });

    const formattedProdutcs = findProducts.map((product) => {
      const productIndex = products.findIndex((item) => item.id === product.id);
      return {
        id: product.id,
        name: product.name,
        category: product.category.name,
        price: product.price,
        url: product.url,
        quantity: products[productIndex].quantity,
      };
    });

    // 🔍 Buscar o usuário no banco relacional
    const user = await User.findByPk(request.userId);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const order = {
      user: {
        id: request.userId,
        name: request.userName,
        admin: user.admin, // 👈 adiciona campo admin ao pedido
      },
      products: formattedProdutcs,
      status: 'Pedido realizado com sucesso!',
    };

    const createdOrder = await Order.create(order);

    return response.status(201).json(createdOrder);
  }

  async index(request, response) {
    const orders = await Order.find();
    return response.json(orders);
  }

  async update(request, response) {
    const schema = Yup.object({
      status: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { id } = request.params;
    const { status } = request.body;

    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    return response.json({ message: 'Status updated successfully' });
  }
}

export default new OrderController();
