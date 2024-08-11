import React, { useState, useEffect } from 'react';
import { BentoCard, BentoGrid } from '../magicui/bento-grid';

const Carouselhome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    { name: 'Card 1', description: 'Description 1', href: '#', background: 'Background 1' },
    { name: 'Card 2', description: 'Description 2', href: '#', background: 'Background 2' },
    { name: 'Card 3', description: 'Description 3', href: '#', background: 'Background 3' },
    { name: 'Card 4', description: 'Description 4', href: '#', background: 'Background 4' },
    { name: 'Card 5', description: 'Description 5', href: '#', background: 'Background 5' },
    { name: 'Card 6', description: 'Description 6', href: '#', background: 'Background 6' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 500); // Change card every 0.5 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  const displayedCards = cards.slice(currentIndex, currentIndex + 3).concat(cards.slice(0, Math.max(0, (currentIndex + 3) - cards.length)));

  return (
    <div className="carousel-container bg-black text-white border border-gray-500 p-4">
      <BentoGrid className="carousel-grid">
        {displayedCards.map((card) => (
          <BentoCard
            key={card.name}
            name={card.name}
            background={card.background}
            description={card.description}
            href={card.href}
            cta="Learn More"
            className="hover:scale-105 transition-transform duration-300"
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default Carouselhome;
