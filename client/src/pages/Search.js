import React, { useState } from 'react';
import styled from 'styled-components';
import { HiOutlineSearch } from 'react-icons/hi';
import { useQuery } from '@apollo/client';
import { GET_ALL_WINE } from '../utils/queries';

const StyledSearch = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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

function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: use searchTerm to look for wine data
  const {loading,data}= useQuery(GET_ALL_WINE)
  console.log(data,loading)

  return (
    <StyledSearch>
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
          hassearchterm={searchTerm}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledSearchIcon hassearchterm={searchTerm} />
      </div>
    </StyledSearch>
  );
}

export default Search;
