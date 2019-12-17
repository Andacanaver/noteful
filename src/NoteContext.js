import React from 'react';

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    currentNote: null,
    currentFolder: null,
    setNote: () => {},
    setFolder: () => {}
})

export default NoteContext