function ElementPerPage() {
  return (
    <form>
      <label htmlFor="elementOnPage">Elements on the page: </label>
      <select id="elementOnPage" name="elementOnPage">
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </form>
  );
}

export default ElementPerPage;
