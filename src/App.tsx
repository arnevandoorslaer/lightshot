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
    <>
      <div className='text-center m-5'>
        <div style={{ height: '500px' }} className='mb-5'>
          {loading ? (
            <div className='h-100 border border-dark d-flex justify-content-center align-items-center'>
              <div className='spinner-border' role='status'></div>
            </div>
          ) : (
            <img src={src} ref={image} alt={src} className='h-100' />
          )}
        </div>
        <button
          onClick={() => {
            getRandomUrl();
            setLoading(true);
          }}
          disabled={loading}
          className='btn btn-dark m-5 px-5'
        >
          Get Picture
        </button>
      </div>
    </>
  );
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default App;
