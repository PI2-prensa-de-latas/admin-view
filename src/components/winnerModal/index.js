import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default class WinnerModal extends React.Component {

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Quem ganhou foi...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {this.props.winner.name || null}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.props.close}
                    >
                        Ok
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }
}