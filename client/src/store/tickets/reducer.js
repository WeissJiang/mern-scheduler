const initialState = {
    tickets: [],
    selectedTicket: null
};

const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_TICKETS':
            return {
                ...state,
                tickets: action.payload
            };
        case 'GET_TICKET_BY_ID':
            return {
                ...state,
                selectedTicket: state.tickets.find(ticket => ticket._id === action.payload)
            };
        default:
            return state;
    }
};

export default ticketsReducer;