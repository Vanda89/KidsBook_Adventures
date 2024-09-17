'use client';

import React from 'react';

const WelcomeMessage = ({ userName }: { userName: string }) => {
  return (
    <div className="text-4xl text-content1 opacity-100 ">
      Bonjour <span className="text-primary-500 lg:my-8 font-bold font-jua">{userName}</span> !
    </div>
  );
};

export default WelcomeMessage;
