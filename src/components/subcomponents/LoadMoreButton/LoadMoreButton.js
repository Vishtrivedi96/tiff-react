import React from 'react';
import PropTypes from 'prop-types';
import './LoadMoreButton.css';

const LoadMoreButton = ({ text, onClick }) => (
  <div className="tiff-buttonWrapper">
    <button aria-label="Click here to load more movies" className="tiff-loadmorebutton"  onClick={() => onClick(true)}>
      <p>{text}</p>
    </button>
  </div>
)

LoadMoreButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
}

export default LoadMoreButton;