import ResponsivePagination from "react-responsive-pagination";
import type { PaginationProps } from "../types/Product";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) => {
  return (
    <ResponsivePagination
      total={totalPages}
      current={currentPage}
      onPageChange={(page: number) => setCurrentPage(page)}
      previousLabel="previous"
      nextLabel="next"
      containerClassName="flex flex-wrap mt-2 items-center justify-end gap-1 select-none text-sm md:text-base"
      inactiveItemClassName="border-gray-200  bg-white text-black hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 cursor-pointer"
      pageItemClassName="inline-flex rounded"
      pageLinkClassName="px-3 py-2 block w-full h-full rounded"
      activeItemClassName="border-blue-600 bg-blue-600 text-white shadow-sm pointer-events-none"
      disabledItemClassName="border-gray-50 bg-gray-50 text-gray-500 opacity-50 cursor-not-allowed pointer-events-none"
    />
  );
};

export default Pagination;
