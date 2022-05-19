import * as React from "react";
import "../assets/textEdit.scss";

function TextEdit(props) {
  return (
    <div 
        id="text_edit_box"
        style={props.show === !false ? {display: "flex"} : {display: "none"}}
        >
      <div id="text_edit_input">
        <label for="edit_input">Edit</label>
        <input id="edit_input" type="text"></input>
      </div>
      <div id="text_edit_buttons">
        <button type="button">Apply</button>
        <button id="cancel_edit_btn" type="button">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TextEdit;
