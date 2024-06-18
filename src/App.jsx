import { useState, useEffect } from 'react';
import MediaCard from './components/MediaCard';
import MovieSelector from './components/MovieSelector';
import Modal from './components/Modal';
import './App.css';
import dcg from './assets/dcg.png';
import Filter from './components/old_components/Filter';
import SearchBar from './components/old_components/SearchBar';

function App() {
  const retrieveLocal = JSON.parse(localStorage.getItem('movies')) || []; // To prevent the masterlist from reading null retrieveLocal is initially set to an empty array. When localstorage becomes truthy retrieveLocal retrieves the values for the masterList.
  const [masterList, setMasterList] = useState(retrieveLocal); // this state pulls the masterlist from localstorage to be displayed
  const [mediaList, setMediaList] = useState(masterList); // this is a mutable-copy of the masterlist for search/filter functions
  const [showModal, setShowModal] = useState(false); // this is used to toggle the modal on/off
  const [showDeletePrompt, setShowDeletePrompt] = useState(false); // this is used to toggle the delete prompt on/off
  const [searchList, setSearchList] = useState('');

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

  // Functionality that allows me to delete/edit objects in the masterList
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
  //Search functionality for mediaList
  function searchFilter(searchTerm) {
    const searchLower = searchTerm.toLowerCase();

    const filteredList = mediaList.filter((movie) => {
      const title = movie.title.toLowerCase();

      const matchesTitle = title ? title.includes(searchLower) : false;

      return matchesTitle;
    });

    if (filteredList.length === 0) {
      return;
    }

    setMediaList(filteredList);
    setSearchList(filteredList);
  }
  function resetList() {
    setMediaList(masterList);
    setSearchList('');
  }
  // Filter functionality for mediaList
  const listToSort =
    searchList && searchList.length > 0 ? searchList : mediaList;

  function dateList() {
    const sortedList = [...listToSort].sort((a, b) => a.id - b.id);
    setMediaList(sortedList);
  }
  function dateListDown() {
    const sortedList = [...listToSort].sort((a, b) => b.id - a.id);
    setMediaList(sortedList);
  }
  function alphabetList() {
    const sortedList = [...listToSort].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    setMediaList(sortedList);
  }
  function alphabetListDown() {
    const sortedList = [...listToSort].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      if (titleA < titleB) {
        return 1;
      }
      if (titleA > titleB) {
        return -1;
      }
      return 0;
    });
    setMediaList(sortedList);
  }
  function ratingList() {
    const sortedList = [...listToSort].sort((a, b) => b.rating - a.rating);
    setMediaList(sortedList);
  }
  function ratingListDown() {
    const sortedList = [...listToSort].sort((a, b) => a.rating - b.rating);
    setMediaList(sortedList);
  }

  function onlyMovie() {
    const exclusiveList = searchList && searchList.length > 0 ? searchList : masterList;
    
    const sortedList = exclusiveList.filter((movie) =>
      movie.type.includes('movie')
    );
    setMediaList(sortedList);
  }
  function onlyTv() {
    const exclusiveList = searchList && searchList.length > 0 ? searchList : masterList;

    const sortedList = exclusiveList.filter((movie) => movie.type.includes('tv'));
    setMediaList(sortedList);
  }
  //Filter Switch Logic
  function filterHandler(filterOption) {
    switch (filterOption) {
      case 'Date':
        return dateList();
      case 'Alphabetical':
        return alphabetList();
      case 'Rating':
        return ratingList();
      case 'DateDown':
        return dateListDown();
      case 'AlphabeticalDown':
        return alphabetListDown();
      case 'RatingDown':
        return ratingListDown();
      case 'onlyMovie':
        return onlyMovie();
      case 'onlyTv':
        return onlyTv();
    }
  }
  // END OF MASTERLIST CONTROLS

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
          <div
            id="BLACKBACKGROUND"
            className="fixed inset-0 bg-black bg-opacity-70 z-60"
          ></div>
          <div
            id="DELTEPROMPTCASE"
            className="absolute bg-red-900 w-screen flex-col flex text-center z-54 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-buttons"
          >
            <h2 id="DELETETEXT" className="m-2">{`Really Delete ${
              showDeletePrompt.title || showDeletePrompt.name // This ternary operator is used to account for the fact that the API uses 'name' instead of 'title for tv shows
            }?`}</h2>
            <div
              id="BUTTONS"
              className="flex justify-center space-x-8 m-2 mb-4"
            >
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
        className="fixed z-50 w-full h-[48px] bg-teal-950 bottom-[0px] border-b border-teal-950 flex items-center"
      >
        <SearchBar searchFilter={searchFilter} resetList={resetList} />

        <div
          id="BUTTONCIRCLE"
          className="relative bg-black rounded-full w-[90px] h-[90px] z-51 border-[1px] flex border-green-500 bottom-[24px] flex-none ring-[5px] ring-teal-950"
        >
          <button
            className="font-buttons text-green-500 rounded-full text-sm text-wrap z-52"
            onClick={openModal}
            style={{ pointerEvents: showDeletePrompt ? 'none' : 'auto' }} // This ternary operator is used to prevent the user from opening the modal while it is already open
          >
            Add New Media
          </button>
        </div>

        <Filter filterHandler={filterHandler} />
      </div>
    </div>
  );
}

export default App;
