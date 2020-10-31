import React, {Component} from 'react';
import { Router, Route, NavLink, HashRouter, Link } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import UserMenuPanel from './UserMenuPanel';
import NavBar from './../NavBar';
import UserInfo from './UserInfo';
import styled from 'styled-components';
import './../../App.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const MyLink = styled.p`
    color: ${props => (props.expanded ? "white" : "black")};
    
`;
const Main = styled.main`
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;


class User extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        expanded: false,
    };

    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    render() {
        const { expanded } = this.state;
        const header =
            <header id="header" className="header sticky-top">
                <div className="container-fluid" >
                    <NavBar buttons = {{ hash: true, user: false, data: [{url: "#login", text: "Войти"}, {url: "#about_us", text: "О нас"}]} }/>
                </div>
            </header> ;
        const loggedMain =
            <Main className="content" expanded={this.state.expanded}>
                {header}
                <Route path="/" exact component={UserInfo} />
                <Route path="/profile" exact component={UserInfo} />
            </Main>;
        
    	return (
            <div>
                <SideNav  style={{ position: 'fixed', zIndex: '1500'}} onToggle={this.onToggle}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="kanban">
                        <NavItem eventKey="kanban">
                            <NavIcon>
                                <NavLink exact to="/kanban"><i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} /></NavLink>
                            </NavIcon>
                            <NavText>
                                <NavLink exact to="/kanban">Трекер запросов</NavLink>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="catalog">
                            <NavIcon>
                                <NavLink exact to="/catalog"><i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} /></NavLink>
                            </NavIcon>
                            <NavText>
                                <NavLink exact to="/catalog"><MyLink expanded={expanded}>Справочники</MyLink></NavLink>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="help">
                            <NavIcon>
                                <NavLink to="/help"><i className="fa fa-fw fa-question-circle" style={{ fontSize: '1.75em' }} /></NavLink>
                            </NavIcon>
                            <NavText>
                                <NavLink to="/help">Связь с поддержкой</NavLink>
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                {loggedMain}
            </div>
        );
    }
}
 
export default User;