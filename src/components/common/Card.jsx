// src/components/common/Card.jsx
import React from 'react';

const Card = ({ 
  variant = 'default', // 'default', 'gradient'
  gradient,
  borderGradient,
  icon,
  badge,
  title,
  subtitle,
  value,
  onClick,
  buttonText = 'View Details',
  className = '',
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    red: 'bg-red-50 text-red-600 border-red-200'
  };

  if (variant === 'gradient') {
    return (
      <div className={`relative group ${className}`}>
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${borderGradient} rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300`}></div>
        <div className={`relative bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-xl`}>
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
          <div className="space-y-2 mb-6">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
            {value && <div className="text-3xl font-bold text-white">{value}</div>}
          </div>
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
  }

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between mb-4">
        {icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
        {badge && (
          <div className="px-3 py-1 rounded-full bg-gray-100">
            {badge}
          </div>
        )}
      </div>
      <div className="space-y-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
         <div className="text-2xl font-bold text-gray-900">{value}</div>
      </div>
      {onClick && (
        <button 
          onClick={onClick}
          className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors border"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default Card;
