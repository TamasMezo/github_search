import React from "react";
import "./RenderItem.css";

const RenderItem = props => {
  return (
    <li>
      <button className="render-item" onClick={props.onClick}>
        {props.repoName}
      </button>
    </li>
  );
};

export default RenderItem;
