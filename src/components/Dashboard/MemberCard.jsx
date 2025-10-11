// src/components/Dashboard/MemberCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';

const MemberCard = ({ 
  type,
  count,
  gradient,
  borderGradient,
  icon,
  title,
  subtitle,
  badgeText,
  badgeColor,
  buttonText,
  navigateTo
}) => {
  const navigate = useNavigate();

  const badge = (
    <span className={`${badgeColor} text-xs font-medium`}>{badgeText}</span>
  );

  return (
    <Card
      gradient={gradient}
      borderGradient={borderGradient}
      icon={icon}
      badge={badge}
      title={title}
      subtitle={subtitle}
      value={count}
      onClick={() => navigate(navigateTo)}
      buttonText={buttonText}
    />
  );
};

export default MemberCard;
