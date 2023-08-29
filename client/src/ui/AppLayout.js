import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { useHorizontalScroll } from '../utils/helpers';

const StyledAppLayout = styled.div`
  height: 100dvh;
  width: 100dvw;
  background-color: #00434d;
`;

const Main = styled.div`
  width: 100%;
  height: 87.5%;
`;

function AppLayout() {
  const scrollRef = useHorizontalScroll();
  return (
    <StyledAppLayout
      ref={scrollRef}
      style={{ overflowX: 'auto', overflowY: 'hidden' }}
    >
      <Header />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
