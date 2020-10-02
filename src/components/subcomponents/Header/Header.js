import React from 'react';
import './Header.css';

const Header = () => (
  <header className="tiff-header">
    <div className="tiff-header-content">
      <a href="https://www.tiff.net/" target="_blank" aria-label="Click here to visit Toronto International Film Festival website, opens in a new tab">
        <img className="tiff-logo" src="/images/tiff-logo.png" alt="Toronto International Film Festival logo" />
      </a>
    </div>
  </header>
)

export default Header;