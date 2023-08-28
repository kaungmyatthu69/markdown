import "bootstrap/dist/css/bootstrap.min.css"
import {Navigate, Route, Routes} from "react-router-dom";
import NewNote from "./NewNote.tsx";
import {useLocalStorage} from "./useLocalStorage.ts";
import {v4 as uuidv4} from "uuid";
import {useMemo} from "react";
import NoteList from "./NoteLIst.tsx";

export  type Note={
    id:string
}&NoteData;
export  type NoteData={
    title:string,
    markdown:string,
    tags:Tag[],
}

export type RowNote={
    id:string
} & RowNoteData;
export  type RowNoteData={
    title:string,
    markdown:string,
    tagIds:string[]
}

export  type Tag={
    id:string,
    label:string,
}
function App() {
    const [notes, setNotes] =useLocalStorage<RowNote[]>("NOTES", []);
    const [tags, setTags] =useLocalStorage<Tag[]>("TAGS", []);
    const notesWithTags = useMemo(() => {
        return notes.map((note)=>{
            return {
              ...note,
                tags:tags.filter((tag)=>{
                    return note.tagIds.includes(tag.id);
                })
            }
        })
    },[ notes, tags]);

    const  onCreateNote=({tags,...data}:NoteData)=>{
        setNotes(prevNotes=>{
            return [...prevNotes,{...data, id:uuidv4(),tagIds:tags.map(tag=>tag.id)}]
        })
    }
    function addTag(tag:Tag){
        setTags(prev=>[...prev,tag])
    }

    return (
            <Routes>
                <Route path="/" element={<NoteList availableTags={tags} />}/>
                <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag}  availableTags={tags} />}/>
                <Route path={"/:id"}>
                    <Route index element={<h1>Show</h1>} />
                    <Route path="edit" element={<h1>Edit</h1>} />
                </Route>
                <Route path="*" element={<Navigate to="/" />}/>
            </Routes>
        )

}

export default App
