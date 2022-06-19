import { motion } from 'framer-motion';
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
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, left: '-30vw' }}
          transition={{ type:'spring', stiffness:75, damping:8, delay:0.5 }}
          className='container'>
            {
              dogs ? 
              dogs.map((dog, index) => <img src={dog} key={index} alt='dog' />) 
              : <p>Loading...</p>
            }
        </motion.div>
      </div>
    </div>
  );
}

export default App;
