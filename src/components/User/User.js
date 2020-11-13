import React, {Component} from 'react';
import { Router, Route, NavLink, HashRouter, Link } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './../../../node_modules/font-awesome/css/font-awesome.min.css';
import UserMenuPanel from './UserMenuPanel';
import NavBar from './../NavBar';
import UserInfo from './UserInfo';
import HandbookTypes from './HandbookTypes';
import Handbook from './Handbook';
import KanbanTable from './KanbanTable';
import CardPage from './CardPage';
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
            <header className="sticky-top">
                <div>
                    <UserMenuPanel name="Название компании" status="Описание/Должность/" />
                </div>
            </header>;

        const loggedMain =
            <Main className="content" expanded={this.state.expanded}>
                {header}
                <Route path="/" exact component={UserInfo} />
                <Route path="/profile" exact component={UserInfo} />
                <Route path="/handbook_types" component={HandbookTypes}/>
                <Route path="/handbook" component={Handbook}/>
                <Route path="/kanban" component={KanbanTable}/>
                <Route path="/card" component={CardPage}/>
            </Main>;
        
    	return (
            <HashRouter>
                <div>
                    <SideNav  style={{ position: 'fixed', zIndex: '1500'}} onToggle={this.onToggle}>
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="profile">
                            <NavItem eventKey="profile">
                                <NavIcon>
                                    <NavLink exact to="/profile"><i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} /></NavLink>
                                </NavIcon>
                                <NavText>
                                    <NavLink exact to="/profile">Профиль</NavLink>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="kanban">
                                <NavIcon>
                                    <NavLink exact to="/kanban"><i className="fa fa-fw fa-calendar" style={{ fontSize: '1.75em' }} /></NavLink>
                                </NavIcon>
                                <NavText>
                                    <NavLink exact to="/kanban">Трекер запросов</NavLink>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="handbook_types">
                                <NavIcon>
                                    <NavLink exact to="/handbook_types"><i className="fa fa-fw fa-list-alt" style={{ fontSize: '1.75em' }} /></NavLink>
                                </NavIcon>
                                <NavText>
                                    <NavLink exact to="/handbook_types"><MyLink expanded={expanded}>Справочники</MyLink></NavLink>
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
            </HashRouter>
        );
    }
}
 
export default User;