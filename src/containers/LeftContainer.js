import React from 'react';
import ListSection from '../components/ListSection';
import ReactList from 'react-list';

const data = require('../data/spiral') || [];

const LeftContainer = () => {
  return (
    <div style={styles.leftContainer}>
      {data.map(context => (
        <>
          <ListSection
            key={context.name}
            name={context.name}
            dataPointX={context.x}
            dataPointY={context.y}
            dataPointZ={context.z}
          />
        </>
      ))}
    </div>
  );
};

const styles = {
  leftContainer: {
    display: 'inline-block',
    height: "90vh",
    width: '25%',
    backgroundColor: '#dddfe6',
    overflowY: 'auto'
  }
};

export default LeftContainer;
