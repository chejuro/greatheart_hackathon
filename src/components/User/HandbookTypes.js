import React, {Component} from 'react';
import {Card} from "reactstrap";
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

    onListClick = (handbookId) => {
        console.log(`handbookId: ${handbookId}`)
        this.props.history.push({
          pathname: '/handbook/type',
          state: { handbookId: handbookId }
        })
      }

    render() {
        let content = this.state.data.map((handbook, index) => {
            return (
              <li key={index}>
                <div>
                    <ListGroupItem tag="a" handbookId={handbook} href='/handbook'>{handbook.description}</ListGroupItem>
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