import React from 'react';
import ListSection from '../components/ListSection';
import ReactList from 'react-list';

const data = require('../data/spiral') || [];

const LeftContainer = (props) => {
  const styles = {
    leftContainer: {
      display: 'inline-block',
      height: props.height,
      width: '25%',
      backgroundColor: '#dddfe6',
      overflowY: 'auto'
    }
  };
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



export default LeftContainer;
