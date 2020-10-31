import React, {Component} from 'react';
import Board from 'react-trello'
import board_data from './data.json';
import './../../App.css';
import {getRequests, getKanbanTableData, changeRequestStatus,
        addCard} from './../../utils/UtilsAPI'


const cardStyle = { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 }
const laneStyle = {"width": 280, "backgroundColor": "#2fccc2"}


class KanbanTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: { lanes: [] },
    }
  }

  handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    changeRequestStatus({requestId: cardId, status: targetLaneId})
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
    this.props.history.push(`/card/${cardId}`);
  }

  modifyResponse(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
      board_data.lanes[i].id = response[i].statusInfo.id.toString()
      board_data.lanes[i].title = response[i].statusInfo.rusName
      board_data.lanes[i].style = laneStyle
      for (var j = 0; j < response[i].requests.length; j++) {
        board_data.lanes[i].cards[j] = {
          "id": response[i].requests[j].id.toString(),
          "title": response[i].requests[j].name,
          "cardStyle": cardStyle,
          "description": response[i].requests[j].body
        }
      }
    }
    return board_data
  }

  componentDidMount() {
    getKanbanTableData()
      .then(response => {
          this.setState({
              data: this.modifyResponse(response),
      })
      console.log(this.state.data);
    });
  }

  render() {
    return (
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
      </div>
    );
  }
}
 
export default KanbanTable;