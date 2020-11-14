import React, {Component} from 'react';
import {Card} from "reactstrap";
import { getEntities, getEntityInfo } from '../../utils/UtilsAPI'
import { JsonToTable } from "react-json-to-table";
import { Collapse } from "react-collapse";
import classNames from "classnames";


class Handbook extends Component {
    constructor(props) {
      super(props);
      this.state = {
          entities: [],
          activeIndex: null,
          name: ''
      };

      this.toggle = this.toggle.bind(this);
      this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidMount() {
      const query = new URLSearchParams(this.props.location.search);
      console.log(query.get('id'))
      getEntities(query.get('id'))
          .then(response => {
            this.setState({
              entities: this.modifyResponse(response),
              name: response[0].name
          })  
      });
    }

    modifyResponse(resp) {
      let posts = []
      console.log(resp);
      for (var i = 0; i < resp.length; i++) {
        let obj = resp[i].json
        if (obj.hasOwnProperty('best_friend_employee')) {
            getEntityInfo(obj.best_friend_employee.id, obj.best_friend_employee.enum_type)
              .then(response => {
                obj.best_friend_employee = response[0].json.name
                console.log(response[0].json.name)
                console.log(obj)
              })
        }
        console.log(obj)
        posts.push({
          id: i,
          title: resp[i].title,
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
              </Card>

          </div>
      );
    }
}

export default Handbook;