import React, {Component} from 'react';
import { Card, CardTitle, CardImg, CardBody, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { withRouter } from "react-router-dom";
import { getRequestData, changeRequest, getComments, sendComment, sendConsumption } from './../../utils/UtilsAPI'
import './../../css/User.css';
import './../../App.css';
import inMemoryJWT from '../../utils/inMemoryJWT';


class CardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: {},
        request_id: '',
        comments : [],
        modal_consumption: false,
    };
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query.get('id'))
    getRequestData(query.get('id'))
      .then(response => {
        this.setState({
          data: response.body,
          request_id: query.get('id')
        })
        console.log(this.state.data);
        getComments(this.state.data.comments).then(resp => {
          console.log("comments");
          this.setState({
              comments : resp.body
          });
          console.log(this.state.comments);
          this.forceUpdate();
        })   
      this.forceUpdate();
    });
    this.forceUpdate();
  }

  change_request = () => {
    let title = document.getElementById("title").value
    let body = document.getElementById("description").value
    let request_type = 5
    let request = {
      id: this.state.request_id,
      requestType: request_type,
      body: body,
      additionalInfo: {
        some_shit : title
      }
    }
    changeRequest(request).then(window.location.reload())
  }

  parseDate = (str) => {
    let date = str.substring(0, str.indexOf('T'));
    let time = str.substring(str.indexOf('T') + 1, str.indexOf('.'));
    return date + " " + time;
  }

  handleClick = (e) => {
    let comment = {
      login : inMemoryJWT.getLogin(),
      message : document.getElementById("message").value,
      requestId : parseInt(this.state.request_id, 10),
    };
    console.log(comment);
    sendComment(comment).then(response => {
      document.getElementById("message").value = "";
      this.componentDidMount();
    });
  }

  toggle_consumption = () => {
    this.setState({
      modal_consumption : !this.state.modal_consumption
    })
  }

  send_consumption = () => {
    let sum = document.getElementById("sum").value
    let desc = document.getElementById("desc").value
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();;

    let consumption = {
      login: inMemoryJWT.getLogin(),
      amount: Number(sum),
      description: desc,
      entityId: parseInt(this.state.request_id, 10),
      timestamp: date
    }
    console.log(consumption);
    sendConsumption(consumption).then(response => {
      window.location.reload()
      console.log(response);
    })
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

                  <Modal isOpen={this.state.modal_consumption} toggle={this.toggle_consumption}>
                      <ModalHeader toggle={this.toggle_consumption}><h5 className="blackHeader">Добавление затрат</h5></ModalHeader>
                      <ModalBody>
                      <Form id="editForm">
                        <FormGroup>
                          <Label className="blackHeader">Сумма</Label>
                          <Input
                            type="text"
                            name="title"
                            id="sum"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="blackHeader">Описание</Label>
                          <Input
                            type="text"
                            name="description"
                            id="desc"
                          />
                        </FormGroup>
                      </Form>
                      </ModalBody>
                      <ModalFooter id='mf'>
                          <button className="btn__req" onClick={this.send_consumption}>Добавить</button>
                          <button className="btn__signin" onClick={this.toggle_consumption}>Отмена</button>
                      </ModalFooter>
                  </Modal>

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
                                    id="title"
                                    defaultValue={flag}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="examplePassword" className="blackHeader">Описание</Label>
                                  <Input
                                    type="text"
                                    name="description"
                                    id="description"
                                    defaultValue={this.state.data.body}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="exampleDatetime" className="blackHeader">Дата создания запроса</Label>
                                  <Input
                                    type="datetime"
                                    name="date"
                                    id="date"
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
                            {this.state.comments.map(comment => 
                              <div><b>[{this.parseDate(comment.creation)}] {comment.login} : {comment.message}</b> </div>
                            )}                              
                          </CardBody>
                      </Card>
                      <Form>
                      <FormGroup>
                        <h8 className="blackHeader">Оставить комментарий</h8>
                        <Input type="textarea" name="text" id="message"/>
                      </FormGroup>
                      <Button onClick={this.handleClick}>Отправить</Button>
                    </Form>
                  </div>
              </div>
          </Card>
          <button id="btn_req" name="btn_req" className="btn__req" onClick={this.toggle_consumption}>Добавить затраты</button>
          <button id="btn_req" name="btn_req" className="btn__req" onClick={this.change_request}>Сохранить</button>
      </div>
    );
  }
}
 
export default withRouter(CardPage);