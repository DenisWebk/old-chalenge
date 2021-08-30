import React from 'react';
import Tab, { StyledTab } from 'components/functional/Tab/Tab';
import renderer from 'react-test-renderer';
import 'jest-styled-components'

const mockedProps = {
    active: {
        activeTab: 'a',
        label: "a",
        onClick: (val) => val
    },
    inactive: {
        activeTab: 'a',
        label: "b",
        onClick: (val) => val
    } 
}

it('Tab renders in active state', () => {
    const tree = renderer.create(
      <Tab 
      activeTab={mockedProps.active.activeTab} u
      label={mockedProps.active.label}
      onClick={mockedProps.active.onClick}>
          tab label
      </Tab>,
    ).toJSON();;
    const styledTree = renderer.create(<StyledTab cssBorderWidth="2px" />).toJSON()
    expect(tree.props.onClick()).toBe('a');
    expect(tree).toHaveStyleRule('border-bottom', '2px solid grey')
    expect(styledTree).toHaveStyleRule('border-bottom', '2px solid grey');
  });

it('Tab renders in inactive state', () => {
  const tree = renderer.create(
    <Tab 
    activeTab={mockedProps.inactive.activeTab}
    label={mockedProps.inactive.label}
    onClick={mockedProps.inactive.onClick}>
        tab label
    </Tab>,
  ).toJSON();
  const styledTree = renderer.create(<StyledTab/>).toJSON()
  expect(tree.props.onClick()).toBe('b');
  expect(tree).not.toHaveStyleRule('border-bottom', '2px solid grey')
  expect(styledTree).not.toHaveStyleRule('border-bottom', '2px solid grey')
});