import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Auth from '../utils/auth';
import { DELETE_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';

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
  transform: rotate(270deg) translateY(-5rem) translateX(-3rem);
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
  transform: translateY(5rem) translateX(-5rem);
  &:hover {
    transform: translateY(5.2rem) translateX(-5rem);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 50rem;
  height: 25rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  background-color: #ffffff;
  padding: 2rem;
  z-index: 1001;
  border-radius: 2rem;
`;

const ModalHeader = styled.div`
  font-family: Oswald, sans-serif;
  color: #00434d;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ModalContent = styled.div`
  font-family: Oswald, sans-serif;
  color: #00434d;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-bottom: 2rem;
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

function Setting() {
  const userId = Auth.getProfile().data._id;
  const [deleteUser] = useMutation(DELETE_USER);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function handleDeleteAccount(userId) {
    const { data, error } = await deleteUser({ variables: { userId } });
    if (data.deleteUser === 'deleted') {
      closeModal();
      toast(`Account was successfully deleted. See you again soon!`);
      setTimeout(() => {
        Auth.logout();
      }, '2000');
    }
    if (data.deleteUser === `failed`) {
      closeModal();
      toast(`There was an error. Please try again.`);
    }
    if (error) {
      closeModal();
      toast(`There was an error. Please try again.`);
    }
  }

  return (
    <StyledSettings>
      <div>
        {isModalOpen && (
          <Overlay onClick={closeModal}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
              <ModalHeader>delete account</ModalHeader>
              <ModalContent>
                caution: this action will delete all of your data
                <br />
                are you sure you want to do this?
              </ModalContent>
              <ModalActions>
                <ModalButton onClick={() => handleDeleteAccount(userId)}>
                  Yes
                </ModalButton>
                <ModalButton onClick={closeModal}>No</ModalButton>
              </ModalActions>
            </ModalContainer>
          </Overlay>
        )}
      </div>
      <div
        style={{
          borderBottom: '1px solid #BDAFA0',
          borderTop: '1px solid #BDAFA0',
          width: '100%',
          height: '80.5%',
          transform: 'translateY(4%)',
          position: 'fixed',
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
            alignItems: 'start',
            height: '100%',
            transform: 'translateY(-5%)',
            gap: '6rem',
          }}
        >
          <StyledLink style={{ float: 'left' }} to={'/about'}>
            about
          </StyledLink>
          <StyledLink to={'/signup'}>update acct.</StyledLink>
          <StyledLink onClick={openModal}>delete acct.</StyledLink>
        </div>
      </div>
    </StyledSettings>
  );
}

export default Setting;
