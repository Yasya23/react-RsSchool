import { useState, useEffect } from 'react';

type FieldtProps = {
  handlItemsPerPage: (value: string) => void;
};

function ElementPerPage({ handlItemsPerPage }: FieldtProps) {
  const [value, setValue] = useState('10');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    handlItemsPerPage(e.target.value);
  };

  return (
    <form>
      <label htmlFor="elementOnPage">Elements on the page: </label>
      <select
        id="elementOnPage"
        name="elementOnPage"
        value={value}
        onChange={handleSelectChange}
      >
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </form>
  );
}

export default ElementPerPage;
