import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Navigation from './Navigation';

function Header() {
  return (
    <div>
      <Navigation />
      <Logo />
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default Header;
