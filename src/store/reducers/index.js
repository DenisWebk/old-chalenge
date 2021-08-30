import { GET_CONTACTS_LIST } from 'store/actions/action-types';

const InitialState = {
    contacts: []
}

export const contactsReducer = (state = InitialState, action) => {
    switch(action.type) {
        case GET_CONTACTS_LIST:
        return {
            ...state,
            contacts: action.data
        }
        default:
        return state
    }
    
}