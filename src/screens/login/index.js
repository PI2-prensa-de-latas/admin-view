import React from 'react';
import axios from 'axios';
import { api, reqRoutes } from './../../requests';
import { withRouter } from 'react-router-dom'; 
import { login } from './../../services/auth';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const field = event.target.name;

        this.setState({
            [field]: value,
        })
    }

    handleSubmit = async function(event) {
        axios.post(reqRoutes.login, this.state)
            .then(response => {
                console.log(response);
                login(response.data.token)
                this.props.history.push('/promos');
            })
            .catch(err => {
                console.log(err);
                alert(err)
            });
        // api.post(
        //     reqRoutes.login,
        //     this.state,
        // )
        event.preventDefault();
    }

    render() {
        return (
            <div
                className="row text-center align-items-center justify-content-center"
                style={{
                    width: '100vw',
                    height: '100vh',
                    margin: 0,
                }}
            >
                <div className="col-sm-8 col-11 my-auto">
                    <h1 className="bd-title">
                        Cadastro de Promoção
                    </h1>
                    <div className="card">
                        <div className="card-header">
                            <h2>Entre para continuar</h2>
                        </div>
                        <div className="card-body text-left">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>E-mail</label>
                                    <input
                                        name="email"
                                        className="form-control"
                                        placeholder="Inserir email de usuário"
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Senha</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Inserir nome de usuário"
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Entrar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginScreen);