import toast from 'react-hot-toast';
import React, { useState } from 'react';
import styled from 'styled-components';
import { HiOutlineSearch } from 'react-icons/hi';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_WINE } from '../utils/queries';
import { SAVE_WINE } from '../utils/mutations';
import Auth from '../utils/auth';

const StyledSearch = styled.div`
  position: relative;
  height: 100%;
  width: auto;
  display: flex;
`;

const SaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  height: 5rem;
  background-color: #fa9f45;
  border-radius: 2rem;
  align-self: center;
  span {
    font-family: 'Oswald', sans-serif;
    color: #00434d;
    font-size: 3.5rem;
    font-weight: 500;
    text-align: center;
    transform: translateY(-0.65rem);
  }
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75rem;
  min-width: 75rem;
`;

const SearchInput = styled.input`
  color: #494949;
  display: block;
  width: 75rem;
  height: 8rem;
  font-size: 5rem;
  padding-left: 3rem;
  font-family: 'Oswald', sans-serif;
  border-radius: 1rem;
  transform: ${({ hassearchterm }) => hassearchterm && 'translateY(-4rem)'};
  transition: all 0.25s ease-in-out;
`;

const StyledSearchIcon = styled(HiOutlineSearch)`
  position: absolute;
  color: #494949;
  font-size: 5rem;
  transform: translateX(32.5rem);
  cursor: pointer;
  transform: ${({ hassearchterm }) =>
    hassearchterm && 'translateY(-4rem) translateX(32.5rem)'};
  transition: all 0.25s ease-in-out;
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

const StyledWineCard = styled.div`
  background-color: white;
  font-family: 'Yellowtail', cursive;
  letter-spacing: 0;
  width: 75rem;
  min-width: 75rem;
  height: 20rem;
  border-radius: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledWineImage = styled.img`
  height: 14rem;
  text-align: center;
`;

const WineNameBox = styled.div`
  font-size: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 35rem;
`;

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [saveWine] = useMutation(SAVE_WINE);

  const { data } = useQuery(GET_ALL_WINE);

  let wineResults;

  if (data) {
    wineResults = data?.wines
      ?.map((wine) => ({
        id: wine._id,
        name: wine.name ? wine.name.toLowerCase() : '',
        pictureUrl: wine.pictureUrl,
        color: wine.color,
        country: wine.country,
      }))
      .filter((wine) => wine.name.startsWith(searchTerm.toLowerCase()))
      .sort((a, b) => b.name.localeCompare(a.name))
      .slice(0, 6);
  }

  async function handleSave(wineId) {
    try {
      if (Auth.loggedIn()) {
        const userId = Auth.getProfile().data._id;
        const res = await saveWine({
          variables: { wineId: wineId, userId: userId },
        });

        const message = res.data.saveWine;
        toast.success(message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error('An error occurred while saving the wine.');
    }
  }

  return (
    <StyledSearch>
      {/* <Loader loading={loading} /> */}
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
          transform: 'translateY(-5%)',
        }}
      >
        <div style={{ minWidth: '38.5rem' }}>
          <Header>
            S<span>e</span>arch
          </Header>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Start your search.."
              value={searchTerm}
              hassearchterm={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <StyledSearchIcon hassearchterm={searchTerm} />
          </SearchBar>
          <div
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridTemplateRows: '1fr 1fr',
              gridTemplateColumns: '1fr',
              gap: '5rem',
            }}
          >
            {searchTerm !== '' && wineResults
              ? wineResults.map((wine) => (
                  <StyledWineCard key={wine.name}>
                    <StyledWineImage src={wine.pictureUrl} />
                    <WineNameBox>
                      <div style={{ marginBottom: '1rem' }}>{`${
                        wine.name
                          ? wine.name
                              .slice(0, 30)
                              .split(' ')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(' ') + '...'
                          : ''
                      } `}</div>
                      <div>{wine.color.toLowerCase()}</div>
                      <div>{`origin: ${wine.country.toLowerCase()}`}</div>
                    </WineNameBox>
                    {Auth.loggedIn() ? (
                      <SaveButton onClick={() => handleSave(wine.id)}>
                        <span style={{ fontSize: '4rem' }}>save</span>
                      </SaveButton>
                    ) : (
                      ''
                    )}
                  </StyledWineCard>
                ))
              : ''}
          </div>
        </div>
      </div>
    </StyledSearch>
  );
}

export default Search;
