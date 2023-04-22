import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import { Table } from '../Table';
import './styles.css';
import TableBody from "../Table/TableBody";

const DataGridBody= (props)=> {
  const {rows, ...props0 } = props;
  const {height}=props;
const {id}=props;
const{onClick,onDbClick}=props;
const  prepareRowsData=(rows)=> {
    return rows.map(row => props.fields.map(field => row[field]));
  }
   // const rows0=[...prepareRowsData(rows)];
   // console.log("[rops",props0);
   // const [rowsRaw,setRowsRaw]=useState([...prepareRowsData(rows)]);

const get_RowsRaw=()=>{
    const rows0=[...prepareRowsData(rows)];
    return rows0;
}

/*
    useEffect(()=>{

        console.log("gridbody",rowsRaw);
       // setRowsRaw(rows0);
    },[rowsRaw])
*/
    useEffect(()=>{
        scrolHeader();

    })

    function scrolHeader(){
        const gridbody=document.getElementById(id);
        if(!(gridbody)) return;
        const target = gridbody.querySelector(".data-grid__body");
        const elemsToSync = gridbody.querySelector(".data-grid__header");
        const elemsToSync2 = gridbody.querySelector(".data-grid__footer");

        target.addEventListener('scroll', (event) => {

//console.log(target.scrollLeft);

            elemsToSync.style.marginLeft = -target.scrollLeft + 'px';
            elemsToSync2.style.marginLeft = -target.scrollLeft + 'px';


        });

    }

const  handleOnRowClick=(index)=> {
    console.log(rows[index]);
    onClick(rows[index]);
  }

const  handleOnRowDoubleClick=(index)=> {
    console.log(rows[index]);
    onDbClick(rows[index])
  }



    return (
      <div className="data-grid__body " style={{  height: height+"px" }} >
        <TableBody
          rows={rows}
          {...props0}
          singleSelect
          onRowClick={handleOnRowClick}
          onRowDoubleClick={handleOnRowDoubleClick}
        />
      </div>
    );

}

export default DataGridBody;
