import React, {Component} from 'react';
import LogInForm from './LogInForm';
import './../../App.css';

class LogInSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    	const desc = <div className="col-lg-5">
                        <div className="offer">
                            <h1 className="offer__title">Благотворительный фонд «Огромное сердце»</h1>
                            <p className="offer__text"> Cоциальный проект в поддержку взрослых людей с диагнозом рак.</p>
                        </div>
                    </div>;

    	return (
                <div className="row justify-content-around login__panel">
                    {desc}
                    <div className="col-lg-5">
                        {/* <LogInForm onLogin={this.props.onLogin}/> */}
                    </div>
                </div>
    		);
    }
}
 
export default LogInSection;