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
        return this.modifyResponse(response)
      })
          .then(response => {
            console.log(response)
            this.setState({
              entities: response,
              name: response[0].name
          })  
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
            id: i,
            title: resp[i].title,
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
              </Card>

          </div>
      );
    }
}

export default Handbook;