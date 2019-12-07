import React from "react";
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

const ListSection = props => {
  // TODO styling for each DataCard is the next thing that needs to be done
  let name = props.name.replace("#", "");
  return (
    <div style={styles.item}>
      <Accordion allowZeroExpanded unselectable={true}>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>{name}</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <ul>
              <li>X: {props.dataPointX}</li>
              <li>Y: {props.dataPointY}</li>
              <li>Z: {props.dataPointZ}</li>
            </ul>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const styles = {
  item: {
    flex: 1,
    flexDirection: 'column',
    width: "100%",
  }
};

export default ListSection;
