import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import DataGrid from "./DataGrid";
import Modal from './Modal/Modal';
import EmptyGrid from "./DataGrid/EmptyGrid";
import {sendPostDataLocation} from "../../service/serviceSend";
import {guidsmall} from "../../service/formatutils";
import CruidButtinPanel from "./CruidButtinPanel.tsx";


const GridContents =(props:any)=> {
    const idtable=props.id;
    // const [data, setData] = useState({...data0});
    const [data, setData] = useState({});
    const [caption, setCaption] = useState(props.caption);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalVisible, setmodalVisible] = useState(false);
    const [row,setRow]=useState({ID:0});
    const [selectedIndex,setselectedIndex]=useState(0);
   const[exectype,setExectype]=useState(2);
    const handleModal=(maptopost:any)=>{
        setIsLoaded(false);
        setmodalVisible(false);

        //  const i=locate(row.ID);
        //setselectedIndex(i);
        //  get_data();


    }
    const locate=(rows:any,id:number)=>{
        let i=0;
        rows.some((row: { ID: number; }, index: number) => {
            if(row.ID===id){i=index; return true;}
        });
        return i;
    }
    const  handleUpdateDataButtonClick= useCallback(()=> {
        // console.log("click",data.rows.length,data.rows);
        /*  const newdata={...data};
           // const newdata=data;
          newdata.rows=newdata.rows.slice(1);
          */
        setmodalVisible(true);

        //  setData(newdata);

    },[data,caption]);
    const onUpdate=()=>{
        setExectype(2);
        setmodalVisible(true);
    }
    const onAdd=()=>{
        setExectype(0);
        setmodalVisible(true);
    }
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


    const get_data=()=>{
        // console.log("newdatarow",data.rows);
        if(isLoaded) return;
        const id=row.ID;
        let selindex=0
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
            //  console.log(result);
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
            if(jsonres.rows.length>0) {
                if(id!==0) selindex=locate(jsonres.rows,id);
                setRow(jsonres.rows[selindex]);

            }
            setData(jsonres);
            setIsLoaded(true);
            setselectedIndex(selindex);
            //prepareModalstyle();

        });



    }
    useEffect(()=>get_data());
    const onClickRow=(row:any)=>{
        //console.log("click",row);
        setRow(row);
    }
    const onDbClickRow=(row:any)=>{
        // console.log("dbclick",row);
        setRow(row);
      //  setExectype(2);
        onUpdate();
        handleUpdateDataButtonClick();
    }
    return (
        <div className="App">

            {isLoaded?  <DataGrid data={data} caption={caption} id={idtable} onClick={onClickRow}
            onUpdate={onUpdate} onAdd={onAdd} onDbClick={onDbClickRow} selectedIndex={selectedIndex}
            />:<EmptyGrid/> }
            {/*<input type="button" value="Update data" onClick={handleUpdateDataButtonClick}/> */}
          <div id={"separatorReactNode"}></div>

            <Modal is_visible={modalVisible} handleModal={handleModal} id={idtable} rowid={row.ID} exectype={exectype}/>
        </div>
    );

}


export default GridContents;
