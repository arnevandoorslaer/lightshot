import { useRef, useState } from 'react';
import './App.css';

function App() {
  const image = useRef(null);

  const [src, setSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getRandomUrl = async (): Promise<string> => {
    const short = Math.random()
      .toString(36)
      .substring(randomIntFromInterval(7, 10));
    const url = `https://i.imgflip.com/1${short}.jpg`;
    const response = await fetch(url);
    if (!response.ok) {
      return getRandomUrl();
    } else {
      setSrc(url);
      setLoading(false);
      return url;
    }
  };

  return (
    <div
      className='text-center mt-5 container col-6'
      style={{ height: '20rem' }}
    >
      <button
        onClick={() => {
          getRandomUrl();
          setLoading(true);
        }}
        disabled={loading}
        className='btn btn-dark w-100 mb-5'
      >
        Get Picture
      </button>
      <div className='h-100 d-flex justify-content-center align-items-center mt-4'>
        {loading ? (
          <div className='spinner-border' role='status'></div>
        ) : (
          <img src={src} ref={image} alt={src} style={{ maxHeight: '70%' }} />
        )}
      </div>
    </div>
  );
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default App;
