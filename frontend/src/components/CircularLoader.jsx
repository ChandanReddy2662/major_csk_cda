import React from 'react';

const CircularLoader = ({ size = 40, strokeWidth = 4, color = '#1E90FF' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block', margin: '0 auto' }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={circumference}
        fill="transparent"
        style={{
          transition: 'stroke-dashoffset 0.3s linear',
          animation: 'rotate 2s linear infinite',
          strokeLinecap: 'round',
        }}
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="1.5s"
          from={circumference}
          to="0"
          repeatCount="indefinite"
        />
      </circle>
      <style>
        {`
          @keyframes rotate {
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </svg>
  );
};

export default CircularLoader;