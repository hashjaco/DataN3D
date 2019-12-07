import React, { Component } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

const Divider = () => {
  return <span style={{ borderStyle: "solid", width: "100%" }} />;
};

const ListSection = ({ name, dataPointX, dataPointY, dataPointZ }) => {
  // TODO styling for each DataCard is the next thing that needs to be done

  return (
    <>
      <div style={styles.item}>
        <Accordion>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>{name}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ul>
                <li>X: {dataPointX}</li>
                <li>Y: {dataPointY}</li>
                <li>Z: {dataPointZ}</li>
              </ul>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
        <Divider />
      </div>
    </>
  );
};

const styles = {
  item: {
    flex: 1,
    width: "100%"
  }
};

export default ListSection;
