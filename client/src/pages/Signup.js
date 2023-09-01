import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN, UPDATE_PASSWORD } from '../utils/mutations';
import { toast } from 'react-hot-toast';
import Auth from '../utils/auth';

const StyledSignup = styled.div`
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
  transform: rotate(270deg) translateY(-2rem);
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
  position: ${({ isloggedin }) => isloggedin && 'absolute'};
  top: ${({ isloggedin }) => isloggedin && '30rem'};
  left: ${({ isloggedin }) => isloggedin && '62rem'};
  transform: ${({ islogin, isloggedin }) =>
    isloggedin
      ? ''
      : islogin
      ? 'translateY(14.35rem) translateX(13.05rem)'
      : 'translateY(7.5rem)'};
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

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  font-family: 'Oswald', sans-serif;
  font-size: 3rem;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
  align-self: center;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid #fa9f45;
  border-radius: 0.5rem;
  margin-right: 1rem;
  cursor: pointer;
  &:checked {
    background-color: #fa9f45;
    border: 2px solid #fa9f45;
    &::after {
      content: '\u2714';
      display: block;
      text-align: center;
      font-size: 2rem;
      color: #00434d;
    }
  }
`;

function Signup() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  let userId;

  const isLoggedIn = Auth.loggedIn();

  if (isLoggedIn) {
    userId = Auth.getProfile().data._id;
  }

  const [isLogin, setIsLogin] = useState(false);
  const [addUser] = useMutation(ADD_USER);
  const [login] = useMutation(LOGIN);
  const [updatePassword] = useMutation(UPDATE_PASSWORD);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const { data, error } = await login({ variables: { ...userData } });
      if (!data.login.token) {
        toast('No account or wrong credentials. Please try again.');
      } else {
        toast(`Great to see you again! You're all set to dive in.`);
      }
      Auth.login(data.login.token);
    } catch (error) {
      console.log(error);
      toast('Error', error);
    }
  }

  async function handleSignUp(e) {
    console.log(typeof userData.password, typeof userData.confirmPassword);
    e.preventDefault();
    try {
      const { data, error } = await addUser({ variables: { ...userData } });
      if (!data.addUser.user) {
        toast('There was an error creating your account.');
      } else {
        toast('Welcome to your digital cellar! Your account has been created.');
        Auth.login(data.addUser.token);
      }
    } catch (error) {
      console.log(error);
      toast('Error', error);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const { data, error } = await updatePassword({
        variables: {
          userId: userId,
          currentPassword: userData.password,
          newPassword: userData.confirmPassword,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

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
        {isLoggedIn ? (
          ''
        ) : isLogin ? (
          <Header style={{ transform: 'translateX(5rem) rotate(270deg)' }}>
            log<span>in</span>
          </Header>
        ) : (
          <Header>
            s<span>i</span>g<span>n</span> up
          </Header>
        )}

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
          <StyledForm
            isloggedin={isLoggedIn}
            islogin={isLogin}
            onSubmit={
              isLoggedIn ? handleUpdate : isLogin ? handleLogin : handleSignUp
            }
          >
            {isLoggedIn ? (
              ''
            ) : (
              <Input
                type="email"
                placeholder="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            )}
            <Input
              type="password"
              placeholder={isLoggedIn ? 'current password' : 'password'}
              value={userData.password}
              name="password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            {isLogin ? (
              ''
            ) : (
              <Input
                type="password"
                placeholder={isLoggedIn ? 'new password' : 'confirm password'}
                value={userData.confirmPassword}
                name="confirmPassword"
                onChange={(e) =>
                  setUserData({ ...userData, confirmPassword: e.target.value })
                }
              />
            )}
            {isLoggedIn ? (
              <SubmitButton>
                <span>update</span>
              </SubmitButton>
            ) : isLogin ? (
              <SubmitButton>
                <span>login</span>
              </SubmitButton>
            ) : (
              <SubmitButton>
                <span>sign up</span>
              </SubmitButton>
            )}
            {isLoggedIn ? (
              ''
            ) : (
              <CheckboxContainer htmlFor="isLogin">
                <Checkbox
                  type={'checkbox'}
                  value={isLogin}
                  onChange={() => setIsLogin(!isLogin)}
                  id="isLogin"
                />
                Already have an account? Check{' '}
                <span style={{ color: '#fa9f45', fontSize: '3rem' }}>
                  &nbsp;✓&nbsp;{' '}
                </span>{' '}
                to login!
              </CheckboxContainer>
            )}
          </StyledForm>
        </div>
      </div>
    </StyledSignup>
  );
}

export default Signup;
