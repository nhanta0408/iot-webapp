import React from "react";
//Test dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function DropdownBar({ onChange }) {
  const options = ["Ao nuôi số 1", "Ao nuôi số 2"];
  const defaultOption = options[0];

  return (
    <div style={{ display: "flex", borderRadius: 10, backgroundColor: "red" }}>
      <Dropdown
        style={{ backgroundColor: "yellow" }}
        options={options}
        onChange={onChange}
        value={defaultOption}
        placeholder="Select an option"
        backgroundColor="red"
      />
    </div>
  );
}

export default DropdownBar;
