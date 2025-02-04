import React from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

import { reqRoutes } from './../../requests';
import { logout, getAuth } from './../../services/auth';
import DeleteModal from '../../components/deleteModal';
import PromoCard from '../../components/promoCard';
import WinnerModal from '../../components/winnerModal';

class Promos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promos: [],
            isModalOpen: false,
            isWinnerModalOpen: false,
            willDelete: null,
            winner: {name: ''},
        }
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deletePromo = this.deletePromo.bind(this);
        this.endSession = this.endSession.bind(this);
        this.getWinner = this.getWinner.bind(this);
    }

    openDeleteModal(clientToDelete) {
        this.setState({
            willDelete: clientToDelete,
            isModalOpen: true,
        })
    }

    closeModal() {
        this.setState({
            isModalOpen: false,
            isWinnerModalOpen: false,
        })
    }

    getWinner(promoId) {
        console.log(promoId);
        axios.post(reqRoutes.winner,
            {promo: promoId},
            { headers: getAuth() }
        )
            .then(response => {
                this.setState({
                winner: response.data.winner,
                isWinnerModalOpen: true,
            })
        })
    }

    deletePromo() {
        axios.delete(
            `${reqRoutes.promo}/${this.state.willDelete}`,
            {
                headers: getAuth()
            }
        )
            .then(response => {
                this.componentDidMount();
            })
            .catch(err => {
                alert(err);
            })
        this.closeModal();
    }

    componentDidMount() {
        axios.get(reqRoutes.promo, {
            headers: getAuth()
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    promos: response.data,
                })
            })
            .catch(err => {
                alert(err);
            });
    }

    endSession() {
        logout();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className='container'>
                <div
                    className='text-center'
                    style={{
                        marginTop: '15px',
                    }}
                >
                    <h1 className='display-4'>Promoções Cadastradas</h1>
                    <Link
                        className='btn btn-primary'
                        to='/new_promo'
                        style={{margin: '5px'}}
                    >
                        Nova Promoção
                    </Link>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={this.endSession}
                        style={{margin: '5px'}}
                    >
                        Logout
                    </button>
                </div>
                <div className=''>
                    {this.state.promos.map((client, i) => 
                        <PromoCard
                            key={`client ${i}`}
                            client={client}
                            openModal={this.openDeleteModal}
                            getWinner={this.getWinner}
                        />
                    )}
                </div>
                <DeleteModal
                    show={this.state.isModalOpen}
                    close={this.closeModal}
                    delete={this.deletePromo}
                />
                <WinnerModal
                    show={this.state.isWinnerModalOpen}
                    close={this.closeModal}
                    winner={this.state.winner}
                />
            </div>
        )
    }
}

export default withRouter(Promos);