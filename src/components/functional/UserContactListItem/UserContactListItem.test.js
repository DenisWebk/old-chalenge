import React from 'react';
import UserContactListItem, {Close, UserShortInfo } from 'components/functional/UserContactListItem/UserContactListItem';
import { create, act } from 'react-test-renderer';
import 'jest-styled-components'
import { mockUser } from 'components/containers/ContactList/mockUser'

const mockedProps = {
    handleContactClick: (val) => val,
    userListIndex: 1,
    showDetailed: {
        active: true,
        inactive: false
    },
    user: mockUser.data[0]
}

it('UserContactLisItem renders in active state', () => {
    const component = create(
      <UserContactListItem 
        user={mockedProps.user}
        userListIndex={mockedProps.userListIndex}
        handleContactClick={mockedProps.handleContactClick} 
        showDetailed={mockedProps.showDetailed.active} />
    );
    expect(component.root.findByType(Close).props.onClick()).toBe(null);
    expect(component.root.findAllByType(UserShortInfo)[0].props.onClick()).toBe(1);
    expect(component.root.findAllByType(UserShortInfo)[0].props.cssCursor).toBe('default');
});

it('UserContactLisItem renders inactive state', () => {
    const component = create(
      <UserContactListItem 
        user={mockedProps.user}
        userListIndex={mockedProps.userListIndex}
        handleContactClick={mockedProps.handleContactClick} 
        showDetailed={mockedProps.showDetailed.inactive} />
    );
    expect(component.root.findAllByType(UserShortInfo)[0].props.cssCursor).toBe('pointer');
});