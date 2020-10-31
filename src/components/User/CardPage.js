import React, {Component} from 'react';
import { Card, CardTitle, CardImg, CardBody, Col, Row } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './../../css/User.css';
import './../../App.css';


class CardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        data: {}
    };
  }

  componentDidMount() {

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
      </div>
    );
  }
}
 
export default CardPage;