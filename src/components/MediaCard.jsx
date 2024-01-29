import { useState } from 'react';
import star from '../assets/star.png';

export default function MediaCard({
  media: {
    id = '',
    poster_path = '',
    title = '',
    name = '',
    release_date = '',
    first_air_date = '',
    genre_ids = [],
    note = '',
    rating = '',
  },
  mediaKey,
  onDelete,
  onEdit,
}) {
  // State to record the new note and rating
  const [mediaNote, setMediaNote] = useState(note, '');
  const [mediaRating, setMediaRating] = useState(rating, '');
  const [editing, setEditing] = useState(false);
  const [noteOpacity, setNoteOpacity] = useState(false);

  // Functionality for buttons to pass mediaElement index to App for delete/edit
  function onDeleteClick() {
    onDelete(id);
  }

  function onEditClick() {
    if (editing) {
      onEdit(id, mediaNote, mediaRating);
      setEditing((prevState) => !prevState);
    } else {
      setEditing((prevState) => !prevState);
    }
  }

  function inputNote(event) {
    setMediaNote(event.target.value);
  }
  function inputRating(event) {
    setMediaRating(event.target.value);
  }

  // I need a variable to control the size of the title
  const titles =
    title?.length + release_date?.length > 24 ||
    name?.length + first_air_date?.length > 24
      ? 'text-[14px]'
      : 'text-[18px]';

  function toggleNote() {
    setNoteOpacity((prevState) => !prevState);
  }

  return (
    <div
      id="MEDIACARD"
      className="flex flex-col items-center border-black border-[1px] w-80 relative mb-4 h-[544px] drop-shadow-sm"
    >
      <div id="posterDisplay" className="h-auto w-auto flex relative">
        <img
          src={`https://media.themoviedb.org/t/p/original${poster_path}`}
          className="object-cover"
          onClick={toggleNote}
        />
        {note && (
          <div
            id="note_display"
            className={`flex absolute bg-blue-600 w-[310px] overflow-scroll m-[4px] p-[6px] pt-[1px] max-h-[468px] text-white ${
              noteOpacity
                ? 'opacity-80 transition-opacity duration-500 ease-in-out'
                : 'opacity-0 transition-opacity duration-500'
            }`}
            onClick={toggleNote}
          >
            {note}
          </div>
        )}
        {editing && (
          <textarea
            type="text"
            onChange={inputNote}
            value={mediaNote}
            placeholder="Your note here..."
            className="absolute z-10 p-[4px] m-[4px] w-[310px] h-[468px] opacity-75 overflow-hidden"
          />
        )}
      </div>

      <div id="elementBody" className="flex w-[316px] h-[64px] relative">
        <div className="flex relative min-w-[44px] max-w-[44px]">
          <img
            src={star}
            className="relative min-w-[44px] max-w-[44px] object-contain"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
            {rating}
          </div>
          {editing && (
            <input
              type="number"
              min="0"
              max="10"
              step=".1"
              onChange={inputRating}
              placeholder={mediaRating}
              value={mediaRating}
              className="absolute bottom-[18px] left-[8px] max-w-[28px] pl-[3px]"
            />
          )}
        </div>

        <div className="flex flex-col p-[2px] grow">
          <div className={`${titles} flex grow font-semibold`}>{`${
            title || name
          } (${release_date || first_air_date})`}</div>
          <div className="flex justify-start">
            {genre_ids.map((genre) => {
              return (
                <div className="text-[12px] font-semibold mr-2 h-[18px] bg-cyan-950 rounded-full text-white px-1.5 mb-[2px]">
                  {genre}
                </div>
              );
            })}
          </div>
        </div>

        <div
          id="buttonContainer"
          className="flex flex-col min-w-[44px] max-w-[44px] justify-around"
        >
          <button onClick={onDeleteClick} className="text-[14px]">
            Delete
          </button>
          <button onClick={onEditClick}>Edit</button>
        </div>
      </div>
    </div>
  );
}

// opacity-80 transition-opacity duration-500 ease-in-out
