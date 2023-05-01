import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import "./modal.css";
//import './style-jtag.css';
//import './stylecombo.css';
//import './tabs.css';
import {cruidShowPromise} from "./formodaljs/cruidpromise";
import {guidsmall} from "../../../service/formatutils";
const Modal =(props)=>{
const{id,rowid,is_visible,handleModal,exectype}=props;
let style={};
if(is_visible) style={display:"block"};
    const  handleUpdateDataButtonClick=(e)=>{
       // const text=   document.getElementById("testtext");
        console.log("value",e);
        handleModal(null);
    }

    useEffect(()=>{
        /*
     const cruid=   document.getElementById("cruidFirms");
      const modalcont=cruid.querySelector(".modal-body");
        modalcont.innerHTML='<input id="testtext" type="date"/>';
        */
        if(!is_visible) return;
        crudShow();

    });

    const crudShow=async ()=>{
        const guid=guidsmall();
        let RowId=rowid;
        if(exectype===0) RowId=0;
        await  cruidShowPromise(id,RowId,exectype,null,guid);
        /*var modal = document.getElementById("cruid"+id);
        modal.parentNode.removeChild(modal);
        */
        console.log("crudShowended");
        handleModal(null);
    }
    return (<div id={"cruid"+id} className="modal" tabIndex="0" style={style}>
        <div className="modal-content">
            <div className="modal-header">
                <span className="close">×</span>
                <span className="filtertext">Добавление Изменение-Удаление</span>
            </div>
            <div className="modal-body">
            </div>
            {/*  <div className="modal-footer">
        <button type="button" className="button doaction" id="docruid"
                onClick={handleUpdateDataButtonClick}>Применить</button>
        <button type="button" className="button" id="cancel">Cancel</button>
        <button type="button" className="button" id="delete">Удалить</button>
    </div>
            */}
        </div>
</div>)
}
export default Modal;
