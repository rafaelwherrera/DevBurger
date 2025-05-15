import app from './app.js';
import { setupSocket } from './socket.js';

const port = 3001;

const server = app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});

setupSocket(server);

// Rota extra para taxa de entrega
const calculateTaxBasedOnCep = (cep) => {
  if (cep.startsWith('01')) {
    return 500;
  } else {
    return 700;
  }
};

app.get('/calculate-delivery-tax/:cep', (req, res) => {
  const { cep } = req.params;
  const deliveryTax = calculateTaxBasedOnCep(cep);
  res.json({ deliveryTax });
});
