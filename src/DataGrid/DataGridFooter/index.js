import React, { Component } from 'react';
import Table from '../Table';
import './styles.css';

class DataGridFooter extends Component {
  render() {
    const { rows, ...props } = this.props;

    return (
      <div className="data-grid__footer">
        <Table data={rows} {...props} singleSelect />
      </div>
    );
  }
}

export default DataGridFooter;
