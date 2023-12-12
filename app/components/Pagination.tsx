"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Movies.css";
import { useState } from "react";
import { Pagination } from "react-bootstrap";
import { useRouter } from "next/navigation";

interface PaginationProps {
  total_pages: number;
}

const PaginationBar: React.FC<PaginationProps> = ({ total_pages }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(window.location.pathname.split("/").pop()) || 1
  );
  const visiblePages = 5;

  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(total_pages, startPage + visiblePages - 1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/${page}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {startPage > 1 && <Pagination.Ellipsis />}

        {[...Array(endPage - startPage + 1)].map((_, index) => (
          <Pagination.Item
            key={startPage + index}
            active={startPage + index === currentPage}
            onClick={() => handlePageChange(startPage + index)}
          >
            {startPage + index}
          </Pagination.Item>
        ))}

        {endPage < total_pages && <Pagination.Ellipsis />}

        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === total_pages}
        />
        <Pagination.Last onClick={() => handlePageChange(total_pages)} />
      </Pagination>
    </div>
  );
};

export default PaginationBar;
