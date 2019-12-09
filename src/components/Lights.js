import React from 'react';
import PropTypes from 'prop-types';

function Lights(props) {
  const { type } = props;
  const Light = type;

  return <Light {...props} />;
}

Lights.propTypes = {
  type: PropTypes.string
};

Lights.defaultProps = {
  type: ''
};

export default Lights;