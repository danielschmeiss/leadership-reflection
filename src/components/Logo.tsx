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
        {/* Background */}
        <rect
          width="48"
          height="48"
          rx="8"
          fill="url(#backgroundGradient)"
        />
        
        {/* REFLECT - Left side: Curved arrow pointing back */}
        <path
          d="M8 24 Q8 16 16 16 Q20 16 20 20"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M18 18 L20 20 L18 22"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Vertical separator */}
        <line
          x1="24"
          y1="12"
          x2="24"
          y2="36"
          stroke="white"
          strokeWidth="2"
          opacity="0.3"
        />
        
        {/* ACT - Right side: Straight arrow pointing forward */}
        <path
          d="M28 24 L38 24"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M36 22 L38 24 L36 26"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Professional gradient */}
        <defs>
          <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}