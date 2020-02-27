import React from "react";
import "./RenderItem.css";

const RenderItem = props => {
  return (
    <div>
      <button className="render-item" onClick={props.onClick}>
        {props.repoName}
      </button>
    </div>
  );
};

export default RenderItem;
