import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import logo from './logo.svg';
import './App.css';
import DataGrid from './controls/GridContents/DataGrid';
import EmptyGrid from "./controls/GridContents/DataGrid/EmptyGrid";
import {sendPostDataLocation} from "./service/serviceSend";
import {guidsmall} from "./service/formatutils";
import Modal from "./controls/GridContents/Modal/Modal";
// @ts-ignore
import GridContents, {Imaptopost, IParams} from "./controls/GridContents/GridContents.tsx";
const data0 = {
    caption: 'Basic DataGrid',
    width:800,
    height:300,
    columnLevels: 2,
    columns2: [
        { field: 'id', title: 'Item ID', width: '80' },
        { field: 'product', title: 'Product', width: '100' },
        { field: 'listPrice', title: 'List Price', width: '120', align: 'right' },
        { field: 'unitCost', title: 'Unit Cost', width: '80', align: 'right' },
        { field: 'attribute', title: 'Attribute', width: '450' },
        { field: 'status', title: 'Status', width: '60', align: 'center' }
    ],
    columns: [
        { field: 'id', title: 'Item ID', width: '80' },
        { field: 'product', title: 'Product', width: '100' },
        {
          title: 'Item Details',
        //  width: '670',
          align: 'center',
          subColumns: [
            { field: 'listPrice', title: 'List Price', width: '80', align: 'right' },
            { field: 'unitCost', title: 'Unit Cost', width: '80', align: 'right' },
            { field: 'status', title: 'Status', width: '60', align: 'center' },
              { field: 'attribute', title: 'Attribute', width: '450' }
          ]
        }
    ],
    rows: [
        { product: 'FI-SW-01', id: 'EST-1', listPrice: 3600000.521, unitCost: '10', attribute: 'Large', status: 'P', hiddenProperty: 'hiddenValue' },
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
        {product:"Average:",listPrice:"sum"},
        {product:"Строк:",unitCost:"count"}
    ],
    metaData:
        {product:"string",listPrice:"number",unitCost:"integer"},


    /*
    footer: [
      ['', 'Average:', '60.4', '19.8', '', ''],
      ['', 'Total:', '604', '198', '', '']
    ]
    */
};

const App =()=>{
    useEffect(()=>{prepareModalstyle()});

    const prepareModalstyle=()=> {
        const addstyle = (filename: string) => {

            var styles = document.createElement('link');
            styles.rel = 'stylesheet';
            styles.type = 'text/css';
            styles.media = 'screen';
            // styles.href = '/css/cruid.css';
            styles.href = filename;
            document.getElementsByTagName('head')[0].appendChild(styles);
        }

        addstyle("/css/dbgridreach.css");
        addstyle("/css/viewgrid.css");
//addstyle('/css/cruid.css');
        addstyle("/css/style-jtag.css");
        addstyle("/css/stylecombo.css");
        addstyle("/css/notif.css");


    }
    let maptopost:Imaptopost = {};
    let paramarray=[];
    let paramarraystatic=[];
    // let wherearray=[];
    let wherearray=["name like :name||'%'"];

    let paramid:IParams={};
    paramid.name="NAME";
    paramid.t="string";
    paramid.v="К%";
    paramarray.push(paramid);
    paramarraystatic.push(paramid);
    paramid={};
    paramid.name="INDEF";
    paramid.t="integer";
    paramid.v=0;
    paramarray.push(paramid);
    paramarraystatic.push(paramid);
    maptopost.params=paramarray;
    maptopost.where=wherearray;
    maptopost.table="section";
    maptopost.sqlnumber=2;
    maptopost.guid=guidsmall();
    maptopost.task="view";
   return( <GridContents id={"goods"} caption={"Товары"}  initmaptopost={maptopost} staticinnerparams={paramarraystatic}/>)
}

export default App;
