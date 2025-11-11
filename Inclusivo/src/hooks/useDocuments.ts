// Custom Hook para manejar documentos OCR
import { useState, useEffect } from 'react';
import { ScannedDocument, OCRResult } from '../models/Document';
import { documentService } from '../services/DocumentService';

export function useDocuments() {
  const [documents, setDocuments] = useState<ScannedDocument[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    setDocuments(documentService.getAllDocuments());
  };

  const performOCR = async (imageData: string): Promise<OCRResult> => {
    setIsProcessing(true);
    try {
      const result = await documentService.performOCR(imageData);
      return result;
    } finally {
      setIsProcessing(false);
    }
  };

  const saveDocument = (document: Omit<ScannedDocument, 'id' | 'createdAt'>) => {
    const newDoc = documentService.saveDocument(document);
    loadDocuments();
    return newDoc;
  };

  const deleteDocument = (id: string) => {
    documentService.deleteDocument(id);
    loadDocuments();
  };

  const searchDocuments = (query: string) => {
    return documentService.searchDocuments(query);
  };

  const getDocumentById = (id: string) => {
    return documentService.getDocumentById(id);
  };

  const readDocument = async (documentId: string, voiceSettings: { speed: number; pitch: number }) => {
    await documentService.readDocument(documentId, voiceSettings);
  };

  const stopReading = () => {
    documentService.stopReading();
  };

  return {
    documents,
    isProcessing,
    performOCR,
    saveDocument,
    deleteDocument,
    searchDocuments,
    getDocumentById,
    readDocument,
    stopReading,
  };
}
