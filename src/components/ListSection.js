import React, { Component } from 'react'

const ListSection = ({ name, dataPointX, dataPointY, dataPointZ }) => {
  // TODO styling for each DataCard is the next thing that needs to be done

  return (
    <>
      <li>Name: {name}</li>
      <li>Data Point X: {dataPointX}</li>
      <li>Data Point Y: {dataPointY}</li>
      <li>Data Point Z: {dataPointZ}</li>
    </>
  )
}

export default ListSection
