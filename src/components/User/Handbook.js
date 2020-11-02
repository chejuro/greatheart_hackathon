import React, {Component} from 'react';
import {Card} from "reactstrap";
import Table from './Table'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'

class Handbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            id: '',
            data: {}
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        console.log(this.state.modal)
    }

    render() {
        return (
            <div className="container-fluid">
                <h3 className="blackHeader">Справочник сотрудников</h3>
                <Card>
                    <Table workers={this.props.worker_data}></Table>
                    {/* <button className="btn__req" onClick={this.toggle}>Добавить сотрудника</button> */}
                </Card>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader  toggle={this.toggle}><h5 className="blackHeader">Добавление сотрудника</h5></ModalHeader>
                    <ModalBody>
                        <Form
                            name={"edit"}
                            onSubmit={this.onSubmit}
                            render={({ handleSubmit}) => (
                                <form id="editForm" onSubmit={handleSubmit} style={{ padding: 15 }}>
                                    <Field
                                        className="field1"
                                        name={"fullName"}
                                        type="text"
                                        component="input"
                                        placeholder="Введите ФИО сотрудника"

                                    />
                                    <Field
                                        className="field2"
                                        name={"email"}
                                        type="email"
                                        component="input"
                                        placeholder="Введите почту сотрудника"
                                    />
                                    <Field
                                        className="field3"
                                        name={"func"}
                                        type="text"
                                        component="input"
                                        placeholder="Введите должность сотрудника"
                                    />
                                </form>
                            )}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn__req"
                                // onClick={() =>
                            // this.props.worker_data.push(this.state.textvalue)
                        >Сохранить</button>
                        <button className="btn__signin"   onClick={this.toggle}>Отмена</button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}
Handbook.defaultProps = {worker_data: [
        {id: 1, name: 'Владимир Маскимович Шестаков', birthday: '01-01-2000', city: 'Москва', phone: '89997776655', workplace: 'HSE', function: 'менеджер', fond_function: 'волонтер'},
        {id: 2, name: 'Иванов Иван Иванович', birthday: '01-01-2000', city: 'Москва', phone: '89997776655', workplace: 'HSE', function: 'менеджер', fond_function: 'волонтер'},
    ]}
export default Handbook;