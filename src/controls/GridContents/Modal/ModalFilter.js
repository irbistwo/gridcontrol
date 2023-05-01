import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import "./modal.css";
import {guidsmall} from "../../../service/formatutils";
//import {cruidShowPromise} from "./formodaljs/cruidpromise";
import {filterShowPromise} from './formodaljs/filterPromise';

const ModalFilter=(props)=>{
    const{id,is_visible,handleModal}=props;
    let style={};
    if(is_visible) style={display:"block"};


useEffect(()=>{
    /*
 const cruid=   document.getElementById("cruidFirms");
  const modalcont=cruid.querySelector(".modal-body");
    modalcont.innerHTML='<input id="testtext" type="date"/>';
    */
    if(!is_visible) return;
    filterShow();

},[is_visible]);

    const filterShow=async ()=>{
        const guid=guidsmall();
      const maptopost = await  filterShowPromise(id,guid);
        /*var modal = document.getElementById("cruid"+id);
        modal.parentNode.removeChild(modal);
        */
      //  console.log("filterShowended",maptopost);
        handleModal(maptopost);
    }

return (<div id={"filter"+id} className="modal" tabIndex="0" style={style}>
    <div className="modal-content">
        <div className="modal-header">
            <span className="close">×</span>
            <span className="filtertext">Фильтр</span>
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

export default ModalFilter;
