import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [modalOpen, setModalOpen] = useState(null);
  const modalRef = useRef(null);
  const tileImages = ['images/clocker.png', '', '', '', '', '']; // Array to store tile image references
  const modalVideos = ['webms/clocker.webm', '', '', '', '', '']; // Array to store modal video sources

  const openModal = (index) => {
    setModalOpen(index);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (modalOpen !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapePress);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [modalOpen]);

  const renderTileContent = (tile, imgSrc) => {
    if (imgSrc) {
      return <img src={imgSrc} alt={`Tile ${tile}`} />;
    }
    return `Tile ${tile}`;
  };

  const renderModalContent = (videoSrc) => {
    if (videoSrc) {
      return (
        <video controls>
          <source src={videoSrc} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      );
    }
    return <p>Modal content for tile {modalOpen + 1}</p>;
  };

  const createTiles = () => {
    return [1, 2, 3, 4, 5, 6].map((tile, index) => (
      <div key={index} className="tile" onClick={() => openModal(index)}>
        {renderTileContent(tile, tileImages[index])}
      </div>
    ));
  };

  const createModal = () => {
    if (modalOpen !== null) {
      return (
        <div className="modal">
          <div className="modal-content" ref={modalRef} style={{ maxWidth: '80vw' }}>
            <span className="close" onClick={closeModal}>&times;</span>
            {renderModalContent(modalVideos[modalOpen])}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="tiles">
          {createTiles()}
        </div>
        {createModal()}
      </header>
    </div>
  );
}

export default App;