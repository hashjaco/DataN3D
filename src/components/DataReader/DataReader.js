import React from "react";
import DropZone from "react-dropzone";
import "./index.css"

const DataReader = props => {
  let onDrop = acceptedFiles => {
    console.log(acceptedFiles);
  };

  return (
    <div id="container">
      <DropZone onDrop={onDrop()}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div id="fileSelect">
                <p>
                  Drag 'n drop your dataset file here, or click to select a file
                  from computer
                </p>
                <img src={require("./drag-and-drop-icon.jpg")} alt="Drop here" />
              </div>
            </div>
          </section>
        )}
      </DropZone>
    </div>
  );
};

const styles = {
  dropZone: {
    width: "50%",
    margin: 0,
    display: "inline-block",
    fontSize: 14,
    verticalAlign: "middle",
    fontFamily: "Bangers"
  }
};

export default DataReader;
