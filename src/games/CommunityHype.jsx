import React, { useState, useEffect } from 'react';
import {
    Label, Input, Container, Row, Col, Button,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import APIURL from '../helpers/environment';

const CommunityHype = (props) => {
    const [addTitle, setAddTitle] = useState(props.hypeToBeChanged.title);
    const [addDescription, setAddDescription] = useState(props.hypeToBeChanged.description);
    const [addReleaseDate, setAddReleaseDate] = useState(props.hypeToBeChanged.releaseDate);
    const [addPlatform, setAddPlatform] = useState(props.hypeToBeChanged.platform);
    
    const [editHype, setEditHype] = useState(props.hypeToBeChanged.hypeRating)

    // const [hypeRating, setHypeRating] = useState(0);
    // const [releaseDate, setReleaseDate] = useState(props.searchGame.first_release_date);
    // const [searchPlatforms, setSearchPlatforms] = useState([])
    // const [card, setCard] = useState(true)

     // this adds a game from the community to the users list
     const handleSubmit = (comGame) => {
        fetch(`${APIURL}/game/create`, {
            method: 'POST',
            body: JSON.stringify({
                title: addTitle,
                hypeRating: editHype,
                description: addDescription,
                releaseDate: addReleaseDate,
                platform: addPlatform
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
                <Row>
                    <Col md='8'>
                        <Label htmlFor='hypeRating'>Choose Hype Rating</Label>
                        <Input type='select' name='hypeRating' value={editHype} onChange={(e) => setEditHype(e.target.value)}>
                            <option value='1'>1 - Meh..</option>
                            <option value='2'>2 - Okay</option>
                            <option value='3'>3 - Looks fun</option>
                            <option value='4'>4 - Can't wait</option>
                            <option value='5'>5 - LETS GOOOO</option>
                        </Input>
                    </Col>
                </Row>
                <br />
                <Button color='success' onClick={() => handleSubmit()} >Add Game</Button>
            </ModalBody>
        </Modal>
    )
}

export default CommunityHype;