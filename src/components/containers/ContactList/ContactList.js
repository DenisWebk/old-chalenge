import React from 'react';
import Tabs from 'components/containers/Tabs/Tabs';
import { connect } from 'react-redux';
import { getContactsList } from 'store/actions';
import { contactListConfig } from 'constants/contactListConfig';
import UserContactListItem from 'components/functional/UserContactListItem/UserContactListItem'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Title = styled.h2`
    text-align: center;
    font-weight: 100;
`

/**
 * Creates user contact list fetched from server via store action by provided configuration to arrange fetched contacts
 * with categorization of user contacts by last name first letter
 * splitted in tabs with letter as tab label and contact name, last name in short description in tab content
 * provides detailed contact information by clicking on contact short description to only one contact entry.
 */
class ContactList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeUserCardIndex: null
        }
    }

    /**
     * Update current open contact index
     * @param { Number } contactIndex - current open detailed contact index in current tab
     * @returns { Void }
     */
    handleContactClick = (contactIndex) => {
        this.setState({
            activeUserCardIndex: contactIndex
        })
    };

    /**
     * Renders user contact data in short / detailed format
     * @param { Array } users - current tab contacts
     * @returns { Array } users contacts react components collection
     */
    renderUsersData = (users) => {
        const { activeUserCardIndex } = this.state;
        const { handleContactClick } = this;
        return users && users.map((user, index) => {
            return(
                <UserContactListItem 
                user={user}
                userListIndex={index}
                handleContactClick={handleContactClick} 
                showDetailed={activeUserCardIndex === index} 
                key={index}  />
            )
        })
    }

    /**
     * Prepares content to be passed to the Tabs component
     * @param { Array } tabsData - array of tabs objects. tab Object example:
     * @example {label: 'a', data: [...{...contactData}]}
     * @returns { Array } users contacts react components collection
     */
    renderTabs = (tabsData) => {
        const { renderUsersData } = this;
        return tabsData.map(tabData => {
            return (
                <div label={tabData.label} categoryEntries={tabData.data.length} key={tabData.label}>
                   {renderUsersData(tabData.data)}
                </div>
            )
        }) 
    }

    componentDidMount() {
        // fetch contacts based on contactListConfig file
        this.props.getContactsList(contactListConfig);
    }

    render() {
        const { contacts } = this.props;
        const { handleContactClick, renderTabs } = this;
        const tabsContent = renderTabs(contacts);
        return (
            <div className='contact-list-container'>
                <Title>Contact list</Title>
                {tabsContent.length && <Tabs onTabChange={() => handleContactClick(null)}>{tabsContent}</Tabs>}
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        contacts: state.contacts
    }
}

ContactList.propTypes = {
    contacts: PropTypes.array,
    contactIndex: PropTypes.func
};

export default connect(mapState, { getContactsList })(ContactList);