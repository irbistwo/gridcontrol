import React, { Component } from 'react';
import DataGridCaption from './DataGridCaption';
import DataGridHeader from './DataGridHeader';
import DataGridBody from './DataGridBody';
import DataGridFooter from './DataGridFooter';
import './styles.css';

class DataGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: props.data.rows || [],
      footer: props.data.footer || []
    }
  }

  setData(data) {
    if (data.rows) {
      this.setState({ rows: data.rows });
    }

    if (data.footer) {
      this.setState({ footer: data.footer });
    }
  }

  handleUpdateDataButtonClick() {
    this.setData({
      rows: [...this.state.rows.slice(1), this.state.rows[0]],
      footer: [...this.state.footer.slice(1), this.state.footer[0]]
    });
  }

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

    return [
      <div className="data-grid">
        <DataGridCaption caption={data.caption} />
        <DataGridHeader columns={data.columns} columnLevels={data.columnLevels} />
        <DataGridBody rows={this.state.rows} fields={fields} columnWidths={columnWidths} columnAligns={columnAligns} />
        <DataGridFooter rows={this.state.footer} columnWidths={columnWidths} columnAligns={columnAligns} />
      </div>,
      <input type="submit" value="Update data" onClick={this.handleUpdateDataButtonClick.bind(this)}/>
    ];
  }
}

export default DataGrid;
