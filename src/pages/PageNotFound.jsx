import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const PageNotFound = () => {
  const handleGoHome = ()=>{
    window.location.href = '/home';
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '24px',
    }}>


    <DotLottieReact
      src="https://lottie.host/b96da5dd-61d8-4669-9067-4082c80f878d/qMwfvc6deT.lottie"
      loop
      autoplay
    />
    <button
        onClick={handleGoHome}
        style={{
          padding: '12px 32px',
          fontSize: '16px',
          fontWeight: '500',
          backgroundColor: '#4F46E5',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={e => e.target.style.backgroundColor = '#4338CA'}
        onMouseLeave={e => e.target.style.backgroundColor = '#4F46E5'}
      >
        ← Go to Home
      </button>
      </div>
  );
};

export default PageNotFound;
