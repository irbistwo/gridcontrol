import {sendPostDataLocation} from "../../service/serviceSend";
import {inittabpanemodal} from "./tabpanemodal";
import {loadRow, prepareArrayFromModal} from "./cruid";
import {comboprepare} from "./combocontrol2";
import {notif_error,notif} from "./notif";
var twiceerror=null;
export function cruidShowPromise(idcruid,id,vari,maptopost,guid) {
return new Promise((resolve,reject)=> {
  twiceerror=null;
  var modal = document.getElementById("cruid"+idcruid);
  var modalclone=modal.cloneNode(true);
  modal.parentNode.replaceChild(modalclone, modal);
  modal = document.getElementById("cruid"+idcruid);
  var sqlexec=idcruid;
  var table=idcruid;
/*BEGIN CallBack*/
  function cb(error,result){
  //  console.log(error,result);
  if (error===null) {
modal.innerHTML=result;
comboprepare("cruid"+idcruid);
  inner();
//  let firstcontroltofocus = modal.getElementById("firstcontroltofocus");
   let firstcontroltofocus = modal.querySelector("input[firstcontroltofocus='true']");
    if(firstcontroltofocus!==null) firstcontroltofocus.focus();
/*Tabpanel assign evemts*/
    inittabpanemodal("cruid"+idcruid);
  //initsaveBrowserLocaly(modal);
 /*   try{
    scanprepare(modal);
  }catch (error)
  {console.log(error);}
*/

  }
    else  /*error*/ notif_error(error);



  }
  /*End CallBack*/
  /*BEGIN for refresh after CRUID check is it loaded filter params becouse if filter
  not applied than filter div will empty*/

  /*END for refresh after CRUID vheck is it loaded filter params*/
if(maptopost) {
sqlexec=maptopost.sqlexec;
table=maptopost.table;
  loadRowMaptopost(maptopost,cb);}
else
  loadRow(idcruid,id,guid,cb);
//LoadModal

  const eventlistener=function(event){
   //console.log(event.keyCode);
   if(event.keyCode===27/*ESC*/) {
     modal.style.display = "none";
     resolve();
   }
  if(event.keyCode===13) {
    let focusel=  document.activeElement;
  if((focusel.className==="text")) return;
   //modal.style.display = "none";
   if(modal.style.display === "none") return;
   //console.log("ID5=",id);
    // modal.removeEventListener("keyup", eventlistener,false);
  let promise= docruidonePromise(idcruid,sqlexec,table,vari,id,guid);
 promise.then((res,rej)=>resolve()) ;
  }
  };
   modal.addEventListener("keyup",eventlistener,false);

// Get the button that opens the modal

function inner(){
var btn = modal.querySelector("#docruid");
var cancel = modal.querySelector("#cancel");
var btndel = modal.querySelector("#delete");
// Get the <span> element that closes the modal
var span = modal.getElementsByClassName("close")[0];




// When the user clicks the button, open the modal
if(vari==0){
  btn.textContent="Добавить";
  btndel.style.display = "none";
}
if(vari==4){
  btn.textContent="Добавить по подобию";
  btndel.style.display = "none";
}
btn.onclick = async function() {
  //modal.style.display = "block";
await  docruidonePromise(idcruid,sqlexec,table,vari,id,guid);
resolve();
}

cancel.onclick = function() {
  modal.style.display = "none";

  resolve();
}

btndel.onclick = async function() {
  //modal.style.display = "block"
  if(btndel.click===1) {
    let varidel=1;
await  docruidonePromise(idcruid,sqlexec,table,varidel,id,guid);
resolve();
}else {
  btndel.click=1;
  btndel.textContent="Еще раз для подтверждения";
}

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  resolve();
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resolve();
  }
}

modal.style.display = "block";
//return modal;
}
});
}


function docruidonePromise(idtable,sqlexec,table,varicruid,id,guid){
return new Promise((resolve,reject)=> {
  function cb(error,result){
  if (error===null) {
    console.log(result);
    let resjson=JSON.parse(result);
    console.log(resjson);
    if(resjson.Error){
    if (twiceerror===null) twiceerror=1; else twiceerror++;
      notif_error(resjson.Error);
      return;
    }
    let table = document.getElementById(idtable);

      let modal2 = document.getElementById("cruid"+idtable);
      modal2.style.display = "none";
     /* let pagePagination=1;
       let paginationdiv = document.getElementById(idtable+"tbpg");

        if(paginationdiv){
        let liactive=paginationdiv.querySelector("li.active");
        if(liactive) pagePagination=liactive.getAttribute("data-page");
      }*/
      if(resjson.execFunc===undefined);
     // dofilterone(idtable,pagePagination,id,"refresh"+guid);
      else { resjson.guid=guid;resjson.idtable=idtable;resjson.sqlexec=sqlexec;
        resjson.pagePagination=pagePagination;resjson.id=id;
         executeFunctionByName(resjson.execFunc,window,resjson);}

      if(resjson.Message){  notif(resjson.Message);}
      /*
  table.innerHTML=result;
  getPagination("#"+idtable+"tb");
  */
  resolve();
  }
  else {
    if (twiceerror===null) twiceerror=1; else twiceerror++;
    notif_error(error);
  }

  }

  let modal = document.getElementById("cruid"+idtable);
//console.log("dofilter "+idtable);

let maptopost={};
let paramarray=[];
let wherearray=[];
let paramvaricruid={};
paramvaricruid.name="VARI";/*0 insert, 1 delete ,2 update or else depends database logic*/
paramvaricruid.t="integer";
paramvaricruid.v=varicruid;
let paramid={};
paramid.name="ID";
paramid.t="integer";
paramid.v=id;
paramarray.push(paramid);
paramarray.push(paramvaricruid);
//slaveparams(paramarray,idtable,id);
prepareArrayFromModal(modal,paramarray);
if(twiceerror===null) twiceerror="";
maptopost.params=paramarray;
maptopost.where=wherearray;
maptopost.table=table;
maptopost.sqlexec=sqlexec;
maptopost.guid=guid+twiceerror;
maptopost.task="cruid";
 //console.log(maptopost);
 sendPostDataLocation(maptopost,cb);
});
}



// When the user clicks anywhere outside of the modal, close it
