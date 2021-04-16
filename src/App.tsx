import React, { useEffect, useState } from 'react';

import './App.scss';

interface Bubble {
  x: number;
  y: number;
  color: string;
  index: number;
}

const initialState: Bubble[] = [];
const DELTA = 12;
const MAX_BUBBLES = 200;

function App() {
  const [bubbles, setBubbles] = useState(initialState);

  useEffect(() => {
    setBubbles(initialState);
  }, []);

  const handleMouseMove = (event: MouseEvent): void => {
    if (event.movementX > DELTA || event.movementY > DELTA) {
      const newBubbles: Bubble[] = [...bubbles];
      if (newBubbles.length >= MAX_BUBBLES) {
        newBubbles.shift();
      }

      newBubbles.push({
        x: event.clientX,
        y: event.clientY,
        color: randomColor(),
        index: Math.floor(Math.random() * 100000)
      });

      setBubbles(newBubbles);
    }
  };

  const randomColor = (): string => {
    const colors = [
      'rgba(255,0,0, 1)',
      'rgba(0,255,0, 1)',
      'rgba(0,0,255, 1)',
      'rgba(255,255,0, 1)',
      'rgba(255,0,255, 1)',
      'rgba(0,255,255, 1)'
    ];
    const index = Math.floor(Math.random() * colors.length);

    return colors[index];
  };

  const handleBubbleDone = (element: any): void => {
    const newBubbles = bubbles.filter(
      (bubble) => bubble.index.toString() !== element.id
    );
    setBubbles(newBubbles);
  };

  const renderBubbles = () =>
    bubbles.map((bubble) => (
      <div
        id={bubble.index.toString()}
        key={bubble.index}
        className={'bubble'}
        style={{
          left: bubble.x + 'px',
          top: bubble.y + 'px',
          backgroundColor: bubble.color
        }}
      />
    ));

  return (
    <div
      className="App"
      onMouseMove={(event) => handleMouseMove(event.nativeEvent)}
      onAnimationEnd={(event) => handleBubbleDone(event.nativeEvent.target)}
    >
      <main>
        <span>Bubbles: {bubbles.length}</span>
        {renderBubbles()}
      </main>
    </div>
  );
}

export default App;
