import React, {Component}  from 'react';
import { withRouter } from 'react-router-dom';

import './../../css/User.css';
import './../../App.css';


class UserMenuPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false
        };
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggle() {
        this.setState({
            
        });
    }

    logout() {

    }

    render() {
        return (
            <div>
                <div className="sticky-top menu__user">
                        <nav className="d-flex justify-content-end">
                          <ul className="umenu d-flex ">
                             <li className="menu__item" onClick={this.logout}><a href="/"><i className="fa fa-fw fa-sign-out iconhref" style={{ fontSize: '1.3em', color: 'white' }} /></a></li>
                          </ul>
                        </nav>
                </div>
            </div>
        );
    }
}
export default withRouter(UserMenuPanel);