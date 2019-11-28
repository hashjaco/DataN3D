import React, { Component } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const ListSection = ({ name, dataPointX, dataPointY, dataPointZ }) => {
  // TODO styling for each DataCard is the next thing that needs to be done

  return (
    <DataContainer>
      <DataCard>
        <li
          css={css`
            font: bold;
            font-size: 12px;
          `}
        >
          Name: {name}
        </li>
        <li
          css={css`
            font: bold;
            font-size: 12px;
          `}
        >
          Data Point X: {dataPointX}
        </li>
        <li
          css={`
            font: bold;
            font-size: 12px;
          `}
        >
          Data Point Y: {dataPointY}
        </li>
        <li
          css={css`
            font: bold;
            font-size: 12px;
          `}
        >
          Data Point Z: {dataPointZ}
        </li>
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
  justify-content: space-evenly;
`;

const DataCard = styled.article`
  list-style: none;

  background-color: ${list_color};
  border: 1px solid darken('white', 20%);
  margin: 0.5em 1em 0.5em 0.5em;
  padding: 1em;
  border-radius: 5px;
  @include box-shadow(${list_color});
  filter: drop-shadow(0 0 0.25em 'white');
`;

export default ListSection;
