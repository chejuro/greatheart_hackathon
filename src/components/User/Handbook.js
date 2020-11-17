import React, {Component} from 'react';
import { Card, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { getEntities, getEntityInfo, getEntityType, addEntity, getEnums, addEntityType, getEnumValues, sendDonation } from '../../utils/UtilsAPI'
import { JsonToTable } from "react-json-to-table";
import { Collapse } from "react-collapse";
import classNames from "classnames";
import inMemoryJWT from './../../utils/inMemoryJWT'


class Handbook extends Component {
    constructor(props) {
      super(props);
      this.state = {
          entities: [],
          activeIndex: null,
          name: '',
          enums: [],
          mainEntities: [],
          necessaryFields: [],
          unnecessaryFields : [],
          enumValues : {},
          modal_donation: false,
          last_ent_id: ''
      };

      this.toggle = this.toggle.bind(this);
      this.toggle_donation = this.toggle_donation.bind(this);
      this.toggleClass = this.toggleClass.bind(this);
      this.send_donation = this.send_donation.bind(this);
    }

    convertType(type) {
      if (type == "phone") {
        return "text";
      } else if (type == "string") {
        return "text";
      } else if (type == "boolean") {
        return "checkbox";
      }
      return type
    }

    componentDidMount() {
      const query = new URLSearchParams(this.props.location.search);
      console.log(query.get('id'))

      getEntityType(query.get('id')).then(response => {
        let necessaryFields = []
        let unnecessaryFields = []
        for (var i in response.body.necessaryFields) {
          console.log(i);
          let field = {
            name : i,
            type : this.convertType(response.body.necessaryFields[i].type),
            notnull : response.body.necessaryFields[i].notnull,
          };
          if (field.type == "enum") {
              field.enum_type_id = response.body.necessaryFields[i].enum_type_id;
              getEnumValues(response.body.necessaryFields[i].enum_type_id).then(response => {
                let allEnumValues = this.state.enumValues;
                allEnumValues[response.body[0].enumTypeId] = response.body;
                this.setState({
                    enumValues : allEnumValues,
                });
                console.log(this.state);
              });
          }
          if (field.notnull) {
            necessaryFields.push(field)
          } else {
            unnecessaryFields.push(field)
          }
        }
        this.setState({
          name : response.body.name,
          necessaryFields : necessaryFields,
          unnecessaryFields : unnecessaryFields
        });
        console.log("necessary fields");
        console.log(this.state.necessaryFields);
        this.forceUpdate();
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
            })}
      });
      getEnums()
          .then(response => {
            this.setState({
              enums: response
          })
          console.log(this.state.enums)
      });
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
            resp_i: resp[i].id,
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

    toggle_donation(event) {
      let id = event.target.id;
      console.log(id)
      this.setState({
        last_ent_id: id
      })
      this.setState(prevState => ({
        modal_donation: !prevState.modal_donation
      }));
      console.log(this.state.modal_donation)
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
    
    handleChangeEnumValue = (input, e) => {
      // input.value = e.target.value;
      // this.forceUpdate();
      // console.log(this.state);
    }

    create_entity = () => {
      let entity = {}
      for (var i in this.state.necessaryFields) {
        let field = this.state.necessaryFields[i];
        let value;
        if (field.type == "checkbox") {
          value = document.getElementById(field.name).checked.toString();
        } else if (field.type != "enum"){
          value = document.getElementById(field.name).value;
        }
        if (value != "" && field.type != "enum") {
          entity[field.name] = value;
        } else if (field.type == "enum") {
          let element = document.getElementById(field.name);
          console.log("ELEMENT");
          console.log(element);
          let _enum = {
            id : parseInt(element.value, 10),
            enum_type : parseInt(element.getAttribute("type"), 10),
            type : "enum"
          };
          entity[field.name] = _enum;
        }
      }
      for (var i in this.state.unnecessaryFields) {
        let field = this.state.unnecessaryFields[i];
        let value;
        if (field.type == "checkbox") {
          value = document.getElementById(field.name).checked.toString();
        } else if (field.type != "enum"){
          value = document.getElementById(field.name).value;
        }
        if (value != "" && field.type != "enum") {
          entity[field.name] = value;
        } else if (field.type == "enum") {
          let element = document.getElementById(field.name);
          console.log("ELEMENT");
          console.log(element);
          let _enum = {
            id : parseInt(element.value, 10),
            enum_type : parseInt(element.getAttribute("type"), 10),
            type : "enum"
          };
          entity[field.name] = _enum;
        }
      }
      console.log(entity);
      const query = new URLSearchParams(this.props.location.search);
      addEntity(query.get('id'), {
        json : entity
      }).then(_ => {
        this.toggle();
        this.componentDidMount();
      });
    }

    send_donation(event) {
      let entity_id = this.state.last_ent_id
      let sum = document.getElementById("sum").value
      let desc = document.getElementById("desc").value
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();;

      let donation = {
        login: inMemoryJWT.getLogin(),
        amount: Number(sum),
        description: desc,
        entityId: entity_id,
        timestamp: date
      }
      
      sendDonation(donation)
      window.location.reload()
    }

    render() {
      console.log(this.state.entities)
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
                    <button id={post.resp_i} name={"btn_" + post.id} className="btn__req" onClick={this.toggle_donation}>Создать запрос</button>
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
                  <Modal isOpen={this.state.modal_donation} toggle={this.toggle_donation}>
                      <ModalHeader toggle={this.toggle_donation}><h5 className="blackHeader">Создание пожертвования</h5></ModalHeader>
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
                          <button className="btn__req" onClick={this.send_donation}>Создать</button>
                          <button className="btn__signin" onClick={this.toggle_donation}>Отмена</button>
                      </ModalFooter>
                  </Modal>
                  <button id="btn_req" name="btn_req" className="btn__req" onClick={this.toggle}>Добавить запись</button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle}><h5 className="blackHeader">Добавление записи</h5></ModalHeader>
                      <ModalBody>
                    
                       <Form id="editForm">
                         <Label className="blackHeader">Обязательные поля</Label>
                        {this.state.necessaryFields.map(input => 
                              <FormGroup row>
                                  <Label className="blackHeader">{input.name}</Label>
                                 {input.type != "enum" &&
                                   <Input
                                      type={input.type}
                                      name="title"  
                                      id={input.name}
                        /> }
                                 {input.type == "enum" && this.state.enumValues[input.enum_type_id] != null && 
                                    <select id={input.name} type={input.enum_type_id} onChange={(e) => this.handleChangeEnumValue(input, e)}>
                                             {this.state.enumValues[input.enum_type_id].map(_enum => 
                                                 <option value={_enum.id}>{_enum.name}</option>
                                             )}
                                         </select>
                                  } 
                              </FormGroup>
                        )}
                        <br/>
                        <Label className="blackHeader">Необязательные поля</Label>
                        {this.state.unnecessaryFields.map(input => 
                              <FormGroup row>
                                  <Label className="blackHeader">{input.name}</Label>
                                   <Input
                                      type={input.type}
                                      name="title"  
                                      id={input.name}
                                  />
                              </FormGroup>
                        )}
                      </Form>
                      </ModalBody>
                      <ModalFooter>
                          <button className="btn__req" onClick={this.create_entity}>Создать</button>
                          <button className="btn__signin" onClick={this.toggle}>Отмена</button>
                      </ModalFooter>
                  </Modal>
              </Card>
          </div>
      );
    }
}

export default Handbook;