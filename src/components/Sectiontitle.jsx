import React from "react";

function Sectiontitle(props) {
  return (
    <div className="mi-sectiontitle">
      <h2>{props.title}</h2>
      <span aria-hidden="true">{props.title}</span>
    </div>
  );
}

export default Sectiontitle;
