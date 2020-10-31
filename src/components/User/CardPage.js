import React, {Component} from 'react';
import { Card, CardTitle, CardImg, CardBody, Col, Row } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Field } from 'react-final-form-html5-validation'
import './../../css/User.css';
import './../../App.css';


class CardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        data: {}
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {

  }

  toggle() {
    this.setState(prevState => ({
        modal: !prevState.modal
    }));
    console.log(this.state.modal)
}

  render() {
    return (
        <div className="container-fluid">
          <h3 className="blackHeader">Запрос</h3>
          <Card>
              <div className="row justify-content-around">
                  <div className="col-lg-5">
                    <h4 className="blackHeader">Информация</h4>
                      <Card>
                          <CardBody>
                              {/* <p className="blackHeader">бла-бла-бла ...</p> */}
                              <p className="blackHeader">Имя: Иван</p>
                              <p className="blackHeader">email: a@a.ru</p>
                              <p className="blackHeader">Статус: Новый</p>
                          </CardBody>
                      </Card>
                  </div>
                  <div className="col-lg-5">
                    <h4 className="blackHeader">Комментарии</h4>
                      {/* Комментарии */}
                      <Card>
                          <CardBody>
                              <p className="blackHeader">Запрос не готов для передачи на исполнение ...</p>
                              
                          </CardBody>
                      </Card>
                      <Form>
                      <FormGroup>
                        <h8 className="blackHeader">Оставить комментарий</h8>
                        <Input type="textarea" name="text" id="exampleText" />
                      </FormGroup>
                      <FormGroup>
                        <Input type="file" name="file" id="exampleFile" />
                        {/* <FormText color="muted">
                          This is some placeholder block-level help text for the above input.
                          It's a bit lighter and easily wraps to a new line.
                        </FormText> */}
                      </FormGroup>
                      <Button>Submit</Button>
                    </Form>
                  </div>
              </div>
          </Card>
          <button id="btn_req" name="btn_req" className="btn__req" onClick={this.toggle}>Редактировать</button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader  toggle={this.toggle}><h5 className="blackHeader">Редактирование запроса</h5></ModalHeader>
            <ModalBody>
                <Form
                  name={"edit"}
                  onSubmit={this.onSubmit}
                  //initialValues={this.state.data}
                  render={({ handleSubmit}) => (
                    <form id="editForm" onSubmit={handleSubmit} style={{ padding: 15 }}>
                        <Field
                            className="field1"
                            name={"name"}
                            type="text"
                            component="input"
                            placeholder="Название запроса"
                        />
                        <Field
                            className="field1"
                            name={"body"}
                            type="text"
                            component="input"
                            placeholder="Описание запроса"
                        />
                    </form>
                  )}
                />
            </ModalBody>
            <ModalFooter>
                <button className="btn__req" onClick={() =>
                        {/* document
                        .getElementById("editForm")
                        .dispatchEvent(new Event("submit", { cancelable: true })) */}
                    }>Сохранить</button>
                <button className="btn__signin" onClick={this.toggle}>Отмена</button>
            </ModalFooter>
        </Modal>
      </div>
    );
  }
}
 
export default CardPage;