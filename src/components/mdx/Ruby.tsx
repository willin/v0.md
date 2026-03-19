'use client';

import React from 'react';

interface RubyProps {
  children: React.ReactNode;
  pronunciation?: string;
}

export default function Ruby({ children, pronunciation }: RubyProps) {
  if (!pronunciation) {
    return <ruby className="ruby">{children}</ruby>;
  }

  return (
    <ruby className="ruby">
      {children}
      <rt className="ruby-pronunciation">{pronunciation}</rt>
    </ruby>
  );
}
