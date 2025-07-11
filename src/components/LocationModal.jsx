import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const LocationModal = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Using Your Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                We&apos;re accessing your current location.
                <br />
                {/* <small className="text-muted">Latitude: {coordinates.lat}, Longitude: {coordinates.lng}</small> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>
                    Okay
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LocationModal
