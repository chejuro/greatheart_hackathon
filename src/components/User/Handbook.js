import React, {Component} from 'react';
import { Card, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { getEntities, getEntityInfo, getEntityType, getEnums } from '../../utils/UtilsAPI'
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

      getEntityType(query.get('id')).then(response => {
        this.setState({
          name : response.body.name
        })
      })

      getEntities(query.get('id'))
          .then(response => {
            console.log(response)
            return this.modifyResponse(response)
          })
          .then(response => {
            console.log(response)
            if (response.length != 0) {
              this.setState({
                entities: response
            })
            }
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
      let promises = []
      
      for (var i = 0; i < resp.length; i++) {
        for (var key in resp[i].json) {
          if (resp[i].json[key].type != null) {
            let type = resp[i].json[key].entity_type;
            let id = resp[i].json[key].id
              promises.push(getEntityInfo(type, id, i, key))
          }
        }
      }

      return Promise.all(promises).then(response => {
        for (var i in response) {
          resp[response[i].id].json[response[i].key] = response[i].data
        }
      }).then(_ => {
        let posts = []
        for (var i in resp) {
          posts.push({
            id: i,
            title: resp[i].json[resp[i].title],
            message: <JsonToTable json={resp[i].json} />
          })
        }
        return posts
      })
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