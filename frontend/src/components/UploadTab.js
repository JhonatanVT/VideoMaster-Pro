import React, { useRef } from 'react';
import { Upload, FileVideo, CheckCircle, Download, Trash2 } from 'lucide-react';

// Funciones de utilidad que pasaremos como props
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const UploadTab = ({ videos, onFileUpload, onSelectVideo, onDownloadVideo, onDownloadSubtitles }) => {
  const fileInputRef = useRef(null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-purple-400 rounded-xl p-12 text-center hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Arrastra videos aquí o haz clic para seleccionar
          </h3>
          <p className="text-purple-200">
            Soporta cualquier tamaño y formato de video (MP4, MOV, AVI, etc.)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="video/*"
            onChange={onFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {videos.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Videos Cargados</h3>
          <div className="space-y-3">
            {videos.map(video => (
              <div key={video.id} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <FileVideo className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{video.name}</h4>
                    <p className="text-purple-200 text-sm">{formatFileSize(video.size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {video.status === 'processed' && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {video.merged && (
                    <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
                      {video.originalVideos} videos unidos
                    </div>
                  )}
                  {video.downloadReady && (
                    <button
                      onClick={() => onDownloadVideo(video)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </button>
                  )}
                  {video.subtitles && (
                    <button
                      onClick={() => onDownloadSubtitles(video)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      SRT
                    </button>
                  )}
                  <button
                    onClick={() => onSelectVideo(video)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadTab;
