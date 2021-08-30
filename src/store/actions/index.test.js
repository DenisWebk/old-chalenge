import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getContactsList } from 'store/actions';
import fetchMock from 'fetch-mock';
import { mockUser } from "components/containers/ContactList/mockUser"
import { contactListConfig } from "constants/contactListConfig";
const mockStore = configureStore([thunk])

it('store fetch contacts from API successfully', () => {

    fetchMock.getOnce(`${contactListConfig.userUrl}?results=${contactListConfig.numberCards}`, {
      body: { results: mockUser.data },
    });
    const store = mockStore({ contacts: [] });

    expect(store.getActions().length).toBe(0)
    store.dispatch(getContactsList(contactListConfig)).then(() => {
          expect(store.getActions().length).toBe(1)
    });
      
  });
