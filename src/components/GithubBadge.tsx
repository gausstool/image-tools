import React from 'react';
import './GihubBadge.css';

interface GithubBadgeProps {
  url?: string;
}

const GithubBadge: React.FC<GithubBadgeProps> = ({ 
  url = "https://github.com/gausszhou/" 
}) => {
  return (
    <div className="github-badge">
      <a href={url}>Github</a>
    </div>
  );
};

export default GithubBadge;