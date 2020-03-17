import React, { useState, useEffect } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap'
import TimeConversion from './TimeConversion';
// import CoverGrab from './CoverGrab';
import './GameSearchDisplay.css';
import APIURL from '../helpers/environment';
import { timeConverter } from './TimeConversion';


const GameSearchDisplay = (props) => {
    // const [title, setTitle] = useState(props.searchGame[0].name);
    const [hypeRating, setHypeRating] = useState(0);
    const [description, setDescription] = useState(props.searchGame.summary);
    const [releaseDate, setReleaseDate] = useState(props.searchGame.first_release_date);
    const [coverUrl, setCoverUrl] = useState('');
    const [ratingUrl, setRatingUrl] = useState('');
    const [searchPlatforms, setSearchPlatforms] = useState([])
    // const [platform, setPlatform] = useState('choose');
    
    const handleSubmit = () => {

        //this adds a searched game card to your database
        fetch(`${APIURL}/game/create`, {
            method: 'POST',
            body: JSON.stringify({ 
                title: props.searchGame.name, 
                hypeRating: hypeRating, 
                description: props.searchGame.summary, 
                releaseDate: timeConverter(releaseDate), 
                platform: 'choose' }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((gameData) => {
                console.log('THIS RAN', gameData);
                // props.setSearchGame([])
                alert('Game Added')
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
                console.log('RATING DATA', ratingData)
                setRatingUrl(ratingData[0].rating);
            }).catch(err => console.log(err))
    }









    //this isnt complete---------------------------------------------------------------
    // const fetchPlatforms = (id) => {
    //     fetch('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/platforms', {
    //         method: 'POST',
    //         body: `where id = ${id}; fields abbreviation;`,
    //         headers: new Headers({
    //             'user-key': process.env.REACT_APP_IGDB_API_KEY,
    //             'Content-Type': 'application/json'
    //         })
    //     }).then((res) => res.json())
    //     .then((platformData) => {
    //         console.log('PLATFORM FETCH RAN', platformData)
    //         setSearchPlatforms(platformData)
    //     })
    // }

    // let plats = null;
    // if(props.searchGame.platforms > 0){
    //     plats = props.searchGame.platforms.map((item, index)=>{
    //         return fetchPlatforms(item)
    //     });
    // }
    //--------------------------------------------------------------------------------









    
    const checkProps = () => {
        console.log('SEARCH PROPS', props)
    }

    //this sets the rating 
    const handleRating = () => {
        if (ratingUrl === 6) {
            return (<p>ESRB Rating: RP (Rating Pending)</p>)
        } else if (ratingUrl === 7) {
            return (<p>ESRB Rating: EC (Early Childhood)</p>)
        } else if (ratingUrl === 8) {
            return (<p>ESRB Rating: E (Everyone)</p>)
        } else if (ratingUrl === 9) {
            return (<p>ESRB Rating: E10 (Everyone 10+)</p>)
        } else if (ratingUrl === 10) {
            return (<p>ESRB Rating: T (Teen)</p>)
        } else if (ratingUrl === 11) {
            return (<p>ESRB Rating: M (Mature)</p>)
        } else if (ratingUrl === 12) {
            return (<p>ESRB Rating: AO (Adult Only)</p>)
        } else {
            return ('')
        }
    }

    useEffect(() => {
        if(props.searchGame.cover){
            fetchCover(props.searchGame.cover)
        }
        if(props.searchGame.age_ratings){
            fetchRatings(props.searchGame.age_ratings[0])
        }

        //this isnt complete-----------------------------------------------------------
        // if(plats){
        //     fetchPlatforms(plats)
        // }
        //-------------------------------------------------------------------------------
        
    }, [])
    
    return (
        <>
        {checkProps()}
            <hr />
                <Col sm='4'>
                    <Card>
                        <CardImg top width='100%' src={coverUrl} alt='Card image cap' />
                        <CardBody>
                            <CardTitle>{props.searchGame.name}</CardTitle>
                            <CardSubtitle>
                                {props.searchGame.first_release_date ? 
                                    timeConverter(props.searchGame.first_release_date) :
                                    ''}
                            </CardSubtitle>
                            <CardSubtitle>{handleRating()}</CardSubtitle>

                            {/* <CardSubtitle>{plats}</CardSubtitle> */}

                            <CardText className='description'>{props.searchGame.summary ? props.searchGame.summary : ''}</CardText>
                        </CardBody>
                        <Button color='success' onClick={() => handleSubmit()}>Add</Button>
                    </Card>
                </Col>
        </>
    )
}

export default GameSearchDisplay;