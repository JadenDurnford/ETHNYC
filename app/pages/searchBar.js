import React, { useState } from 'react'
import { searchDropdown } from './collectionFunctions';
import styles from '../styles/Home.module.css';

const SearchSection = (props) => {
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
    <div className={styles.search}>
      <h1 style={{ fontWeight: "bold", textAlign: "center", padding: "10px" }}>Find a Collection to Snipe</h1>
      <input
        className={styles.searchbar}
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        value={searchValue} />
      {resultList.map((r) => (
        <div
          className={styles.searchresult}
          key={r.collectionId}
          onClick={() => { props.openView(r.collectionId) }}>
          <div>{r.name}</div>
          <div><img src={r.image} className={styles.searchicon}></img></div>
        </div>
      ))}
    </div>
  );
};
export default SearchSection;