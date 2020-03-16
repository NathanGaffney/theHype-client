import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import GameTable from './GameTable';

const GameCommunity = (props) => {

    const [communityGames, setCommunityGames] = useState([]);

    const fetchCommunityGames = () => {
        fetch('http://localhost:3001/game/community', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((gameData) => {
                setCommunityGames(gameData)
                console.log(gameData)
            })
    }

    useEffect(() => {
        fetchCommunityGames();
    }, [])

    return (
        <Container>
            <Button onClick={() => fetchCommunityGames()}>Community</Button>
            <Row>
                <Col md='9'>
                    <GameTable communityGames={communityGames} token={props.token} />
                </Col>
            </Row>
        </Container>
    )
}

export default GameCommunity;