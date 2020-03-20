import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import './GameTable.css';
import APIURL from '../helpers/environment';
import DescPacker from './DescPacker';
import CommunityHype from './CommunityHype';
import CountDownTimer from './CountDownTimer';

//material ui stuff
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TimerIcon from '@material-ui/icons/Timer';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import DescriptionIcon from '@material-ui/icons/Description';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

const GameTable = (props) => {

    const [descBox, setDescBox] = useState(false); // this state is for toggling the description modal
    const [comHypeBox, setComHypeBox] = useState(false); // this is for toggling the modal to edit the hype rating
    const [hypeToBeChanged, setHypeToBeChanged] = useState(''); // this takes the mapped community games
    const [countBox, setCountBox] = useState(false);
    const [dateForCount, setDateForCount] = useState('')

    // this is for when you add a game from the community listing
    // this prompts you to choose your hype rating by turning on the comHypeBox modal
    const changeHype = (com) => {
        setHypeToBeChanged(com)
        setComHypeBox(true)
        console.log(com)
    }

    //sends the users mapped release date to the countDownTime modal
    const countBoxOn = () => { setCountBox(true) }
    const countBoxOff = () => { setCountBox(false) }
    
    // these are for turning the hype edit modal on and off
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
    
    const useStyles = makeStyles(theme => ({
        root: {
            '& > span': {
                margin: theme.spacing(2),
            },
        },
    }));
    
    const classes = useStyles();
    
    const datePack = (d) => {setDateForCount(d); setCountBox(true); console.log(d) }

    // this takes users game array and maps it for display
    const gameMapper = () => {
        return props.games.map((game, index) => {
            return (
                <tr key={index}>
                    {/* <th scope='row'>{game.userId}</th> */}
                    <td>{game.title}</td>
                    <td>{game.hypeRating}</td>
                    <td>{game.platform}</td>
                    <td>{game.releaseDate}</td>
                    {/*this button is for viewing the description*/}
                    {/*props.packTitle and desc are functions send here by index to set the state variable that is then sent to the Description modal which is also in index */}
                    <td><DescriptionIcon style={{ fontSize: 30, color: blue[200]}} onClick={() => { props.packTitle(game.title); props.packDescription(game.description); props.packUrl(game.url); props.descOn() }}>View</DescriptionIcon></td>
                    <td className={classes.root}>
                        <TimerIcon style={{  fontSize: 35, color: blue[200] }} onClick={() => datePack(game)}>Timer</TimerIcon>
                        <EditIcon style={{ fontSize: 30, color: blue[200] }} onClick={() => { props.editUpdateGame(game); props.updateOn() }}>Edit</EditIcon> {/*Look into how game is getting fed to this component via props. then comment where for future reference */}
                        <DeleteIcon style={{ marginLeft: 10, fontSize: 30, color: red[400] }} onClick={() => { deleteGame(game) }}>X</DeleteIcon>
                    </td>

                </tr>
            )
        })
    }

    // this takes all database games array and maps them for display
    const communityMapper = () => {
        return props.communityGames.map((comGames, index) => {
            
            // this comGame object packs up the mapped community game and sends it to our changeHype function
            const comGame = {
                title: comGames.title,
                hypeRating: comGames.hypeRating,
                description: comGames.description,
                releaseDate: comGames.releaseDate,
                platform: comGames.platform,
                url: comGames.url
            }

            return (
                <tr key={index}>
                    {/* <th scope='row'>{comGames.id}</th> */}
                    <td>{comGames.username}</td>
                    <td>{comGames.title}</td>
                    <td>{comGames.hypeRating}</td>
                    <td>{comGames.platform}</td>
                    <td>{comGames.releaseDate}</td>
                    {/*props.packTitle and desc are functions send here by index to set the state variable that is then sent to the Description modal which is also in index */}
                    <td><DescriptionIcon style={{ fontSize: 30, color: blue[200] }} onClick={() => { props.packTitle(comGames.title); props.packDescription(comGames.description); props.packUrl(comGames.url); props.descOn() }}>View</DescriptionIcon></td>
                    <td>
                        {/*the button for adding a community game*/}
                        <LibraryAddIcon style={{ fontSize: 30, color: green[300] }} onClick={() => changeHype(comGame)}>Add</LibraryAddIcon>
                    </td>
                </tr>
            )
        })
    }

    

    //this function fires the DescPacker component that packs up the long description
    // const displayDesc = (desc) => {
    //     console.log('CLICKED ')
    //     if (descBox === false) {
    //         return (
    //             console.log(`INSIDE FUNC: `),
    //             // setDescBox(true),
    //             <DescPacker descBox={descBox} desc={desc} />,
    //             console.log(`PAST SETSTATE: `, descBox)
    //         )
    //     } else {
    //         return console.log(descBox)
    //     }
    // }

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
                            <th>Platform</th>
                            <th>Release Date</th>
                            <th>Desc.</th>
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
                            <th>Platform</th>
                            <th>Release Date</th>
                            <th>Desc.</th>
                            <th>Add</th>
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

            {/*CommunityHype takes the newly mapped communtiy games and send them here to have you edit the hype on the modal and save them to your list*/}

            {countBox ? <CountDownTimer dateForCount={dateForCount} countBoxOff={countBoxOff} /> : null}
            {comHypeBox ? <CommunityHype token={props.token} hypeToBeChanged={hypeToBeChanged} comHypeBoxOff={comHypeBoxOff} /> : null}

            <div className='table-wrapper'>
                <Table dark striped hover>
                    {tableHeader()}
                    {tableHeader2()}
                    <tbody>
                        {gameMapper()}
                        {communityMapper()}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default GameTable;