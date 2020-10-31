import React, {Component} from 'react';
import {Card, CardBody, CardImg, Col, Row} from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            data: {}
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        console.log(this.state.modal)
    }

    onSubmit(values) {
        
    }

    render() {
        return (
                <div className="container-fluid">
                    <h3 className="blackHeader">Профиль</h3>
                    <Card>
                        <CardBody>
                        <div className="row justify-content-around">
                            <div className="col-lg-4">
                                <button id="btn_req" name="btn_req" className="btn__req" onClick={this.toggle}>Редактировать</button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                    <ModalHeader  toggle={this.toggle}><h5 className="blackHeader">Редактирование профиля</h5></ModalHeader>
                                    <ModalBody>
                                        <Form
                                            name={"edit"}
                                            onSubmit={this.onSubmit}
                                            initialValues={this.state.data}
                                            render={({ handleSubmit}) => (
                                                <form id="editForm" onSubmit={handleSubmit} style={{ padding: 15 }}>
                                                    <Field
                                                        className="field1"
                                                        name={"companyName"}
                                                        type="text"
                                                        component="input"
                                                        placeholder="Название компании"
                                                        
                                                    />
                                                    <Field
                                                        className="field1"
                                                        name={"fullName"}
                                                        type="text"
                                                        component="input"
                                                        placeholder="ФИО"
                                                    />
                                                    <Field
                                                        className="field1"
                                                        name={"post"}
                                                        type="text"
                                                        component="input"
                                                        placeholder="Должность"
                                                    />
                                                    <Field
                                                        className="field1"
                                                        name={"email"}
                                                        type="email"
                                                        component="input"
                                                        placeholder="Электронная почта"
                                                    />
                                                </form>
                                            )}
                                            />
                                    </ModalBody>
                                    <ModalFooter>
                                        <button className="btn__req" onClick={() =>
                                                document
                                                .getElementById("editForm")
                                                .dispatchEvent(new Event("submit", { cancelable: true }))
                                            }>Сохранить</button>
                                        <button className="btn__signin"   onClick={this.toggle}>Отмена</button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                            <div className="col-lg-6">
                                <p className="userinfo"><b>Название компании:</b> {this.state.data.companyName}</p>
                                <p className="userinfo"><b>Имя сотрудника:</b> {this.state.data.fullName}</p>
                                <p className="userinfo"><b>Должность сотрудника:</b> {this.state.data.post}</p>
                                <p className="userinfo"><b>Электронная почта:</b> {this.state.data.email}</p>
                                <p className="userinfo"><b>Отрасль компании:</b> {this.props.sphere}</p>
                            </div>
                        </div>
                        </CardBody>
                    </Card>
                </div>
        );
    }
}

export default UserInfo;