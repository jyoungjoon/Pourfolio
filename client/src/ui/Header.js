import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Navigation from './Navigation';
import { styled } from 'styled-components';
import Auth from '../utils/auth';

const StyledHeader = styled.header`
  height: 15rem;
  border-bottom: 0.01rem solid #bdafa0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledWrapper = styled.div`
  display: flex;
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  font-size: 2.4rem;
  text-decoration: none;
  font-family: 'Oswald', sans-serif;
  font-weight: 100;
  &:hover {
    transform: translateY(-0.15rem);
  }
`;

function Header() {
  return (
    <StyledHeader>
      <StyledWrapper style={{ borderRight: '1px solid #bdafa0' }}>
        <Navigation />
      </StyledWrapper>
      <Logo />
      <StyledWrapper style={{ borderLeft: '1px solid #bdafa0' }}>
        {Auth.loggedIn() ? (
          <StyledLink>logged in</StyledLink>
        ) : (
          <StyledLink to="/signup">login / sign up</StyledLink>
        )}
      </StyledWrapper>
    </StyledHeader>
  );
}

export default Header;
