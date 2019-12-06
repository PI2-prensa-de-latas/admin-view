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
    }

    submitForm = async function (values) {
        try {
            const response = await axios.post(
                reqRoutes.client,
                values,
                {headers: getAuth()}
            )
            console.log(response);
            return true;
        } catch {
            alert("Não foi possível cadastrar o usuário");
            return false;
        }
    }

    render () {
        return (
            <div className='container text-center'>
                <div
                    className='text-center'
                    style={{
                        marginTop: '15px',
                    }}
                >
                    <h1 className='display-4'>Nova Promoção</h1>                    
                </div>
                <PromoForm onSubmit={this.submitForm}/>
            </div>
        )
    }
}

export default withRouter(newPromo)