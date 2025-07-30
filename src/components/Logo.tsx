import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background with rounded corners */}
        <rect
          width="48"
          height="48"
          rx="12"
          fill="url(#logoGradient)"
        />
        
        {/* REFLECT - Left side: Curved arrow pointing backward */}
        <g transform="translate(6, 12)">
          <path
            d="M12 12 Q4 12 4 20 Q4 24 8 24"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M6 22 L8 24 L6 26"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        
        {/* Vertical divider */}
        <line
          x1="24"
          y1="16"
          x2="24"
          y2="32"
          stroke="white"
          strokeWidth="2"
          opacity="0.4"
        />
        
        {/* ACT - Right side: Straight arrow pointing forward */}
        <g transform="translate(30, 12)">
          <path
            d="M2 12 L14 12"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M12 10 L14 12 L12 14"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}