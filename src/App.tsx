import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import useWindowDimensions from './hooks/useWindowDimensions';
import './App.css';

const API_ENDPOINT = 'https://dog.ceo/api/breeds/image/random/';
const ITEM_WIDTH = 60;
const ITEM_COUNT = 30;
const CAROUSEL_CENTRE_OFFSET = Math.round(ITEM_COUNT / 2);

function App() {

  const [dogs, setDogs] = useState<string[] | null>(null);
  const [position, setPosition] = useState(CAROUSEL_CENTRE_OFFSET);
  const { height, width } = useWindowDimensions();

  const swipeConfig = {
    delta: 10,
    preventScrollOnSwipe: true,
    trackMouse: true
  }

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => {
      let isPortrait = width < height;
      let swipeVector = 0;

      switch (eventData.dir) {

        case 'Left':
          if (!isPortrait) swipeVector = 1;
          break;

        case 'Right':
          if (!isPortrait) swipeVector = -1;
          break;
        
        case 'Down':
          if (isPortrait) swipeVector = 1;
          break;
        
        case 'Up':
          if (isPortrait) swipeVector = -1;
          break;

        default:
          break;
      }

      setPosition(position + swipeVector);
    },
    ...swipeConfig,
  });

  const getCarouselVirtualIndex = (imageIndex:number, carouselPosition:number) => {
    let virtualIndex = imageIndex - carouselPosition;
    // while (virtualIndex < 0) virtualIndex += ITEM_COUNT;
    // virtualIndex = virtualIndex % ITEM_COUNT;
    return virtualIndex;
  }

  useEffect(() => {
    const fetchData = async (endpoint:string) => {
      const result = await fetch(endpoint);
      const json = await result.json();
      setDogs(json.message);
    }
    fetchData(API_ENDPOINT + ITEM_COUNT);
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
            scale: position === index ? 1 : 0.85,
            left: `${ getCarouselVirtualIndex(index, position) * ITEM_WIDTH - (ITEM_WIDTH / 2) }vmax`
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
