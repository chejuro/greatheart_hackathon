import React, {Component} from 'react';
import { Router, Route, NavLink, HashRouter, Link } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './../../../node_modules/font-awesome/css/font-awesome.min.css';
import UserMenuPanel from './UserMenuPanel';
import UserInfo from './UserInfo';
import HandbookTypes from './HandbookTypes';
import HandbookCreate from './HandbookCreate';
import Handbook from './Handbook';
import KanbanTable from './KanbanTable';
import CardPage from './CardPage';
import styled from 'styled-components';
import inMemoryJWT from './../../utils/inMemoryJWT'
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

    componentDidMount() {

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
                <Route path="/handbook_create" component={HandbookCreate}/>
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
                            <NavItem eventKey="kanban">
                                <NavIcon>
                                    <NavLink exact to={{
                                        pathname: "/kanban", 
                                        search: `typeId=5`,
                                        }}><i className="fa fa-fw fa-calendar" style={{ fontSize: '1.75em' }} /></NavLink>
                                </NavIcon>
                                <NavText>
                                    <NavLink exact to={{
                                        pathname: "/kanban", 
                                        search: `typeId=5`,
                                        }}>Трекер запросов</NavLink>
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
                        </SideNav.Nav>
                    </SideNav>
                    {loggedMain}
                </div>
            </HashRouter>
        );
    }
}
 
export default User;