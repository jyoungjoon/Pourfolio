import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledP = styled.span`
  display: inline-block;
  font-family: 'Princess Sofia', cursive;
  font-size: 5.5rem;
  color: #fa9f45;
  transform: rotate(17.5deg) translate(1.75rem, -1.75rem);
`;

const StyledOur = styled.span`
  letter-spacing: 0.025rem;
  transform: translateY(30rem);
  font-family: 'Yellowtail', cursive;
  font-size: 4.32rem;
  color: #fa9f45;
`;

const StyledFolio = styled.span`
  font-family: 'Yellowtail', cursive;
  font-size: 4.32rem;
  letter-spacing: 0.025rem;
  transform: translateY(31rem);
  color: #fa9f45;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

function Logo() {
  return (
    <StyledLink to="/">
      <div style={{ transform: 'translateY(1.5rem)' }}>
        <StyledP>P</StyledP>
        <StyledOur>our</StyledOur>
        <StyledFolio>folio</StyledFolio>
      </div>
    </StyledLink>
  );
}

export default Logo;
