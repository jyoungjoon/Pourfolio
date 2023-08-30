import React from 'react';
import styled from 'styled-components';

import { FiCamera } from 'react-icons/fi';
import { RiGovernmentLine } from 'react-icons/ri';
import { PiWineFill } from 'react-icons/pi';
import { BsFacebook } from 'react-icons/bs';
import { AiOutlineInstagram } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
import { CgTwitter } from 'react-icons/cg';

const StyledFooter = styled.footer`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const StyledLeftPanel = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledRightPanel = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledEmpty = styled.div`
  border-right: 0.01rem solid #bdafa0;
  flex: 1 1 auto;
`;

const StyledLinks = styled.div`
  height: 50%;
  display: flex;
  text-align: end;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  flex: 1 1 auto;
`;

const StyledTeam = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  text-align: center;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  border-top: 0.01rem solid #bdafa0;
  flex: 1 1 auto;
`;

const StyledIcons = styled.div`
  transform: translateX(1rem);
  display: flex;
  width: 25%;
  justify-content: space-evenly;
  font-size: 3.25rem;
`;

const StyledLogo = styled.div`
  border-top: 0.01rem solid #bdafa0;
  border-bottom: 0.01rem solid #bdafa0;
  border-right: 0.01rem solid #bdafa0;
  height: 30%;
  flex: 1 1 auto;
`;

const StyledP = styled.span`
  display: inline-block;
  font-family: 'Princess Sofia', cursive;
  font-size: 27.5rem;
  color: #fa9f45;
  transform: rotate(17.5deg) translate(9rem, -8rem);
`;

const StyledOur = styled.span`
  letter-spacing: 0.025rem;
  transform: translateY(30rem);
  font-family: 'Yellowtail', cursive;
  font-size: 20.16rem;
  color: #fa9f45;
`;

const StyledFolio = styled.span`
  font-family: 'Yellowtail', cursive;
  font-size: 20.16rem;
  letter-spacing: 0.025rem;
  transform: translateY(31rem);
  color: #fa9f45;
`;

const WebLink = styled.a`
  text-decoration: none;
  color: white;
  &:link {
    text-decoration: none;
    color: white;
  }
  &:visited {
    text-decoration: none;
    color: white;
  }
  &:active {
    text-decoration: none;
    color: white;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <StyledLeftPanel>
        <StyledEmpty />
        <StyledLogo>
          <div style={{ transform: 'translateY(6rem) translateX(4rem)' }}>
            <StyledP>P</StyledP>
            <StyledOur>our</StyledOur>
            <StyledFolio>folio</StyledFolio>
          </div>
        </StyledLogo>
        <StyledEmpty />
      </StyledLeftPanel>
      <StyledRightPanel>
        <StyledLinks>
          <ul>
            <li
              style={{
                fontSize: '2rem',
                listStyle: 'none',
                paddingBottom: '2rem',
              }}
            >
              <WebLink
                style={{
                  fontSize: '2rem',
                }}
                href="https://catalog.data.gov/dataset"
                target="none"
              >
                https://catalog.data.gov/dataset&nbsp;&nbsp;
                <RiGovernmentLine
                  style={{ fontSize: '3rem', transform: 'translateY(.5rem)' }}
                />
              </WebLink>
            </li>
            <li
              style={{
                fontSize: '2rem',
                listStyle: 'none',
                paddingBottom: '2rem',
              }}
            >
              <WebLink
                style={{
                  fontSize: '2rem',
                }}
                href="https://www.liv-ex.com"
                target="none"
              >
                https://www.liv-ex.com/&nbsp;&nbsp;
                <PiWineFill
                  style={{ fontSize: '3rem', transform: 'translateY(.5rem)' }}
                />
              </WebLink>
            </li>
            <li
              style={{
                fontSize: '2rem',
                listStyle: 'none',
                paddingBottom: '2rem',
              }}
            >
              <WebLink
                style={{
                  fontSize: '2rem',
                }}
                href="https://www.pexels.com/@cottonbro/"
                target="none"
              >
                https://www.pexels.com/@cottonbro/&nbsp;&nbsp;
                <FiCamera
                  style={{ fontSize: '3rem', transform: 'translateY(.5rem)' }}
                />
              </WebLink>
            </li>
            <li
              style={{
                fontSize: '2rem',
                listStyle: 'none',
                paddingBottom: '2rem',
              }}
            >
              <WebLink
                style={{
                  fontSize: '2rem',
                }}
                href="https://www.instagram.com/ptankilevitch/?hl=en"
                target="none"
              >
                https://www.instagram.com/ptankilevitch/?hl=en&nbsp;&nbsp;
                <FiCamera
                  style={{ fontSize: '3rem', transform: 'translateY(.5rem)' }}
                />
              </WebLink>
            </li>
            <li style={{ fontSize: '2rem', listStyle: 'none' }}>
              <WebLink
                style={{
                  fontSize: '2rem',
                }}
                href="https://www.pexels.com/@karolina-grabowska/"
                target="none"
              >
                https://www.pexels.com/@karolina-grabowska/&nbsp;&nbsp;
                <FiCamera
                  style={{ fontSize: '3rem', transform: 'translateY(.5rem)' }}
                />
              </WebLink>
            </li>
          </ul>
        </StyledLinks>
        <StyledTeam>
          <ul>
            <li
              style={{
                fontSize: '3.5rem',
                listStyle: 'none',
                paddingBottom: '2rem',
              }}
            >
              team leafy locators
            </li>
            <li
              style={{
                fontSize: '1.5rem',
                listStyle: 'none',
              }}
            >
              © 2023 all rights reserved
            </li>
          </ul>
          <StyledIcons>
            <BsFacebook />
            <AiOutlineInstagram />
            <BsGithub />
            <CgTwitter />
          </StyledIcons>
        </StyledTeam>
      </StyledRightPanel>
    </StyledFooter>
  );
}

export default Footer;
