// Script para formatar acordes automaticamente
// Execute com: node format-chords.js

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'songs.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Padrões de acordes comuns (letras maiúsculas seguidas de modificadores opcionais)
// Exemplos: G, Am, D7, F#m, Bb7+, C9, etc.
const chordPattern = /^([A-G][#b]?(?:m|maj|min|aug|dim|sus)?[0-9]?(?:\/[A-G][#b]?)?(?:\+|-|°)?(?:\/[0-9]+)?)\s/gm;

// Processa linha por linha do arquivo
const lines = content.split('\n');
const processedLines = lines.map(line => {
  // Ignora linhas que já têm colchetes ou são comentários
  if (line.includes('[') || line.trim().startsWith('//') || line.includes('lyrics:')) {
    return line;
  }
  
  // Detecta acordes no início da linha (padrão comum em cifras)
  const trimmed = line.trimStart();
  const spaces = line.length - trimmed.length;
  
  const chordMatch = trimmed.match(/^([A-G][#b]?(?:m|maj|min|aug|dim|sus)?[0-9]*(?:\/[A-G][#b]?)?(?:\+|-|°)?(?:\/[0-9]+)?)\s+/);
  
  if (chordMatch) {
    const chord = chordMatch[1];
    const rest = trimmed.substring(chord.length).trimStart();
    return ' '.repeat(spaces) + `[${chord}]` + (rest ? '\n' + ' '.repeat(spaces) + rest : '');
  }
  
  // Detecta múltiplos acordes na mesma linha
  const multiChordMatch = trimmed.match(/^([A-G][#b]?(?:m|maj|min|aug|dim|sus)?[0-9]*(?:\/[A-G][#b]?)?(?:\+|-|°)?)\s+([A-G][#b]?(?:m|maj|min|aug|dim|sus)?[0-9]*(?:\/[A-G][#b]?)?(?:\+|-|°)?)/);
  
  if (multiChordMatch && !trimmed.match(/[a-z]{3,}/i)) {
    // Linha só com acordes
    const formatted = trimmed.split(/\s+/)
      .filter(part => part.length > 0)
      .map(chord => {
        if (chord.match(/^[A-G][#b]?/)) {
          return `[${chord}]`;
        }
        return chord;
      })
      .join('  ');
    return ' '.repeat(spaces) + formatted;
  }
  
  return line;
});

const newContent = processedLines.join('\n');

// Salva o arquivo formatado
fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('✅ Acordes formatados com sucesso!');
console.log('⚠️  Revise o arquivo para verificar se está correto.');
