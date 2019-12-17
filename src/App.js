import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import STORE from "./STORE";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "./NoteListNav/NoteListNav";
import NotePageNav from "./NotePageNav/NotePageNav";
import NoteListMain from "./NoteListMain/NoteListMain";
import NotePageMain from "./NotePageMain/NotePageMain";
import { getNotesForFolder, findNote, findFolder } from "./notes-helpers";
import "./App.css";
//import a context provider js?
import NoteContext from './NoteContext';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    currentNoteId: null,
    currentFolderId: null
  };
  componentDidMount() {
    setTimeout(() => this.setState(STORE), 600);
  }
  //create function for deleting notes? 
  //add this in the functions or the render?
  deleteNotes = (notes) => {
    this.setState({notes})
  };
  deleteFolders = (folders) => {
    this.setState({folders})
  };
  setNote =(currentNoteId) => {
    this.setState({currentNoteId})
  };
  setFolder = (currentFolderId) => {
    this.setState({currentFolderId})
  };
  renderNavRoutes() {
    const {notes, folders} = this.state;
    return(
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            //convert to component
            render={routeProps => (
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            )}
          />
        ))}
        <Route
          path='/note/:noteId'
          //convert to component what to do with the const?
          render={routeProps => {
            
            
            
            return <NotePageNav {...routeProps} />;
          }}
        />
        <Route path='/add-folder' component={NotePageNav} />
        <Route path='/add-note' component={NotePageNav} />
      </>
    );
  }
  renderMainRoutes() {
    const {notes, folders} = this.state;
    return(
      <>
        {['/','/folder/:folderId'].map(path => (
          <Route 
            exact
            key={path}
            path={path}
            render={routeProps => {
              const {folderId} = routeProps.match.params;
              const notesForFolder = getNotesForFolder(
                notes,
                folderId
              );
              return(
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                />
              );
            }}
          />
        ))}
        <Route 
          path='/note/:noteId'
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />;
          }}
        />
      </>
    );
  }
  render() {
    //add in contextValue const?
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      currentNote: this.state.currentNoteId,
      currentFolder: this.state.currentFolderId,
      setNote: this.setNote,
      setFolder: this.setFolder
    }
    return (
      //add noteContext provider with value prop? or would I put it in the
      //renderNavRoutes/renderMainRoutes?
      <NoteContext.Provider value={contextValue}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </NoteContext.Provider>
    );
  }
}

export default App;
