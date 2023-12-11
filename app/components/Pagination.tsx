import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import { useRouter } from "next/navigation";

interface PaginationProps {
  total_pages: number;
}

const Pagination: React.FC<PaginationProps> = ({ total_pages }) => {
  const router = useRouter();

  const currentPage = 1;
  const totalPagesToShow = 5;

  const handlePageChange = (page: number) => {
    router.push(`/${page}`);
  };

  const renderPageItems = () => {
    const pageItems = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(totalPagesToShow / 2)
    );
    const endPage = Math.min(total_pages, startPage + totalPagesToShow - 1);

    if (startPage > 1) {
      // Render ellipsis if startPage is not the first page
      pageItems.push(<BootstrapPagination.Ellipsis key="ellipsis-start" />);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(
        <BootstrapPagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </BootstrapPagination.Item>
      );
    }

    if (endPage < total_pages) {
      // Render ellipsis if endPage is not the last page
      pageItems.push(<BootstrapPagination.Ellipsis key="ellipsis-end" />);
    }

    return pageItems;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <BootstrapPagination>
        <BootstrapPagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <BootstrapPagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {renderPageItems()}

        <BootstrapPagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === total_pages}
        />
        <BootstrapPagination.Last
          onClick={() => handlePageChange(total_pages)}
          disabled={currentPage === total_pages}
        />
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;
