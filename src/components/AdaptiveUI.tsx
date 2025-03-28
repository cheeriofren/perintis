import { useState, useEffect } from 'react';
import { Policy } from '@/types/policy';

interface UserPreferences {
  preferredLayout: 'grid' | 'list' | 'timeline';
  fontSize: 'small' | 'medium' | 'large';
  colorScheme: 'light' | 'dark' | 'system';
  density: 'compact' | 'comfortable' | 'spacious';
}

interface AdaptiveUIProps {
  policy: Policy;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

export default function AdaptiveUI({ policy, onPreferencesChange }: AdaptiveUIProps) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    preferredLayout: 'grid',
    fontSize: 'medium',
    colorScheme: 'light',
    density: 'comfortable'
  });

  useEffect(() => {
    // Simulasi analisis perilaku pengguna (dalam implementasi nyata, ini akan menggunakan model ML)
    analyzeUserBehavior();
  }, []);

  const analyzeUserBehavior = async () => {
    try {
      // Simulasi pengumpulan data perilaku pengguna
      const userBehavior = {
        timeSpent: Math.random() * 1000,
        interactions: Math.floor(Math.random() * 50),
        scrollDepth: Math.random() * 100
      };

      // Simulasi prediksi preferensi berdasarkan perilaku
      const predictedPreferences: UserPreferences = {
        preferredLayout: userBehavior.scrollDepth > 70 ? 'timeline' : 'grid',
        fontSize: userBehavior.timeSpent > 500 ? 'large' : 'medium',
        colorScheme: 'light',
        density: userBehavior.interactions > 30 ? 'compact' : 'comfortable'
      };

      setPreferences(predictedPreferences);
      onPreferencesChange(predictedPreferences);
    } catch (error) {
      console.error('Error analyzing user behavior:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Preferensi Tampilan
      </h3>

      <div className="space-y-4">
        {/* Layout Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tata Letak
          </label>
          <div className="flex space-x-2">
            {['grid', 'list', 'timeline'].map((layout) => (
              <button
                key={layout}
                onClick={() => {
                  const newPrefs = { ...preferences, preferredLayout: layout as UserPreferences['preferredLayout'] };
                  setPreferences(newPrefs);
                  onPreferencesChange(newPrefs);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  preferences.preferredLayout === layout
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {layout === 'grid' ? 'Grid' : layout === 'list' ? 'Daftar' : 'Timeline'}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ukuran Teks
          </label>
          <div className="flex space-x-2">
            {['small', 'medium', 'large'].map((size) => (
              <button
                key={size}
                onClick={() => {
                  const newPrefs = { ...preferences, fontSize: size as UserPreferences['fontSize'] };
                  setPreferences(newPrefs);
                  onPreferencesChange(newPrefs);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  preferences.fontSize === size
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {size === 'small' ? 'Kecil' : size === 'medium' ? 'Sedang' : 'Besar'}
              </button>
            ))}
          </div>
        </div>

        {/* Color Scheme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skema Warna
          </label>
          <div className="flex space-x-2">
            {['light', 'dark', 'system'].map((scheme) => (
              <button
                key={scheme}
                onClick={() => {
                  const newPrefs = { ...preferences, colorScheme: scheme as UserPreferences['colorScheme'] };
                  setPreferences(newPrefs);
                  onPreferencesChange(newPrefs);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  preferences.colorScheme === scheme
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {scheme === 'light' ? 'Terang' : scheme === 'dark' ? 'Gelap' : 'Sistem'}
              </button>
            ))}
          </div>
        </div>

        {/* Density */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kepadatan Konten
          </label>
          <div className="flex space-x-2">
            {['compact', 'comfortable', 'spacious'].map((density) => (
              <button
                key={density}
                onClick={() => {
                  const newPrefs = { ...preferences, density: density as UserPreferences['density'] };
                  setPreferences(newPrefs);
                  onPreferencesChange(newPrefs);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  preferences.density === density
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {density === 'compact' ? 'Padat' : density === 'comfortable' ? 'Nyaman' : 'Longgar'}
              </button>
            ))}
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">
                Rekomendasi AI
              </h4>
              <p className="text-sm text-blue-700">
                Berdasarkan perilaku Anda, kami merekomendasikan tata letak {preferences.preferredLayout} dengan ukuran teks {preferences.fontSize} untuk pengalaman yang optimal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 