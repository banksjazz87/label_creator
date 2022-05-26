import * as React from "react";
import "../assets/textEdit.scss";

function TextEdit(props) {
  return (

    <div 
        id="text_edit_box"
        style={props.show ? {display: ""} : {display: 'none'}}
        >
      <div id="text_edit_input">
        <label for="edit_input">Edit</label>
        <input 
            id="edit_input" 
            type="text" 
            value="testing"
            onChange={props.textChange}
        >
        </input>
      </div>
      <div id="text_edit_buttons">
        <button type="button">Apply</button>
        <button
            id="cancel_edit_btn" 
            type="button"
            onClick={props.cancelOnClick}
            >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TextEdit;
