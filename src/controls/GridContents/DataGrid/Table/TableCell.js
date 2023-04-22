import React from 'react';
import resizeHelper from '../resizeHelper.js';
import {format1} from "../../../../service/formatutils";

const TableCell = ({ value, field, width, align,metadata,  rowSpan, colSpan, resizeEnabled, onResizeStart }) => {
let value0=value;
if(metadata[field]) {
    if(metadata[field]==="number") {
        let snumber=Number.parseFloat(value);
       // value0=number.toFixed(2);
        value0=format1(snumber," ");
    }
}
  return (
    <td
      className="table__cell"
      style={{ width: width+"px", textAlign: align }}
      rowSpan={rowSpan}
      colSpan={colSpan}
      >
        {value0}
        {
          resizeEnabled &&
          <div className="data-grid__resize-bar" field={field} onMouseDown={(e) => { resizeHelper.start.call(null, e, onResizeStart) }}>
          </div>
        }
    </td>
  );
};

export default TableCell;
