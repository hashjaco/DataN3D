import React, { Component, useEffect } from 'react'
import { useThree } from 'react-three-fiber'
import { PointsMaterial, SphereGeometry, Vector3 } from "three";

const Point = props => {

  const { xVal, yVal, zVal } = props;

  useEffect(()=> {})

  return(
    <mesh
      onClick={(e)=> console.log("clicked me")}
      position={new Vector3(xVal, yVal, zVal)}
      geometry={new SphereGeometry(3, 16, 16)}
      material={new PointsMaterial({ color: 0xffffff, transparent: true })}
    />
  )
};

export default Point;