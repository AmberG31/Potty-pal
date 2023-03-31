async function convertAddressToGeolocation(address) {
  const nominatimEndpoint = 'https://nominatim.openstreetmap.org/search';
  const query = `q=${encodeURIComponent(address)}&format=json&limit=1`;

  try {
    const response = await fetch(`${nominatimEndpoint}?${query}`);
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      const geolocation = { type: 'Point', coordinates: [lon, lat] };

      // create a new Address document using the schema
      const newAddress = new Address({ geolocation });
      await newAddress.save();

      return geolocation;
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to convert address to geolocation');
  }
}
