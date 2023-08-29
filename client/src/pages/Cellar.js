import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CELLAR_BY_USER_ID } from '../utils/queries';
import Auth from '../utils/auth';

const StyledCellar = styled.div`
  position: relative;
  height: 100%;
  width: auto;
  display: flex;
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

const ProfileCard = styled.div`
  height: 20rem;
  width: 75rem;
  background-color: white;
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`;

const StyledWineCard = styled.div`
  background-color: white;
  font-size: 2.5rem;
  font-family: 'Yellowtail', cursive;
  letter-spacing: 0;
  width: 75rem;
  min-width: 75rem;
  height: 20rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Cellar() {
  const [myWines, setMyWines] = useState([]);
  const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  const { loading, error, data } = useQuery(GET_CELLAR_BY_USER_ID, {
    variables: { userId },
  });

  if (!loading && data?.cellar?.wines?.length !== myWines.length) {
    const winesInCellar = data.cellar.wines.map((wine) => wine);
    setMyWines(winesInCellar);
  }

  return (
    <StyledCellar>
      <div
        style={{
          borderBottom: '1px solid #BDAFA0',
          borderTop: '1px solid #BDAFA0',
          width: '100%',
          height: '79.5%',
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
          transform: 'translateY(-5%) translateX(-1.5%)',
        }}
      >
        <div style={{ minWidth: '53.5rem' }}>
          <Header>
            My C<span>e</span>llar
          </Header>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            transform: 'translateX(-2.15%)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridTemplateRows: '1fr 1fr',
              gridTemplateColumns: '1fr',
              gap: '5rem',
            }}
          >
            <ProfileCard></ProfileCard>
            {myWines &&
              myWines.map((wine) => (
                <StyledWineCard key={wine._id}>{wine.name}</StyledWineCard>
              ))}
          </div>
        </div>
      </div>
    </StyledCellar>
  );
}

export default Cellar;
