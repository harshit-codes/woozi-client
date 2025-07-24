import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { X, Plus, FolderPlus } from 'lucide-react';
import { CreateCollectionData, LeadCollection } from '../../types/collection';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateCollectionData) => void;
  editingCollection?: LeadCollection | null;
  loading?: boolean;
}

export function CreateCollectionModal({
  isOpen,
  onClose,
  onSave,
  editingCollection,
  loading = false
}: CreateCollectionModalProps) {
  const [formData, setFormData] = useState<CreateCollectionData>({
    name: '',
    description: '',
    criteria: {
      status: [],
      source: [],
      tags: []
    }
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Reset form when modal opens or editing collection changes
  useEffect(() => {
    if (isOpen) {
      if (editingCollection) {
        setFormData({
          name: editingCollection.name,
          description: editingCollection.description || '',
          criteria: editingCollection.criteria || {
            status: [],
            source: [],
            tags: []
          }
        });
      } else {
        setFormData({
          name: '',
          description: '',
          criteria: {
            status: [],
            source: [],
            tags: []
          }
        });
      }
      setErrors({});
    }
  }, [isOpen, editingCollection]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Collection name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Collection name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave({
      name: formData.name.trim(),
      description: formData.description?.trim() || undefined,
      criteria: formData.criteria
    });
  };

  const handleInputChange = (field: keyof CreateCollectionData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleStatusToggle = (status: string) => {
    setFormData(prev => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        status: prev.criteria?.status?.includes(status)
          ? prev.criteria.status.filter(s => s !== status)
          : [...(prev.criteria?.status || []), status]
      }
    }));
  };

  const handleSourceToggle = (source: string) => {
    setFormData(prev => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        source: prev.criteria?.source?.includes(source)
          ? prev.criteria.source.filter(s => s !== source)
          : [...(prev.criteria?.source || []), source]
      }
    }));
  };

  if (!isOpen) return null;

  const isEditing = !!editingCollection;
  const title = isEditing ? 'Edit Collection' : 'Create New Collection';
  const submitText = isEditing ? 'Update Collection' : 'Create Collection';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FolderPlus className="h-5 w-5" />
                {title}
              </CardTitle>
              <button
                onClick={onClose}
                className="p-1 hover:bg-muted rounded transition-colors"
                disabled={loading}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Collection Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Collection Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md text-sm ${
                    errors.name ? 'border-red-500' : 'border-input'
                  } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                  placeholder="Enter collection name"
                  disabled={loading}
                />
                {errors.name && (
                  <p className="text-xs text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Optional description"
                  rows={3}
                  disabled={loading}
                />
              </div>

              {/* Lead Criteria */}
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Lead Criteria (Optional)
                </label>
                
                {/* Status Filter */}
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Status</div>
                  <div className="flex flex-wrap gap-2">
                    {['hot', 'warm', 'cold'].map(status => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleStatusToggle(status)}
                        className={`px-2 py-1 text-xs rounded border transition-colors ${
                          formData.criteria?.status?.includes(status)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background border-input hover:bg-muted'
                        }`}
                        disabled={loading}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Source Filter */}
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Source</div>
                  <div className="flex flex-wrap gap-2">
                    {['Website', 'Referral', 'Social Media', 'Email', 'Phone'].map(source => (
                      <button
                        key={source}
                        type="button"
                        onClick={() => handleSourceToggle(source)}
                        className={`px-2 py-1 text-xs rounded border transition-colors ${
                          formData.criteria?.source?.includes(source)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background border-input hover:bg-muted'
                        }`}
                        disabled={loading}
                      >
                        {source}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-input rounded-md text-sm font-medium hover:bg-muted transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    'Saving...'
                  ) : (
                    <>
                      <Plus className="h-3 w-3" />
                      {submitText}
                    </>
                  )}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}