import React, { useState, useCallback } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  Link, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Download 
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { LeadImportData, LeadImportResult } from '../../types/lead';

interface LeadImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: LeadImportData) => Promise<LeadImportResult>;
  collectionId: string;
  collectionName: string;
}

type ImportMethod = 'text' | 'csv' | 'urls';

export function LeadImportModal({
  isOpen,
  onClose,
  onImport,
  collectionId,
  collectionName
}: LeadImportModalProps) {
  const [activeMethod, setActiveMethod] = useState<ImportMethod>('text');
  const [textInput, setTextInput] = useState('');
  const [skipDuplicates, setSkipDuplicates] = useState(true);
  const [autoCalculateQuality, setAutoCalculateQuality] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<LeadImportResult | null>(null);
  const [validatedHandles, setValidatedHandles] = useState<{
    valid: string[];
    invalid: string[];
  }>({ valid: [], invalid: [] });

  if (!isOpen) return null;

  const validateInstagramHandle = (handle: string): boolean => {
    // Remove @ symbol and whitespace
    const cleanHandle = handle.replace('@', '').trim();
    
    // Instagram handle validation rules
    const instagramRegex = /^[a-zA-Z0-9_\.]{1,30}$/;
    return instagramRegex.test(cleanHandle) && cleanHandle.length >= 1;
  };

  const extractHandlesFromText = useCallback((text: string): string[] => {
    // Split by newlines and commas, clean up handles
    return text
      .split(/[\n,]/)
      .map(handle => handle.replace('@', '').trim())
      .filter(handle => handle.length > 0);
  }, []);

  const extractHandlesFromUrls = useCallback((text: string): string[] => {
    // Extract Instagram handles from various URL formats
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_\.]{1,30})/g;
    const handles: string[] = [];
    let match;
    
    while ((match = urlRegex.exec(text)) !== null) {
      handles.push(match[1]);
    }
    
    return handles;
  }, []);

  const validateInput = useCallback(() => {
    if (!textInput.trim()) {
      setValidatedHandles({ valid: [], invalid: [] });
      return;
    }

    let handles: string[] = [];
    
    switch (activeMethod) {
      case 'text':
        handles = extractHandlesFromText(textInput);
        break;
      case 'urls':
        handles = extractHandlesFromUrls(textInput);
        break;
      case 'csv':
        // For CSV, assume first column contains handles
        handles = textInput
          .split('\n')
          .slice(1) // Skip header
          .map(line => line.split(',')[0])
          .map(handle => handle.replace('@', '').trim())
          .filter(handle => handle.length > 0);
        break;
    }

    const validation = handles.reduce(
      (acc, handle) => {
        if (validateInstagramHandle(handle)) {
          acc.valid.push(handle);
        } else {
          acc.invalid.push(handle);
        }
        return acc;
      },
      { valid: [] as string[], invalid: [] as string[] }
    );

    setValidatedHandles(validation);
  }, [textInput, activeMethod, extractHandlesFromText, extractHandlesFromUrls]);

  // Validate input whenever it changes
  React.useEffect(() => {
    validateInput();
  }, [validateInput]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setTextInput(content);
      setActiveMethod('csv');
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (validatedHandles.valid.length === 0) return;

    setIsImporting(true);
    try {
      const result = await onImport({
        instagramHandles: validatedHandles.valid,
        collectionId,
        skipDuplicates,
        autoCalculateQuality
      });
      setImportResult(result);
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const handleClose = () => {
    setTextInput('');
    setValidatedHandles({ valid: [], invalid: [] });
    setImportResult(null);
    setIsImporting(false);
    onClose();
  };

  const downloadSampleCSV = () => {
    const csv = 'instagram_handle,name,notes\ntechfounder,Tech Founder,High engagement\nstartup_ceo,Startup CEO,Active poster';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'instagram_leads_sample.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (importResult) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Import Complete!</h2>
              <p className="text-muted-foreground">
                Successfully imported leads to {collectionName}
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {importResult.successful.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Imported</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {importResult.duplicates.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Duplicates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {importResult.invalid.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Invalid</div>
                </div>
              </div>

              {(importResult.duplicates.length > 0 || importResult.invalid.length > 0) && (
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {importResult.duplicates.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium">Duplicate Handles</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {importResult.duplicates.slice(0, 3).join(', ')}
                            {importResult.duplicates.length > 3 && ` and ${importResult.duplicates.length - 3} more`}
                          </div>
                        </div>
                      )}

                      {importResult.invalid.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium">Invalid Handles</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {importResult.invalid.slice(0, 3).join(', ')}
                            {importResult.invalid.length > 3 && ` and ${importResult.invalid.length - 3} more`}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <button
              onClick={handleClose}
              className="w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Import Leads</h2>
            <p className="text-sm text-muted-foreground">
              Add Instagram handles to {collectionName}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Import Methods */}
          <div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveMethod('text')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeMethod === 'text'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <FileText className="h-4 w-4 inline-block mr-2" />
                Text Input
              </button>
              <button
                onClick={() => setActiveMethod('csv')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeMethod === 'csv'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Upload className="h-4 w-4 inline-block mr-2" />
                CSV Upload
              </button>
              <button
                onClick={() => setActiveMethod('urls')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeMethod === 'urls'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Link className="h-4 w-4 inline-block mr-2" />
                Instagram URLs
              </button>
            </div>

            {/* Input Area */}
            <div className="space-y-4">
              {activeMethod === 'csv' && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                  <div className="text-sm">
                    <span className="font-medium">CSV Format:</span> First column should contain Instagram handles
                  </div>
                  <button
                    onClick={downloadSampleCSV}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Download className="h-4 w-4" />
                    Sample CSV
                  </button>
                </div>
              )}

              {activeMethod === 'csv' ? (
                <div>
                  <input
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileUpload}
                    className="w-full p-3 border-2 border-dashed border-muted rounded-md text-sm focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload a CSV file with Instagram handles
                  </p>
                </div>
              ) : (
                <div>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={
                      activeMethod === 'text'
                        ? 'Enter Instagram handles (one per line):\ntechfounder\nstartup_ceo\ninnovate_mike'
                        : 'Paste Instagram URLs:\nhttps://instagram.com/techfounder\nhttps://instagram.com/startup_ceo'
                    }
                    className="w-full h-40 p-3 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {activeMethod === 'text'
                      ? 'Enter one handle per line. @ symbol is optional.'
                      : 'Paste Instagram profile URLs, we\'ll extract the handles automatically.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Import Settings */}
          <div className="space-y-3">
            <h3 className="font-medium">Import Settings</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={skipDuplicates}
                  onChange={(e) => setSkipDuplicates(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Skip duplicate handles</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoCalculateQuality}
                  onChange={(e) => setAutoCalculateQuality(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Auto-calculate quality scores</span>
              </label>
            </div>
          </div>

          {/* Validation Preview */}
          {(validatedHandles.valid.length > 0 || validatedHandles.invalid.length > 0) && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Import Preview</h3>
                <div className="grid grid-cols-2 gap-4 text-center mb-4">
                  <div>
                    <div className="text-xl font-bold text-green-600">
                      {validatedHandles.valid.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Valid handles</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-red-600">
                      {validatedHandles.invalid.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Invalid handles</div>
                  </div>
                </div>

                {validatedHandles.invalid.length > 0 && (
                  <div className="text-sm">
                    <div className="font-medium text-red-600 mb-1">Invalid handles:</div>
                    <div className="text-muted-foreground">
                      {validatedHandles.invalid.slice(0, 5).join(', ')}
                      {validatedHandles.invalid.length > 5 && ` and ${validatedHandles.invalid.length - 5} more`}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-muted/30">
          <button
            onClick={handleClose}
            className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={validatedHandles.valid.length === 0 || isImporting}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isImporting ? 'Importing...' : `Import ${validatedHandles.valid.length} Leads`}
          </button>
        </div>
      </div>
    </div>
  );
}