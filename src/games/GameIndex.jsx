import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import GameCreate from './GameCreate';
import GameTable from './GameTable';
import GameEdit from './GameEdit';
import GameSearch from '../gamesearch/GameSearch';
import APIURL from '../helpers/environment';
import DescPacker from './DescPacker';

const GameIndex = (props) => {

    const [games, setGames] = useState([]); // this is the array of personal games
    const [updateActive, setUpdateActive] = useState(false);
    const [gameToUpdate, setGameToUpdate] = useState({});
    const [communityGames, setCommunityGames] = useState([]); // this is the array of all, or community, games
    const [createBox, setCreateBox] = useState(false); // this is for manual entry of a game
    const [search, setSearch] = useState(false); // this is for searching 3rd party api for games
    const [header, setHeader] = useState(true); // this is to set the header of the table you are looking from Watch List to the Community Header
    const [noHeader, setNoHeader] = useState(false); // this state var is sent to the table component and used there in a function for removing the header for the search component, when there is no user or community games in their respective array.
    const [searchBox, setSearchBox] = useState(false); // this is for turning on the 3rd party api game search modal
    // const [desc, setDesc] = useState('') 
    const [descBox, setDescBox] = useState(false); // this is for turning the description modal on and off
    const [descToPack, setDescToPack] = useState(''); // this is where the description gets stored for the descPacker
    const [titleToPack, setTitleToPack] = useState(''); // this is where the title gets stored for the descPacker
    
    // grabs users games
    const fetchGames = () => {
        fetch(`${APIURL}/game/allgames`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((gameData) => {
                setGames(gameData)
                // setDesc(gameData.description)
                console.log('single user', gameData)

            })
    }

    // grabs all databases games
    const fetchCommunityGames = () => {
        fetch(`${APIURL}/game/community`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((gameData) => {
                setCommunityGames(gameData)
                console.log('all users', gameData)
            })
    }

    // this is for users games
    useEffect(() => {
        fetchGames();
    }, [])

    //this is for communityGames
    // useEffect(() => {
    //     fetchCommunityGames();
    // }, [])

    //this is for setting the game array thats being updated
    const editUpdateGame = (game) => { setGameToUpdate(game); console.log(game); }

    //this is for descPacker
    const packDescription = (desc) => { setDescToPack(desc); console.log(desc); }
    const packTitle = (title) => { setTitleToPack(title); console.log(title); }

    //this is for our edit modal
    const updateOn = () => { setUpdateActive(true) }
    const updateOff = () => { setUpdateActive(false) }

    // these are for turning the manual entry on or off
    const createBoxOn = () => { setCreateBox(true) }
    const createBoxOff = () => { setCreateBox(false) }

    // this unpopulates the community array thats sending itself to the table component for display
    const communityOff = () => { setCommunityGames([]) }

    // this unpopulates the users own array of games thats sending itself to the table component for display
    const myGamesOff = () => { setGames([]) }

    // const handdleManualFetchGames = () => {fetchGames()}

    // this is for game search modal
    const searchBoxOn = () => { setSearchBox(true) }
    const searchBoxOff = () => { setSearchBox(false) }

    const descOn = () => { setDescBox(true); }
    const descOff = () => { setDescBox(false); }


    return (
        <Container>

            {/*This button shows the Users games in the table*/}
            <Button onClick={() => {
                fetchGames();
                communityOff();
                createBoxOff();
                setHeader(true);
                setSearch(false);
            }}>My Games</Button>

            {/*This button shows community games in the table*/}
            <Button onClick={() => {
                fetchCommunityGames();
                myGamesOff();
                createBoxOff();
                setHeader(false);
                setSearch(false);
            }}>Community</Button>

            {/*This button is for manual entry into users Watch List array*/}
            <Button onClick={() => {
                createBoxOn();
                fetchGames();
                communityOff();
                setHeader(true);
                setSearch(false);
                setNoHeader(false);
            }}>Add Manual Entry</Button>

            {/*This button brings up the 3rd party api game search*/}
            <Button onClick={() => {
                setSearch(true)
                communityOff()
                myGamesOff()
                setNoHeader(true)
                searchBoxOn()
            }}>Find Game</Button>

            <br />
            <br />

            <Row>{search ? <GameSearch token={props.token} search={search} setSearch={setSearch} searchBox={searchBox} setSearchBox={setSearchBox} searchBoxOn={searchBoxOn} searchBoxOff={searchBoxOff} /> : null}</Row>
            <Row>
                    {createBox ? <GameCreate createBoxOff={createBoxOff} updateOff={updateOff} fetchGames={fetchGames} token={props.token} /> : null} {/*THIS IS NOT COMPLETE */}
                <Col>
                    { search ? null : <GameTable descOn={descOn} noHeader={noHeader} header={header} games={games} communityGames={communityGames} editUpdateGame={editUpdateGame} packTitle={packTitle} packDescription={packDescription} updateOn={updateOn} fetchGames={fetchGames} token={props.token} />} {/*Feeding GameTable props here with games={games} */}
                </Col>
                {updateActive ? <GameEdit gameToUpdate={gameToUpdate} updateOff={updateOff} token={props.token} fetchGames={fetchGames} /> : null}
                
                {/*DescPacker stores the description of the game in order to keep table clean*/}
                {descBox ? <DescPacker titleToPack={titleToPack} descToPack={descToPack} descOff={descOff} /> : null}
            </Row>
        </Container >
    )
}

export default GameIndex;