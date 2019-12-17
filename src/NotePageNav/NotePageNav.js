import React, {Component} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import "./NotePageNav.css";
import NoteContext from '../NoteContext';
import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";

class NotePageNav extends Component {
    static contextType = NoteContext;
    componentDidMount() {
        const { noteId } = this.props.match.params;
        const note = findNote(this.context.notes, noteId) || {};
        const folder = findFolder(this.context.folders, note.folderId);
        this.context.setNote(note);
        this.context.setFolder(folder);
    }
    render() {
    console.log(this.context)
    return(
        <div className='NotePageNav'>
            <CircleButton
                tag='button'
                role='link'
                onClick={() =>this.props.history.goBack()}
                className='NotePageNav__back-button'
            >
                <FontAwesomeIcon icon='chevron-left' />
                <br />
                Back
            </CircleButton>
            {this.context.currentFolder && (
                <h3 className='NotePageNav__folder-name'>
                    {this.context.currentFolder.name}
                </h3>
            )}
        </div>
    )

}
}
export default NotePageNav