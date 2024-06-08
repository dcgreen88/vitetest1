import { useState } from 'react';
import MovieSelector from './MovieSelector';
import genreTransform from './genres';

export default function Modal({ getNewMedia, close, show }) {
  const [mediaType, setMediaType] = useState(false); // false for movie, true for tv show. true and false used so could add disable property to buttons so user can't select the same media type twice

  function handleSelectMediaType() {
    setMediaType((prevState) => !prevState); //toggle between movie and tv show
  }

  function handleClose() {
    close();
    setMediaType(false); //ensure the modal opens on the movie selector
  }

  function forwardNewMediaObject(media) {
    const genres = media.genre_ids.map(genreTransform);
    getNewMedia({
      ...media,
      id: new Date().getTime(),
      genre_ids: genres,
    });
  }

  return (
    <>
    {show === 'flex' && <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>}
      <dialog
        id="MODAL"
        className={`text-black fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ${
          mediaType ? 'bg-yellow-700' : 'bg-green-900'
        } w-[360px] max-h-[500px] rounded-lg`}
        open={show === 'flex'}
      >
        <h2 className="text-center mb-2 font-semibold text-lg">
          Add New {mediaType ? 'TV Show' : 'Movie'}
        </h2>
        <div id="MAINBUTTONS" className="flex flex-row justify-around">
          <button
            onClick={handleSelectMediaType}
            disabled={!mediaType}
            className="font-buttons bg-teal-950 border-none rounded-t px-2 text-green-500"
          >
            Movie
          </button>
          <button
            onClick={handleSelectMediaType}
            disabled={mediaType}
            className="font-buttons bg-teal-950 border-none rounded-t px-2 text-yellow-500"
          >
            TV Show
          </button>
        </div>
        <MovieSelector
          searchType={mediaType}
          getMediaObject={forwardNewMediaObject}
          close={handleClose}
        />
        <div id="CLOSE" className="flex flex-col items-center pb-1 pt-1">
          <button
            onClick={handleClose}
            className="my-[4px] w-14 font-buttons bg-teal-950 text-red-500 rounded py-[1px]"
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
