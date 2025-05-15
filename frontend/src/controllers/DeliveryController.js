import axios from 'axios';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (deg) => deg * (Math.PI / 180);
  
  const R = 6371;  
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; 
  return distance;
};

class DeliveryController {
  async calculateDeliveryFee(request, response) {
    const { cep } = request.params; 

    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (data.erro) {
        return response.status(400).json({ error: 'CEP não encontrado' });
      }

      const lojaLatitude = -23.550520;  
      const lojaLongitude = -46.633308; 

      const clienteLatitude = -23.5489; 
      const clienteLongitude = -46.6388; 

      const distance = calculateDistance(lojaLatitude, lojaLongitude, clienteLatitude, clienteLongitude);
      
      let deliveryFee = 5.00; 
      if (distance > 2) {
        const additionalDistance = distance - 2;
        deliveryFee += additionalDistance * 2;
      }

      const isPeakHours = new Date().getHours() >= 18 && new Date().getHours() <= 20; 
      if (isPeakHours) {
        deliveryFee += 3; 
      }

      return response.status(200).json({
        cep,
        address: data,
        distance: distance.toFixed(2),
        deliveryFee: deliveryFee.toFixed(2), 
      });
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao calcular taxa de entrega' });
    }
  }
}

export default new DeliveryController();
