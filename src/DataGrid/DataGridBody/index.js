import React, { Component } from 'react';
import { Table } from '../Table';
import './styles.css';

class DataGridBody extends Component {

  prepareRowsData(rows) {
    return rows.map(row => this.props.fields.map(field => row[field]));
  }

  handleOnRowClick(index) {
    console.log(this.props.rows[index]);
  }

  handleOnRowDoubleClick(index) {
    console.log(this.props.rows[index]);
  }

  render() {
    const { rows, ...props } = this.props;
    return (
      <div className="data-grid__body">
        <Table
          data={this.prepareRowsData(rows)}
          {...props}
          singleSelect
          onRowClick={this.handleOnRowClick.bind(this)}
          onRowDoubleClick={this.handleOnRowDoubleClick.bind(this)}
        />
      </div>
    );
  }
}

export default DataGridBody;
