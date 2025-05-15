  import axios from 'axios';

  export default async function getCoordinates(address) {
      const fullAddress = `${address.logradouro}, ${address.localidade}, ${address.uf}, Brasil`;

      try { // Added try-catch for error handling
          const response = await axios.get('https://nominatim.openstreetmap.org/search', {
              params: {
                  q: fullAddress,
                  format: 'json',
                  addressdetails: 1,
                  limit: 1
              },
              headers: {
                  'User-Agent': 'DevBurguerApp/1.0'
              }
          });

          if (response.data.length === 0) {
              return { lat: null, lon: null };
          }

          const { lat, lon } = response.data[0];
          return { lat: parseFloat(lat), lon: parseFloat(lon) };

      } catch (error) { // Catch errors from Nominatim API
          console.error("Error fetching coordinates:", error);
          return { lat: null, lon: null }; // Important: Return null values on error
      }
  }