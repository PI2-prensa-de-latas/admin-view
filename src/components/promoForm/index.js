import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { FaTrash } from 'react-icons/fa';
import ValidationSchema from './validationSchema';
import { Link, withRouter } from 'react-router-dom';
import DateTimePicker from './datePicker';
import { reqRoutes } from './../../requests';
import { getAuth } from './../../services/auth';

class PromoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            machines: [],
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.setState({
            msg: 'qualquer coisa',
        })

        function getCategories() {
            return axios.get(reqRoutes.categories, {
                headers: getAuth()
            })
        }

        function getMachines() {
            return axios.get(reqRoutes.machines, {
                headers: getAuth()
            })
        }

        axios.all([getCategories(), getMachines()])
            .then(axios.spread((categories, machines) => {
                this.setState({
                    categories: categories.data,
                    machines: machines.data
                })
            }));
    }

    render() {
        let initialValues = {
            name: '',
            description: '',
            imgLink: '',
            init_date: null,
            end_date: null,
            machines: [],
            canCategories: [],
        }

        if (this.props.initialValues) {
            initialValues = { ...this.props.initialValues};
            initialValues.init_date = new Date(this.props.initialValues.init_date * 1000);
            initialValues.end_date = new Date(this.props.initialValues.end_date * 1000);
            initialValues.imgLink = this.props.initialValues.imageUri;
            initialValues.canCategories = this.props.initialValues.canCategory;
        }

        return (
            <Formik
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    values.init_date = + new Date(values.init_date);
                    values.end_date = + new Date(values.end_date);
                    let success = await this.props.onSubmit(values);
                    if (success) {
                        console.log(this.props.history);
                        this.props.history.push('/client');
                    }
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    setFieldValue
                }) => (
                        <Form className='container text-left'>
                            <div className='form-group'>
                                <label htmlFor='name'>Nome</label>
                                <Field
                                    name='name'
                                    placeholder='Sorteio do Prêmio!'
                                    className={`form-control ${
                                        touched.name && errors.name ? "is-invalid" : ""
                                    }`}
                                />
                                <ErrorMessage
                                    component='div'
                                    name='name'
                                    className='invalid-feedback'
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='description'>Descrição</label>
                                <Field
                                    name='description'
                                    as='textarea'
                                    placeholder='Aqui você conta os detalhes da promoção'
                                    className={`form-control ${
                                        touched.description && errors.description ? "is-invalid" : ""
                                    }`}
                                />  
                                <ErrorMessage
                                    component='div'
                                    name='email'
                                    className='invalid-feedback'
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='imgLink'>Link da Imagem</label>
                                <Field
                                    name='imgLink'
                                    placeholder='Uma URL válida'
                                    className={`form-control ${
                                        touched.imgLink && errors.imgLink ? "is-invalid" : ""
                                    }`}
                                />
                                <ErrorMessage
                                    component='div'
                                    name='imgLink'
                                    className='invalid-feedback'
                                />
                            </div>

                            <div className='form-group'>
                                <label
                                    htmlFor='init_date'
                                    style={{margin: '0 10px 0 0'}}
                                >
                                    Data de Início da Promoção:
                                </label>
                                <DateTimePicker
                                    className='form-control'
                                    name='init_date'
                                    value={values.init_date}
                                    onChange={setFieldValue}
                                />
                            </div>

                            <div className='form-group'>
                                <label
                                    htmlFor='end_date'
                                    style={{margin: '0 10px 0 0'}}
                                >
                                    Data de Término da Promoção:
                                </label>
                                <DateTimePicker
                                    className='form-control'
                                    name='end_date'
                                    value={values.end_date}
                                    onChange={setFieldValue}
                                />
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <div className='card'>
                                        <div className='card-header text-center'>
                                            <span>Máquinas Participantes</span>
                                        </div>
                                        <div className='card-body text-center'>
                                            <FieldArray
                                                name="machines"
                                                render={(arrayHelpers) => (
                                                    <>
                                                        {values.machines.map((address, index) => {

                                                            return (
                                                                <div
                                                                    key={`machine.${index}`}
                                                                    className='text-left'
                                                                    style={{
                                                                        marginTop: '14px',
                                                                        marginBottom: '14px',
                                                                    }}
                                                                >

                                                                    <div className=''>
                                                                        <button
                                                                            type='button'
                                                                            className='btn btn-danger d-inline'
                                                                            style={{
                                                                                height: '25px',
                                                                                padding: 0,
                                                                                width: '25px',
                                                                                float: 'left',
                                                                                margin: '6px 10px 0px 0px',
                                                                            }}
                                                                            onClick={() => arrayHelpers.remove(index)}
                                                                        >
                                                                            <FaTrash
                                                                                style={{
                                                                                    margin: '-4px -0.5px 0 0'
                                                                                }}
                                                                            />
                                                                        </button>
                                                                        
                                                                        <div className='form-group d-flex'>
                                                                            <Field
                                                                                name={`machines.${index}`}
                                                                                as='select'
                                                                                className={`form-control`}
                                                                            >
                                                                                {this.state.machines.map(machine => (
                                                                                    <option
                                                                                        key={`machine${machine.id}`}
                                                                                        value={machine.id}
                                                                                    >
                                                                                        {machine.alias}
                                                                                    </option>
                                                                                ))}
                                                                            </Field>
                                                                        </div>
                                                                    </div>
                                                                </div>)
                                                        })}
                                                        <button
                                                            type='button'
                                                            className='btn btn-success'
                                                            onClick={() => arrayHelpers.push(this.state.machines[0].id)}
                                                        >
                                                            Adicionar Máquina
                                                        </button>
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className='col'>
                                    <div className='card'>
                                        <div className='card-header text-center'>
                                            <span>Categorias Participantes</span>
                                        </div>
                                        <div className='card-body text-center'>
                                            <FieldArray
                                                name="canCategories"
                                                render={(arrayHelpers) => (
                                                    <>
                                                        {values.canCategories.map((address, index) => {

                                                            return (
                                                                <div
                                                                    key={`machine.${index}`}
                                                                    className='text-left'
                                                                    style={{
                                                                        marginTop: '14px',
                                                                        marginBottom: '14px',
                                                                    }}
                                                                >

                                                                    <div className=''>
                                                                        <button
                                                                            type='button'
                                                                            className='btn btn-danger d-inline'
                                                                            style={{
                                                                                height: '25px',
                                                                                padding: 0,
                                                                                width: '25px',
                                                                                float: 'left',
                                                                                margin: '6px 10px 0px 0px',
                                                                            }}
                                                                            onClick={() => arrayHelpers.remove(index)}
                                                                        >
                                                                            <FaTrash
                                                                                style={{
                                                                                    margin: '-4px -0.5px 0 0'
                                                                                }}
                                                                            />
                                                                        </button>    
                                                                        
                                                                        <div className='form-group d-flex'>
                                                                            <Field
                                                                                name={`canCategories.${index}`}
                                                                                as='select'
                                                                                className={`form-control`}
                                                                            >
                                                                                {this.state.categories.map(category => (
                                                                                    <option
                                                                                        key={`cat${category.id}`}
                                                                                        value={category.id}
                                                                                    >
                                                                                        {category.trademark}
                                                                                    </option>
                                                                                ))}
                                                                            </Field>
                                                                        </div>
                                                                    </div>
                                                                </div>)
                                                        })}
                                                        <button
                                                            type='button'
                                                            className='btn btn-success'
                                                            onClick={() => arrayHelpers.push(this.state.categories[0].id)}
                                                        >
                                                            Adicionar Categoria
                                                        </button>
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ margin: '20px 0 30px 0' }}>
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    disabled={isSubmitting}
                                    style={{
                                        float: 'right',
                                        width: '100px',
                                    }}
                                >
                                    {isSubmitting ?
                                        "Enviando..."
                                        :
                                        "Enviar"
                                    }
                                </button>
                                <Link
                                    className='btn btn-secondary'
                                    to='/client'
                                    style={{
                                        float: 'left',
                                    }}
                                >
                                    Voltar
                                </Link>
                            </div>

                        </Form>
                    )}
            </Formik>
        )
    }
}

export default withRouter(PromoForm);