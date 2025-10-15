import type { Song } from "../types";

interface SongListProps {
  songs: Song[];
  onSelectSong: (song: Song) => void;
}

export function SongList({ songs, onSelectSong }: SongListProps) {
  return (
    <div className="song-list">
      <header className="header">
        <h1>Minhas Cifras</h1>
      </header>
      <div className="songs-container">
        {songs.map((song) => (
          <div
            key={song.id}
            className="song-item"
            onClick={() => onSelectSong(song)}
          >
            <h2 className="song-title">{song.title}</h2>
            <p className="song-artist">{song.artist}</p>
            <p className="song-chords">{song.tone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
