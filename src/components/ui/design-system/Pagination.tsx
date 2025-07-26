import React from 'react';
import { cn } from '../../../lib/utils';
import { ActionButton, IconButton } from './ActionButton';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { componentGap, getSpaceYClass, pagination } from './tokens';

// =============================================================================
// PAGINATION CONFIGURATION TYPES
// =============================================================================

/**
 * Configuration interface for pagination behavior and appearance
 */
export interface PaginationConfig {
  itemsPerPage: number;
  maxVisiblePages: number;
  showEllipsis: boolean;
  showInfo: boolean;
  size: 'sm' | 'md' | 'lg';
}

/**
 * Available pagination presets
 */
export type PaginationPreset = 'extensionCompact' | 'cardView' | 'listView' | 'minimal';

/**
 * Get pagination configuration for a given preset
 */
export function getPaginationConfig(preset: PaginationPreset): PaginationConfig {
  return pagination.presets[preset];
}

// =============================================================================
// PAGINATION COMPONENT
// =============================================================================

/**
 * Pagination component optimized for Chrome extension constraints
 * Provides navigation through paginated content with ellipsis support
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showEllipsis?: boolean;
  maxVisiblePages?: number;
  className?: string;
  size?: 'sm' | 'md';
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showEllipsis = true,
  maxVisiblePages = 5,
  className,
  size = 'sm'
}: PaginationProps) {
  // Helper function to generate page numbers with ellipsis
  const generatePageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];
    const sidePages = Math.floor((maxVisiblePages - 3) / 2); // Reserve space for 1, ..., last

    if (currentPage <= sidePages + 2) {
      // Show: 1, 2, 3, 4, ..., last
      for (let i = 1; i <= maxVisiblePages - 2; i++) {
        pages.push(i);
      }
      if (showEllipsis) pages.push('ellipsis');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - sidePages - 1) {
      // Show: 1, ..., N-3, N-2, N-1, N
      pages.push(1);
      if (showEllipsis) pages.push('ellipsis');
      for (let i = totalPages - maxVisiblePages + 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show: 1, ..., current-1, current, current+1, ..., last
      pages.push(1);
      if (showEllipsis) pages.push('ellipsis');
      for (let i = currentPage - sidePages; i <= currentPage + sidePages; i++) {
        pages.push(i);
      }
      if (showEllipsis) pages.push('ellipsis');
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

  const buttonSize = size === 'sm' ? 'xs' : 'sm';
  const containerGap = size === 'sm' ? componentGap.xs : componentGap.sm;

  return (
    <nav
      className={cn(
        'flex items-center justify-center',
        className
      )}
      style={{ gap: containerGap }}
      role="navigation"
      aria-label="Pagination navigation"
    >
      {/* Previous Button */}
      <IconButton
        icon={ChevronLeft}
        size={buttonSize}
        variant="outline"
        disabled={!canGoPrevious}
        onClick={() => canGoPrevious && onPageChange(currentPage - 1)}
        aria-label="Go to previous page"
        className="h-8 w-8"
      />

      {/* Page Numbers */}
      <div 
        className="flex items-center"
        style={{ gap: containerGap }}
      >
        {pages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <div
                key={`ellipsis-${index}`}
                className="flex items-center justify-center h-8 w-8"
                aria-hidden="true"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            );
          }

          const isCurrentPage = page === currentPage;

          return (
            <ActionButton
              key={page}
              size={buttonSize}
              variant={isCurrentPage ? 'default' : 'outline'}
              onClick={() => onPageChange(page)}
              className={cn(
                'h-8 w-8 p-0 font-medium',
                isCurrentPage && 'pointer-events-none'
              )}
              aria-label={`Go to page ${page}`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {page}
            </ActionButton>
          );
        })}
      </div>

      {/* Next Button */}
      <IconButton
        icon={ChevronRight}
        size={buttonSize}
        variant="outline"
        disabled={!canGoNext}
        onClick={() => canGoNext && onPageChange(currentPage + 1)}
        aria-label="Go to next page"
        className="h-8 w-8"
      />
    </nav>
  );
}

