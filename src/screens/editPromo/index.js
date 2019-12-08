import React from 'react';
import axios from 'axios';
import PromoForm from '../../components/promoForm';
import { withRouter } from 'react-router-dom';
import { reqRoutes } from '../../requests';
import { getAuth } from '../../services/auth';

class newPromo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm = async function (values) {
        console.log(getAuth());
        console.log(values);
        try {
            const response = await axios.patch(
                `${reqRoutes.promo}/${this.props.location.state.client.id}`,
                {
                    headers: getAuth(),
                    data: values,
                }
            )
            console.log(response);
            return true;
        } catch {
            alert("Não foi possível atualizar o usuário");
            return false;
        }
    }

    render() {
        return (
            <div className='container text-center'>
                <div
                    className='text-center'
                    style={{
                        marginTop: '15px',
                    }}
                >
                    <h1 className='display-4'>Editar Promoção</h1>
                </div>
                <PromoForm
                    initialValues={this.props.location.state.client}
                    onSubmit={this.submitForm}
                />
            </div>
        )
    }
}

export default withRouter(newPromo)