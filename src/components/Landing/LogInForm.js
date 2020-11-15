import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import {signIn} from './../../utils/UtilsAPI'
import inMemoryJWT from './../../utils/inMemoryJWT'
import { ACCESS_TOKEN} from './../../constants';
import { withRouter } from 'react-router-dom';

class LogInForm extends Component {
	state = {
        uname: '',
        psw: '',
    };

    constructor(props) {
    	super(props);
    	this.onChange = this.onChange.bind(this);
    	this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
    	const state = this.state;
    	state[e.target.name] = e.target.value;
    	this.setState(state);
    }

    onSubmit(values) {
        let props = this.props;
        signIn(values).then(response => {
            inMemoryJWT.setToken(response.body);
            props.history.push({
                pathname: `/user`,
            })
        });
    }

    render() {
    	return (
            <Form
                name="registration"
                onSubmit={this.onSubmit}
                render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div className="container login__form">
                        <label for="login"><b>Логин</b></label>
                        <Field
                            id="login"
                            name="login"
                            type="text"
                            component="input"
                            placeholder="Логин"
                            required
                            valueMissing="Необходимо ввести значение"
                        />

                        <label for="psw"><b>Пароль</b></label>
                        <Field
                            name="password"
                            type="password"
                            typeMismatch="Введите корректный пароль"
                            component="input"
                            placeholder="Пароль"
                            required
                            valueMissing="Необходимо ввести значение"
                        />

                        <button id="btn_signin" name="btn_signin" class="btn__signin" type="submit" >Вход</button>
                        <Link to="/signup">
                        <button id="btn_req" name="btn_req" className="btn__req">Зарегистрироваться</button></Link>
                    </div>
                </form>
            )}
            />
    	);
    }
}
 
export default withRouter(LogInForm);