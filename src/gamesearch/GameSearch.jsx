import React, { useState, useEffect } from 'react';
import {
    Label, Input, Container, Row, Col, Button,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import GameSearchDisplay from './GameSearchDisplay';

const GameSearch = (props) => {
    const [searchGame, setSearchGame] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [ratingUrl, setRatingUrl] = useState('');


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
                fetchRatings(searchData[0].age_ratings[0])
                fetchCover(searchData[0].cover)
            }).catch(err => console.log(err))
    }

    //fetchCover grabs the box art url to be displayed in the card
    const fetchCover = (id) => {
        fetch('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/covers', {
            method: 'POST',
            body: `where id = ${id}; fields url;`,
            headers: new Headers({
                'user-key': process.env.REACT_APP_IGDB_API_KEY,
                'Content-Type': 'application/json'
            })
        }).then((res) => res.json())
            .then((coverData) => {
                setCoverUrl(coverData[0].url);
            }).catch(err => console.log(err))
    }

    //fetchRatings grabs the rating integer
    const fetchRatings = (ratingId) => {
        fetch('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/age_ratings', {
            method: 'POST',
            body: `where id = ${ratingId}; fields rating;`,
            headers: new Headers({
                'user-key': process.env.REACT_APP_IGDB_API_KEY,
                'Content-Type': 'application/json'
            })
        }).then((res) => res.json())
            .then((ratingData) => {
                setRatingUrl(ratingData[0].rating);
            }).catch(err => console.log(err))
    }

    //closes the search modal
    const closeSearchBox = () => { props.searchBoxOff() }
    const openSearchBox = () => { props.searchBoxOn() }

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
            {searchGame.length > 0 ? <GameSearchDisplay token={props.token} openSearchBox={openSearchBox} closeSearchBox={closeSearchBox()} ratingUrl={ratingUrl} coverUrl={coverUrl} searchGame={searchGame} setSearchGame={setSearchGame} /> : null}
        </>
    )
}

export default GameSearch;