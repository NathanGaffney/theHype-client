import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
import APIURL from '../helpers/environment';

const GameEdit = (props) => {

    const [editTitle, setEditTitle] = useState(props.gameToUpdate.title);
    const [editHypeRating, setEditHypeRating] = useState(props.gameToUpdate.hypeRating);
    const [editDescription, setEditDescription] = useState(props.gameToUpdate.description);
    const [editReleaseDate, setEditReleaseDate] = useState(props.gameToUpdate.releaseDate);
    const [editPlatform, setEditPlatform] = useState(props.gameToUpdate.platform);

    // this is for editing the users game listing
    const gameUpdate = (event, game) => {
        event.preventDefault();
        fetch(`${APIURL}/game/update/${props.gameToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: editTitle,
                hypeRating: editHypeRating,
                description: editDescription,
                releaseDate: editReleaseDate,
                platform: editPlatform
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            props.fetchGames();
            props.updateOff();
        })
    }

    return (
        <Modal isOpen={true}>
            <ModalHeader toggle={() => props.updateOff()}>Edit Game</ModalHeader>
            <ModalBody>
                <Form onSubmit={gameUpdate}>
                    <Row>
                        <Col sm='5'>
                            <FormGroup>
                                <Label htmlFor='title'>Change Title</Label>
                                <Input name='title' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='hypeRating'>Edit Hype Rating</Label>
                                <Input type='select' name='hypeRating' value={editHypeRating} onChange={(e) => setEditHypeRating(e.target.value)}>
                                    <option value='1 - Meh..'>1 - Meh..</option>
                                    <option value='2 - Okay'>2 - Okay</option>
                                    <option value='3 - Looks fun'>3 - Looks fun</option>
                                    <option value="4 - Can't wait">4 - Can't wait</option>
                                    <option value='5 - LETS GOOOO'>5 - LETS GOOOO</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='platform'>Change Platform</Label>
                                <Input type='select' name='platform' value={editPlatform} onChange={(e) => setEditPlatform(e.target.value)}>
                                    <option placeholder='Choose Platform'>Choose Platform</option>
                                    <option value='Xbox'>Xbox</option>
                                    <option value='PlayStation'>PlayStation</option>
                                    <option value='Switch'>Switch</option>
                                    <option value='PC'>PC</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='releaseDate'>Change Release Date</Label>
                                <Input placeholder='Release Date' name='releaseDate' value={editReleaseDate} onChange={(e) => setEditReleaseDate(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col sm='7'>
                            <FormGroup>
                                <Label htmlFor='description'>Edit Description</Label>
                                <Input type='textarea' rows='10' name='description' value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                            </FormGroup>
                            <Button color='info' type='submit'>Save Changes</Button>
                        </Col>
                    </Row>

                </Form>
            </ModalBody>
        </Modal>
    )
}

export default GameEdit;