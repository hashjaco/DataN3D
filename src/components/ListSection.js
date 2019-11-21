import React, { Component } from 'react'

const ListSection = ({ name, dataPointX, dataPointY, dataPointZ }) => {
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
