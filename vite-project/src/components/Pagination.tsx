function Pagination({ page }: { page: number }) {
  return (
    <div className="pagination">
      <a href="#">&laquo;</a>
      <span>{page}</span>
      <a href="#">&raquo;</a>
    </div>
  );
}

export default Pagination;
