import React from "react";

function Sectiontitle(props) {
  return (
    <div className="mi-sectiontitle" data-title={props.title}>
      <h2>{props.title}</h2>
    </div>
  );
}

export default Sectiontitle;
