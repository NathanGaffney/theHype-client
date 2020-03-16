import React, { useState, useEffect } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap'
import TimeConversion from './TimeConversion';
// import CoverGrab from './CoverGrab';
import './GameSearchDisplay.css';
import APIURL from '../helpers/environment';


const GameSearchDisplay = (props) => {
    const [title, setTitle] = useState(props.searchGame[0].name);
    const [hypeRating, setHypeRating] = useState(0);
    const [description, setDescription] = useState(props.searchGame[0].summary);
    const [releaseDate, setReleaseDate] = useState(props.searchGame[0].first_release_date);
    const [platform, setPlatform] = useState('choose');
    
    const handleSubmit = () => {

        //this adds a searched game card to your database
        fetch(`${APIURL}/game/create`, {
            method: 'POST',
            body: JSON.stringify({ 
                title: title, 
                hypeRating: hypeRating, 
                description: description, 
                releaseDate: releaseDate, 
                platform: platform }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((gameData) => {
                console.log('THIS RAN', gameData);
                props.setSearchGame([])
                alert('Game Added')
            }).catch(err => console.log(err))
    }

    // const [releaseDateId, setReleaseDateId] = useState('');
    const [coverId, setCoverId] = useState([]);

    const checkProps = () => {
        console.log('SEARCH PROPS', props)
    }

    useEffect(() => { setCoverId(props.searchGame[0].cover) })

    //this sets the rating
    const handleRating = () => {
        if (props.ratingUrl === 6) {
            return (<p>ESRB Rating: RP (Rating Pending)</p>)
        } else if (props.ratingUrl === 7) {
            return (<p>ESRB Rating: EC (Early Childhood)</p>)
        } else if (props.ratingUrl === 8) {
            return (<p>ESRB Rating: E (Everyone)</p>)
        } else if (props.ratingUrl === 9) {
            return (<p>ESRB Rating: E10 (Everyone 10+)</p>)
        } else if (props.ratingUrl === 10) {
            return (<p>ESRB Rating: T (Teen)</p>)
        } else if (props.ratingUrl === 11) {
            return (<p>ESRB Rating: M (Mature)</p>)
        } else if (props.ratingUrl === 12) {
            return (<p>ESRB Rating: AO (Adult Only)</p>)
        } else {
            return ('')
        }
    }

    return (
        <>
        {checkProps()}
            <hr />
            <Row>
                <Col sm='4'>
                    <Card>
                        <CardImg top width='100%' src={props.coverUrl} alt='Card image cap' />
                        <CardBody>
                            <CardTitle>{props.searchGame[0].name}</CardTitle>
                            <CardSubtitle><TimeConversion searchGame={props.searchGame} /></CardSubtitle>
                            <CardSubtitle>{handleRating()}</CardSubtitle>
                            <CardText className='description'>{props.searchGame[0].summary}</CardText>
                        </CardBody>
                        <Button color='success' onClick={() => handleSubmit()}>Add</Button>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default GameSearchDisplay;