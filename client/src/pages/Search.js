import React, { useState } from 'react';
import styled from 'styled-components';
import { HiOutlineSearch } from 'react-icons/hi';
import { useQuery } from '@apollo/client';
import { GET_ALL_WINE } from '../utils/queries';
import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';

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

const StyledSearch = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
`;

const SearchBar = styled.input`
  color: #494949;
  border-radius: 1rem;
  display: block;
  width: 60%;
  height: 8rem;
  font-size: 5rem;
  padding-left: 3rem;
  font-family: 'Oswald', sans-serif;
  transform: ${({ hassearchterm }) => hassearchterm && 'translateY(-20rem)'};
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

const StyledSearchIcon = styled(HiOutlineSearch)`
  color: #494949;
  font-size: 5rem;
  transform: translateX(-10rem);
  cursor: pointer;
  transform: ${({ hassearchterm }) =>
    hassearchterm && 'translateY(-20rem) translateX(-10rem)'};
  transition: all 0.25s ease-in-out;
`;

const StyledWineCard = styled.div`
background-color: white;
font-size: 2.5rem;
font-family: 'Yellowtail', cursive;
letter-spacing: 0;
width: 75rem;
height: 20rem;
border-radius: 2rem;
display: flex;
justify-content: center;
align-items: center;
`
const StyledWineImage = styled.div`
height: 14rem;

`

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useQuery(GET_ALL_WINE)

  let wineResults;

  if (data) {
  wineResults = data.wines.map(wine => wine.name.toLowerCase())
      .filter(wine => wine.startsWith(searchTerm.toLowerCase())).sort((a, b) => b - a)
      .slice(0,5);
  }



  return (
    <StyledSearch>
      {/* <Loader loading={loading} /> */}
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridRow: '3',
          gridColumn: 'auto',
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
          height: '100%',
          transform: 'translateY(-5%)',
        }}
      >
        <Header>
          S<span>e</span>arch
        </Header>
        <SearchBar
          type="text"
          placeholder="Start your search.."
          value={searchTerm}
          hassearchterm={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledSearchIcon hassearchterm={searchTerm} />
        {wineResults ? wineResults.map(wine => <StyledWineCard key={wine.name}><StyledWineImage/>{wine}<SaveButton><span>save</span></SaveButton></StyledWineCard>) : ''}
      </div>
    </StyledSearch>
  );
}

export default Search;
