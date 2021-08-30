import { GET_CONTACTS_LIST } from './action-types';

export const updateContacts = (payload) => {
    return { 
        type: GET_CONTACTS_LIST, 
        data: payload
    }
};

/**
 * Normalize & categorize contacts data
 * @param { Array } categoriesArray -  plain array of category names  
 * @param { Array } usersList - array of contacts objects
 * @returns { Array } array of object split by categories
 */
const normalizeContactList = (categoriesArray, usersList) => {
    // create object out of categories names where category name == key
    const categories = categoriesArray.reduce((acc, next) => {
       acc[`${next}`] = {
            label: next,
            data: []
        }
        return acc
    },{})
    // map / reduce - contacts on to categories by user name first letter == category key
    const formattedUserList = usersList.reduce((acc, user) => {
        const userCategory = user.name.last.charAt(0).toLowerCase();
        acc[userCategory] && acc[userCategory].data.push(user); // skip users with non latin names
        return acc;
    }, categories)
    // convert object {key: data} into array of categories with contacts
    return Object.values(formattedUserList)
}

/**
 * Fetch contacts from server && normalize response for tabs display
 * @param { Object } config - request configuration object
 * @example { userUrl:<string> url, numberCards:<number> number, tabs: <[]<string>> array}
 */
export const getContactsList = (config) => {
    return (dispatch) => {
        return fetch(`${config.userUrl}?results=${config.numberCards}`)
        .then(response => response.json())
        .then(response => {
            dispatch(updateContacts(normalizeContactList(config.tabs, response.results)))
        })
    }
}