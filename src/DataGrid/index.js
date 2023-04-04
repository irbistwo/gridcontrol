import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import DataGridCaption from './DataGridCaption';
import DataGridHeader from './DataGridHeader';
import DataGridBody from './DataGridBody';
import DataGridFooter from './DataGridFooter';
//import './styles.css';
import './dbgridreach.css';
import {format1} from "../service/formatutils";

const DataGrid=(props)=> {
const { data }=props;
    const {caption}=props;
    const {width,height}=data;
   // const [data,setData]=useState(props.data);

  //  useEffect(() => { setData(data) }, [data]);
    useEffect(()=>{
        /// console.log(data.rows.length);
        console.log("comingdata",data.rows.length,data.rows);
    })
  /*constructor(props) {
    console.log("comingdata",props.data.rows.length,props.data.rows);
    super(props);
    this.state = {
      rows: props.data.rows || [],
      footer: props.data.footer || []
    }
  }
  */


/*
 const handleUpdateDataButtonClick=()=> {
    this.setData({
      rows: [...this.state.rows.slice(1), this.state.rows[0]],
      footer: [...this.state.footer.slice(1), this.state.footer[0]]
    });
  }
  */

const  prepareColumnsData=(columns, property)=> {
    return columns.reduce((result, column) => {
      return column.subColumns ?
          [
            ...result,
            ...column.subColumns.map(subColumn => subColumn[property])
          ] :
          [
            ...result,
            column[property]
          ];
    }, []);
  }

    const fields = prepareColumnsData(data.columns, 'field');
    const columnWidths = prepareColumnsData(data.columns, 'width');
    const columnAligns = prepareColumnsData(data.columns, 'align');

    const get_sum=(field)=> {
       const sum=data.rows.reduce((s,row)=>s+parseFloat(row[field]),0);
        //sum=number.toFixed(2);
       return format1(sum," ");
    }
    const prepareFooterToArray=(footer)=>{
      let  result=[];
      if(!footer) return [];
        footer.forEach((footeritem)=>{
            let fieldtemp=new Array(fields.length);
            fieldtemp.fill(" ");
            fields.forEach((field,i)=>{

              if(footeritem[field]) {fieldtemp[i]=footeritem[field];
              if(fieldtemp[i]==="count") fieldtemp[i]=data.rows.length;
              if(fieldtemp[i]==="sum") fieldtemp[i]=get_sum(field);
              }

          });
            result.push(fieldtemp);
      })
        console.log("footer",result);
        return result;
    };

  //  prepareFooterToArray(data.footer);
    return (
        <>
            {/* <div>{caption}</div>*/}
      <div className="data-grid"  style={{ width: width+"px"}}>
          <div className="data-grid__view_scrollable">
        <DataGridCaption caption={data.caption} />
            <DataGridHeader columns={data.columns} columnLevels={data.columnLevels} />
        <DataGridBody rows={data.rows} fields={fields} columnWidths={columnWidths} columnAligns={columnAligns} height={height}
            metadata={data.metaData}
            />
        <DataGridFooter rows={prepareFooterToArray(data.footer)} columnWidths={columnWidths} columnAligns={columnAligns} />
              </div>
      </div>
        </>
    );

}

export default DataGrid;
