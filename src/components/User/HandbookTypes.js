import React, {Component} from 'react';
import { Card, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { NavLink } from 'react-router-dom';
import { getHandbookTypes, addEntityType } from '../../utils/UtilsAPI'
import { ListGroup, ListGroupItem } from 'reactstrap';


class HandbookTypes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modal: false,
        };
        
        this.create_handbook = this.create_handbook.bind(this);
    }

    componentDidMount() {
        getHandbookTypes()
            .then(response => {
                this.setState({
                    data: response,
            })
            console.log(this.state.data);
        });
    }

    create_handbook = () => {
        this.props.history.push({
            pathname: "/handbook_create"
        })
    }

    render() {
        let content = this.state.data.map((handbook, index) => {
            return (
              <li key={index}>
                <div>
                    <NavLink to={{
                        pathname: "/handbook", 
                        search: `id=${handbook.id}`,
                        state: { entity: handbook.name }
                        }}><ListGroupItem tag="a">{handbook.name}</ListGroupItem></NavLink>
                </div>
              </li>
            );
        });
        return (
            <div className="container-fluid">
                <h3 className="blackHeader">Справочники</h3>
                <Card>
                    <ListGroup flush>
                        <ul>{content}</ul>
                    </ListGroup>
                    <button id="btn_req" name="btn_req" className="btn__req" onClick={this.create_handbook}>Создать справочник</button>
                </Card>
            </div>
        );
    }
}
export default HandbookTypes;