import React from 'react';

const SettingsTab = ({ settings, onSettingsChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onSettingsChange(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Configuración</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">
              Idioma de Subtítulos
            </label>
            <select
              name="language"
              value={settings.language}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-purple-400 rounded-lg px-4 py-3 text-white"
            >
              <option value="es">Español</option>
              <option value="en">Inglés</option>
              <option value="fr">Francés</option>
              <option value="pt">Portugués</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">
              Calidad de Procesamiento
            </label>
            <select
              name="quality"
              value={settings.quality}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-purple-400 rounded-lg px-4 py-3 text-white"
            >
              <option value="high">Alta (Más preciso, más lento)</option>
              <option value="medium">Media (Balance)</option>
              <option value="fast">Rápida (Menos preciso, más rápido)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">
              Formato de Salida
            </label>
            <select
              name="format"
              value={settings.format}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-purple-400 rounded-lg px-4 py-3 text-white"
            >
              <option value="mp4">MP4</option>
              <option value="mov">MOV</option>
              <option value="avi">AVI</option>
              <option value="mkv">MKV</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
