import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

export const Close = styled.span`
    position: absolute;
    left: 0;
    top: 5;
    width: 15px;
    height: 15px;
    opacity: 0.3;
    z-index: 3;
    cursor: pointer;
    
    ::Before, ::after {
        position: absolute;
        left: 7px;
        content: ' ';
        height: 15px;
        width: 2px;
        background-color: #333;
    }

    ::before {
        transform: rotate(45deg);
    }

    ::after {
        transform: rotate(-45deg);
    }
`;

export const UserShortInfo = styled.p`
    font-size: ${ props => props.fontSize || null };
    margin: ${ props => props.cssMargin || 0 };
    border-bottom: 1px solid lightgrey;
    margin-right: 20px;
    padding-bottom: 5px;
    word-break: break-all;
    cursor: ${ props => props.cssCursor || "default" };
`
export const UserContainer = styled.li`
    display:block;
    width: 100%;
    position: relative;
    ${breakpoint('desktop')`
        width: 50%;
    `}
`
export const UserDetailedInfo = styled.div`
    flex-direction: ${props => props.direction || 'row'};
    transition: all 0.5s ease-out;
    overflow: hidden;
    display: ${props => props.cssDisplay || 'flex'};
    position: ${props => props.cssPosition || 'static' };
    width: 100%;
    background: #fff;
    z-index: 2;
    padding: 10px 10px 20px 10px;
    ${props => props.cssShadow ? "box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);" : null}
`
export const UserImage = styled.img`
    height: 128px;
    margin-right: 20px;
    border-radius: 100%;
`;

/**
 * Renders user list data component with attached callback function on close and user short info click
 * @param { Object } props - component props
 * @property { Object } user - user data object
 * @callback handleContactClick - call back function with user index argument
 * @property { number } userListIndex - user list index
 * @property { boolean } showDetailed - is detailed card expanded
 * @returns { Object } UserContactListItem - react component
 */
function UserContactListItem(props) {
    const { user, handleContactClick, userListIndex, showDetailed } = props;
    return (
        <UserContainer>
            <UserShortInfo
            onClick={() => handleContactClick(userListIndex)}
            cssCursor={showDetailed ? 'default' : "pointer"}>
                {user.name.first}, {user.name.last}  
            </UserShortInfo>
            <UserDetailedInfo 
             cssPosition="absolute"
             cssShadow={true}
             cssDisplay={ showDetailed ? "flex" : "none"}>
             <Close onClick={() => handleContactClick(null)} />
             <UserImage src={user.picture.large}/>
             <UserDetailedInfo direction="column">
                <UserShortInfo>
                     <strong>Username:</strong> {user.login.username}
                 </UserShortInfo>
                 <UserShortInfo>
                     <strong>Email:</strong> {user.email}
                 </UserShortInfo>
                 <UserShortInfo >
                     <strong>Phone:</strong> {user.phone}
                 </UserShortInfo>
                 <UserShortInfo>
                    <strong>Street:</strong> {user.location.street.name} {user.location.street.number}
                 </UserShortInfo>
                 <UserShortInfo>
                    <strong>City:</strong> {user.location.city}
                 </UserShortInfo>
                 <UserShortInfo>
                     <strong>State:</strong> {user.location.state}
                 </UserShortInfo>
                 <UserShortInfo>
                     <strong>Postcode:</strong> {user.location.postcode}
                 </UserShortInfo>
             </UserDetailedInfo>
         </UserDetailedInfo>
     </UserContainer>
    );
}

UserContactListItem.propTypes = {
    showDetailed: PropTypes.bool,
    userListIndex: PropTypes.number,
    handleContactClick: PropTypes.func,
    user: PropTypes.object
};

export default UserContactListItem