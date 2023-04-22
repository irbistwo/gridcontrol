import React, { Component } from 'react';
import './styles.css';

class DataGridCaption extends Component {
  render() {
    return <div className="data-grid__caption">{this.props.caption}</div>;
  }
}

export default DataGridCaption;
