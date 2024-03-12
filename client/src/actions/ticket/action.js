import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTgyNjBlODhiMTcyNzNjNTJhNzcwMyIsImlhdCI6MTcxMDIzMzIwMCwiZXhwIjoxNzEwMjc2NDAwfQ.EmNQpSsb6lOh7y6LEFAliD_pRhs3WQS4WarBm9592g8';

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