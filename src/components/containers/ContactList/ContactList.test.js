import React from 'react';
import ContactList from 'components/containers/ContactList/ContactList';
import { create } from 'react-test-renderer';
import Tabs from 'components/containers/Tabs/Tabs';
import Tab from 'components/functional/Tab/Tab';
import 'jest-styled-components'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'
import { mockUser } from 'components/containers/ContactList/mockUser';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);
const store = mockStore({ contacts: [mockUser]});

it('renders Contact list & handles contact click', () => {
   const component = create(<Provider store={store}><ContactList/></Provider>);
   const componentInstance = component.root.findByType(ContactList.WrappedComponent).instance;
   const spy = jest.spyOn(componentInstance, 'handleContactClick');
   component.root.findByType(Tabs).props.onTabChange();
   component.root.findByType(Tab).props.onClick();
   expect(spy).toHaveBeenCalled();
});