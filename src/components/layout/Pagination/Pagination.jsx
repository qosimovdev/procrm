import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export function PaginationDemo({ page, setPage, totalPages }) {
  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            className="
              rounded-xl
              p-4
              glass
              text-text-primary
              mx-2
              cursor-pointer
              hover:bg-white/10
              hover:text-text-primary
              transition
            "
          />
        </PaginationItem>

        {/* Pages */}
        {[...Array(totalPages)].map((_, i) => {
          const num = i + 1;

          return (
            <PaginationItem key={num}>
              <PaginationLink
                onClick={() => setPage(num)}
                className={`
                  rounded-xl
                  p-4
                  mx-2
                  transition
                  cursor-pointer
                  hover:text-text-primary
                  ${
                    page === num
                      ? "bg-gradient-primary text-white shadow-purple"
                      : "glass text-text-primary hover:bg-white/10"
                  }
                `}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className=" rounded-xl p-4 glass text-text-primary mx-2
              cursor-pointer
              hover:bg-white/10
              hover:text-text-primary
              transition
            "
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
