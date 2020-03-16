import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import APIURL from '../helpers/environment';

const GameCreate = (props) => {
    const [title, setTitle] = useState('');
    const [hypeRating, setHypeRating] = useState(0);
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [platform, setPlatform] = useState('');

    // this creates a manual entry game for the user
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/game/create`, {
            method: 'POST',
            body: JSON.stringify({ title: title, hypeRating: hypeRating, description: description, releaseDate: releaseDate, platform: platform }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((gameData) => {
                console.log(gameData);
                setTitle('');
                setHypeRating(0);
                setDescription('');
                setReleaseDate('');
                setPlatform('');
                props.fetchGames();
                props.createBoxOff();
            })
    }

    // this turns the custon create modal off
    const closeCreateModal = () => {
        props.createBoxOff();
    }

    return (
        <>
            <Modal isOpen={true}>
                <ModalHeader toggle={() => closeCreateModal()}>Manual Entry</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor='title' />
                            <Input placeholder='Game Title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='hypeRating' />
                            <Input type='select' name='hypeRating' value={hypeRating} onChange={(e) => setHypeRating(e.target.value)}>
                                <option placeholder='How Hyped Are You'>How Hyped Are You</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='description' />
                            <Input placeholder='Description' type='textarea rows="2" cols="20" wrap="hard"' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='releaseDate' />
                            <Input placeholder='Release Date' name='releaseDate' value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='platform' />
                            <Input type='select' name='platform' value={platform} onChange={(e) => setPlatform(e.target.value)}>
                                <option placeholder='Choose Platform'>Choose Platform</option>
                                <option value='Xbox'>Xbox</option>
                                <option value='PlayStation'>PlayStation</option>
                                <option value='Switch'>Switch</option>
                                <option value='PC'>PC</option>
                                <option value='All Platfoms'>All Platforms</option>
                            </Input>
                        </FormGroup>
                        <Button type='submit'>Add Game</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default GameCreate;