// @ts-ignore
import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import './CruidButtinPanel.css';
interface ICallback {
    onAdd:(e:any|null)=>void
    onUpdate:(e:any|null)=>void
    onFilter:(e:any|null)=>void
}
interface IProp {
    callback:ICallback
}
const CruidButtinPanel:React.FC<ICallback>=({onAdd,onUpdate,onFilter}:ICallback)=>{

    return (
        <div className="datagrid-toolbar">

                        <a  className="l-btn l-btn-small l-btn-plain" onClick={onAdd}>

<span className="l-btn-left l-btn-icon-left">
<span className="l-btn-text">Add</span>
<span className="l-btn-icon icon-add">&nbsp;</span>
</span>

                        </a>

                        <a  className="l-btn l-btn-small l-btn-plain" onClick={onUpdate}>
<span className="l-btn-left l-btn-icon-left"><span className="l-btn-text">Cut</span>
<span className="l-btn-icon icon-cut">&nbsp;</span>
</span></a>

                        <div className="datagrid-btn-separator"></div>



                        <a  className="l-btn l-btn-small l-btn-plain" onClick={onFilter}>
<span className="l-btn-left l-btn-icon-left"><span className="l-btn-text">Save</span>
<span className="l-btn-icon icon-save">&nbsp;</span>
</span></a>



        </div>
    )
}

export default CruidButtinPanel;
