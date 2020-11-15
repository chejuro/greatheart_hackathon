import React, {Component} from 'react';
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import {Link} from "react-router-dom";
import {signIn, signUp} from './../../utils/UtilsAPI'
import inMemoryJWT from './../../utils/inMemoryJWT'
import { withRouter } from 'react-router-dom';

class SignUpForm extends Component {


	state = {
        uname: '',
        psw: '',
    };

    constructor(props) {
    	super(props);
    }

    onSubmit = (values) => {
        console.log(values);
        values.roles = ["all"]; //TODO
        console.log(values);
        let props = this.props;
        signUp(values).then(_ => {
            signIn(values).then(response => {
                inMemoryJWT.setToken(response.body);
                props.history.push({
                    pathname: `/user`,
                })
            })
        });
    }

    render() {
    	return (
            <div className="row justify-content-around login__panel">
                <div className="col-lg-5"></div>
                <div className="col-lg-5">
                    <Form
                        name="registration"
                        onSubmit={this.onSubmit}
                        render={({ handleSubmit}) => (
                            <form id={"reg"} onSubmit={handleSubmit} style={{ padding: 15 }}>
                                <div className="container login__form">
                                    <Field
                                        name="login"
                                        component="input"
                                        placeholder="Логин"
                                        required
                                        valueMissing="Необходимо ввести значение"
                                    />
                                    <Field
                                        name="password"
                                        type="password"
                                        typeMismatch="Введите корректный пароль"
                                        component="input"
                                        placeholder="Пароль"
                                        required
                                        valueMissing="Необходимо ввести значение"
                                    />
                                <button onClick="" type="submit" className="btn__signin">
                                    Зарегистрироваться
                                </button>
                                <Link to="/">
                                    <button id="btn_req" name="btn_req" className="btn__req">На главную страницу</button>
                                </Link>
                                </div>
                            </form>
                        )}
                    />
                </div>
            </div>
    	);
    }
}
 
export default withRouter(SignUpForm);