// =============================================================================
// PAGINATION INFO COMPONENT
// =============================================================================

/**
 * Displays pagination information (e.g., "Showing 1-5 of 23 items")
 */
interface PaginationInfoProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  itemName?: string;
  className?: string;
}

export function PaginationInfo({
  currentPage,
  itemsPerPage,
  totalItems,
  itemName = 'items',
  className
}: PaginationInfoProps) {
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems === 0) {
    return (
      <div className={cn('text-sm text-muted-foreground', className)}>
        No {itemName} found
      </div>
    );
  }

  return (
    <div className={cn('text-sm text-muted-foreground', className)}>
      Showing {startItem}-{endItem} of {totalItems} {itemName}
    </div>
  );
}

// =============================================================================
// CHROME EXTENSION OPTIMIZED PAGINATION
// =============================================================================

/**
 * Compact pagination specifically optimized for Chrome extension width constraints
 */
interface CompactPaginationProps extends Omit<PaginationProps, 'maxVisiblePages' | 'size'> {
  showInfo?: boolean;
  itemsPerPage?: number;
  totalItems?: number;
  itemName?: string;
  preset?: PaginationPreset;
  config?: Partial<PaginationConfig>;
}

export function CompactPagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo,
  itemsPerPage,
  totalItems = 0,
  itemName = 'collections',
  preset = 'extensionCompact',
  config = {},
  className,
  ...props
}: CompactPaginationProps) {
  // Get configuration from preset and merge with custom config
  const paginationConfig = { ...getPaginationConfig(preset), ...config };
  
  // Use configuration values with fallbacks to props
  const finalShowInfo = showInfo ?? paginationConfig.showInfo;
  const finalItemsPerPage = itemsPerPage ?? paginationConfig.itemsPerPage;
  const finalMaxVisiblePages = paginationConfig.maxVisiblePages;
  const finalSize = paginationConfig.size;
  
  return (
    <div className={cn(getSpaceYClass(2), className)}>
      {finalShowInfo && (
        <PaginationInfo
          currentPage={currentPage}
          itemsPerPage={finalItemsPerPage}
          totalItems={totalItems}
          itemName={itemName}
          className="text-center"
        />
      )}
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        maxVisiblePages={finalMaxVisiblePages}
        size={finalSize}
        showEllipsis={paginationConfig.showEllipsis}
        {...props}
      />
    </div>
  );
}

// =============================================================================
// CONFIGURABLE PAGINATION COMPONENT
// =============================================================================

/**
 * Higher-order pagination component that accepts configuration presets
 */
interface ConfigurablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  preset?: PaginationPreset;
  config?: Partial<PaginationConfig>;
  itemName?: string;
  className?: string;
}

export function ConfigurablePagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  preset = 'extensionCompact',
  config = {},
  itemName = 'items',
  className
}: ConfigurablePaginationProps) {
  // Get configuration from preset and merge with custom config
  const paginationConfig = { ...getPaginationConfig(preset), ...config };
  
  return (
    <CompactPagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      showInfo={paginationConfig.showInfo}
      itemsPerPage={paginationConfig.itemsPerPage}
      totalItems={totalItems}
      itemName={itemName}
      preset={preset}
      config={config}
      className={className}
    />
  );
}

// =============================================================================
// PAGINATION HOOKS
// =============================================================================

/**
 * Hook to manage pagination state and calculations
 */
interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function usePagination({
  totalItems,
  itemsPerPage,
  initialPage = 1
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = React.useState(initialPage);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Ensure current page is within bounds
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  
  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  
  return {
    currentPage,
    totalPages,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export type { 
  PaginationProps, 
  PaginationInfoProps, 
  CompactPaginationProps,
  ConfigurablePaginationProps,
  PaginationConfig,
  PaginationPreset
};