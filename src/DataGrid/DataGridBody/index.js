import React, { Component } from 'react';
import Table from '../Table';
import './styles.css';

class DataGridBody extends Component {

  prepareRowsData(rows) {
    return rows.map(row => this.props.fields.map(field => row[field]));
  }

  render() {
    const { rows, ...props } = this.props;
    return (
      <div className="data-grid__body">
        <Table data={this.prepareRowsData(rows)} {...props} singleSelect />
      </div>
    );
  }
}

export default DataGridBody;
