import { useState, useEffect } from 'react';

export default function Text({
  number,
  question,
  translation,
  response,
  level,
}) {
  const [text, setText] = useState(question);

  useEffect(() => {
    setText(question);
  }, [question]);

  const handleShowTranslation = () => {
    setText((prev) => (prev === question ? translation : question));
  };

  return (
    <div>
      {response && (
        <span
          src="#"
          className="absolute -end-1 -top-2 font-bold z-10 text-x"
        >
          x
        </span>
      )}

      <span
        className={`absolute left-1/2 transform -translate-x-1/2  top-[30px] font-bold text-sm ${
          response && 'px-2 bg-[#c10016] text-[#f0f2f3]'
        }`}
      >
        {number}
      </span>

      <button onClick={handleShowTranslation}>
        <h1 className="font-bold text-[5vw] md:text-[4vw] lg:text-4xl">
          {response
            ? text.split(' ').map((word, pos) => (
                <span
                  key={pos}
                  className="bg-[#c10016] text-[#f0f2f3]"
                >
                  {word + ' '}
                </span>
              ))
            : text}
        </h1>
      </button>

      <span className="absolute left-1/2 transform -translate-x-1/2  bottom-[50px] font-bold text-md">
        {level &&
          Array(parseInt(level))
            .fill('x')
            .map((char, index) => (
              <span
                className={`${response && 'px-2 bg-[#c10016] text-[#f0f2f3]'}`}
                key={index}
              >
                {char}
              </span>
            ))}
      </span>
    </div>
  );
}
