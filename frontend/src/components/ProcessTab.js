import React, { useRef } from 'react';
import { Subtitles, Plus, Loader, Download, AlertCircle } from 'lucide-react';

// Funciones de utilidad que pasaremos como props
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ProcessTab = ({ selectedVideo, isProcessing, onGenerateSubtitles, onAddToMergeQueue, subtitles, onDownloadSubtitles, onDownloadVideo }) => {
  const videoRef = useRef(null);

  if (!selectedVideo) {
    return (
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
        <AlertCircle className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Selecciona un video para procesar
        </h3>
        <p className="text-purple-200">
          Ve a la pestaña "Subir Videos" y haz clic en "Ver" en un video para procesarlo.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Procesando: {selectedVideo.name}
      </h3>
      
      {selectedVideo.url && (
        <div className="mb-6">
          <video
            ref={videoRef}
            src={selectedVideo.url}
            controls
            className="w-full rounded-lg"
            style={{ maxHeight: '400px' }}
          />
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => onGenerateSubtitles(selectedVideo)}
          disabled={isProcessing}
          className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          {isProcessing ? <Loader className="w-5 h-5 animate-spin" /> : <Subtitles className="w-5 h-5" />}
          {isProcessing ? 'Generando...' : 'Generar Subtítulos'}
        </button>
        
        <button
          onClick={() => onAddToMergeQueue(selectedVideo)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Añadir a Cola de Unión
        </button>
      </div>

      {subtitles.length > 0 && (
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium">Subtítulos Generados</h4>
            <button
              onClick={() => onDownloadSubtitles(selectedVideo)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Descargar SRT
            </button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {subtitles.map((subtitle, index) => (
              <div key={index} className="bg-white/10 rounded p-3 text-sm">
                <div className="text-purple-300 mb-1">
                  {formatTime(subtitle.start)} - {formatTime(subtitle.end)}
                </div>
                <div className="text-white">{subtitle.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedVideo.downloadReady && (
        <div className="mt-4">
          <button
            onClick={() => onDownloadVideo(selectedVideo)}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-5 h-5" />
            Descargar Video {selectedVideo.merged ? 'Unido' : 'con Subtítulos'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProcessTab;
