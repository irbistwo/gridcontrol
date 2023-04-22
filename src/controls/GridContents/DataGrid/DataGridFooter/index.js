import React, { Component } from 'react';
import { Table } from '../Table';
//import './styles.css';

const DataGridFooter =(props)=> {
  const { rows, ...props0 } = props;



    return (
      <div className="data-grid__footer">
        <Table data={rows} {...props0}  />
      </div>
    );

}

export default DataGridFooter;
