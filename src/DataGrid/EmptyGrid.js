
import React, {useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect} from "react";
import wait from '../assets/wait.gif';
export const EmptyGrid =()=>{

    return (<div className="data-grid" stype={{height:"400px"}}>
        <img src={wait} alt={"wait"}/>
    </div>)

}
