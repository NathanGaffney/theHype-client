import React, { useState, useEffect } from 'react';
import {
    Label, Input, Container, Row, Col, Button,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import GameSearchDisplay from './GameSearchDisplay';

const GameSearch = (props) => {
    const [searchGame, setSearchGame] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');

    //fetchSearch grabs the game to be placed in the card
    const fetchSearch = () => {
        fetch('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games', {
            method: 'POST',
            body: `search "${searchTitle}"; fields name, first_release_date, cover, summary, age_ratings;`,
            headers: new Headers({
                'user-key': process.env.REACT_APP_IGDB_API_KEY,
                'Content-Type': 'application/json'
            })
        }).then((res) => res.json())
            .then((searchData) => {
                console.log('searchData', searchData)
                setSearchGame(searchData)
            }).catch(err => console.log(err))
    }

    //closes the search modal
    const closeSearchBox = () => { props.searchBoxOff() }
    const openSearchBox = () => { props.searchBoxOn() }
    let cards = null;
    if(searchGame.length > 0){
        cards = searchGame.map((item, index)=>{
            return <GameSearchDisplay token={props.token} key={`game-card-${index}`} openSearchBox={openSearchBox} closeSearchBox={closeSearchBox()} searchGame={item} setSearchGame={setSearchGame} />
        });
    }

    return (
        <>
            <h3>Search</h3>
            {props.searchBox ? <Modal isOpen={true}>
                <ModalHeader toggle={() => closeSearchBox()}>What Game are you looking for?</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md='8'>
                            <h3><span>Enter Game Title</span></h3>
                            <Label htmlFor='title' />
                            <Input placeholder='Game Title' name='title' value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                        </Col>
                    </Row>
                    <br />
                    <Button onClick={fetchSearch} >Search</Button>
                </ModalBody>
            </Modal> : null}
            {cards}
        </>
    )
}

export default GameSearch;