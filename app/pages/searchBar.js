import React, { useState } from 'react'
import { searchDropdown } from './collectionFunctions';

const SearchSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const [resultList, setResultList] = useState([]);

  const handleSearch = async (e) => {
    setResultList([]);
    e.preventDefault();
    const value = e.target.value;
    setSearchValue(value);
    if (value && value.length >= 1) {
      const results = await searchDropdown(e.target.value);
      console.log(results);
      setResultList(results);
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        value={searchValue} />
      <ul>
        {resultList.map((r) => (
          <li key={r.collectionId}>{r.name}</li>
        ))}
      </ul>
    </>
  );
};
export default SearchSection;