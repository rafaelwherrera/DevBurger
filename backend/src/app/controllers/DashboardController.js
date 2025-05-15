import Product from '../models/Product.js';
import User from '../models/User.js';
import { OrderMongo } from '../../database/mongo.js';

export const getDashboard = async (req, res) => {
  try {
    // Contagem de pedidos (MongoDB)
    const totalPedidos = await OrderMongo.countDocuments();

    // Faturamento (MongoDB)
    const pedidos = await OrderMongo.find();
    const faturamento = pedidos.reduce((acc, p) => acc + p.total, 0);

    // Vendas mensais (MongoDB)
    const vendasMensais = Array(12).fill(0);
    pedidos.forEach(p => {
      const mes = new Date(p.createdAt).getMonth();
      vendasMensais[mes] += p.total;
    });

    // Contagem de produtos (Sequelize)
    const totalProdutos = await Product.count();

    // Contagem de clientes (Sequelize)
    const totalClientes = await User.count();

    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const vendasFormatadas = vendasMensais.map((v, i) => ({ mes: meses[i], vendas: v }));

    // Produtos Mais Vendidos (MongoDB)
    const produtosMaisVendidos = await OrderMongo.aggregate([
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products.id',
          nome: { $first: '$products.name' },
          totalVendido: { $sum: '$products.quantity' },
        },
      },
      { $sort: { totalVendido: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, id: '$_id', nome: 1, totalVendido: 1 } },
    ]);

    res.json({
      faturamento: faturamento || 0,
      pedidos: totalPedidos || 0,
      produtos: totalProdutos || 0,
      clientes: totalClientes || 0,
      vendasMensais: vendasFormatadas || [],
      produtosMaisVendidos: produtosMaisVendidos || [], // Adiciona aqui!
    });
  } catch (error) {
    console.error("Erro ao carregar dashboard:", error);
    res.status(500).json({ message: "Erro ao carregar dados do dashboard." });
  }
};