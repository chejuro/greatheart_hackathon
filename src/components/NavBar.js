import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';



class NavBar extends Component {

    render() {

        if (this.props.hash){
            return (
            <div className="row menu__panel  sticky-top">
                    <div className="col-lg-6">
                        <nav>
                        <ul className="menu d-flex">
                        {
                            this.props.buttons.data.map( (elem, index) => {
                                return <NavBarButton buttonInfo= {{url: elem.url, text : elem.text }}/>
                            })
                        }
                        </ul>
                        </nav>
                    </div>
            </div>
            );
        }
        else {
            return (
            <div class="row menu__panel  sticky-top">
                    <div class="col-lg-12">
                        <nav class="d-flex">
                        <ul class="menu d-flex">
                        {
                            this.props.buttons.data.map( (elem, index) => {
                                return <HashNavBarButton buttonInfo= {{url: elem.url, text : elem.text }}/>
                            })
                        }
                        </ul>
                        </nav>
                    </div>
            </div>
            );
        }
    }
}

const NavBarButton = ({ buttonInfo }) => <li className="menu__item active" > <Link to={buttonInfo.url}> {buttonInfo.text} </Link> </li>;
const HashNavBarButton = ({ buttonInfo }) => <li className="menu__item active" > <HashLink smooth to={buttonInfo.url}> {buttonInfo.text} </HashLink> </li>;

export default NavBar;