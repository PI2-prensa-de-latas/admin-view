import React from 'react'
import { MdModeEdit } from 'react-icons/md';
import { FaTrash, FaTrophy } from 'react-icons/fa';
import { withRouter, Link } from 'react-router-dom';

import styles from './styles';

class PromoCard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    } 

    render() {
        let client = this.props.client;
        
        return (
            <div 
                className='card'
                style={styles.title}
            >
                <div className='card-header justify-content-between'>
                    <span style={styles.cardTitle}>
                        {client.name}
                    </span>
                    <button
                        type='button'
                        className='btn btn-danger'
                        style={styles.button}
                        onClick={() => this.props.openModal(client.id)}
                    >
                        <FaTrash
                            style={{
                                margin: '-4px -0.5px 0 0'
                            }}
                        />
                    </button>
                    <Link
                        className='btn btn-primary'
                        style={styles.button}
                        to={{
                            pathname: '/edit_promo',
                            state: {client}
                        }}
                    >
                        <MdModeEdit
                            style={{
                                marginTop: '-4px'
                            }}
                        />
                    </Link>
                    <button
                        className='btn btn-success'
                        style={styles.button}
                        onClick={() => this.props.getWinner(client.id)}
                    >
                        <FaTrophy
                            style={{
                                marginTop: '-4px'
                            }}
                        />
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(PromoCard)