import React, { Component } from 'react';
import DataGridCaption from './DataGridCaption';
import DataGridHeader from './DataGridHeader';
import DataGridBody from './DataGridBody';
import DataGridFooter from './DataGridFooter';
import './styles.css';

class DataGrid extends Component {

  prepareColumnsData(columns, property) {
    return columns.reduce((result, column) => {
      return column.subColumns ?
          [
            ...result,
            ...column.subColumns.map(subColumn => subColumn[property])
          ] :
          [
            ...result,
            column[property]
          ];
    }, []);
  }

  render() {
    const { data } = this.props;
    const fields = this.prepareColumnsData(data.columns, 'field');
    const columnWidths = this.prepareColumnsData(data.columns, 'width');
    const columnAligns = this.prepareColumnsData(data.columns, 'align');

    return (
      <div className="data-grid">
        <DataGridCaption caption={data.caption} />
        <DataGridHeader columns={data.columns} columnLevels={data.columnLevels} />
        <DataGridBody rows={data.rows} fields={fields} columnWidths={columnWidths} columnAligns={columnAligns} />
        <DataGridFooter rows={data.footer} columnWidths={columnWidths} columnAligns={columnAligns} />
      </div>
    );
  }
}

export default DataGrid;
