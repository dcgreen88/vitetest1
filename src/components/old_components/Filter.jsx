import filterpng from '../../assets/old_assets/filterpng.png';
import sortDown from '../../assets/old_assets/sort-down.png';
import sortUp from '../../assets/old_assets/sort-up.png';
import alpA from '../../assets/old_assets/alp-sort-a.png';
import alpZ from '../../assets/old_assets/alp-sort-z.png';
import numHigh from '../../assets/old_assets/num-sort-high.png';
import numLow from '../../assets/old_assets/num-sort-low.png';
import mov from '../../assets/old_assets/mov.png';
import tv from '../../assets/old_assets/tv.png';
import { useState } from 'react';

export default function Filter({ filterHandler }) {
  const [filter, setFilter] = useState('Date');
  const [icon, setIcon] = useState(sortDown);

  function onChangeHandler(event) {
    setFilter(event.target.value);
    filterHandler(event.target.value);
    if (event.target.value === 'Date') {
      setIcon(sortDown);
    } else if (event.target.value === 'Alphabetical') {
      setIcon(alpZ);
    } else if (event.target.value === 'onlyMovie') {
      setIcon(tv);
    } else {
      setIcon(numLow);
    }
  }

  function iconChangeHandler() {
    if (filter === 'Date') {
      if (icon === sortDown) {
        setIcon(sortUp);
        filterHandler('DateDown');
      } else {
        setIcon(sortDown);
        filterHandler('Date');
      }
    } else if (filter === 'Alphabetical') {
      if (icon === alpA) {
        setIcon(alpZ);
        filterHandler('Alphabetical');
      } else {
        setIcon(alpA);
        filterHandler('AlphabeticalDown');
      }
    } else if (filter === 'onlyMovie') {
      if (icon === mov) {
        setIcon(tv);
        filterHandler('onlyMovie');
      } else {
        setIcon(mov);
        filterHandler('onlyTv');
      }
    } else {
      if (icon === numHigh) {
        setIcon(numLow);
        filterHandler('Rating');
      } else {
        setIcon(numHigh);
        filterHandler('RatingDown');
      }
    }
  }

  return (
    <div id="CONTROLCONTAINER" className="flex-1 pr-2">
      <div id="filter-controls" className="flex justify-center items-center">
        <div
          id="ICONBACKGROUND"
          className="w-5 h-5 bg-green-500 rounded-full flex justify-center items-center"
        >
          <img
            id="filter"
            src={filterpng}
            alt="filter-icon"
            className="w-4 h-4 bg-green-500 rounded-full"
          />
        </div>
        <select
          id="filter-menu"
          value={filter ? filter : ''}
          onChange={onChangeHandler}
          className="w-full min-w-[58px] mx-[4px] flex-auto font-buttons bg-black border-[1px] border-green-500 outline-none  text-green-500 max-w-[78px] sm:max-w-[132px] sm:mx-[8px]"
        >
          <option className="menu-option" value="Date">
            Date
          </option>
          <option className="menu-option" value="Alphabetical">
            Alphabetical
          </option>
          <option className="menu-option" value="Rating">
            Rating
          </option>
          <option className="menu-option" value="onlyMovie">
            Movie or TV
          </option>
        </select>
        <button id="sorting-button" className="bg-green-500 rounded-full w-6 h-6 flex justify-center items-center">
          <img
            id="sorting-icons"
            alt="sorting-icons"
            src={icon}
            onClick={iconChangeHandler}
            className={`${icon === mov || icon === tv ? 'w-4 h-4' : 'w-5 h-5'}`}
          />
        </button>
      </div>
    </div>
  );
}
