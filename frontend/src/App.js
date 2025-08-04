import React, { useState, useCallback, useEffect } from 'react';
import { Upload, Subtitles, Merge, Settings, FileVideo, Loader } from 'lucide-react';

// Importar los nuevos componentes
import UploadTab from './components/UploadTab';
import ProcessTab from './components/ProcessTab';
import MergeTab from './components/MergeTab';
import SettingsTab from './components/SettingsTab';

const VideoProcessorApp = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [subtitles, setSubtitles] = useState([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [mergeQueue, setMergeQueue] = useState([]);
  const [settings, setSettings] = useState({
    language: 'es',
    quality: 'high',
    format: 'mp4'
  });

  // Limpiar subtítulos cuando el video seleccionado cambia
  useEffect(() => {
    if (selectedVideo) {
      setSubtitles(selectedVideo.subtitles || []);
    } else {
      setSubtitles([]);
    }
  }, [selectedVideo]);

  const handleFileUpload = useCallback((event) => {
    const files = Array.from(event.target.files);
    const newVideos = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      status: 'uploaded',
      subtitles: null,
      duration: null,
      downloadReady: false
    }));
    
    setVideos(prev => [...prev, ...newVideos]);
  }, []);

  const simulateSubtitleGeneration = async (video) => {
    setIsProcessing(true);
    setActiveTab('process'); // Asegurarse que la pestaña de proceso esté activa
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockSubtitles = [
      { start: 0, end: 3, text: "Bienvenidos a este video tutorial" },
      { start: 3, end: 7, text: "Hoy aprenderemos sobre procesamiento de video" },
    ];
    
    setSubtitles(mockSubtitles);
    const updatedVideo = { ...video, subtitles: mockSubtitles, status: 'processed', downloadReady: true };
    
    setVideos(prev => prev.map(v => v.id === video.id ? updatedVideo : v));
    setSelectedVideo(updatedVideo); // Actualizar el video seleccionado con los subtítulos
    setIsProcessing(false);
  };

  const addToMergeQueue = (video) => {
    if (!mergeQueue.find(v => v.id === video.id)) {
      setMergeQueue(prev => [...prev, video]);
      // Opcional: cambiar a la pestaña de unir automáticamente
      setActiveTab('merge');
    }
  };

  const removeFromMergeQueue = (videoId) => {
    setMergeQueue(prev => prev.filter(v => v.id !== videoId));
  };

  const simulateMergeVideos = async () => {
    if (mergeQueue.length < 2) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mergedVideo = {
      id: Date.now(),
      name: `merged_video_${Date.now()}.mp4`,
      size: mergeQueue.reduce((sum, v) => sum + v.size, 0),
      status: 'merged',
      merged: true,
      originalVideos: mergeQueue.length,
      downloadReady: true,
      url: '#' // Simular una URL para la descarga
    };
    
    setVideos(prev => [...prev, mergedVideo]);
    setMergeQueue([]);
    setIsProcessing(false);
    setActiveTab('upload'); // Volver a la lista de videos
  };

  const downloadVideo = (video) => {
    const link = document.createElement('a');
    link.href = video.url || '#';
    link.download = video.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert(`Descargando: ${video.name}`);
  };

  const downloadSubtitles = (video) => {
    if (!video.subtitles) return;
    
    const formatSRTTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor((seconds % 60) / 1);
        const ms = Math.floor((seconds % 1) * 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
    };

    const srtContent = video.subtitles.map((subtitle, index) => {
      const startTime = formatSRTTime(subtitle.start);
      const endTime = formatSRTTime(subtitle.end);
      return `${index + 1}\n${startTime} --> ${endTime}\n${subtitle.text}\n`;
    }).join('\n');
    
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${video.name.replace(/\.[^/.]+$/, '')}_subtitles.srt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
    setActiveTab('process');
  };

  const TABS = [
    { id: 'upload', label: 'Subir Videos', icon: Upload },
    { id: 'process', label: 'Procesar', icon: Subtitles },
    { id: 'merge', label: 'Unir Videos', icon: Merge },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <FileVideo className="w-10 h-10 text-purple-400" />
            VideoMaster Pro
          </h1>
          <p className="text-purple-200 text-lg">Subtitulado automático y edición de videos</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-1 flex gap-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Renderizar el componente de la pestaña activa */}
        {activeTab === 'upload' && (
          <UploadTab
            videos={videos}
            onFileUpload={handleFileUpload}
            onSelectVideo={handleSelectVideo}
            onDownloadVideo={downloadVideo}
            onDownloadSubtitles={downloadSubtitles}
          />
        )}
        {activeTab === 'process' && (
          <ProcessTab
            selectedVideo={selectedVideo}
            isProcessing={isProcessing}
            onGenerateSubtitles={simulateSubtitleGeneration}
            onAddToMergeQueue={addToMergeQueue}
            subtitles={subtitles}
            onDownloadSubtitles={downloadSubtitles}
            onDownloadVideo={downloadVideo}
          />
        )}
        {activeTab === 'merge' && (
          <MergeTab
            mergeQueue={mergeQueue}
            onRemoveFromMergeQueue={removeFromMergeQueue}
            onMergeVideos={simulateMergeVideos}
            isProcessing={isProcessing}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsTab settings={settings} onSettingsChange={setSettings} />
        )}

        {/* Overlay de Procesamiento */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
              <Loader className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Procesando...</h3>
              <p className="text-purple-200">Por favor, espera un momento.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoProcessorApp;
