import type { Song } from "../types";

interface ChordSheetProps {
  song: Song;
  onBack: () => void;
}

export function ChordSheet({ song, onBack }: ChordSheetProps) {
  const renderLyrics = (lyrics: string) => {
    const lines = lyrics.split("\n");

    return lines.map((line, lineIndex) => {
      const chords: { chord: string; position: number }[] = [];
      let textLine = "";
      let currentPos = 0;

      const regex = /\[([^\]]+)\]/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(line)) !== null) {
        textLine += line.substring(lastIndex, match.index);
        currentPos = textLine.length;

        chords.push({
          chord: match[1],
          position: currentPos,
        });

        lastIndex = regex.lastIndex;
      }

      textLine += line.substring(lastIndex);

      if (chords.length > 0) {
        // Ajusta posições para evitar sobreposição
        const adjustedChords = chords.reduce<{ chord: string; position: number }[]>((acc, chord, idx) => {
          if (idx === 0) {
            acc.push(chord);
          } else {
            const prevChord = acc[idx - 1];
            const prevEnd = prevChord.position + prevChord.chord.length;
            const minPosition = prevEnd + 2; // Espaço mínimo de 2 caracteres
            
            acc.push({
              ...chord,
              position: Math.max(chord.position, minPosition)
            });
          }
          return acc;
        }, []);

        return (
          <div key={lineIndex} className="chord-line-group">
            <div className="chord-line">
              {adjustedChords.map((item, idx) => (
                <span
                  key={idx}
                  className="chord-above"
                  style={{ left: `${item.position}ch` }}
                >
                  {item.chord}
                </span>
              ))}
            </div>
            {textLine.trim() && <div className="text-line">{textLine}</div>}
          </div>
        );
      }

      return (
        <div key={lineIndex} className="text-line">
          {line || "\u00A0"}
        </div>
      );
    });
  };

  return (
    <div className="chord-sheet">
      <header className="header">
        <button className="back-button" onClick={onBack}>
          ← Voltar
        </button>
        <h1>{song.title}</h1>
        <p className="artist">{song.artist}</p>
      </header>
      <div className="chord-container">
        <div className="chords-info">
          <strong>Tom:</strong> {song.tone}
        </div>
        <div className="lyrics">{renderLyrics(song.lyrics)}</div>
      </div>
    </div>
  );
}
