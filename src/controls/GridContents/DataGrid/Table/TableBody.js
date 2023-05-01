import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import './styles.css';
import TableCell from './TableCell.js';

const TаbleBody=(props)=>{
    const {  columnWidths, columnAligns } = props;
    const {  fields,metadata } = props;
    const {rows}=props;
const [singleSelect]=useState(true);
const{selectedIndex}=props;//For locate and highlight after reload data
const [selectedRowIndex,setselectedRowIndex]=useState(selectedIndex);

  const  handleClick=(event)=> {
        if (event.target.tagName !== 'TD') {
            return ;
        }

        const trElement = event.target.parentNode;
        const ind=[...trElement.parentNode.children].indexOf(trElement);
       setselectedRowIndex(ind);

   if(event.type==="dblclick")  props.onRowDoubleClick(ind);
   if(event.type==="click")     props.onRowClick(ind);

    }
    const $rows = rows.map((row, i) => {
        //console.log("row",row);
        const $cells = fields.map((field, j) => {

          /* return TableCell({
                value: row[j],
               field:field,
                width:  columnWidths[j],
                align: columnAligns[j],
                key: j
            });
             */
            return <TableCell key={j} align={columnAligns[j]} field={field} width={columnWidths[j]} value={row[field]}
            metadata={metadata}
            />



        });




        return (
            <tr
                className={'table__row ' + (selectedRowIndex === i ? 'table__row_selected' : '')}
                key={i}
            >
                {$cells}
            </tr>
        );
    });

  useEffect(()=>{
      const elselect=document.querySelector(".table__row_selected");
      elselect.scrollIntoView();
  },[selectedIndex])
return (
        <table className="table" onClick={singleSelect ? handleClick : null} onDoubleClick={handleClick}>
            <tbody>
            {$rows}
            </tbody>
        </table>
    );
}

export default TаbleBody;
