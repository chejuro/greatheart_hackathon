import React, {Component} from 'react';
import { Card, CardTitle, CardImg, CardBody, Col, Row } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {getRequestData} from './../../utils/UtilsAPI'
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
    console.log(this.props.location.state.requestId)
    getRequestData(this.props.location.state.requestId)
      .then(response => {
          this.setState({
              data: response.body,
      })
      console.log(this.state.data);
      console.log(this.state.data.additionalInfo.some_shit);
    });
    this.forceUpdate()
  }

  toggle() {
    this.setState(prevState => ({
        modal: !prevState.modal
    }));
    console.log(this.state.modal)
  }

  render() {
    let flag = "";
    if (this.state.data.hasOwnProperty('additionalInfo')){
      flag=this.state.data.additionalInfo.some_shit;
    }
    return (
        <div className="container-fluid">
          <h3 className="blackHeader">Запрос</h3>
          <Card>
              <div className="row justify-content-around">
                  <div className="col-lg-5">
                    <h4 className="blackHeader">Информация</h4>
                      <Card>
                          <CardBody>
                              <Form>
                                <FormGroup>
                                  <Label for="exampleEmail" className="blackHeader">Наименование запроса</Label>
                                  <Input
                                    type="text"
                                    name="title"
                                    defaultValue={flag}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="examplePassword" className="blackHeader">Описание</Label>
                                  <Input
                                    type="text"
                                    name="description"
                                    defaultValue={this.state.data.body}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="exampleDatetime" className="blackHeader">Дата создания запроса</Label>
                                  <Input
                                    type="datetime"
                                    name="date"
                                    placeholder="datetime placeholder"
                                    defaultValue={this.state.data.registrationDate}
                                  />
                                </FormGroup>
                              </Form>
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
                      </FormGroup>
                      <Button>Submit</Button>
                    </Form>
                  </div>
              </div>
          </Card>
          <button id="btn_req" name="btn_req" className="btn__req" onClick={this.toggle}>Сохранить</button>
      </div>
    );
  }
}
 
export default CardPage;