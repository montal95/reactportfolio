import React from "react";
import { information } from "../data/db/database";
import { GitHub, Linkedin, Twitter, Dribbble, ExternalLink } from "react-feather";

interface SocialiconsProps {
  bordered?: boolean;
}

function Socialicons({ bordered }: SocialiconsProps): React.JSX.Element {
  const socialLinks = information.socialLinks;

  const renderLink = (href: string | undefined, icon: React.ReactNode, label: string) => {
    if (!href) return null;
    return (
      <li>
        <a rel="noopener noreferrer" target="_blank" href={href} aria-label={label}>
          {icon}
        </a>
      </li>
    );
  };

  return (
    <ul className={bordered ? 'mi-socialicons mi-socialicons-bordered' : 'mi-socialicons'}>
      {renderLink(socialLinks.facebook,  <ExternalLink />, "Facebook")}
      {renderLink(socialLinks.twitter,   <Twitter />,      "X (formerly Twitter)")}
      {renderLink(socialLinks.linkedin,  <Linkedin />,     "LinkedIn")}
      {renderLink(socialLinks.dribbble,  <Dribbble />,     "Dribbble")}
      {renderLink(socialLinks.github,    <GitHub />,       "GitHub")}
      {renderLink(socialLinks.pinterest, <ExternalLink />, "Pinterest")}
      {renderLink(socialLinks.behance,   <ExternalLink />, "Behance")}
      {renderLink(socialLinks.twitch,    <ExternalLink />, "Twitch")}
    </ul>
  );
}

export default Socialicons;
