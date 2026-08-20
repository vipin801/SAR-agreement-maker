import React from 'react';

export function GradientText({ children }: {children: React.ReactNode;}) {
  return (
    <span className="bg-gradient-to-br from-accent to-terracotta bg-clip-text text-transparent">
      {children}
    </span>);

}
