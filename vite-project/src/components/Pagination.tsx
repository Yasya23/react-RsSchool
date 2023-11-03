function Pagination({
  page,
  elementsOnThePage,
  totalElements,
}: {
  [key: string]: number;
}) {
  const lastPage = Math.floor(totalElements / elementsOnThePage);
  return (
    <div className="pagination">
      <a href="#">&laquo;</a>
      <span>{page}</span>
      <span>...</span>
      <span>{lastPage}</span>
      <a href="#">&raquo;</a>
    </div>
  );
}

export default Pagination;
