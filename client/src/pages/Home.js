import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHome = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  z-index: 40;
`;

const HelperTextSavor = styled.span`
  position: absolute;
  font-family: 'Yellowtail', cursive;
  font-size: 6rem;
  letter-spacing: -0.5px;
  color: #ffffff;
  bottom: 12.5rem;
  right: 39rem;
  z-index: 40;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fa9f45;
  backdrop-filter: blur(2px);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 50rem;
  height: 30rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  background-color: #fa9f45;
  z-index: 1001;
`;

const ModalContent = styled.div`
  font-family: Oswald, sans-serif;
  color: #000000;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00434d;
  width: 13rem;
  height: 5rem;
  font-family: Oswald, sans-serif;
  font-size: 3rem;
  color: #ffffff;
  padding: 1rem 2rem;
  margin: 0 1rem;
  border: none;
  cursor: pointer;
  border-radius: 2rem;
  &:hover {
    transform: translateY(0.2rem);
  }
`;

const StyledLogo = styled.div`
  margin-bottom: -1rem;
`;

const StyledP = styled.span`
  display: inline-block;
  font-family: 'Princess Sofia', cursive;
  font-size: 5.5rem;
  color: #00434d;
  transform: rotate(17.5deg) translate(1.7rem, -1.7rem);
`;

const StyledOur = styled.span`
  letter-spacing: 0.025rem;
  transform: translateY(30rem);
  font-family: 'Yellowtail', cursive;
  font-size: 4rem;
  color: #00434d;
`;

const StyledFolio = styled.span`
  font-family: 'Yellowtail', cursive;
  font-size: 4rem;
  letter-spacing: 0.025rem;
  transform: translateY(31rem);
  color: #00434d;
`;

const randomVideoNumber = Math.floor(Math.random() * 4 + 1);

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenModal');
    if (!hasSeenModal) {
      setIsModalOpen(true);
    }
  }, []);

  const closeModal = () => {
    localStorage.setItem('hasSeenModal', 'true');
    setIsModalOpen(false);
  };

  return (
    <StyledHome>
      {isModalOpen && (
        <Overlay>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalContent>
              <StyledLogo>
                <StyledP>P</StyledP>
                <StyledOur>our</StyledOur>
                <StyledFolio>folio</StyledFolio>
              </StyledLogo>
              are you over the legal age (21) for consuming alcoholic beverages?
            </ModalContent>
            <ModalActions>
              <ModalButton onClick={closeModal}>Yes</ModalButton>
              <ModalButton
                onClick={() => {
                  navigate(-1)
                    ? navigate(-1)
                    : (window.location.href = 'https://github.com');
                  return null;
                }}
              >
                No
              </ModalButton>
            </ModalActions>
          </ModalContainer>
        </Overlay>
      )}
      <BorderBoxOne>
        <HelperTextSavor>savoring</HelperTextSavor>
        <MemoriesText>memories</MemoriesText>
        <HelperTextSip>one sip at a time</HelperTextSip>
      </BorderBoxOne>
      <BorderBoxTwo />
      <VideoPlayer>
        <Content autoPlay muted loop>
          <source
            src={`images/video${randomVideoNumber}.mp4`}
            type="video/mp4"
          />
          <source
            src={`images/video${randomVideoNumber}.webm`}
            type="video/webm"
          ></source>
          Sorry, your browser is not supported to play videos.
        </Content>
      </VideoPlayer>
    </StyledHome>
  );
}

export default Home;
