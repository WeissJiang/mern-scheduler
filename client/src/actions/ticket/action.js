import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;
const token = '';

const apiInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const handleError = (error) => {
  console.error(error);
  throw error;
};

export const getStories = async () => {
    return await apiInstance.get('/story')
      .then(response => response.data)
      .catch(handleError);
};


/**
 * Ticket CRUD section
 */
export const getTickets = async () => {
    return await apiInstance.get('/ticket')
      .then(response => response.data)
      .catch(handleError);
};

export const updateTicket = async (id, data) => {
    return apiInstance.patch(`/ticket/${id}`, data)
    .then(response => response.data)
    .catch(handleError);
}