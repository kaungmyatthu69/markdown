import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useRef, useState} from "react";
import {NoteData, Tag} from "./App.tsx";
import {v4 as uuidv4} from "uuid";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void,
    onAddTag: (tag: Tag) => void,
    availableTags:Tag[]
}
const NoteForm = ({onSubmit,onAddTag,availableTags}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const navigate = useNavigate()
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        })
        navigate('..')
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId={"title"}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required type={"text"}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={"tags"}>
                            <Form.Label>Tags</Form.Label>
                            <CreatableSelect
                                onCreateOption={label=>{
                                    const newTag={id:uuidv4(),label}
                                    onAddTag(newTag)
                                    setSelectedTags(prev=>[...prev,newTag])
                                }}
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
                <Form.Group controlId={"body"}>
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as={"textarea"} ref={markdownRef} rows={"15"}/>
                </Form.Group>
                <Stack direction={'horizontal'} gap={2} className="justify-content-end">
                    <Button variant="primary" type="submit">Save</Button>
                    <Link to={'..'}>
                        <Button variant="outline-secondary" type={'button'}> Cancle</Button>
                    </Link>
                </Stack>


            </Stack>

        </Form>
    );
};

export default NoteForm;
