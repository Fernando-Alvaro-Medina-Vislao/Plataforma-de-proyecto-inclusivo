// Document Service - Controlador de lógica de documentos OCR
import { ScannedDocument, OCRResult } from '../models/Document';

class DocumentService {
  private documents: ScannedDocument[] = [
    {
      id: '1',
      title: 'Apuntes de Algoritmos - Clase 5',
      content: 'Introducción a árboles binarios. Un árbol binario es una estructura de datos...',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      subject: 'Algoritmos',
      tags: ['algoritmos', 'árboles', 'estructuras de datos'],
      language: 'es',
    },
    {
      id: '2',
      title: 'Ejercicios de Bases de Datos',
      content: 'Normalización de bases de datos. Primera forma normal (1FN)...',
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      subject: 'Bases de Datos',
      tags: ['bases de datos', 'normalización'],
      language: 'es',
    },
  ];

  // Simular OCR de una imagen
  async performOCR(imageData: string): Promise<OCRResult> {
    // Simulación de procesamiento OCR
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          text: 'Texto extraído del documento mediante OCR. Este es un ejemplo de reconocimiento óptico de caracteres.',
          confidence: 0.95,
          language: 'es',
        });
      }, 2000);
    });
  }

  // Guardar documento escaneado
  saveDocument(document: Omit<ScannedDocument, 'id' | 'createdAt'>): ScannedDocument {
    const newDoc: ScannedDocument = {
      ...document,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    this.documents.unshift(newDoc);
    return newDoc;
  }

  // Obtener todos los documentos
  getAllDocuments(): ScannedDocument[] {
    return [...this.documents].sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // Obtener documento por ID
  getDocumentById(id: string): ScannedDocument | null {
    return this.documents.find(doc => doc.id === id) || null;
  }

  // Buscar documentos
  searchDocuments(query: string): ScannedDocument[] {
    const lowerQuery = query.toLowerCase();
    return this.documents.filter(
      doc =>
        doc.title.toLowerCase().includes(lowerQuery) ||
        doc.content.toLowerCase().includes(lowerQuery) ||
        doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Eliminar documento
  deleteDocument(id: string): void {
    this.documents = this.documents.filter(doc => doc.id !== id);
  }

  // Actualizar documento
  updateDocument(id: string, updates: Partial<ScannedDocument>): ScannedDocument | null {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index === -1) return null;

    this.documents[index] = {
      ...this.documents[index],
      ...updates,
    };
    return this.documents[index];
  }

  // Leer documento en voz alta (texto a voz)
  async readDocument(documentId: string, voiceSettings: { speed: number; pitch: number }): Promise<void> {
    const document = this.getDocumentById(documentId);
    if (!document) return;

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(document.content);
      utterance.rate = voiceSettings.speed;
      utterance.pitch = voiceSettings.pitch;
      utterance.lang = document.language === 'es' ? 'es-ES' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  }

  // Detener lectura de voz
  stopReading(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

// Singleton
export const documentService = new DocumentService();
