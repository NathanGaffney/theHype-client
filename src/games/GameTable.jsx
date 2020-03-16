import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import './GameTable.css';

// for deleting user games
const GameTable = (props) => {
    const deleteGame = (game) => {
        fetch(`http://localhost:3001/game/remove/${game.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(() => props.fetchGames())
    }

    // this adds a game from the community to the users list
    const handleSubmit = (comGame) => {
        fetch('http://localhost:3001/game/create', {
            method: 'POST',
            body: JSON.stringify(comGame),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((gameData) => {
            })
    }

    // this takes users game array and maps it for display
    const gameMapper = () => {
        return props.games.map((game, index) => {
            return (
                <tr key={index}>
                    {/* <th scope='row'>{game.userId}</th> */}
                    <td>{game.title}</td>
                    <td>{game.hypeRating}</td>
                    <td className='desc-wrap'>{game.description}</td>
                    <td>{game.releaseDate}</td>
                    <td>{game.platform}</td>
                    <td>
                        <Button color='info' onClick={() => { props.editUpdateGame(game); props.updateOn() }}>Edit</Button> {/*Look into how game is getting fed to this component via props. then comment where for future reference */}
                        <Button color='danger' onClick={() => { deleteGame(game) }}>Remove</Button>
                    </td>
                </tr>
            )
        })
    }

    // this takes all database games array and maps them for display
    const communityMapper = () => {
        return props.communityGames.map((comGames, index) => {

            const addGame = {
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
                    <td>{comGames.description}</td>
                    <td>{comGames.releaseDate}</td>
                    <td>{comGames.platform}</td>
                    <td>
                        <Button color='success' onClick={() => handleSubmit(addGame)}>Add</Button>
                    </td>
                </tr>
            )
        })
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
            <div className='table-wrapper'>
                <Table dark striped hover>
                    {tableHeader()}
                    {tableHeader2()}
                    <tbody>
                        {gameMapper()}
                    </tbody>
                    <tbody>
                        {communityMapper()}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default GameTable;