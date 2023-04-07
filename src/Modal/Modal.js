import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import "./modal.css";
const Modal =(props)=>{
const{is_visible,handleModal}=props;
let style={};
if(is_visible) style={display:"block"};
    const  handleUpdateDataButtonClick=()=>{
        const text=   document.getElementById("testtext");
        console.log("value",text.value);
        handleModal(null);
    }

    useEffect(()=>{
     const cruid=   document.getElementById("cruidFirms");
      const modalcont=cruid.querySelector(".modal-body");
        modalcont.innerHTML='<input id="testtext" type="date"/>';
    })
    return (<div id="cruidFirms" className="modal" tabIndex="0" style={style}>
        <div className="modal-content">
            <div className="modal-header">
                <span className="close">×</span>
                <span className="filtertext">Добавление Изменение-Удаление</span>
            </div>
            <div className="modal-body">
            </div>
    <div className="modal-footer">
        <button type="button" className="button doaction" id="docruid"
                onClick={handleUpdateDataButtonClick}>Применить</button>
        <button type="button" className="button" id="cancel">Cancel</button>
        <button type="button" className="button" id="delete">Удалить</button>
    </div>
        </div>
</div>)
}
export default Modal;
