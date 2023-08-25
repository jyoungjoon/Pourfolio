import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledAppLayout = styled.div`
  height: 100dvh;
  width: auto;
  background-color: #00434d;
  overflow-y: hidden;
  overflow-x: scroll;
  white-space: nowrap;
`;

const Main = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: hidden;
  overflow-x: scroll;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
