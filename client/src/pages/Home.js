import React from 'react';
import styled from 'styled-components';

const StyledHome = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BorderBoxOne = styled.div`
  position: absolute;
  border: 1px solid #bdafa0;
  width: 95%;
  left: 2%;
  height: 92.5%;
  top: 3%;
  opacity: 1;
`;

const BorderBoxTwo = styled.div`
  position: absolute;
  border: 1px solid #bdafa0;
  width: 95%;
  left: 4%;
  height: 92.5%;
  top: 6%;
  opacity: 1;
`;

const VideoPlayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 102%;
  width: 100%;
  opacity: 0.5;
  overflow: hidden;
`;

const Content = styled.video`
  height: 100%;
  width: 100%;
  object-fit: contain;
  scale: 1.75;
  filter: blur(2px) brightness(1) saturate(2) contrast(1.25) sepia(0.2);
`;

const MemoriesText = styled.span`
  position: absolute;
  font-family: 'Oswald', sans-serif;
  font-size: 18rem;
  color: #fa9f45;
  letter-spacing: -10px;
  bottom: 0;
  right: 0.5rem;
  margin-bottom: -2rem;
  z-index: 40;
`;

const HelperTextSip = styled.span`
  position: absolute;
  font-family: 'Yellowtail', cursive;
  font-size: 6rem;
  letter-spacing: -0.5px;
  color: #ffffff;
  bottom: -1.5rem;
  right: 0.5rem;
  z-index: 50;
`;

const HelperTextSavor = styled.span`
  position: absolute;
  font-family: 'Yellowtail', cursive;
  font-size: 6rem;
  letter-spacing: -0.5px;
  color: #ffffff;
  bottom: 12.5rem;
  right: 39rem;
  z-index: 50;
`;

function Home() {
  return (
    <StyledHome>
      <BorderBoxOne>
        <HelperTextSavor>savoring</HelperTextSavor>
        <MemoriesText>memories</MemoriesText>
        <HelperTextSip>one sip at a time</HelperTextSip>
      </BorderBoxOne>
      <BorderBoxTwo />
      <VideoPlayer>
        <Content autoPlay muted loop>
          <source src="images/video4.mp4" type="video/mp4" />
          <source src="images/video44.webm" type="video/webm"></source>
          Sorry, your browser is not supported to play videos.
        </Content>
      </VideoPlayer>
    </StyledHome>
  );
}

export default Home;
