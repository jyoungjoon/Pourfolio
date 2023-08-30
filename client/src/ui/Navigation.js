import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Auth from '../utils/auth';

const StyledNavigation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 1rem;
  &:hover {
    transform: translateY(-0.15rem);
  }
  overflow: hidden;
`;

const NavBackground = styled.div`
  position: absolute;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background-image: radial-gradient(#00434d, #bdafa0);
  z-index: 50;
  transition: transform 0.55s cubic-bezier(0.86, 0, 0.07, 1);
  transform: ${({ open }) => (open ? 'scale(1000)' : 'scale(0)')};
  transform-origin: center center;
  overflow: hidden;
`;

const NavBurger = styled.span`
  position: relative;
  transform: translateY(0.35rem);

  &,
  &::before,
  &::after {
    width: 3rem;
    height: 1px;
    background-color: #ffffff;
    display: inline-block;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    transition: all 0.2s;
  }

  &::before {
    top: -0.9rem;
  }

  &::after {
    top: 0.9rem;
  }
`;

const Nav = styled.nav`
  transform: translateY(-10rem);
  height: 100dvh;
  width: ${({ open }) => (open ? '100%' : '0%')};
  position: fixed;
  top: 0;
  left: ${({ open }) => (open ? '0' : '-100%')};
  z-index: 60;
  opacity: ${({ open }) => (open ? '1' : '0')};
  transition: all 0.55s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;

const NavList = styled.ul`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  list-style: none;
  text-align: center;
  width: 100%;
`;

const NavItem = styled.li`
  margin: 2rem;
`;

const NavLink = styled(Link)`
  font-family: 'Oswald', sans-serif;
  &:link,
  &:visited {
    display: inline-block;
    font-size: 7.2rem;
    font-weight: 900;
    color: #fa9f45;
    padding: 1rem 2rem;
    text-decoration: none;
    background-image: linear-gradient(
      120deg,
      transparent 0%,
      transparent 50%,
      #00434d 50%
    );
    background-size: 250%;
    transition: all 0.3s;

    span {
      font-size: 7.2rem;
      transform: scale(-1, -1) translateY(-2.32rem);
      display: inline-block;
      color: #ffffff;
    }
  }

  &:hover,
  &:active {
    background-position: 100%;
    color: #fa9f45;
    transform: translateX(0.15rem);
    span {
      transform: scale(1, 1) translateY(0rem);
    }
  }
`;

const CloseButton = styled.span`
  position: relative;
  text-align: center;
  display: inline-block;
  background-color: #fa9f45;
  height: 5rem;
  width: 5rem;
  margin-top: 3rem;
  border-radius: 50%;
  box-shadow: 0 1rem 3rem rgba($color-black, 0.1);
  cursor: pointer;
  &:hover {
    transform: translateY(-0.2rem);
  }

  span {
    display: flex;
    font-size: 3.5rem;
    justify-content: center;
    align-items: center;
    color: #00434d;
  }
`;

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  function handleNav(e) {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <StyledNavigation open={isOpen ? true : false} onClick={handleNav}>
        <span
          style={{
            fontSize: '2.4rem',
            color: '#ffffff',
            fontFamily: "'Oswald', sans-serif",
            fontWeight: '100',
          }}
        >
          menu
        </span>
        <NavBurger />
      </StyledNavigation>
      <NavBackground open={isOpen ? true : false} onClick={handleNav} />
      <Nav open={isOpen ? true : false}>
        <NavList>
          <NavItem>
            <NavLink to={'/search'} onClick={handleNav}>
              s<span>e</span>arch
            </NavLink>
          </NavItem>
          {Auth.loggedIn() ? (
            <>
              <NavItem>
                <NavLink to={'/cellar'} onClick={handleNav}>
                  <span>m</span>y c<span>e</span>llar
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={'/setting'} onClick={handleNav}>
                  s<span>e</span>tt<span>in</span>gs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => Auth.logout()}>logout</NavLink>
              </NavItem>
            </>
          ) : (
            ''
          )}{' '}
          <CloseButton onClick={handleNav}>
            <span>&#x2715;</span>
          </CloseButton>
        </NavList>
      </Nav>
    </div>
  );
}

export default Navigation;
