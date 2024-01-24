import React, { useState } from 'react';

function Card({ number, question, translation, response }) {
  const [text, setText] = useState(question);
  const change = () => {
    setText(text === translation ? question : translation);
  };
  return (
    <React.Fragment>
      {/*response && (
        <>
         
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 bg-[#f0f2f3] bg-opacity-90 rounded-3xl w-11/12 z-50 h-[90%]"></div>

          <button
            src="#"
            className="absolute end-10 top-8 font-bold z-[100]"
            onClick={() => {
              modificarDatos(false);
            }}
          >
            x
          </button>
        </>
      )*/}

      {response && (
        <>
          <button
            src="#"
            className="absolute end-1 -top-2 font-bold z-[100] text-xl"
            onClick={() => {
              modificarDatos(false);
            }}
          >
            x
          </button>
        </>
      )}

      {response ? (
        <>
          <p className="text-[#f0f2f3] font-bold text-[5vw] md:text-[4vw] lg:text-4xl blur-[1px]">
            {text.split(' ').map((word, pos) => (
              <span
                key={pos}
                className="bg-[#c10016]"
              >
                {word + ' '}
              </span>
            ))}
          </p>
        </>
      ) : (
        <button
          src="#"
          onClick={change}
        >
          <h1 className="font-bold text-[5vw] md:text-[4vw] lg:text-4xl">
            {text}
          </h1>
        </button>
      )}

      <span className="absolute top-[30px] font-bold text-sm">{number}</span>
    </React.Fragment>
  );
}

export default Card;
