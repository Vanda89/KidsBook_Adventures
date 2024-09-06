'use client';

import React from 'react';

const WelcomeMessage = ({ userName }: { userName: string }) => {
  return (
    <div className="text-4xl ">
      Bonjour <span className="text-teal-700 font-bold font-jua">{userName}</span> !
    </div>
  );
};

export default WelcomeMessage;
