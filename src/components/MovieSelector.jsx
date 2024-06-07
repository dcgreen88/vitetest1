import { useState, useEffect, useRef } from 'react';

export default function MovieSelector({ searchType, getMediaObject, close }) {
  const [search, setSearch] = useState(''); // This state manages the search-term
  const [poster, setPoster] = useState(''); // This manages the displayed array of posters
  const searchBarRef = useRef(null);

  // I need functionality that resets the searchbar when the modal is closed.
  function resetSearchValue() {
    setSearch('');
    searchBarRef.current.value = '';
    setPoster('');
  }

  useEffect(() => {
    resetSearchValue();
  }, [close]);

  // This allows the input to monitor for the Enter key which will pass the searchbar value to the API
  const handleSearch = (event) =>
    event.key === 'Enter' ? setSearch(event.target.value) : undefined;

  // This is a variable used within the API
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWMwOWY4MGE0NTc3NWEwZjI0M2I2MmZlODM5ZmRlOSIsInN1YiI6IjY1YTU5MDkxMDU4MjI0MDEzMmZlMTA0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dg3Ta6VXk0O6IB9LfmshyebMOeC_gRK8UGChUaPxAA4',
    },
  };

  useEffect(() => {
    async function fetchMovie() {
      const response = await fetch(
        // This is where we provide the url for the api
        `https://api.themoviedb.org/3/search/${
          searchType ? 'tv' : 'movie' // Here we dynamically change the search distinction from movie to tv
        }?query=${search}&include_adult=false&language=en-US&page=1`, // Here the search-term is provided
        options
      );
      const resData = await response.json(); // Here we convert the received data to readable json
      // console.log(resData);

      if (resData.results) {
        // If the data is valid we map it to an object which is put in an array and set as state to be displayed by the modal
        const posterURL = resData.results.map((result) => ({
          genre_ids: result.genre_ids,
          poster_path: result.poster_path,
          release_date: result.release_date,
          first_air_date: result.first_air_date,
          title: result.title || '',
          name: result.name,
          select: false,
        })); // this creates a new array of each result's poster_path.
        setPoster(posterURL); // this updates the poster array to the searched API results
      }
    }

    fetchMovie();
  }, [search]); // The useEffect will not re-render unless the dependency changes

  // I need functionality that selects a movie based on its index and then exports that data to the media element

  function beginSelectMedia(index) {
    setPoster((prevState) =>
      prevState.map((media, i) =>
        i === index ? { ...media, select: !media.select } : media
      )
    );
  }

  function selectMedia(event) {
    getMediaObject(poster[event.currentTarget.dataset.index]);
    resetSearchValue();
    close();
  }

  return (
    <>
      <div id="SEARCH" className="flex justify-center">
        <input
          ref={searchBarRef}
          id="searchbar"
          className={`border-teal-950 border-[2px] rounded-md mb-[6px] w-[260px] outline-none pl-[6px] font-buttons ${
            searchType ? 'bg-yellow-500 focus:bg-yellow-400 placeholder-red-800' : 'bg-teal-700 focus:bg-teal-600 placeholder-teal-400'
          }`}
          type="text"
          onKeyDown={handleSearch}
          placeholder={searchType ? 'Search TV Shows...' : 'Search Movies...'}
        />
      </div>
      {poster && poster.length > 0 ? (
        <div
          id="DISPLAY"
          className={`overflow-auto p-[8px] ${
            poster ? 'flex' : 'hidden invisible'
          } ${
            searchType ? 'bg-yellow-500' : 'bg-teal-800'
          }`}
        >
          {poster.map(({ poster_path }, index) => (
            <div
            id='POSTERS'
              className="flex-shrink-0 mr-2 relative h-[329px] w-[220px] border border-black"
              key={index}
            >
              <img
                index={index}
                onClick={() => beginSelectMedia(index)}
                className=""
                src={`https://media.themoviedb.org/t/p/original${poster_path}`}
                alt={search ? search : 'none'}
              />
              {poster[index].select && (
                <div
                  id="CONFIRMATION"
                  className="flex flex-col absolute text-white bg-black w-[220px] z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center p-[4px] border-t-[2px] border-b-[2px] border-white"
                >
                  Select {searchType ? 'TV Show' : 'Movie'}?
                  <div className="flex justify-center">
                    <button
                      className="ml-2 mr-6 text-green-500 font-buttons"
                      data-index={index}
                      onClick={selectMedia}
                    >
                      Yes
                    </button>
                    <button onClick={() => beginSelectMedia(index)} className='text-red-500 font-buttons'>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
