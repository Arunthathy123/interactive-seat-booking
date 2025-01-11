import PropTypes from 'prop-types';

export default function Button({ text, onClick, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` transition-all ${className}`}
    >
      {text}
    </button>
  );
}

// PropTypes for validation
Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};
