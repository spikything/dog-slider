import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [dogs, setDogs] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchData = async (endpoint:string) => {
      const result = await fetch(endpoint);
      const json = await result.json();
      setDogs(json.message);
    }
    fetchData('https://dog.ceo/api/breeds/image/random/5');
  }, []);

  return (
    <div className="App">
      <div className='row'>
        <div className='container'>
          {
            dogs ? 
            dogs.map((dog, index) => <img src={dog} key={index} alt='dog' />) 
            : <p>Loading...</p>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
