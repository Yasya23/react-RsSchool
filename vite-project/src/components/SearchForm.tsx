import { useState } from 'react';

type FieldtProps = {
  handleSearch: (value: string) => void;
};

function SearchForm({ handleSearch }: FieldtProps) {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('name') || ''
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };

  const handleSearchClick = () => {
    localStorage.setItem('name', inputValue);
    handleSearch(inputValue);
  };

  return (
    <>
      <input
        className="search-input"
        type="text"
        value={inputValue}
        onChange={handleNameChange}
      />
      <button className="search-button" onClick={handleSearchClick}>
        Search
      </button>
    </>
  );
}

export default SearchForm;
