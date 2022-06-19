import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';

function App() {

  const [dogs, setDogs] = useState<string[] | null>(null);
  const [position, setPosition] = useState(2);
  const ITEM_WIDTH = 60;
  const ITEM_COUNT = 25;
  const CAROUSEL_CENTRE_OFFSET = Math.round(ITEM_COUNT / 2);

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

  const getCarouselVirtualIndex = (imageIndex:number, carouselPosition:number) => {
    let virtualIndex = imageIndex - carouselPosition;
    // while (virtualIndex < 0) virtualIndex += ITEM_COUNT;
    // virtualIndex = virtualIndex % ITEM_COUNT;
    return virtualIndex - CAROUSEL_CENTRE_OFFSET;
  }

  useEffect(() => {
    const fetchData = async (endpoint:string) => {
      const result = await fetch(endpoint);
      const json = await result.json();
      setDogs(json.message);
    }
    fetchData('https://dog.ceo/api/breeds/image/random/' + ITEM_COUNT);
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
            scale: .9,
            left: `${ getCarouselVirtualIndex(index, position) * ITEM_WIDTH - (ITEM_WIDTH / 2) }vw`
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
