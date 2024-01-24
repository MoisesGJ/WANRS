import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';

import ArrowR from '/arrow_rigth.svg';
import Random from '/random.svg';
import ArrowL from '/arrow_left.svg';

function App() {
  const [text, setText] = useState([]);
  const [count, setCount] = useState(0);
  const output = text[count];

  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      'https://wanrs-876f7-default-rtdb.firebaseio.com/Game/-Noo8r4HWp337ncONOTL/.json'
    )
      .then((resData) => resData.json())
      .then((res) => {
        setData(res);
        setText(
          res.map((cd) => (
            <Card
              key={cd.number}
              number={cd.number}
              question={cd.question}
              translation={cd.translation}
              response={cd.response}
            />
          ))
        );
      });
  }, [data]);

  const right = () => {
    setCount(count + 1);
    if (count == text.length - 1) {
      setCount(0);
    }
  };

  const left = () => {
    setCount(count - 1);
    if (count == 0) {
      setCount(text.length - 1);
    }
  };

  const random = () => {
    setCount(Math.floor(Math.random() * text.length));
  };

  function modificarDatos(rmv) {
    rmv ? (data[count].response = true) : (data[count].response = false);

    setData({ ...data });
    guardarDatosEnArchivo();
  }

  function guardarDatosEnArchivo() {
    const jsonData = JSON.stringify(data, null, 2);

    fetch(
      'https://wanrs-876f7-default-rtdb.firebaseio.com/Game/-Noo8r4HWp337ncONOTL/.json',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al guardar el archivo JSON');
        }
      })
      .catch((error) =>
        console.error('Error al guardar el archivo JSON:', error)
      );
  }

  return (
    <>
      <main className="p-4 px-5">
        {output}

        <button
          src="#"
          className="absolute -end-2 -top-4 font-bold z-[100] text-transparent p-3 px-4"
          onClick={() => {
            modificarDatos(false);
          }}
          style={{ width: '10px' }}
        >
          ....
        </button>

        <button
          className="absolute bottom-[15px] font-semibold text-sm lg:text-md"
          src="#"
          onClick={modificarDatos}
        >
          We're Not Really Strangers
        </button>
      </main>
      <div className="absolute mt-10 flex justify-between w-[79%]">
        <button
          src="#"
          onClick={left}
        >
          <img
            src={ArrowL}
            className="hover:bg-gray-100 rounded-full"
          />
        </button>

        <button
          src="#"
          onClick={random}
        >
          <img
            src={Random}
            alt=""
            className="hover:bg-gray-100 rounded-full"
          />
        </button>

        <button
          src="#"
          onClick={right}
        >
          <img
            src={ArrowR}
            className="hover:bg-gray-100 rounded-full"
          />
        </button>
      </div>
    </>
  );
}

export default App;
