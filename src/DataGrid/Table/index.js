import React, { Component } from 'react';
import './styles.css';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRowIndex: -1
    };
    this.$rows = [];
  }

  handleClick(event) {
    if (event.target.tagName !== 'TD') {
      return ;
    }

    const trElement = event.target.parentNode;
    this.setState({
      selectedRowIndex: [...trElement.parentNode.children].indexOf(trElement)
    }, () => {
      this.props.onRowClick(this.state.selectedRowIndex);
    });
  }

  selectRow(index) {
    if (this.props.singleSelect) {
      this.setState({
        selectedRowIndex: index
      }, () => {
        this.$rows[index].scrollIntoView();
      });
    }
  }

  createCell(value, width, align, key, rowSpan, colSpan) {
    return (
      <td
        className="table__cell"
        style={{ width: width + 'px', textAlign: align }}
        key={key}
        rowSpan={rowSpan}
        colSpan={colSpan}
        >
          {value}
      </td>
    );
  }

  createTwoLeveledHeader() {
    const { data, columnWidths, columnAligns } = this.props;
    const $secondRow = [];
    const $firstRow = data.map((row, i) => {
      const $cells = row.map((cell, j) => {
        if (typeof cell === 'object') {
          for (var k = 1; k < cell.length; k++) {
            $secondRow.push(
              this.createCell(cell[k], columnWidths[j][k], columnAligns[j][k], $secondRow.length)
            );
          }
          return this.createCell(cell[0], columnWidths[j][0], columnAligns[j][0], j, undefined, cell.length - 1);
        } else {
          return this.createCell(cell, columnWidths[j], columnAligns[j], j, 2);
        }
      });

      return $cells;
    });

    return (
      <table className="table">
        <tbody>
          <tr className="table__row" key={0}>{$firstRow}</tr>
          <tr className="table__row" key={1}>{$secondRow}</tr>
        </tbody>
      </table>
    );
  }

  createTable() {
    const { data, columnWidths, columnAligns } = this.props;

    const $rows = data.map((row, i) => {
      const $cells = row.map((cell, j) => {
        return this.createCell(cell, columnWidths[j], columnAligns[j], j);
      });
      return (
        <tr
          className={'table__row ' + (this.state.selectedRowIndex === i ? 'table__row_selected' : '')}
          ref={(row) => { this.$rows[i] = row }}
          key={i}
        >
          {$cells}
        </tr>
      );
    });

    return (
      <table className="table" onClick={this.props.singleSelect ? this.handleClick.bind(this) : null} onDoubleClick={this.handleClick.bind(this)}>
        <tbody>
          {$rows}
        </tbody>
      </table>
    );
  }

  componentDidMount() {
      this.selectRow(10);
  }

  render() {
    return this.props.asTwoLeveledHeader ? this.createTwoLeveledHeader() : this.createTable();
  }
}

export { Table };
