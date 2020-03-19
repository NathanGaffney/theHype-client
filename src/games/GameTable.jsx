import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import './GameTable.css';
import APIURL from '../helpers/environment';
import DescPacker from './DescPacker';
import CommunityHype from './CommunityHype';



const GameTable = (props) => {
    const [descBox, setDescBox] = useState(false) // this state is for toggling the description modal
    
    
    
    
    
    const [comHypeBox, setComHypeBox] = useState(false)
    const [hypeToBeChanged, setHypeToBeChanged] = useState('')




    // this is for when you add a game from the community listing
    // this prompts you to choose your hype rating
    const changeHype = (com) => { 
        setHypeToBeChanged(com) 
        setComHypeBox(true)
        console.log(com)
    }
    
    const comHypeBoxOn = () => { setComHypeBox(true) }
    const comHypeBoxOff = () => { setComHypeBox(false) }

    
    // for deleting user games
    const deleteGame = (game) => {
        fetch(`${APIURL}/game/remove/${game.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(() => props.fetchGames())
    }
    


    

    // this takes users game array and maps it for display
    const gameMapper = () => {
        return props.games.map((game, index) => {
            return (
                
                <tr key={index}>
                    {/* <th scope='row'>{game.userId}</th> */}
                    <td>{game.title}</td>
                    <td>{game.hypeRating}</td>
                    {/*this button is for viewing the description*/}
                    {/*props.packTitle and desc are functions send here by index to set the state variable that is then sent to the Description modal which is also in index */}
                    <td><Button onClick={() => { props.packTitle(game.title); props.packDescription(game.description); props.descOn() }}>View</Button></td>
                    <td>{game.releaseDate}</td>
                    <td>{game.platform}</td>
                    <td className='td-buttons'>
                        <Button color='success' onClick={() => console.log('under construction this will display the countDown timer')}>Timer</Button>
                        {/**asdf */}
                        <Button color='info' onClick={() => { props.editUpdateGame(game); props.updateOn() }}>Edit</Button> {/*Look into how game is getting fed to this component via props. then comment where for future reference */}
                        <Button color='danger' onClick={() => { deleteGame(game) }}>X</Button>

                    </td>
                </tr>
            )
        })
    }
    
    
    // this takes all database games array and maps them for display
    const communityMapper = () => {
        return props.communityGames.map((comGames, index) => {

            // this addGame object packs up the mapped community game you click on bellow and allows us to just call the object name in our 'PUT' to our data base when adding a community game

            const comGame = {
                title: comGames.title,
                hypeRating: comGames.hypeRating,
                description: comGames.description,
                releaseDate: comGames.releaseDate,
                platform: comGames.platform
            }

            return (
                <tr key={index}>
                    {/* <th scope='row'>{comGames.id}</th> */}
                    <td>{comGames.username}</td>
                    <td>{comGames.title}</td>
                    <td>{comGames.hypeRating}</td>
                    {/*props.packTitle and desc are functions send here by index to set the state variable that is then sent to the Description modal which is also in index */}
                    <td><Button onClick={() => { props.packTitle(comGames.title); props.packDescription(comGames.description); props.descOn() }}>View</Button></td>
                    <td>{comGames.releaseDate}</td>
                    <td>{comGames.platform}</td>
                    <td>
                        {/*the button for adding a community game*/}
                        <Button color='success' onClick={() => changeHype(comGame)}>Add</Button>
                    </td>
                </tr>
            )
        })
    }



    //this function fires the DescPacker component that packs up the long description
    const displayDesc = (desc) => {
        console.log('CLICKED ')
        if (descBox === false) {
            return(
            console.log(`INSIDE FUNC: `),
            // setDescBox(true),
            <DescPacker descBox={descBox} desc={desc} />,
            console.log(`PAST SETSTATE: `, descBox)       
            )} else {
            return console.log(descBox)
        }
    }

    // this sets the table headers if user games are found in the array prop pass to this table component ---does not show username
    const tableHeader = () => {
        if (props.games.length === 0) {
            return (
                <></>
            )
        } else {
            // setHead('Watch List')
            return (
                <>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Hype Rating</th>
                            <th>Description</th>
                            <th>Release Date</th>
                            <th>Platform</th>
                        </tr>
                    </thead>
                </>
            )
        }
    }

    // this sets the table headers is all games are found in the array prop pass to this table component ---shows username of each listing
    const tableHeader2 = () => {
        if (props.communityGames.length === 0) {
            return (
                <></>
            )
        } else {
            // setHead('Community')
            return (
                <>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Title</th>
                            <th>Hype Rating</th>
                            <th>Description</th>
                            <th>Release Date</th>
                            <th>Platform</th>
                        </tr>
                    </thead>
                </>
            )
        }
    }

    // this is the header switch that changes the H3 from watch list to community to '' if no array is found
    const headerSwitch = () => {
        if (props.noHeader) {
            return ('')
        } else if (props.header === true && props.games.length === 0) {
            return (
                <>
                    <h1>Here is where you will find your games!</h1>
                    <h4>Try Searching for a game by clicking the Find Game Button!</h4>
                </>
            )
        } else if (props.header === true) {
            return (<h3>Watch List</h3>)
        } else {
            return (<h3>Community</h3>)

        }
    }

    return (
        <>
            {headerSwitch()} {/*Was able to use the single ternary but when i introduced the feature that depopluate the two tables, i need a way for the header for use/community to go away.*/}
            {/* <h3>{props.header ? 'Watch List' : 'Community'}</h3> */}

            {comHypeBox ? <CommunityHype token={props.token} hypeToBeChanged={hypeToBeChanged} comHypeBoxOff={comHypeBoxOff} /> : null}

            <div className='table-wrapper'>
            
                <Table dark striped hover>
                    {tableHeader()}
                    {tableHeader2()}
                    <tbody>
                        {gameMapper()}
                        {communityMapper()}
                    </tbody>
                    {/* <tbody>
                        {communityMapper()}
                    </tbody> */}
                </Table>
            </div>
        </>
    )
}

export default GameTable;