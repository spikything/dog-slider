import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [dogs, setDogs] = useState<string[] | null>(null);
  const [position, setPosition] = useState(0);

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

      {
        dogs ? 
        dogs.map((dog, index) =>

        <motion.div 
          initial={{ 
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity: 1,
            scale: 1,
            left: `${index* 30 }vw`
          }}
          transition={{
            type:'spring',
            stiffness:75,
            damping:8,
            delay:0.5
          }}
          className='container'>

          <img src={dog} key={index} alt='dog' />

          </motion.div>

          ) 
          : <p>Loading...</p>
          }

      </div>
    </div>
  );
}

export default App;
