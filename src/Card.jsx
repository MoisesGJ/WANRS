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
          <div className="absolute h-full border-t-2 border-l-2 border-x-[#c10016] transform -rotate-45 z-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 bg-[#f0f2f3] bg-opacity-90 rounded-lg w-full z-0"></div>
        </>
      )}
      <button
        src="#"
        onClick={change}
      >
        <h1 className="font-bold text-[5vw] md:text-[4vw] lg:text-4xl hover:text-[#105b8c]">
          {text}
        </h1>
      </button>
      <span className="absolute top-[30px] font-bold text-sm">{number}</span>
    </React.Fragment>
  );
}

export default Card;
