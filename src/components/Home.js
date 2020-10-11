import React, {Component} from 'react';
import NavBar from './NavBar';
import LogInSection from './Landing/LogInSection.js';
import AboutSection from './Landing/AboutSection.js';
import Footer from './Footer';

 
class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {

            const header = 
            <header id="header" className="header sticky-top">
                <div className="container-fluid" >
                    <NavBar buttons = {{ hash: true, user: false, data: [{url: "#login", text: "Войти"}, {url: "#about_us", text: "О нас"}]} }/>
                </div>
            </header> ;

            const login_section =
            <section id="login" className="login">
                <div className="container-fluid">
                    <LogInSection onLogin={this.props.onLogin}/>
                </div>
            </section>;

            const about_section = 
            <section id="about_us" className="about__us">
                <div className="container-fluid">
                    <AboutSection />
                </div>
            </section>;


            

            return (
            <body>
            {header}
            {login_section}
            {about_section}
            <Footer />
            </body>
            );
        }
}
 
export default Home;