import React, { useState } from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

const DescPacker = (props) => {

    // props.titleToPack and props.descToPack are sent here from GameIndex
    return (
        <>
            <Modal isOpen={true}>
                <ModalHeader toggle={() => props.descOff()}>{props.titleToPack}</ModalHeader>
                <ModalBody>

                    <Row>
                        <Col sm='3'>
                            <img src={props.urlToPack} />
                        </Col>
                        <Col sm='9'>
                            <h4>Description:</h4>
                            <p>{props.descToPack}</p>

                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    )

}

export default DescPacker;