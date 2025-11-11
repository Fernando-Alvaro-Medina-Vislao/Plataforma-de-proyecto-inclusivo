// Document Model - Modelo de datos de documentos OCR
export interface ScannedDocument {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  subject?: string;
  tags: string[];
  language: string;
}

export interface OCRResult {
  text: string;
  confidence: number;
  language: string;
}
