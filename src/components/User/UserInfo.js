import React, {Component} from 'react';
import {Card, CardBody, CardImg, Col, Row} from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import { getProfile } from '../../utils/UtilsAPI'
import inMemoryJWT from './../../utils/inMemoryJWT';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            data: {},
            info : [],
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        console.log(query.get('id'))
        getProfile(inMemoryJWT.getLogin()).then(response => {
            let infos = []

            for (var key in response.body.json) {
                if (response.body.json[key].id == null) {
                    let el = {
                        name : key,
                        value : response.body.json[key]
                    };
                    infos.push(el);
                }
            }
            this.setState({
                info : infos,
            });
            console.log(this.state);
        });
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
                            <div className="col-lg-6">
                                {this.state.info.map(element => 
                                    <p className="userinfo"><b>{element.name} : </b> {element.value}</p>
                                )}
                            </div>
                        </div>
                        </CardBody>
                    </Card>
                </div>
        );
    }
}

export default UserInfo;