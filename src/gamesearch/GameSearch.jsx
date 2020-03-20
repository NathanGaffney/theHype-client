import React, { useState, useEffect } from 'react';
import {
    Label, Input, Container, Row, Col, Button,
    Modal, ModalHeader, ModalBody, Form, FormGroup
} from 'reactstrap';
import GameSearchDisplay from './GameSearchDisplay';
import SearchIcon from '@material-ui/icons/Search';

const GameSearch = (props) => {
    const [searchGame, setSearchGame] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');

    //fetchSearch grabs the game to be placed in the card
    const fetchSearch = () => {
        fetch('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games', {
            method: 'POST',
            body: `search "${searchTitle}"; fields name,first_release_date, cover, summary, age_ratings;`,
            headers: new Headers({
                'user-key': process.env.REACT_APP_IGDB_API_KEY,
                'Content-Type': 'application/json'
            })
        }).then((res) => res.json())
            .then((searchData) => {
                console.log('searchData', searchData)
                setSearchGame(searchData)
                props.searchBoxOff()
            }).catch(err => console.log(err))
    }

    //here is where we map the search results that were set to searchGame
    let cards = null;
    if (searchGame.length > 0) {
        cards = searchGame.map((item, index) => {
            //this item.cover will further filter our data to only map and send to fetch the cover if there is one to save on 3rd party api fetches and also help save on memory
            if (item.cover) {
                return <GameSearchDisplay token={props.token} key={`game-card-${index}`} search={props.search} setSearch={props.setSearch} searchGame={item} setSearchGame={setSearchGame} />
            }
        });
    }

    return (
        <>
            {/* <Row><h3>Search</h3></Row> */}

            {props.searchBox ?
                <Modal isOpen={true}>
                    <ModalHeader toggle={() => props.searchBoxOff()}>What Game are you looking for?</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <h3><span>Enter Game Title</span></h3>
                                <Label htmlFor='title' />
                                <Input placeholder='Game Title' name='title' value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                            </FormGroup>
                            <Button onClick={fetchSearch} >Search</Button>
                        </Form>
                    </ModalBody>
                </Modal> : null}
            {cards}
        </>
    )
}

export default GameSearch;