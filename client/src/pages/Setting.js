import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledSettings = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
`;

const Header = styled.h1`
  display: inline-block;
  font-family: 'Oswald', sans-serif;
  font-size: 14rem;
  transform: rotate(270deg);
  text-transform: lowercase;
  color: #fa9f45;
  &:hover,
  &:active {
    span {
      transform: scale(1, 1) translateY(0rem);
    }
  }
  span {
    font-size: 14rem;
    transform: scale(-1, -1) translateY(-4.75rem);
    display: inline-block;
    color: #ffffff;
  }
`;

const StyledLink = styled(Link)`
  letter-spacing: -0.35rem;
  font-weight: 700;
  font-family: 'Oswald', sans-serif;
  font-size: 7.5rem;
  color: #ffffff;
  text-decoration: none;
  &:hover {
    transform: translateY(-0.25rem);
  }
`;

function Setting() {
  return (
    <StyledSettings>
      <div
        style={{
          borderBottom: '1px solid #BDAFA0',
          borderTop: '1px solid #BDAFA0',
          width: '100%',
          height: '93%',
          transform: 'translateY(4%)',
          position: 'absolute',
        }}
      ></div>
      <div
        style={{
          borderLeft: '1px solid #BDAFA0',
          width: '92%',
          height: '100%',
          transform: 'translateX(2%)',
          position: 'absolute',
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          height: '100%',
          transform: 'translateY(-5%)',
        }}
      >
        <Header>
          S<span>e</span>tt<span>in</span>gs
        </Header>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            transform: 'translateY(-5%)',
            gap: '6rem',
          }}
        >
          <StyledLink to={'/signup'}>update acct.</StyledLink>
          <StyledLink to={'/'}>delete acct.</StyledLink>
        </div>
      </div>
    </StyledSettings>
  );
}

export default Setting;
