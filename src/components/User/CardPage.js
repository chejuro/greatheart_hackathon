import React, {Component} from 'react';
import { Card, CardTitle, CardImg, CardBody, Col, Row } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { withRouter } from "react-router-dom";
import { getRequestData, changeRequest } from './../../utils/UtilsAPI'
import './../../css/User.css';
import './../../App.css';


class CardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: {},
        request_id: ''
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
      console.log(this.state.data.additionalInfo.some_shit);
      console.log(this.state.request_id);
    });
    this.forceUpdate()
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
          <button id="btn_req" name="btn_req" className="btn__req" onClick={this.change_request}>Сохранить</button>
      </div>
    );
  }
}
 
export default withRouter(CardPage);