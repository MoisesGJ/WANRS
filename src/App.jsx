import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';

import ArrowR from '../public/arrow_rigth.svg';
import ArrowL from '../public/arrow_left.svg';

function App() {
  const [text, setText] = useState([]);
  const [count, setCount] = useState(0);
  const output = text[count];

  const [data, setData] = useState({});

  useEffect(() => {
    fetch('data.json')
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
  }, []);

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

  function modificarDatos() {
    console.log(count + 1);
    data[count].response = true;

    setData({ ...data });
    guardarDatosEnArchivo();
  }

  function guardarDatosEnArchivo() {
    console.log('hola');
    const jsonData = JSON.stringify(data, null, 2);

    fetch('data.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
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
        <button
          src="#"
          onClick={random}
          className="font-bold text-[16px]  hover:text-[#105b8c] absolute -top-16 italic"
        >
          <u>Random</u>
        </button>
        {output}

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
          <img src={ArrowL} />
        </button>

        <button
          src="#"
          onClick={right}
        >
          <img src={ArrowR} />
        </button>
      </div>

      {/* <footer className="absolute  left-1/2 transform -translate-x-1/2 top-10 text-[10px]">
        Powered by <b>Moi6cito</b>
      </footer> */}
    </>
  );
}

export default App;
