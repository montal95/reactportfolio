import React from 'react';
import { Briefcase, Book } from 'react-feather';
import type { Icon } from 'react-feather';

const ICON_MAP: Record<string, React.ComponentType<React.ComponentProps<Icon>>> = {
  briefcase: Briefcase,
  book:      Book,
};

interface SmalltitleProps {
  title: string;
  icon: string;
}

function Smalltitle({ title, icon }: SmalltitleProps): React.JSX.Element {
  const IconComponent = ICON_MAP[icon] ?? Briefcase;
  return (
    <div className="mi-smalltitle">
      <span className="mi-smalltitle-icon">
        <IconComponent />
      </span>
      <h4>{title}</h4>
    </div>
  );
}

export default Smalltitle;
