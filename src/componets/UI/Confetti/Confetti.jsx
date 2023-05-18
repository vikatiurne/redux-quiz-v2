import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

const Confetti = () => {
  const clientWidth = window.innerWidth;
  const clientHeight = window.innerHeight;
  const [windowSize, setWindowSize] = useState({
    width: clientWidth,
    heigth: clientHeight,
  });

  const getSize = () => {
    setWindowSize({ width: clientWidth, height: clientHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', getSize);
    return window.removeEventListener('resize', getSize);
  }, [windowSize]);

  return (
    <ReactConfetti
      width={windowSize.width}
      heigth={windowSize.heigth}
      recycle={false}
      tweenDuration={300}
      initialVelocityY={-10}
      numberOfPieces={300}
    />
  );
};

export default Confetti;
