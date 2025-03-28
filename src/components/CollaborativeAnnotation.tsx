import { useEffect, useRef, useState } from 'react';
import { Policy } from '@/types/policy';
import { useWebSocket } from '@/hooks/useWebSocket';

interface CollaborativeAnnotationProps {
  policy: Policy;
  userId: string;
  userName: string;
}

interface Annotation {
  id: string;
  userId: string;
  userName: string;
  content: string;
  position: {
    x: number;
    y: number;
    page: number;
  };
  timestamp: Date;
}

export default function CollaborativeAnnotation({ 
  policy, 
  userId, 
  userName 
}: CollaborativeAnnotationProps) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);
  const [newAnnotation, setNewAnnotation] = useState('');
  const documentRef = useRef<HTMLDivElement>(null);
  const { sendMessage, lastMessage } = useWebSocket(`policy-${policy.id}-annotations`);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage);
      if (data.type === 'annotation') {
        handleNewAnnotation(data.annotation);
      }
    }
  }, [lastMessage]);

  const handleNewAnnotation = (annotation: Annotation) => {
    setAnnotations(prev => [...prev, annotation]);
  };

  const handleAddAnnotation = () => {
    if (!newAnnotation.trim() || !documentRef.current) return;

    const rect = documentRef.current.getBoundingClientRect();
    const annotation: Annotation = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      userName,
      content: newAnnotation,
      position: {
        x: rect.width / 2,
        y: rect.height / 2,
        page: 1
      },
      timestamp: new Date()
    };

    sendMessage(JSON.stringify({
      type: 'annotation',
      annotation
    }));

    setNewAnnotation('');
    setIsAddingAnnotation(false);
  };

  return (
    <div className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Anotasi Kolaboratif</h3>
        <button
          onClick={() => setIsAddingAnnotation(!isAddingAnnotation)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isAddingAnnotation ? 'Batal' : 'Tambah Anotasi'}
        </button>
      </div>

      <div 
        ref={documentRef}
        className="relative min-h-[400px] bg-gray-50 rounded-lg p-4"
      >
        {/* Document content would go here */}
        <div className="prose max-w-none">
          <h2>{policy.title}</h2>
          <p>{policy.description}</p>
        </div>

        {/* Annotations */}
        {annotations.map(annotation => (
          <div
            key={annotation.id}
            className="absolute bg-white rounded-lg shadow-md p-3 max-w-xs"
            style={{
              left: `${annotation.position.x}px`,
              top: `${annotation.position.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                {annotation.userName}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(annotation.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">{annotation.content}</p>
          </div>
        ))}

        {/* Add annotation form */}
        {isAddingAnnotation && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 w-full max-w-md">
              <textarea
                value={newAnnotation}
                onChange={(e) => setNewAnnotation(e.target.value)}
                placeholder="Tulis anotasi Anda..."
                className="w-full h-32 p-2 border rounded-lg mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingAnnotation(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddAnnotation}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 