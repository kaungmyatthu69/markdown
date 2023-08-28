import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import {useMemo} from "react";
import {Note, Tag} from "./App.tsx";
import {useState} from "react";
type NoteListProps={
    availableTags: Tag[]
    notes: Note[]
}


const NoteList = ({availableTags,notes}:NoteListProps) => {
    const [selectedTags,setSelectedTags] = useState<Tag[]>([]);
    const [title,setTitle] = useState("");
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title ==='' || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length===0  ||
            selectedTags.every(tag=>note.tags.some(noteTag=> noteTag.id ===tag.id ))
            )
        });
    }, [title,selectedTags,notes]);

    return (
        <div>
           <Row className='align-items-center mb-4'>
               <Col>
                   <h1>Notes</h1>
               </Col>
               <Col xs="auto">
                   <Stack direction={"horizontal"} gap={3}>
                       <Link to="/new">
                           <Button variant="primary">Create</Button>
                       </Link>
                       <Button variant="outline-secondary" >Edit Note</Button>
                   </Stack>

               </Col>
           </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control  value={title} onChange={(e)=>setTitle(e.target.value)}  type="text" placeholder="Title"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={"tags"}>
                            <Form.Label>Tags</Form.Label>
                            <CreatableSelect
                                value={selectedTags.map(tag => {
                                    return {value: tag.id, label: tag.label}
                                })}
                                options={availableTags.map(tag => {
                                    return {value: tag.id, label: tag.label}
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return {
                                            id: tag.value, label: tag.label
                                        }
                                    }))
                                }}
                                isMulti/>
                        </Form.Group>
                    </Col>


                </Row>
            </Form>
            <Row>

            </Row>
        </div>
    );
};

export default NoteList;
