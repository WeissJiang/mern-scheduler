export const storeTickets = tickets => ({
    type: 'STORE_TICKETS',
    payload: tickets
});

export const getTicketById = id => ({
    type: 'GET_TICKET_BY_ID',
    payload: id
});