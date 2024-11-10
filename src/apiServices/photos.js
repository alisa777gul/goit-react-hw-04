import axios from 'axios';

const API_KEY = 'bUuQU9vNw29_3pq-L4Ic_UVmR4XEa6p9U6xavPTZw3A';
axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${API_KEY}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const getPhotos = async (query, page, per_page) => {
  try {
    console.log('Request Headers:', axios.defaults.headers.common);
    const { data } = await axios.get('search/photos', {
      params: {
        query,
        page,
        orientation: 'landscape',
        per_page,
      },
    });
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching photos:', error.message);
    throw error;
  }
};

export default getPhotos;
