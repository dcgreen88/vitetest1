import { useState } from 'react';
import MovieSelector from './MovieSelector';
import genreTransform from './genres';

export default function Modal({ getNewMedia, close, show }) {
  const [mediaType, setMediaType] = useState(false);

  function handleSelectMediaType() {
    setMediaType((prevState) => !prevState);
    // <----- function to reset
  }

  function handleClose() {
    close();
    setMediaType(false);
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
    <dialog
      id="MODAL"
      className={`text-black flex-col fixed overflow-visible p-2 ${
        mediaType ? 'bg-yellow-800' : 'bg-green-800'
      } w-[360px] bottom-[100px] h-max-[500px]`}
      open={show === 'flex'}
    >
      <h2 className="text-center mb-2">New Media</h2>
      <div id="MAINBUTTONS" className="flex flex-row justify-around">
        <button
          onClick={handleSelectMediaType}
          disabled={!mediaType}
          className="mb-1 border-[1px]"
        >
          Movie
        </button>
        <button
          onClick={handleSelectMediaType}
          disabled={mediaType}
          className="mb-1 border-[1px]"
        >
          TV Show
        </button>
      </div>
      <MovieSelector
        searchType={mediaType}
        getMediaObject={forwardNewMediaObject}
        close={handleClose}
      />
      <div id="CLOSE" className="flex flex-col items-center">
        <button onClick={handleClose} className="mb-[4px] w-20">
          Close
        </button>
      </div>
    </dialog>
  );
}
