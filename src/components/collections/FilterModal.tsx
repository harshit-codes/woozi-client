import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { X } from 'lucide-react';
import { VStack, HStack, ActionButton, Text } from '../ui/design-system';
import { extensionPatterns } from '../ui/design-system/tokens';

interface FilterOptions {
  sortBy: 'created' | 'updated' | 'leadCount' | 'name';
  sortOrder: 'asc' | 'desc';
  leadCountMin?: number;
  leadCountMax?: number;
  dateRange?: 'week' | 'month' | 'quarter' | 'year' | 'all';
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters?: FilterOptions;
}

const defaultFilters: FilterOptions = {
  sortBy: 'updated',
  sortOrder: 'desc',
  dateRange: 'all'
};

export function FilterModal({ 
  isOpen, 
  onClose, 
  onApplyFilters,
  currentFilters = defaultFilters 
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const updateFilter = <K extends keyof FilterOptions>(
    key: K, 
    value: FilterOptions[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Filter Collections</CardTitle>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <Text size="sm" className="text-muted-foreground">
            Sort and filter your collections by various criteria
          </Text>
        </CardHeader>
        
        <CardContent>
          <VStack gap="lg">
            {/* Sort Options */}
            <VStack gap="sm" className="w-full">
              <Text size="sm" className="font-medium">Sort By</Text>
              <HStack gap="sm" className="w-full">
                <div className="flex-1">
                  <select 
                    value={filters.sortBy} 
                    onChange={(e) => updateFilter('sortBy', e.target.value as FilterOptions['sortBy'])}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                  >
                    <option value="updated">Last Updated</option>
                    <option value="created">Created Date</option>
                    <option value="leadCount">Lead Count</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
                <div className="flex-1">
                  <select 
                    value={filters.sortOrder} 
                    onChange={(e) => updateFilter('sortOrder', e.target.value as FilterOptions['sortOrder'])}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                  >
                    <option value="desc">
                      {filters.sortBy === 'name' ? 'Z to A' : 'High to Low'}
                    </option>
                    <option value="asc">
                      {filters.sortBy === 'name' ? 'A to Z' : 'Low to High'}
                    </option>
                  </select>
                </div>
              </HStack>
            </VStack>

            {/* Lead Count Filter */}
            <VStack gap="sm" className="w-full">
              <Text size="sm" className="font-medium">Lead Count Range</Text>
              <HStack gap="sm" className="w-full">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.leadCountMin || ''}
                    onChange={(e) => updateFilter('leadCountMin', 
                      e.target.value ? parseInt(e.target.value) : undefined
                    )}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                    min="0"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.leadCountMax || ''}
                    onChange={(e) => updateFilter('leadCountMax', 
                      e.target.value ? parseInt(e.target.value) : undefined
                    )}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                    min="0"
                  />
                </div>
              </HStack>
            </VStack>

            {/* Date Range Filter */}
            <VStack gap="sm" className="w-full">
              <Text size="sm" className="font-medium">Date Range</Text>
              <select 
                value={filters.dateRange} 
                onChange={(e) => updateFilter('dateRange', e.target.value as FilterOptions['dateRange'])}
                className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
              >
                <option value="all">All Time</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
                <option value="quarter">Past Quarter</option>
                <option value="year">Past Year</option>
              </select>
            </VStack>

            {/* Action Buttons */}
            <HStack gap="sm" justify="end" className="w-full pt-4">
              <ActionButton
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                Reset
              </ActionButton>
              <ActionButton
                variant="default"
                size="sm"
                onClick={handleApply}
              >
                Apply Filters
              </ActionButton>
            </HStack>
          </VStack>
        </CardContent>
      </Card>
    </div>
  );
}