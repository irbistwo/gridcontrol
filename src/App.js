import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import logo from './logo.svg';
import './App.css';
import DataGrid from './DataGrid';
import EmptyGrid from "./DataGrid/EmptyGrid";
import {sendPostDataLocation} from "./service/serviceSend";
import {guidsmall} from "./service/formatutils";
import Modal from "./Modal/Modal";

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
   // const [data, setData] = useState({...data0});
    const [data, setData] = useState({});
    const [caption, setCaption] = useState("One");
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalVisible, setmodalVisible] = useState(false);

    const handleModal=(maptopost)=>{
        setmodalVisible(false);
    }
  const  handleUpdateDataButtonClick= useCallback(()=> {
     // console.log("click",data.rows.length,data.rows);
    const newdata={...data};
     // const newdata=data;
    newdata.rows=newdata.rows.slice(1);
      setmodalVisible(true);
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
    const get_data1=()=>{
        if(isLoaded) return;
         setTimeout(()=>{setData(data0);
             setIsLoaded(true);
             },1500);

    };
const prepareModalstyle=()=> {
    const addstyle = (filename) => {

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


    }
const get_data=()=>{
   // console.log("newdatarow",data.rows);
    if(isLoaded) return;
   /* setTimeout(()=>{setData(data0);
        setIsLoaded(true);
        },3000);
    */
   // return data;

    let maptopost={};
    let paramarray=[];
   // let wherearray=[];
    let wherearray=["name like :name||'%'"];

    let paramid={};
    paramid.name="NAME";
    paramid.t="string";
    paramid.v="К";
    paramarray.push(paramid);
    maptopost.params=paramarray;
    maptopost.where=wherearray;
    maptopost.table="section";maptopost.sqlnumber=2;
    maptopost.guid=guidsmall();
    maptopost.task="view";
    //console.log(maptopost);
    sendPostDataLocation(maptopost,(error,result)=>{
        if(error) throw error;
        console.log(result);
        let jsonres=JSON.parse(result);
        jsonres.columns=  [
            { field: 'SNAME', title: 'Кор Имя', width: '80' ,align:"left"},
            { field: 'NAME', title: 'Наименование', width: '200' ,align:"left"},
            { field: 'KOEFSHOP', title: 'Коэф', width: '100' ,align:"center"}
        ];
       /* jsonres.metaData=
        {SNAME:"string",NAME:"string"};
        */
        console.log(jsonres);
        setData(jsonres);
        setIsLoaded(true);
        prepareModalstyle();

    });



}
useEffect(()=>get_data());
    return (
      <div className="App">

          {isLoaded?  <DataGrid data={data} caption={caption} id={"one"}/>:<EmptyGrid/> }
           <input type="button" value="Update data" onClick={handleUpdateDataButtonClick}/>
          <Modal is_visible={modalVisible} handleModal={handleModal} id={"goods"} rowid={50993}/>
      </div>
    );

}

export default App;
