import React from "react";
import { information } from "../data/db/database";
import LineIcon from 'react-lineicons';

function Socialicons(props){
  const socialLinks = information.socialLinks;

  return (
    <ul className={props.bordered ? 'mi-socialicons mi-socialicons-bordered' : 'mi-socialicons'}>
      {!socialLinks.facebook ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={socialLinks.facebook} aria-label="Facebook">
          <LineIcon name="facebook"/>
        </a>
      </li>}
      {!socialLinks.twitter ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={socialLinks.twitter} aria-label="X (formerly Twitter)">
          <LineIcon name="twitter"/>
        </a>
      </li>}
      {!socialLinks.pinterest ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={socialLinks.pinterest} aria-label="Pinterest">
          <LineIcon name="pinterest"/>
        </a>
      </li>}
      {!socialLinks.behance ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={socialLinks.behance} aria-label="Behance">
          <LineIcon name="behance"/>
        </a>
      </li>}
      {!socialLinks.linkedin ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={socialLinks.linkedin} aria-label="LinkedIn">
          <LineIcon name="linkedin"/>
        </a>
      </li>}
      {!socialLinks.dribbble ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={socialLinks.dribbble} aria-label="Dribbble">
          <LineIcon name="dribbble"/>
        </a>
      </li>}
      {!socialLinks.github ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={socialLinks.github} aria-label="GitHub">
          <LineIcon name="github"/>
        </a>
      </li>}
      {!socialLinks.twitch ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={socialLinks.twitch} aria-label="Twitch">
          <LineIcon name="twitch"/>
        </a>
      </li>}
    </ul>
  );
}

export default Socialicons;
