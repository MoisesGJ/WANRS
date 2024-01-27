import { useState, useEffect } from 'react';
import Text from './Components/Text';

function CardLogic({ currentApi, switchApi }) {
  const [cardData, setCardData] = useState([]);
  const [count, setCount] = useState(0);
  const [updateResponse, setUpdateResponse] = useState(false);
  const [anima, setAnima] = useState('');

  useEffect(() => {
    fetch(currentApi + '.json')
      .then((resData) => resData.json())
      .then((res) => {
        setCardData(
          res.map((cd) => (
            <Text
              key={cd.number}
              {...cd}
            />
          ))
        );
      });
  }, [currentApi, updateResponse]);

  function handleEditData(value) {
    const uriUpdate = currentApi + count + '/.json';

    fetch(uriUpdate, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response: value }),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        setCardData(updatedData);

        setUpdateResponse((prev) => (prev == true ? false : true));
      })
      .catch((error) => {
        console.error('Error al actualizar los datos:', error);
      });
  }

  const output = cardData[count];

  const handleLeftArrow = () => {
    setAnima('-translate-x-5 transition-opacity opacity-0');

    const timer = setTimeout(() => {
      setCount(
        (prevCount) => (prevCount - 1 + cardData.length) % cardData.length
      );
      setAnima('translate-x-5 transition-opacity opacity-100');
    }, 600);

    return () => clearTimeout(timer);
  };

  const handleRigthArrow = () => {
    setAnima('translate-x-5 transition-opacity opacity-0');

    const timer = setTimeout(() => {
      setCount((prevCount) => (prevCount + 1) % cardData.length);
      setAnima('-translate-x-5 transition-opacity opacity-100');
    }, 600);

    return () => clearTimeout(timer);
  };

  const handleRandomBtn = () => {
    setAnima('rotate-180 transition-opacity');

    const timer = setTimeout(() => {
      setCount(Math.floor(Math.random() * cardData.length));
      setAnima('rotate-0 transition-opacity');
    }, 500);

    return () => clearTimeout(timer);
  };

  return {
    output,
    handleLeftArrow,
    handleRigthArrow,
    handleRandomBtn,
    switchApi,
    handleEditData,
    anima,
  };
}

export default CardLogic;
