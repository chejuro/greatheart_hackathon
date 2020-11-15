import React, {Component, useState} from 'react';
import { withRouter } from "react-router-dom";
import Board from 'react-trello'
import board_data from './data.json';
import './../../App.css';
import {getKanbanTableData, changeRequestStatus, createNewRequest, getRequestTypes,
        filterByRequestType } from './../../utils/UtilsAPI'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, 
        Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const cardStyle = { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 }
const laneStyle = {"width": 280, "backgroundColor": "#2fccc2"}


class KanbanTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: { lanes: [] },
      types: [],
      dropdownOpen : false
    }

    this.toggle = this.toggle.bind(this);
    this.create_request = this.create_request.bind(this);
    this.select = this.select.bind(this)
  }

  switchDropdown = () => {
    let current = this.state.dropdownOpen
    this.setState({
        dropdownOpen : !current,
    }); 
  }

  handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    changeRequestStatus({requestId: Number(cardId), status: Number(targetLaneId)})
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
  }

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.log(card.title)
  }

  onCardClick = (cardId, metadata, laneId) => {
    console.log('card clicked')
    console.log(`cardId: ${cardId}`)
    console.log(`metadata: ${metadata}`)
    console.log(`laneId: ${laneId}`)
    this.props.history.push({
      pathname: `/card`,
      search: `id=${cardId}`
    })
  }

  modifyResponse(response) {
    console.log(response.body);
    for (var i = 0; i < response.body.length; i++) {
      board_data.lanes[i].id = response.body[i].statusInfo.id.toString()
      board_data.lanes[i].title = response.body[i].statusInfo.name
      board_data.lanes[i].style = laneStyle
      for (var j = 0; j < response.body[i].requests.length; j++) {
        board_data.lanes[i].cards[j] = {
          "id": response.body[i].requests[j].id.toString(),
          "title": response.body[i].requests[j].additionalInfo.some_shit,
          "cardStyle": cardStyle,
          "description": response.body[i].requests[j].body
        }
      }
    }
    return board_data
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let id = query.get('typeId')

    getKanbanTableData(id)
      .then(response => {
        console.log(response);
          this.setState({
              data: this.modifyResponse(response),
      })
      console.log(this.state.data);
    });
    
    getRequestTypes()
      .then(response => {
          this.setState({
            types: response.body,
      })
    }).then(response => {
      this.setState(prevState => {
      console.log(prevState.types)
      return {
        ...prevState,
        currentTypeId: id,
        currentType : prevState.types.find(t => t.id == id).name,
      };
    })
  })
  }

  toggle() {
    this.setState(prevState => ({
        ...prevState,
        modal: !prevState.modal
    }));
    console.log(this.state.modal)
  }

  create_request = () => {
    let title = document.getElementById("title").value
    let body = document.getElementById("body").value
    let request_type = 5
    let request = {
      body: body,
      requestType: request_type,
      additionalInfo: {
        some_shit : title
      }
    }
    createNewRequest(request).then(window.location.reload())
  }


  select(event) {
    console.log(event.target.innerText)
    let id = this.state.types.find(t => t.name == event.target.innerText).id
    this.props.history.push({
      pathname: `/kanban`,
      search: `typeId=${id}`
    })
    window.location.reload()
  }

  render() {
    console.log('App component: render()')
    let content = this.state.types.map((type, index) => {
      return (
        <li key={index}>
          <div>
            <DropdownItem id={`dropdown_${type.id}`} onClick={this.select}>{type.name}</DropdownItem>
          </div>
        </li>
      );
    });

    return (
      <div>
        <div className="col-sm-3">
          <Dropdown className="customDropdown" isOpen={this.state.dropdownOpen} toggle={this.switchDropdown}>
            <DropdownToggle caret>
              {this.state.currentType}
            </DropdownToggle>
            <DropdownMenu>
              <ul>{content}</ul>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="boardContainer">
          <Board 
          style={{backgroundColor: '#eee'}}
          //editable
          onCardAdd={this.handleCardAdd}
          data={this.state.data}
          draggable
          handleDragStart={this.handleDragStart}
          handleDragEnd={this.handleDragEnd}
          onCardClick={this.onCardClick}
          />
          <button id="btn_req" name="btn_req" className="btn__req" onClick={this.toggle}>Создать запрос</button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader  toggle={this.toggle}><h5 className="blackHeader">Создание запроса</h5></ModalHeader>
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
        </div>
      </div>
    );
  }
}
 
export default withRouter(KanbanTable);