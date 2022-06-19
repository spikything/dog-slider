import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';

function App() {

  const [dogs, setDogs] = useState<string[] | null>(null);
  const [position, setPosition] = useState(2);

  const swipeConfig = {
    delta: 10,
    preventDefaultTouchmoveEvent: false,
    trackTouch: true,
    trackMouse: false,
    rotationAngle: 0
  }

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => {
      switch (eventData.dir) {

        case 'Left':
          setPosition(position + 1);
          break;

        case 'Right':
          setPosition(position - 1);
          break;
      
        default:
          break;
      }
    },
    ...swipeConfig,
  });

  useEffect(() => {
    const fetchData = async (endpoint:string) => {
      const result = await fetch(endpoint);
      const json = await result.json();
      setDogs(json.message);
    }
    fetchData('https://dog.ceo/api/breeds/image/random/5');
  }, []);

  return (
    <div className="App" {...swipeHandlers}>
      <div className='row'>

      {
        dogs ? 
        dogs.map((dog, index) =>

        <motion.div 
          key={index}
          initial={{ 
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity: 1,
            scale: index === position ? 1 : .8,
            left: `${(index - position) * 60 - 30 }vw`
          }}
          transition={{
            type:'spring',
            stiffness:75,
            damping:8
          }}
          className='container'>

          <img src={dog} alt='dog' />

          </motion.div>

          ) 
          : <p>Loading...</p>
          }

      </div>
    </div>
  );
}

export default App;
