import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DataGrid from './DataGrid';

const data = {
    caption: 'Basic DataGrid',
    columnLevels: 2,
    /*columns: [
        { field: 'id', title: 'Item ID', width: '80' },
        { field: 'product', title: 'Product', width: '100' },
        { field: 'listPrice', title: 'List Price', width: '80', align: 'right' },
        { field: 'unitCost', title: 'Unit Cost', width: '80', align: 'right' },
        { field: 'attribute', title: 'Attribute', width: '250' },
        { field: 'status', title: 'Status', width: '60', align: 'center' }
    ],*/
    columns: [
        { field: 'id', title: 'Item ID', width: '80' },
        { field: 'product', title: 'Product', width: '100' },
        {
          title: 'Item Details',
          width: '450',
          align: 'center',
          subColumns: [
            { field: 'listPrice', title: 'List Price', width: '80', align: 'right' },
            { field: 'unitCost', title: 'Unit Cost', width: '80', align: 'right' },
            { field: 'attribute', title: 'Attribute', width: '250' },
            { field: 'status', title: 'Status', width: '60', align: 'center' }
          ]
        }
    ],
    rows: [
        { id: 'EST-1', product: 'FI-SW-01', listPrice: '36.5', unitCost: '10', attribute: 'Large', status: 'P', hiddenProperty: 'hiddenValue' },
        { id: 'EST-10', product: 'K9-DL-01', listPrice: '18.5', unitCost: '12', attribute: 'Spotted Adult Female', status: 'P' },
        { id: 'EST-11', product: 'RP-SN-01', listPrice: '38.5', unitCost: '12', attribute: 'Venomless', status: 'P' },
        { id: 'EST-12', product: 'RP-SN-01', listPrice: '26.5', unitCost: '12', attribute: 'Rattleless', status: 'P' },
        { id: 'EST-13', product: 'RP-LI-02', listPrice: '35.5', unitCost: '12', attribute: 'Green Adult', status: 'P' },
        { id: 'EST-14', product: 'FL-DSH-01', listPrice: '158.5', unitCost: '12', attribute: 'Tailless', status: 'P' },
        { id: 'EST-15', product: 'FL-DSH-01', listPrice: '83.5', unitCost: '12', attribute: 'With tail', status: 'P' },
        { id: 'EST-16', product: 'FL-DLH-02', listPrice: '23.5', unitCost: '12', attribute: 'Adult Female', status: 'P' },
        { id: 'EST-17', product: 'FL-DLH-02', listPrice: '89.5', unitCost: '12', attribute: 'Adult Male', status: 'P' },
        { id: 'EST-18', product: 'AV-CB-01', listPrice: '63.5', unitCost: '92', attribute: 'Adult Male', status: 'P' },
        { id: 'EST-19', product: 'K9-DL-01', listPrice: '18.5', unitCost: '12', attribute: 'Spotted Adult Female', status: 'P' },
        { id: 'EST-20', product: 'RP-SN-01', listPrice: '38.5', unitCost: '12', attribute: 'Venomless', status: 'P' },
        { id: 'EST-21', product: 'RP-SN-01', listPrice: '26.5', unitCost: '12', attribute: 'Rattleless', status: 'P' },
        { id: 'EST-22', product: 'RP-LI-02', listPrice: '35.5', unitCost: '12', attribute: 'Green Adult', status: 'P' },
        { id: 'EST-23', product: 'FL-DSH-01', listPrice: '158.5', unitCost: '12', attribute: 'Tailless', status: 'P' },
    ],
    footer: [
      ['', 'Average:', '60.4', '19.8', '', ''],
      ['', 'Total:', '604', '198', '', '']
    ]
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <DataGrid data={data} />
      </div>
    );
  }
}

export default App;
