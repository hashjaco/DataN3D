import React, { Component } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const ListSection = ({ name, dataPointX, dataPointY, dataPointZ }) => {
  // TODO styling for each DataCard is the next thing that needs to be done

  return (
    <DataContainer>
      <DataCard>
        <li style={{ fontWeight: 'bold' }}>{name}</li>
        <li>Data Point X: {dataPointX}</li>
        <li>Data Point Y: {dataPointY}</li>
        <li>Data Point Z: {dataPointZ}</li>
      </DataCard>
    </DataContainer>
  );
};

/* styles */

const list_color = '#fff';
// const card_color = lighten(list_color, '5%');

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  margin-bottom: 7px;
  margin-top: 10px;
  padding-right: 15px;
  justify-content: space-evenly;
`;

const DataCard = styled.article`
  list-style: none;

  background-color: ${list_color};
  border: 1px solid darken('white', 20%);
  margin: 0.5em 0.5em 0.5em 0.5em;
  font-size: 11px;
  padding: 1em;
  max-width: 300px;
  border-radius: 5px;
  @include box-shadow(${list_color});
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
`;

export default ListSection;
