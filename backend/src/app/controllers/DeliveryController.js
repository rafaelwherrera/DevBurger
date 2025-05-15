import axios from 'axios';
import getCoordinates from '../../services/geolocation';

export async function calculateDeliveryTax(req, res) {
  const { cep } = req.params;

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const clientAddress = response.data;

    if (!clientAddress || !clientAddress.logradouro) {
      return res.status(400).json({ error: 'CEP inválido ou não encontrado' });
    }

    const { lat: clientLat, lon: clientLon } = await getCoordinates(clientAddress);

    if (clientLat && clientLon) {
      const restaurantLat = -18.914; 
      const restaurantLon = -48.278; 

      const deliveryTax = calculateTax(restaurantLat, restaurantLon, clientLat, clientLon);
      
      // Log para verificar o valor de taxa de entrega
      
      const deliveryOptions = [
        { id: 'delivery', name: 'Entrega', price: deliveryTax },
        { id: 'pickup', name: 'Retirar na loja', price: 0 }
      ];

      return res.json({ deliveryTax, deliveryOptions });
    } else {
      return res.status(400).json({ error: 'Coordenadas não encontradas' });
    }
  } catch (error) {
    console.error('Erro ao calcular a taxa de entrega:', error);
    return res.status(500).json({ error: 'Erro interno ao calcular a taxa de entrega' });
  }
}


// Função para calcular a distância entre as coordenadas
function calculateTax(lat1, lon1, lat2, lon2) {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance * 2; // Exemplo de taxa de entrega com base na distância
}
