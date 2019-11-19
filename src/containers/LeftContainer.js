import React from 'react'

const LeftContainer = props => {
  return <div style={styles.leftContainer}>Data will be here</div>
}

const styles = {
  leftContainer: {
    display: 'inline-block',
    height: '100%',
    borderRightStyle: 'solid',
    borderColor: '#343a40',
    borderWidth: 0.5,
    width: '20%'
  }
}

export default LeftContainer
