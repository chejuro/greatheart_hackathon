import React, {Component} from 'react';
import { Card, Form, FormGroup, Label, Input } from "reactstrap";
import { addEntityType, getEnums, getFieldTypes } from '../../utils/UtilsAPI'


class HandbookCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fields: [],
            fieldTypes : [],
        };

        this.create_handbook = this.create_handbook.bind(this);
    }

    componentDidMount() {
        getFieldTypes().then(response => {            
            this.setState({
                fieldTypes : response.body.filter(el => el.rusName != "перечисление" && el.rusName != "запись")
            })
        });
        getEnums().then(response => {
            this.setState({
                enums : response.body
            });
            console.log("enums");
            console.log(response.body);
        });
    }

    addEnumField = e => {
        e.preventDefault()
        let val = this.state.fields.length
        let fields = this.state.fields
        fields.push({
            name : "title" + val,
            necessary : "necessary" + val,
            typeId : "enum" + val,
            type : "enum",
            value : this.state.enums[0].id,
        })
        this.setState({
            fields : fields
        })
    }
    addQuestion = e => {
        e.preventDefault()
        let val = this.state.fields.length
        let fields = this.state.fields
        fields.push({
            name : "title" + val,
            necessary : "necessary" + val,
            typeId : "type" + val,
            type : "string",
        })
        this.setState({
            fields : fields
        })
    }

    create_handbook = () => {
        console.log(this.state.fields)
        let name = document.getElementById("name").value
        
        let directory = {
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
        for (var i in this.state.fields) {
            let info = this.state.fields[i];
            let field = {
                type : this.state.fields[i].type,
                notnull : document.getElementById(info.necessary).checked
            }
            if (field.type == "enum") {
                console.log("Iwashere");
                field.enum_type_id = info.value;
            }
            directory.necessaryFields[document.getElementById(info.name).value] = field;
        }
     
        addEntityType(directory).then(_ => {
            this.props.history.push({
                pathname: "/handbook_types"
            })
        })
    }

    handleChangeFieldType = (input, e) => {
        input.type = e.target.value
        console.log(input)
        this.forceUpdate();
    }

    handleChangeEnumType = (input, e) => {
        input.value = e.target.value
        console.log(this.state.fields)
        this.forceUpdate();
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
                            <FormGroup column>
                                <Label className="blackHeader">Новое поле</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id={input.name}
                                />
                                { input.type == "enum" &&
                                <select id={input.typeId} value={input.value} onChange={(e) => this.handleChangeEnumType(input, e)}>
                                            {this.state.enums.map(_enum => 
                                                <option value={_enum.id}>{_enum.name}</option>
                                            )}
                                        </select>
                                
                                }
                                <Label className="blackHeader" check>
                                    <Input type="checkbox" id={input.necessary}/>{' '}
                                    Обязательное
                                </Label>
                                <div></div>
                                
                                  {input.type != "enum" && <Label className="blackHeader">
                                        Тип значения

                                        <select id={input.typeId} value={input.type} onChange={(e) => this.handleChangeFieldType(input, e)}>
                                            {this.state.fieldTypes.map(fieldType => 
                                                <option value={fieldType.type}>{fieldType.rusName}</option>
                                            )}
                                        </select>
                                    </Label>
                                            }
                                
                            </FormGroup>
                        )}
                        <button id="btn_req" name="btn_req" className="btn__req col-sm-3" onClick={this.addQuestion}>
                            Добавить поле
                        </button>
                        
                        <button id="btn_enum" name="btn_enum" className="btn__req col-sm-3" onClick={this.addEnumField}>
                            Добавить перечисление
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