import React from 'react';
import Tabs from 'components/containers/Tabs/Tabs';
import Tab from 'components/functional/Tab/Tab';
import { create } from 'react-test-renderer';

it('renders Tabs component & handles tab click', () => {
    const mockCallback = jest.fn(() => 2);
    const component = create(<Tabs onTabChange={mockCallback}>
        <div label="hello">
            world
        </div>
        <div label="world">
            hello
        </div>
    </Tabs>);
    component.root.findAllByType(Tab)[0].props.onClick();
    expect(mockCallback.mock.calls.length).toBe(1);
 });
