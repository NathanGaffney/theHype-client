import React, { useState, useEffect } from 'react';
import {
    Label, Input, Container, Row, Col, Button,
    Modal, ModalHeader, ModalBody, FormGroup, Form
} from 'reactstrap';
import APIURL from '../helpers/environment';

const CommunityHype = (props) => {

    const [addPlatform, setAddPlatform] = useState(props.hypeToBeChanged.platform);
    const [editHype, setEditHype] = useState(props.hypeToBeChanged.hypeRating); // grabbing below for hype edit

    // this adds a game from the community to the users list
    const handleSubmit = (comGame) => {
        fetch(`${APIURL}/game/create`, {
            method: 'POST',
            body: JSON.stringify({
                title: props.hypeToBeChanged.title,
                hypeRating: editHype,
                description: props.hypeToBeChanged.description,
                releaseDate: props.hypeToBeChanged.releaseDate,
                platform: addPlatform,
                url: props.hypeToBeChanged.url
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((gameData) => {
                props.comHypeBoxOff()
            })
    }


    return (
        <Modal isOpen={true}>
            <ModalHeader toggle={() => props.comHypeBoxOff()}>As Hyped as they are?</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor='hypeRating'>Choose Your Hype Rating</Label>
                        <Input type='select' name='hypeRating' value={editHype} onChange={(e) => setEditHype(e.target.value)}>
                            <option value='1 - Meh..'>1 - Meh..</option>
                            <option value='2 - Okay'>2 - Okay</option>
                            <option value='3 - Looks fun'>3 - Looks fun</option>
                            <option value="4 - Can't wait">4 - Can't wait</option>
                            <option value='5 - LETS GOOOO'>5 - LETS GOOOO</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='platform'>Which Platform would you want to have it on?</Label>
                        <Input type='select' name='platform' value={addPlatform} onChange={(e) => setAddPlatform(e.target.value)}>
                            <option placeholder='Choose Platform'>Choose Platform</option>
                            <option value='Xbox'>Xbox</option>
                            <option value='PlayStation'>PlayStation</option>
                            <option value='Switch'>Switch</option>
                            <option value='PC'>PC</option>
                        </Input>
                    </FormGroup>
                    <Button type='submit' color='success'>Add Game</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default CommunityHype;