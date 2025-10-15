import { useState } from 'react';
import { SongList } from './components/SongList';
import { ChordSheet } from './components/ChordSheet';
import { songs } from './data/songs';
import type { Song } from './types';
import './App.css';

function App() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  return (
    <div className="app">
      {selectedSong ? (
        <ChordSheet 
          song={selectedSong} 
          onBack={() => setSelectedSong(null)} 
        />
      ) : (
        <SongList 
          songs={songs} 
          onSelectSong={setSelectedSong} 
        />
      )}
    </div>
  );
}

export default App;
