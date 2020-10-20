import React, {Component} from 'react';
import Board from 'react-trello'
import data from './data.json';
import './../../App.css';


class KanbanTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: {}
    };
  }

  handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
  }

  onCardClick = (cardId, metadata, laneId) => {
    console.log('card clicked')
    console.log(`cardId: ${cardId}`)
    console.log(`metadata: ${metadata}`)
    console.log(`laneId: ${laneId}`)
    this.props.history.push(`/card/${cardId}`);
  }

  componentDidMount() {
    // getKanbanBoardData()
    //     .then(response => {
    //         this.setState({
    //             data: response
    //     })
    //     console.log(this.state.data);
    // });
  }

  render() {
    return (
      <div className="boardContainer">
        <Board 
        style={{backgroundColor: '#eee'}}
        editable
        data={data} 
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