import React from "react";

interface SectiontitleProps {
  title: string;
}

function Sectiontitle({ title }: SectiontitleProps): React.JSX.Element {
  return (
    <div className="mi-sectiontitle" data-title={title}>
      <h2>{title}</h2>
    </div>
  );
}

export default Sectiontitle;
