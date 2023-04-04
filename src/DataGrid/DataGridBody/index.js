import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import { Table } from '../Table';
import './styles.css';
import TableBody from "../Table/TableBody";

const DataGridBody= (props)=> {
  const {rows, ...props0 } = props;
  const {height}=props;

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
        const target = document.querySelector(".data-grid__body");
        const elemsToSync = document.querySelector(".data-grid__header");

        target.addEventListener('scroll', (event) => {

//console.log(target.scrollLeft);

            elemsToSync.style.marginLeft = -target.scrollLeft + 'px';


        });

    }

const  handleOnRowClick=(index)=> {
    console.log(rows[index]);
  }

const  handleOnRowDoubleClick=(index)=> {
    console.log(rows[index]);
  }



    return (
      <div className="data-grid__body " style={{  height: height+"px" }}>
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
