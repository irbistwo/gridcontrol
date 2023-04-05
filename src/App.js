import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import logo from './logo.svg';
import './App.css';
import DataGrid from './DataGrid';

const data0 = {
    caption: 'Basic DataGrid',
    width:800,
    height:300,
    columnLevels: 2,
    columns1: [
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
    const [data, setData] = useState({...data0});
    const [caption, setCaption] = useState("One");

  const  handleUpdateDataButtonClick= useCallback(()=> {
     // console.log("click",data.rows.length,data.rows);
    const newdata={...data};
     // const newdata=data;
    newdata.rows=newdata.rows.slice(1);
      //newdata.rows=[...data.rows.slice(1), data.rows[0]];
     // newdata.rows=[...newdata.rows.slice(1)];
      //setCaption(caption+"1");
    // console.log("newdatarow",newdata.rows);
      setData(newdata);
       /* setData({
            rows: [...data0.rows.slice(1), data.rows[0]],
            footer: [...data0.footer.slice(1), data.footer[0]],

        });
      */

    },[data,caption]);
const get_data=()=>{
    console.log("newdatarow",data.rows);
    return data;
}
    return (
      <div className="App">

          <DataGrid data={data} caption={caption} id={"one"}/>
           <input type="button" value="Update data" onClick={handleUpdateDataButtonClick}/>
      </div>
    );

}

export default App;
