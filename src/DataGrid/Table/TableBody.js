import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import './styles.css';
import TableCell from './TableCell.js';

const TаbleBody=(props)=>{
    const {  columnWidths, columnAligns } = props;
    const {  fields,metadata } = props;
    const {rows}=props;
    console.log("metada",metadata);
const [singleSelect]=useState(true);
const [selectedRowIndex,setselectedRowIndex]=useState(0);

  const  handleClick=(event)=> {
        if (event.target.tagName !== 'TD') {
            return ;
        }

        const trElement = event.target.parentNode;
        const ind=[...trElement.parentNode.children].indexOf(trElement);
       setselectedRowIndex(ind);
    props.onRowClick(ind);

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

return (
        <table className="table" onClick={singleSelect ? handleClick : null} onDoubleClick={handleClick}>
            <tbody>
            {$rows}
            </tbody>
        </table>
    );
}

export default TаbleBody;