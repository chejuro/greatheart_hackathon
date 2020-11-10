import React, {Component} from 'react';
import {Card} from "reactstrap";
import Table from './Table'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import { getHandbookTypes, getEntityName } from '../../utils/UtilsAPI'
import { JsonToTable } from "react-json-to-table";
import { Collapse } from "react-collapse";
import classNames from "classnames";


const myJson = {
    "bd": "13-02-1999",
    "city": "Moscow",
    "name": "Person",
    "Email": [
      "a@a.ru"
    ],
    "phone": "+7-916-788-99-99",
    "comment": "comment",
    "university": "ВШЭ",
    "work_place": "hz",
    "availability": {
      "id": 2,
      "type": "enum",
      "enum_type": 2
    },
    "fund_position": "Волонтёр",
    "work_position": "Оператор",
    "responsibility": "Улыбаться и махать",
    "education_filed": "computer science",
    "availability_comment": "какой-то коммент"
  };

  const posts = [
    {
      id: "1",
      title: "Запись1",
      message: <JsonToTable json={myJson} />
    },
  ];


class Handbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            id: '',
            entityName: {},
            activeIndex: null
        };

        this.toggle = this.toggle.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidMount() {
        getEntityName()
            .then(response => {
                    this.setState({
                        entityName: response,
            })
            console.log(this.state.entityName);
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
        let content = posts.map((post, index) => {
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