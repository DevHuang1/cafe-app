'use client';

import { useState } from 'react';
import { Button, Group } from '@mantine/core';

const categories = ['All', 'Coffee', 'Tea', 'Dessert', 'Breakfast', 'Lunch'];

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="p-4 border-b">
      <Group>
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'filled' : 'light'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </Group>
    </div>
  );
}