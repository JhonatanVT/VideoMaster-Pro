import React from 'react';
import { Merge, Trash2, Loader } from 'lucide-react';

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const MergeTab = ({ mergeQueue, onRemoveFromMergeQueue, onMergeVideos, isProcessing }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Unir Videos</h3>
        
        {mergeQueue.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">
                Cola de Unión ({mergeQueue.length} videos)
              </h4>
              <div className="space-y-2">
                {mergeQueue.map((video, index) => (
                  <div key={video.id} className="flex items-center justify-between bg-white/10 rounded p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-white text-sm">{video.name}</div>
                        <div className="text-purple-200 text-xs">{formatFileSize(video.size)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveFromMergeQueue(video.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={onMergeVideos}
              disabled={isProcessing || mergeQueue.length < 2}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isProcessing ? <Loader className="w-5 h-5 animate-spin" /> : <Merge className="w-5 h-5" />}
              {isProcessing ? 'Uniendo Videos...' : `Unir ${mergeQueue.length} Videos`}
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <Merge className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h4 className="text-white font-medium mb-2">No hay videos en la cola</h4>
            <p className="text-purple-200">
              Añade videos desde la pestaña de procesamiento para unirlos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MergeTab;
