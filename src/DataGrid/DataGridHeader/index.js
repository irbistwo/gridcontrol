import React, { Component } from 'react';
import { Table } from '../Table';
//import './styles.css';

class DataGridHeader extends Component {

  prepareData(data, property) {
    return data.map((column) => {
        return column.subColumns ?
        [
          column[property],
          ...column.subColumns.map(subColumn => subColumn[property])
        ] :
        column[property];
      });
  }

  render() {
    const { columns, columnLevels } = this.props;

    return (
      <div className="data-grid__header">
        <Table
          data={[this.prepareData(columns, 'title')]}
          columnWidths={this.prepareData(columns, 'width')}
          columnAligns={this.prepareData(columns, 'align')}
          asTwoLeveledHeader={columnLevels > 1}
         />
      </div>
    );
  }
}

export default React.memo(DataGridHeader);
