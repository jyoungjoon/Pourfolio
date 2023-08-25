import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Audio } from 'react-loader-spinner';

const StyledLoader = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  margin: 0;
  overflow: hidden;
  z-index: 500;
  font-family: 'Oswald', sans-serif;
`;

const LetterP = styled.span`
  display: inline-block;
  font-family: 'Princess Sofia', cursive;
  font-size: 11rem;
  color: #00434d;
  transform: rotate(17.5deg) translate(3.75rem, -3.5rem);
`;

const LetterPour = styled.span`
  letter-spacing: 0.025rem;
  text-align: end;
  display: block;
  transform: translateY(30rem);
  padding-right: 0.75rem;
`;

const Folio = styled.span`
  letter-spacing: 0.025rem;
  text-align: start;
  display: block;
  transform: translateY(32rem);
  font-family: 'Yellowtail', cursive;
  font-size: 8.64rem;
  color: #00434d;
`;

const OurPart = styled.span`
  letter-spacing: 0.025rem;
  font-family: 'Yellowtail', cursive;
  font-size: 8.64rem;
  color: #00434d;
`;

const SplitContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const LeftPanel = styled.div`
  width: 50%;
  height: 100vh;
  z-index: 999;
  transition: transform 1s ease-in-out;
  background-color: #fa9f45;
`;

const RightPanel = styled.div`
  width: 50%;
  height: 100vh;
  z-index: 999;
  transition: transform 1s ease-in-out;
  background-color: #fa9f45;
`;

function Loader({ loading }) {
  const [isClicked, setIsClicked] = useState(false);

  return ReactDOM.createPortal(
    <StyledLoader
      style={{
        display: isClicked ? 'none' : '',
      }}
      onClick={() => setIsClicked(!isClicked)}
    >
      <SplitContainer>
        <LeftPanel
          style={{
            transform: loading ? 'translateX(-0%)' : 'translateX(-100%)',
          }}
        >
          <LetterPour>
            <LetterP>P</LetterP>
            <OurPart>our</OurPart>
          </LetterPour>
        </LeftPanel>
        <RightPanel
          style={{
            transform: loading ? 'translateX(0%)' : 'translateX(100%)',
          }}
        >
          <Folio>folio</Folio>
          <Audio
            height="100"
            width="100"
            color="#00434d"
            ariaLabel="audio-loading"
            wrapperStyle={{
              position: 'absolute',
              bottom: '5%',
              right: '5%',
            }}
            wrapperClass="wrapper-class"
            visible={true}
          />
        </RightPanel>
      </SplitContainer>
    </StyledLoader>,
    document.body
  );
}

export default Loader;
