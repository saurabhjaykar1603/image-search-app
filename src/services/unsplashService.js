import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
      Authorization: 'Client-ID 5eUslWw8uROEku_R-kePf4MvmeaGLB6wPM8501fLsl4',
    },
  });;
  
  export const searchImages = async (query, page) => {
    try {
      const response = await api.get('/search/photos', {
        params: {
          query,
          page,
          per_page: 6,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  };
  
  export const getRandomImagebyId = async (id) => {
    try {
      const response = await api.get(`/photos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching random images:', error);
      throw error;
    }
  };
  
  