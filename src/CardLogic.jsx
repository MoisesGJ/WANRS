import { useState, useEffect } from 'react';
import Text from './Components/Text';

function CardLogic({ currentApi, switchApi }) {
  const [cardData, setCardData] = useState([]);
  const [count, setCount] = useState(0);
  const [updateResponse, setUpdateResponse] = useState(false);

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
    setCount(
      (prevCount) => (prevCount - 1 + cardData.length) % cardData.length
    );
  };

  const handleRigthArrow = () => {
    setCount((prevCount) => (prevCount + 1) % cardData.length);
  };

  const handleRandomBtn = () => {
    setCount(Math.floor(Math.random() * cardData.length));
  };

  return {
    output,
    handleLeftArrow,
    handleRigthArrow,
    handleRandomBtn,
    switchApi,
    handleEditData,
  };
}

export default CardLogic;
