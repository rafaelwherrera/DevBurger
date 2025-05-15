// distance.js

import { getCoordinates } from './geolocation';  // Importando a função getCoordinates

import axios from 'axios';

async function calculateDeliveryTax(req, res) {
  const { cep } = req.params;

  try {
    // Obter o endereço do cliente através do CEP
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const clientAddress = response.data;

    if (!clientAddress || !clientAddress.logradouro) {
      return res.status(400).json({ error: 'CEP inválido ou não encontrado' });
    }

    // Obter as coordenadas do cliente
    const { lat: clientLat, lon: clientLon } = await getCoordinates(clientAddress);

    if (clientLat && clientLon) {
      const restaurantLat = -18.914; // Exemplo de lat do restaurante
      const restaurantLon = -48.278; // Exemplo de lon do restaurante

      // Calcular a taxa de entrega
      const deliveryTax = calculateTax(restaurantLat, restaurantLon, clientLat, clientLon);

      return res.json({ deliveryTax });
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
  const distance = R * c; // Distância em km

  return distance * 2; // Taxa de entrega em R$
}

export { calculateDeliveryTax };
