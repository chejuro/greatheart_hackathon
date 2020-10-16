import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
// import { signin } from './../../utils/APIUtils'
import { ACCESS_TOKEN} from './../../constants';

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

    }

    render() {
    	return (
            <Form
                name="registration"
                onSubmit={this.onSubmit}
                render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div className="container login__form">
                        <label for="uname"><b>Электронная почта</b></label>
                        <Field
                            id="uname"
                            name="usernameOrEmail"
                            type="text"
                            typeMismatch="Введите корректный email адрес"
                            component="input"
                            placeholder="Email"
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
 
export default LogInForm;