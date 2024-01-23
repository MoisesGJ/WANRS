import React, { useState } from 'react';

function Card({ number, question, translation, response }) {
  const [text, setText] = useState(question);
  const change = () => {
    setText(text === translation ? question : translation);
  };
  return (
    <React.Fragment>
      {response && (
        <>
          {/* <div className="absolute h-3/4 border-t-2 border-l-2 border-x-[#c10016] border-opacity-50 transform -rotate-45 z-10"></div>
          <div className="absolute h-3/4 border-t-2 border-l-2 border-x-[#c10016] border-opacity-50 transform rotate-45 z-10"></div> */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 bg-[#f0f2f3] bg-opacity-90 rounded-3xl w-11/12 z-50 h-[90%]"></div>

          <button
            src="#"
            className="absolute start-10 top-8 font-bold z-[100]"
            onClick={() => {
              modificarDatos(false);
            }}
          >
            x
          </button>
        </>
      )}
      <button
        src="#"
        onClick={change}
      >
        <h1 className="font-bold text-[5vw] md:text-[4vw] lg:text-4xl">
          {text}
        </h1>
      </button>
      <span className="absolute top-[30px] font-bold text-sm">{number}</span>
    </React.Fragment>
  );
}

export default Card;
