import React from 'react'

export default function Cube({x = 0, y = 0, isActive = false}) {
  return (
    <div 
      className={`cube cube--${isActive ? 'active' : 'silent'}`} 
      style={{
        transform: `translateZ(-100px) rotate(${x}deg) rotateY(${y}deg)`,
      }}
    >
      <div className="cube__face cube__face--front" />
      <div className="cube__face cube__face--back" />
      <div className="cube__face cube__face--right" />
      <div className="cube__face cube__face--left" />
      <div className="cube__face cube__face--top" />
      <div className="cube__face cube__face--bottom" />
    </div>
  )
}
