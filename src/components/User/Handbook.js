import React, {Component} from 'react';
import {Card} from "reactstrap";
import { getEntityName } from '../../utils/UtilsAPI'
import { JsonToTable } from "react-json-to-table";
import { Collapse } from "react-collapse";
import classNames from "classnames";


class Handbook extends Component {
    constructor(props) {
      super(props);
      this.state = {
          entities: [],
          activeIndex: null,
          posts: []
      };

      this.toggle = this.toggle.bind(this);
      this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidMount() {
      console.log(this.props.location.state.entity)
      getEntityName(this.props.location.state.entity)
          .then(response => {
                  this.setState({
                    entities: this.modifyResponse(response),
          })
      });
    }

    modifyResponse(response) {
      let posts = []
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        posts.push({
          id: i,
          title: response[i].json.name,
          message: <JsonToTable json={response[i].json} />
        })
      }
      this.setState({
        posts: posts
      });
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
      let content = this.state.posts.map((post, index) => {
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
              <h3 className="blackHeader">Справочник сотрудников</h3>
              <Card>
                  <ul>{content}</ul>
              </Card>

          </div>
      );
    }
}

export default Handbook;