import React from 'react';
import { Code, Layers, RefreshCw, Zap, Monitor, Database } from 'react-feather';
import type { Icon } from 'react-feather';
import type { Service } from '../data/types';

const ICON_MAP: Record<string, React.ComponentType<React.ComponentProps<Icon>>> = {
  code:     Code,
  layers:   Layers,
  reload:   RefreshCw,
  bolt:     Zap,
  monitor:  Monitor,
  database: Database,
};

interface ServiceProps {
  content: Service;
}

function ServiceCard({ content }: ServiceProps): React.JSX.Element {
  const IconComponent = ICON_MAP[content.icon] ?? Code;
  return (
    <div className="mi-service">
      <span className="mi-service-icon">
        <IconComponent size={40} />
      </span>
      <h5>{content.title}</h5>
      <p>{content.details}</p>
    </div>
  );
}

export default ServiceCard;
