import React, { useEffect, useState } from 'react';

import CardLogic from './CardLogic';
import Modal from './Components/Modal';
import './MainCard.css';

export default function MainCard() {
  const [currentApiIndex, setCurrentApiIndex] = useState(0);
  const apiEndpoints = [
    'https://wanrs-876f7-default-rtdb.firebaseio.com/Game/-Noo8r4HWp337ncONOTL/',
    'https://wanrs-876f7-default-rtdb.firebaseio.com/Game/-Nox5mLnvrkoVqOVs0M9/',
  ];
  const currentApi = apiEndpoints[currentApiIndex];
  const [currentColor, setCurrentColor] = useState('#1c1c1c');
  const [hoverColor, setHoverColor] = useState('bg-red-50');
  const [modalOpen, setModalOpen] = useState(false);

  const {
    output,
    handleLeftArrow,
    handleRigthArrow,
    handleRandomBtn,
    switchApi,
    handleEditData,
    anima,
  } = CardLogic({
    currentApi,
    switchApi: () => {
      setCurrentApiIndex((prevIndex) => (prevIndex + 1) % apiEndpoints.length);
    },
  });

  useEffect(() => {
    setModalOpen(true);
    const timer = setTimeout(() => {
      setModalOpen(false);
    }, 2000);

    document.body.classList.toggle('bg-white', currentApiIndex === 0);
    document.body.classList.toggle('bg-gray-950', currentApiIndex === 1);

    if (currentApiIndex === 0) {
      setCurrentColor('#1c1c1c');
      setHoverColor('hover:bg-red-50');
    } else {
      setCurrentColor('#f0f2f3');
      setHoverColor('hover:bg-[#950f1e]');
    }
    return () => clearTimeout(timer);
  }, [currentApiIndex]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        api={currentApiIndex}
      />
      <button
        className={`absolute top-3 right-3 ${hoverColor} rounded-full p-2`}
        onClick={switchApi}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={currentColor}
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="m482-200 114-113-114-113-42 42 43 43q-28 1-54.5-9T381-381q-20-20-30.5-46T340-479q0-17 4.5-34t12.5-33l-44-44q-17 25-25 53t-8 57q0 38 15 75t44 66q29 29 65 43.5t74 15.5l-38 38 42 42Zm165-170q17-25 25-53t8-57q0-38-14.5-75.5T622-622q-29-29-65.5-43T482-679l38-39-42-42-114 113 114 113 42-42-44-44q27 0 55 10.5t48 30.5q20 20 30.5 46t10.5 52q0 17-4.5 34T603-414l44 44ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      </button>

      {/* MAIN */}

      <main
        className={`p-4 px-5 shadow-[3.0px_3.0px_3.0px_rgba(0,0,0,0.20)] transform transition duration-300 ${anima}`}
      >
        {/* FALSE RESPONSE */}
        <button
          className="z-50 text-transparent p-4 absolute -top-6 -end-4"
          onClick={() => handleEditData(false)}
        >
          .
        </button>

        {output}

        <span className="absolute bottom-[15px] font-semibold text-sm lg:text-md">
          We're Not Really Strangers
        </span>

        {/* TRUE RESPONSE INVISIBLE */}
        <button
          className="text-transparent p-4 absolute bottom-0 w-2/3"
          onClick={() => handleEditData(true)}
        >
          .
        </button>
      </main>

      {/*BUTTONS*/}

      <div className="absolute left-1/2 transform -translate-x-1/2 mt-5 flex w-1/3 justify-between">
        <button
          src="#"
          onClick={handleLeftArrow}
          className={`${hoverColor} rounded-full p-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={currentColor}
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>

        <button
          src="#"
          onClick={handleRandomBtn}
          className={`${hoverColor} rounded-full p-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            fill={currentColor}
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z" />
          </svg>
        </button>

        <button
          src="#"
          onClick={handleRigthArrow}
          className={`${hoverColor} rounded-full p-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={currentColor}
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
          </svg>
        </button>
      </div>
    </>
  );
}
