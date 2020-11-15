import React, {Component} from 'react';
import { Card, Form, FormGroup, Label, Input } from "reactstrap";
import { getHandbookTypes, addEntityType } from '../../utils/UtilsAPI'


class HandbookCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fields: []
        };

        this.create_handbook = this.create_handbook.bind(this);
    }

    componentDidMount() {

    }

    addQuestion = e => {
        e.preventDefault()
        let val = this.state.fields.length + 0
        let fields = this.state.fields.concat([val])
        this.setState({
            fields
        })
    }

    create_handbook = () => {
        console.log(this.state.fields)
        let name = document.getElementById("name").value
        console.log(name)
        let handbook_example = {
            name: name,
            main: true,
            titleField: "Наименование",
            necessaryFields: {
                "Наименование": {
                    "type": "string",
                    "notnull": true
                }
            }
        }
        console.log(handbook_example)
        addEntityType(handbook_example)

        // let title = document.getElementById("title").value
        // let body = document.getElementById("body").value
        // window.location.reload()
    }

    render() {
        return (
            <div className="container-fluid">
                <h3 className="blackHeader">Справочники</h3>
                <Card>
                    <Form id="editForm">
                        <FormGroup>
                            <Label className="blackHeader">Наименование справочника</Label>
                            <Input
                                type="text"
                                name="title"
                                id="name"
                            />
                        </FormGroup>
                        {this.state.fields.map(input => 
                            <FormGroup row>
                                <Label className="blackHeader">Новое поле</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                />
                                <Label className="blackHeader" check>
                                    <Input type="checkbox" />{' '}
                                    is Null
                                </Label>
                            </FormGroup>
                        )}
                        <button id="btn_req" name="btn_req" className="btn__req col-sm-3" onClick={this.addQuestion}>
                            Добавить поле
                        </button>
                    </Form>
                    <button id="btn_req" name="btn_req" className="btn__req" onClick={this.create_handbook}>
                        Создать справочник
                    </button>
                </Card>
            </div>
        );
    }
}
export default HandbookCreate;