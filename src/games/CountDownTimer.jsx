import React, { useState, useEffect } from 'react';
import {
    Label, Input, Container, Row, Col, Button,
    Modal, ModalHeader, ModalBody, FormGroup, Form
} from 'reactstrap';

import { timeConverter } from '../gamesearch/TimeConversion';
import { compareDate } from '../gamesearch/TimeConversion';

const CountDownTimer = (props) => {

    const [datetime, setDateTime] = useState();
   
    const delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const timer = async () =>{
       await delay(1000);
        setDateTime(compareDate(props.dateForCount.releaseDate))
    };

    useEffect(() => {
        timer()
    }, [ datetime ])
    
    console.log('new datetime', datetime)
    
    return (
        <>
            <Modal isOpen={true}>
                <ModalHeader toggle={() => props.countBoxOff()}>{props.dateForCount.title}</ModalHeader>
                <ModalBody>
                    <h3>Countdown To Release:</h3>
                    <h2>{datetime}</h2>
                </ModalBody>
            </Modal>
        </>

    )
}

export default CountDownTimer;