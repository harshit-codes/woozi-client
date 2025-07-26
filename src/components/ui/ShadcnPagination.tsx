import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

interface ShadcnPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  showEllipsis?: boolean;
  className?: string;
}

export function ShadcnPagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 3,
  showEllipsis = true,
  className
}: ShadcnPaginationProps) {
  // Helper function to generate page numbers with ellipsis
  const generatePageNumbers = (): (number | 'ellipsis-start' | 'ellipsis-end')[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = [];
    const sidePages = Math.floor((maxVisiblePages - 3) / 2); // Reserve space for 1, ..., last

    if (currentPage <= sidePages + 2) {
      // Show: 1, 2, 3, 4, ..., last
      for (let i = 1; i <= maxVisiblePages - 2; i++) {
        pages.push(i);
      }
      if (showEllipsis && totalPages > maxVisiblePages - 1) {
        pages.push('ellipsis-end');
      }
      if (totalPages > maxVisiblePages - 2) {
        pages.push(totalPages);
      }
    } else if (currentPage >= totalPages - sidePages - 1) {
      // Show: 1, ..., N-3, N-2, N-1, N
      pages.push(1);
      if (showEllipsis && totalPages > maxVisiblePages - 1) {
        pages.push('ellipsis-start');
      }
      for (let i = totalPages - maxVisiblePages + 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show: 1, ..., current-1, current, current+1, ..., last
      pages.push(1);
      if (showEllipsis) {
        pages.push('ellipsis-start');
      }
      for (let i = currentPage - sidePages; i <= currentPage + sidePages; i++) {
        pages.push(i);
      }
      if (showEllipsis) {
        pages.push('ellipsis-end');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // Don't render if only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => canGoPrevious && onPageChange(currentPage - 1)}
            disabled={!canGoPrevious}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pages.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const isCurrentPage = page === currentPage;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={isCurrentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext 
            onClick={() => canGoNext && onPageChange(currentPage + 1)}
            disabled={!canGoNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

// Chrome Extension Optimized Pagination
interface CompactShadcnPaginationProps extends Omit<ShadcnPaginationProps, 'maxVisiblePages'> {
  itemsPerPage?: number;
  totalItems?: number;
  itemName?: string;
  showInfo?: boolean;
}

export function CompactShadcnPagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = false,
  itemsPerPage = 3,
  totalItems = 0,
  itemName = 'items',
  className,
  ...props
}: CompactShadcnPaginationProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      {showInfo && (
        <div className="text-sm text-muted-foreground">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} {itemName}
        </div>
      )}
      
      <ShadcnPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        maxVisiblePages={3} // Chrome extension optimized
        showEllipsis={true}
        className={className}
        {...props}
      />
    </div>
  );
}