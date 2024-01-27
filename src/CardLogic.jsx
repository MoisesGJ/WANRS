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
    setAnima('-rotate-90 -translate-x-full scale-150');

    const timer = setTimeout(() => {
      setCount(
        (prevCount) => (prevCount - 1 + cardData.length) % cardData.length
      );
      setAnima('');
    }, 600);

    return () => clearTimeout(timer);
  };

  const handleRigthArrow = () => {
    setAnima('rotate-90 translate-x-full scale-150');

    const timer = setTimeout(() => {
      setCount((prevCount) => (prevCount + 1) % cardData.length);
      setAnima('');
    }, 600);

    return () => clearTimeout(timer);
  };

  const handleRandomBtn = () => {
    setAnima('skew-y-12 scale-75');

    const timer = setTimeout(() => {
      setCount(Math.floor(Math.random() * cardData.length));
      setAnima('skew-y-0');
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
