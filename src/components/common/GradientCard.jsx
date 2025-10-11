// src/components/common/GradientCard.jsx
import React from 'react';

const GradientCard = ({ 
  gradient = 'from-purple-600 via-blue-600 to-indigo-700',
  borderGradient = 'from-purple-600 via-blue-500 to-green-400',
  icon,
  badge,
  title,
  subtitle,
  value,
  onClick,
  buttonText = 'View Details',
  className = ''
}) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Gradient border effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${borderGradient} rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300`}></div>
      
      {/* Main card */}
      <div className={`relative bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-xl`}>
        {/* Header with icon and badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            {icon}
          </div>
          {badge && (
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2 mb-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
          {value && <div className="text-3xl font-bold text-white">{value}</div>}
        </div>

        {/* Action button */}
        {onClick && (
          <button 
            onClick={onClick}
            className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default GradientCard;
