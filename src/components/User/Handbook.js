import React, {Component} from 'react';
import { Card, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { getEntities, getEntityInfo, getEnums } from '../../utils/UtilsAPI'
import { JsonToTable } from "react-json-to-table";
import { Collapse } from "react-collapse";
import classNames from "classnames";


class Handbook extends Component {
    constructor(props) {
      super(props);
      this.state = {
          entities: [],
          activeIndex: null,
          name: '',
          enums: []
      };

      this.toggle = this.toggle.bind(this);
      this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidMount() {
      const query = new URLSearchParams(this.props.location.search);
      console.log(query.get('id'))
      getEntities(query.get('id'))
          .then(response => {
            if (response.length!==0){
              this.setState({
                entities: this.modifyResponse(response),
                name: response[0].name
            })} 
      });
      // getEnums()
      //     .then(response => {
      //       this.setState({
      //         enums: response
      //     })
      //     console.log(this.state.enums)
      // });
    }

    modifyResponse(resp) {
      let posts = []
      console.log(resp);
      // if (resp.length==0){
      //   return posts
      // }
      for (var i = 0; i < resp.length; i++) {
        let title = resp[i].title
        let obj = resp[i].json
        if (obj.hasOwnProperty('best_friend_employee')) {
            getEntityInfo(obj.best_friend_employee.id, obj.best_friend_employee.enum_type)
              .then(response => {
                obj.best_friend_employee = response[0].json.name
              })
        }
        posts.push({
          id: i,
          title: resp[i].json[title],
          message: <JsonToTable json={obj} />
        })
      }
      
      return posts
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        console.log(this.state.modal)
    }

    toggleClass(index, e) {
      this.setState({
        activeIndex: this.state.activeIndex === index ? null : index
      });
    }
  
    moreLess(index) {
      if (this.state.activeIndex === index) {
        return (
          <span>
            <i className="fas fa-angle-up" /> Less
          </span>
        );
      } else {
        return (
          <span>
            <i className="fas fa-angle-down" /> More
          </span>
        );
      }
    }

    render() {
      const { activeIndex } = this.state;
      let content = this.state.entities.map((post, index) => {
          return (
            <li key={index}>
              <div>
                <p className="blackHeader">{post.title}</p>
                <Collapse isOpened={activeIndex === index}>
                  <div
                    className={classNames("alert alert-info msg", {
                      show: activeIndex === index,
                      hide: activeIndex !== index
                    })}
                  >
                    {post.message}
                  </div>
                </Collapse>
                <button
                  className="btn btn-primary btn-xs"
                  onClick={this.toggleClass.bind(this, index)}
                >
                  {this.moreLess(index)}
                </button>
              </div>
            </li>
          );
      });
      return (
          <div className="container-fluid">
              <h3 className="blackHeader">{this.state.name}</h3>
              <Card>
                  <ul>{content}</ul>
                  <button id="btn_req" name="btn_req" className="btn__req" onClick={this.toggle}>Создать запрос</button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle}><h5 className="blackHeader">Создание запроса</h5></ModalHeader>
                      <ModalBody>
                      <Form id="editForm">
                        <FormGroup>
                          <Label className="blackHeader">Наименование запроса</Label>
                          <Input
                            type="text"
                            name="title"
                            id="title"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="blackHeader">Описание</Label>
                          <Input
                            type="text"
                            name="description"
                            id="body"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="blackHeader">Тип запроса</Label>
                          <Input
                            type="text"
                            name="type_req"
                            id="type_req"
                          />
                        </FormGroup>
                      </Form>
                      </ModalBody>
                      <ModalFooter>
                          <button className="btn__req" onClick={this.create_request}>Создать</button>
                          <button className="btn__signin" onClick={this.toggle}>Отмена</button>
                      </ModalFooter>
                  </Modal>
              </Card>
          </div>
      );
    }
}

export default Handbook;