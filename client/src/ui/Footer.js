import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import { FiCamera } from 'react-icons/fi';
import { RiGovernmentLine } from 'react-icons/ri';
import { PiWineFill } from 'react-icons/pi';
import { BsFacebook } from 'react-icons/bs';
import { AiOutlineInstagram } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
import { CgTwitter } from 'react-icons/cg';
const StyledFooter = styled.footer`
  background-color: #00434d;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const StyledEmpty = styled.div`
  border-right: 0.01rem solid #bdafa0;
  flex: 1 1 auto;
`;
const StyledLinks = styled.div`
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
  text-align: center;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  border-top: 0.01rem solid #bdafa0;
  flex: 1 1 auto;
`;
const StyledIcons = styled.div`
  display: flex;
  width: 25%;
  justify-content: space-evenly;
`;
const StyledLogo = styled.div`
  border-top: 0.01rem solid #bdafa0;
  border-bottom: 0.01rem solid #bdafa0;
  border-right: 0.01rem solid #bdafa0;
  height: 30%;
  flex: 1 1 auto;
`;
function Footer() {
  return (
    <StyledFooter>
      <StyledLeftPanel>
        <StyledEmpty />
        <StyledLogo>
          <Logo />
        </StyledLogo>
        <StyledEmpty />
      </StyledLeftPanel>
      <StyledRightPanel>
        <StyledLinks>
          <ul>
            <li>
              https://catalog.data.gov/dataset&nbsp;&nbsp;
              <RiGovernmentLine />
            </li>
            <li>
              https://www.liv-ex.com/&nbsp;&nbsp;
              <PiWineFill />
            </li>
            <li>
              https://www.pexels.com/@cottonbro/&nbsp;&nbsp;
              <FiCamera />
            </li>
            <li>
              https://www.instagram.com/ptankilevitch/?hl=en&nbsp;&nbsp;
              <FiCamera />
            </li>
            <li>
              https://www.pexels.com/@karolina-grabowska/&nbsp;&nbsp;
              <FiCamera />
            </li>
          </ul>
        </StyledLinks>
        <StyledTeam>
          <ul>
            <li>team leafy locators</li>
            <li>© 2023 all rights reserved</li>
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
