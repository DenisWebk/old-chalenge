import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const StyledTab = styled.li`
    display: block;
    cursor: pointer;
    padding: 5px 10px 10px 10px;
    text-align: center;
    border-bottom: ${ props => props.cssBorderWidth || '1px' } solid grey;
    margin: 0 2px;
    font-size: 20px;
`
const SmallRemark = styled.span`
    font-size: 10px;
    padding: 4px;
`
/**
 * Renders single tab with attached call back function
 * @param { Object } props - react component props object
 * @property { String } activeTab - active tab label
 * @property { String } label - current tab label
 * @callback onClick - function with current tab label as argument
 * @returns { Object } - react Tab component
 */
function Tab(props) {
    const { activeTab, label, categoryEntries } = props;
    return (
        <StyledTab cssBorderWidth={activeTab === label ? '2px' : '1px'} 
        onClick={() => props.onClick(label)} >
            {label}
            { categoryEntries && <SmallRemark>{categoryEntries}</SmallRemark> }
        </StyledTab>
    );
}

Tab.propTypes = {
    activeTab: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

export default Tab