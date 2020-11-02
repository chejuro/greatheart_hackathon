import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

let order = 'desc';

class SortTable extends Component {

    handleBtnClick = () => {
        if (order === 'desc') {
            this.refs.table.handleSort('asc', 'name');
            order = 'asc';
        } else {
            this.refs.table.handleSort('desc', 'name');
            order = 'desc';
        }
    }


    render() {
        const options = {
            sortIndicator: false
        };
        return (
            <div>
                <BootstrapTable ref='table' data={ this.props.workers} options={options} search>
                    <TableHeaderColumn width='30px' dataField='id' isKey={ true } dataSort={ true }></TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort={ true }>Контактное имя</TableHeaderColumn>
                    <TableHeaderColumn dataField='birthday'>День/месяц рождения</TableHeaderColumn>
                    <TableHeaderColumn dataField='city' dataSort={ true }>Город проживания</TableHeaderColumn>
                    <TableHeaderColumn dataField='phone' dataSort={ true }>Телефон</TableHeaderColumn>
                    <TableHeaderColumn dataField='workplace' dataSort={ true }>Место работы</TableHeaderColumn>
                    <TableHeaderColumn dataField='function' dataSort={ true }>Должность</TableHeaderColumn>
                    <TableHeaderColumn dataField='fond_function' dataSort={ true }>Позиция в штатной структуре Фонда</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default SortTable