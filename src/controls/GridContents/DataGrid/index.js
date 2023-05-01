import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import DataGridCaption from './DataGridCaption';
import DataGridHeader from './DataGridHeader';
import DataGridBody from './DataGridBody';
import DataGridFooter from './DataGridFooter';
//import './styles.css';
import './dbgridreach.css';
import {format1} from "../../../service/formatutils";
import CruidButtinPanel from "../CruidButtinPanel.tsx";


const DataGrid=(props)=> {
const { data }=props;
    const {caption}=props;
    const{onClick,onDbClick,onUpdate,onAdd,onFilter}=props;
    const {width,height}=data;
    const {selectedIndex}=props;
   // const [data,setData]=useState(props.data);

  //  useEffect(() => { setData(data) }, [data]);
    useEffect(()=>{
        /// console.log(data.rows.length);
       // console.log("comingdata",data.rows.length,data.rows);
    })


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
          <CruidButtinPanel onUpdate={onUpdate} onAdd={onAdd} onFilter={onFilter}/>
          <div className="data-grid__view_scrollable"  id={props.id}>
        <DataGridCaption caption={caption} />
            <DataGridHeader columns={data.columns} columnLevels={data.columnLevels} />
        <DataGridBody rows={data.rows} fields={fields} columnWidths={columnWidths} columnAligns={columnAligns} height={height}
            metadata={data.metaData}  id={props.id} onClick={onClick} onDbClick={onDbClick} selectedIndex={selectedIndex}
            />
        <DataGridFooter rows={prepareFooterToArray(data.footer)} columnWidths={columnWidths} columnAligns={columnAligns} />
              </div>
      </div>
        </>
    );

}

export default DataGrid;
