import { useState, useEffect } from 'react';
import MediaCard from './components/MediaCard';
import MovieSelector from './components/MovieSelector';
import Modal from './components/Modal';
import './App.css';
import dcg from './assets/dcg.png';

function App() {
  const retrieveLocal = JSON.parse(localStorage.getItem('movies')) || []; // To prevent the masterlist from reading null retrieveLocal is initially set to an empty array. When localstorage becomes truthy retrieveLocal retrieves the values for the masterList.
  const [masterList, setMasterList] = useState(retrieveLocal); // this state pulls the masterlist from localstorage to be displayed
  const [mediaList, setMediaList] = useState(masterList); // this is a mutable-copy of the masterlist for search/filter functions
  const [showModal, setShowModal] = useState(false); // this is used to toggle the modal on/off
  const [showDeletePrompt, setShowDeletePrompt] = useState(false); // this is used to toggle the delete prompt on/off

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(masterList)); // When the masterList is edited we store it on the localstorage.
    setMediaList(masterList);
  }, [masterList]);


  // These variables are integral to pass to the modal so it can send new media to the masterList
  // VARIABLES TO ACCESS THE MODAL'S FUNCTIONS
  const closeModal = () => setShowModal('invisible');
  const openModal = () => setShowModal('flex');
  // Functionality to add new media to the masterList
  function handleNewMedia(media) {
    setMasterList([...masterList, media]);
    closeModal();
  }


  // Functionality that allows me to delete/edit objects in the mediaList
  function deleteIndex(idForRemoval, title) {
    setShowDeletePrompt({ idForRemoval, title });
  }

  function onDelete() {
    setMasterList(
      masterList.filter((movie) => movie.id !== showDeletePrompt.idForRemoval)
    );
    setShowDeletePrompt(false);
  }

  function cancelDelete() {
    setShowDeletePrompt(false);
  }

  function onEdit(id, note, rating) {
    setMasterList(
      masterList.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              note,
              rating,
            }
          : movie
      )
    );
  }

  return (
    <div id="APP" className="bg-white flex flex-col relative">
      <div
        id="TOPSPLASH"
        className={`border-black border-[1px] p-2 fixed z-50 w-full text-center bg-cover bg-[center_268px] font-marker text-2xl h-[48px] text-green-400 drop-shadow-sm`}
        style={{
          backgroundImage: `url(${dcg})`,
          WebkitTextStroke: '1px black',
        }}
      >
        DCGreen Media Reviews
      </div>
      <div
        id="MIDDLELISTHOOK"
        className="flex flex-col md:flex-row md:flex-wrap items-center overflow-y-auto h-screen pt-[64px] pb-[90px] bg-gradient-to-t from-green-600 to-emerald-800 to-80% md:justify-evenly"
      >
        {mediaList &&
          mediaList.map((mediaObject, index) => (
            <MediaCard
              media={mediaObject}
              key={index}
              onDelete={deleteIndex}
              onEdit={onEdit}
              disableDelete={showDeletePrompt}
            />
          ))}
      </div>
      {showDeletePrompt && (
        <>
          <div id='BLACKBACKGROUND' className="fixed inset-0 bg-black bg-opacity-70 z-10"></div>
          <div id='DELTEPROMPTCASE' className="absolute bg-red-900 w-screen flex-col flex text-center z-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-buttons">
            <h2 id='DELETETEXT' className='m-2'>{`Really Delete ${
              showDeletePrompt.title || showDeletePrompt.name // This ternary operator is used to account for the fact that the API uses 'name' instead of 'title for tv shows
            }?`}</h2>
            <div id='BUTTONS' className='flex justify-center space-x-8 m-2 mb-4'>
              <button
                onClick={onDelete}
                className="bg-teal-950 text-green-500 font-buttons rounded p-[2px] px-[6px]"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-teal-950 text-red-500 font-buttons rounded p-[2px] px-[6px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
      <Modal show={showModal} close={closeModal} getNewMedia={handleNewMedia}>
        <MovieSelector />
      </Modal>

      <div
        id="BOTTOMBUTTONS"
        className="flex justify-center fixed z-50 w-full  h-[48px] drop-shadow-sm bg-teal-950 border-t bottom-[0px]"
      >
        <div id='BUTTONCIRCLE' className="bg-teal-950 rounded-full w-[95px] h-[95px] z-60 absolute bottom-[0px]"></div>
        <button
          className="m-2 font-buttons text-green-500 bg-black px-3 rounded-full text-sm text-wrap w-[82px] h-[82px] z-70 absolute bottom-[0px]"
          onClick={openModal}
        >
          Add New Media
        </button>
      </div>
    </div>
  );
}

export default App;

{
  /* <div
        id="homeMenuContainer"
        className="flex justify-around items-center border-black border-2"
      >
        <input id="searcbarComponent" type="text" />

        <div
          id="filterComponent"
          className="flex flex-col border-black border-2"
        >
          <label className="">Search Filters</label>
          <select id="filtersMenu" name="search-filters">
            <option value="option">Filter Option</option>
          </select>
        </div>
      </div> */
}
