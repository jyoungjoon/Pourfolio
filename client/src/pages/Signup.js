import React from 'react';
import styled from 'styled-components';

const StyledSignup = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  gap: 5.5rem;
`;

const Input = styled.input`
  color: #494949;
  border-radius: 1rem;
  display: inline-block;
  width: 100%;
  height: 8rem;
  font-size: 5rem;
  padding-left: 3rem;
  font-family: 'Oswald', sans-serif;
  &:focus {
    outline: 1px solid #fa9f45;
    border: 1px solid #fa9f45;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22rem;
  height: 6.5rem;
  background-color: #fa9f45;
  border-radius: 10px;
  align-self: center;

  span {
    font-family: 'Oswald', sans-serif;
    color: #00434d;
    font-size: 5rem;
    font-weight: 500;
    text-align: center;
    transform: translateY(-0.65rem);
  }
`;

function Signup() {
  // TODO: create user in database:
  function handleFormSubmit() {}

  return (
    <StyledSignup>
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
          width: '100%',
          height: '100%',
          transform: 'translateY(-5%)',
        }}
      >
        <Header>
          s<span>i</span>gn up
        </Header>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60%',
            height: '100%',
            transform: 'translateY(-5%)',
            gap: '6rem',
          }}
        >
          <StyledForm onSubmit={handleFormSubmit}>
            <Input type="email" placeholder="email" />
            <Input type="password" placeholder="password" />
            <Input type="password" placeholder="confirm password" />
            <SubmitButton>
              <span>sign up</span>
            </SubmitButton>
          </StyledForm>
        </div>
      </div>
    </StyledSignup>
  );
}

export default Signup;
