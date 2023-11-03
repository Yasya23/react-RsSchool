function Pagination({
  page,
  elementsOnThePage,
  totalElements,
}: {
  [key: string]: number;
}) {
  const lastPage = Math.floor(totalElements / elementsOnThePage);
  const disabledStart = page === 1 || lastPage === 1 ? 'disabled' : '';
  const disabledEnd = lastPage < 2 || page === lastPage ? 'disabled' : '';

  return (
    <div className="pagination">
      <a href="#" className={disabledStart}>
        &laquo;
      </a>
      <span>{page}</span>
      <span className={lastPage < 2 ? 'none' : ''}>... {lastPage}</span>
      <a href="#" className={disabledEnd}>
        &raquo;
      </a>
    </div>
  );
}

export default Pagination;
