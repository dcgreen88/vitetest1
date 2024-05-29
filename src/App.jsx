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
  const [showModal, setShowModal] = useState(false); // this is a mutable-copy of the masterlist for search/filter functions
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(masterList)); // When the masterList is edited we store it on the localstorage.
    setMediaList(masterList);
  }, [masterList]);

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
    setShowDeletePrompt({idForRemoval, title});
  }

  function onDelete() {
    setMasterList(masterList.filter((movie) => movie.id !== showDeletePrompt.idForRemoval));
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
    <div id="APP" className="h-full bg-white flex flex-col relative">
      <div
        id="SPLASH"
        className={`border-black border-[1px] p-2 fixed z-50 w-full text-center bg-cover bg-[center_268px] font-marker text-2xl h-[48px] text-green-400 drop-shadow-sm`}
        style={{
          backgroundImage: `url(${dcg})`,
          WebkitTextStroke: '1px black',
        }}
      >
        DCGreen Media Reviews
      </div>
      <div
        id="LISTHOOK"
        className="flex flex-col items-center overflow-y-auto h-screen pt-[64px] pb-[100px] bg-gradient-to-t from-green-600 to-emerald-800 to-80%"
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
        <div className="absolute top-[500px] bg-slate-700 w-screen flex-col flex text-center">
          <p>{`Really Delete ${showDeletePrompt.title || showDeletePrompt.name}?`}</p>
          <button onClick={onDelete}>Yes</button>
          <button onClick={cancelDelete}>Cancel</button>
        </div>
      )}
      <Modal show={showModal} close={closeModal} getNewMedia={handleNewMedia}>
        <MovieSelector />
      </Modal>

      <div
        id="ADDBUTTON"
        className="flex justify-center fixed z-50 w-full -bottom-[1px] h-[48px] drop-shadow-sm bg-teal-950"
      >
        <div className="absolute bg-teal-950 rounded-full w-[95px] h-[95px] bottom-[1px] right-[159px] -z-10"></div>
        <button
          className="relative m-2 font-buttons text-green-500 bg-black px-3 rounded-full text-sm text-wrap w-[82px] h-[82px] bottom-[50px]"
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
