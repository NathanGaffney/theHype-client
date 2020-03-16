import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
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

    // this is for closing the edit modal
    const closeModal = () => {
        props.updateOff();
    }

    return (
        <Modal isOpen={true}>
            <ModalHeader toggle={() => closeModal()}>Edit Game</ModalHeader>
                <ModalBody>
                    <Form onSubmit={gameUpdate}>
                    <FormGroup>
                        <Label htmlFor='title'>Change Title</Label>
                        <Input name='title' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='hypeRating'>Edit Hype Rating</Label>
                        <Input type='select' name='hypeRating' value={editHypeRating} onChange={(e) => setEditHypeRating(e.target.value)}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='description'>Edit Description</Label>
                        <Input name='description' value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='releaseDate'>Change Release Date</Label>
                        <Input placeholder='Release Date' name='releaseDate' value={editReleaseDate} onChange={(e) => setEditReleaseDate(e.target.value)} />
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
                    <Button type='submit'>Save Changes</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default GameEdit;