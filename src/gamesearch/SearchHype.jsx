import React, { useState, useEffect } from 'react';
import {
    Label, Input, Container, Row, Col, Button,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { timeConverter } from './TimeConversion';
import APIURL from '../helpers/environment';

const SearchHype = (props) => {

    const [hypeRating, setHypeRating] = useState(0);
    const [releaseDate, setReleaseDate] = useState(props.searchGame.first_release_date);
    const [searchPlatforms, setSearchPlatforms] = useState([])
    const [card, setCard] = useState(true)

    //this handler packs up the game on the card and saves it to the users list
    const handleSubmit = () => {
        fetch(`${APIURL}/game/create`, {
            method: 'POST',
            body: JSON.stringify({
                title: props.searchGame.name,
                hypeRating: hypeRating,
                description: props.searchGame.summary,
                releaseDate: timeConverter(releaseDate),
                platform: 'choose'
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((gameData) => {
                console.log('THIS RAN', gameData);
                // props.setSearchGame([])
                props.setCardOff()
                props.hypeBoxOff()
            }).catch(err => console.log(err))
    }


    return (
        <Modal isOpen={true}>
            <ModalHeader toggle={() => props.hypeBoxOff()} >How Hyped are you</ModalHeader>
            <ModalBody>
                <Row>
                    <Col md='8'>
                        <Label htmlFor='hypeRating'>Choose Hype Rating</Label>
                        <Input type='select' name='hypeRating' value={hypeRating} onChange={(e) => setHypeRating(e.target.value)}>
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

export default SearchHype;