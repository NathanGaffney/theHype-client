import React, { useState, useEffect } from 'react';
import {
    Label, Input, Container, Row, Col, Button,
    Modal, ModalHeader, ModalBody, FormGroup, Form
} from 'reactstrap';
import { timeConverter } from './TimeConversion'; // this function i imported from another component converts UNIX time stamp into a readable data
import APIURL from '../helpers/environment';

const SearchHype = (props) => {

    const [hypeRating, setHypeRating] = useState('Not Hyped Huh?');
    const [releaseDate, setReleaseDate] = useState(props.searchGame.first_release_date);
    const [searchPlatforms, setSearchPlatforms] = useState('Choose Platform')
    const [card, setCard] = useState(true)

    //this handler packs up the game on the card and saves it to the users list
    const handleSubmit = () => {
        if (props.searchGame.first_release_date) {
            setReleaseDate(props.searchGame.first_release_date)
            fetch(`${APIURL}/game/create`, {
                method: 'POST',
                body: JSON.stringify({
                    title: props.searchGame.name,
                    hypeRating: hypeRating,
                    description: props.searchGame.summary,
                    releaseDate: timeConverter(releaseDate),
                    platform: searchPlatforms,
                    url: props.coverUrl
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
        } else {
            fetch(`${APIURL}/game/create`, {
                method: 'POST',
                body: JSON.stringify({
                    title: props.searchGame.name,
                    hypeRating: hypeRating,
                    description: props.searchGame.summary,
                    releaseDate: 'n/a',
                    platform: searchPlatforms,
                    url: props.coverUrl
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
    }

    return (
        <Modal isOpen={true}>
            <ModalHeader toggle={() => props.hypeBoxOff()} >How Hyped are you</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor='hypeRating'>Choose Hype Rating</Label>
                        <Input type='select' name='hypeRating' value={hypeRating} onChange={(e) => setHypeRating(e.target.value)}>
                            <option value='1 - Meh..'>1 - Meh..</option>
                            <option value='2 - Okay'>2 - Okay</option>
                            <option value='3 - Looks fun'>3 - Looks fun</option>
                            <option value="4 - Can't wait">4 - Can't wait</option>
                            <option value='5 - LETS GOOOO'>5 - LETS GOOOO</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='platform'>Which Platform would you want to have it on?</Label>
                        <Input type='select' name='platform' value={searchPlatforms} onChange={(e) => setSearchPlatforms(e.target.value)}>
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

export default SearchHype;