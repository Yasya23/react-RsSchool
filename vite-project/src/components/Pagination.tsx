type Props = {
  page: number;
  elementsOnThePage: number;
  totalElements: number;
  changePage: (change: number) => void;
};

function Pagination({
  page,
  elementsOnThePage,
  totalElements,
  changePage,
}: Props) {
  const lastPage = Math.floor(totalElements / elementsOnThePage);
  const disabledStart = page === 1 || lastPage === 1 ? 'disabled' : '';
  const disabledEnd = lastPage < 2 || page === lastPage ? 'disabled' : '';

  const handlePageChange = (change: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    changePage(change);
  };

  return (
    <div className="pagination">
      <a href="#" className={disabledStart} onClick={handlePageChange(-1)}>
        &laquo;
      </a>
      <span>{page}</span>
      <span className={lastPage < 2 ? 'none' : ''}>... {lastPage}</span>
      <a href="#" className={disabledEnd} onClick={handlePageChange(1)}>
        &raquo;
      </a>
    </div>
  );
}

export default Pagination;
