import React, {Component} from 'react';
import {Card} from "reactstrap";
import { Router, Route, NavLink, HashRouter, Link } from 'react-router-dom';
import { getHandbookTypes } from '../../utils/UtilsAPI'
import { ListGroup, ListGroupItem } from 'reactstrap';


class HandbookTypes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
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

    render() {
        let content = this.state.data.map((handbook, index) => {
            console.log(handbook.name)
            return (
              <li key={index}>
                <div>
                    <NavLink to={{
                        pathname: "/handbook", 
                        state: { entity: handbook.name }
                        }}><ListGroupItem tag="a">{handbook.description}</ListGroupItem></NavLink>
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
                </Card>
            </div>
        );
    }
}
export default HandbookTypes;