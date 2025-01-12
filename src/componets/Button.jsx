'use client';

import PropTypes from 'prop-types';

export default function Button({ text, onClick, type, className = '' }) {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className={`transition-all ${className}`}
    >
      {text}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};
