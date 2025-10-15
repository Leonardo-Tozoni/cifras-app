# 🎸 App de Cifras Musicais

Aplicação simples e focada em mobile para visualização de cifras musicais, desenvolvida com React + TypeScript + Vite.

## 🚀 Funcionalidades

- ✅ Lista de músicas com título, artista e acordes
- ✅ Visualização de cifra com acordes destacados
- ✅ Navegação simples (clique para ver, botão voltar)
- ✅ Modo somente leitura (sem edição)
- ✅ Interface otimizada para mobile
- ✅ Design moderno com tema escuro

## 📱 Como usar

### Instalar dependências
```bash
npm install
```

### Executar em modo desenvolvimento
```bash
npm run dev
```

### Build para produção
```bash
npm run build
```

## 📝 Como adicionar músicas

Edite o arquivo `src/data/songs.ts` e adicione suas músicas no array:

```typescript
{
  id: '4',
  title: 'Nome da Música',
  artist: 'Nome do Artista',
  chords: 'C G Am F',  // Acordes usados
  lyrics: `[C]Primeira linha com [G]acordes
[Am]Segunda linha [F]continua
[C]Use colchetes para [G]marcar acordes`
}
```

### Formato das cifras

Os acordes aparecem **acima da letra** exatamente na posição onde você os colocar:

- Use colchetes `[acorde]` antes da palavra/sílaba onde o acorde deve aparecer
- Exemplo: `[G]Essa é uma [D]linha com [Em]acordes`
- Os acordes serão renderizados acima da letra, respeitando o alinhamento exato

**Exemplo:**
```
[D]Bem-aventurada, virgem mãe
[Bm]Santa, imaculada
```

**Renderiza como:**
```
D              Bm
Bem-aventurada, virgem mãe
Santa, imaculada
```

## 🏗️ Estrutura do projeto

```
src/
├── components/
│   ├── SongList.tsx      # Lista de músicas
│   └── ChordSheet.tsx    # Visualização da cifra
├── data/
│   └── songs.ts          # Dados das músicas (EDITE AQUI)
├── types.ts              # Tipos TypeScript
├── App.tsx               # Componente principal
├── App.css               # Estilos da aplicação
└── index.css             # Estilos globais
```

## 🎨 Personalização

Para alterar cores e estilos, edite:
- **Cores do tema**: `src/App.css` (variáveis de cor)
- **Header gradiente**: `.header` em `src/App.css`
- **Estilos mobile**: Media queries no final de `src/App.css`
