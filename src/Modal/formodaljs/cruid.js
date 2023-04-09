import {sendPostDataLocation} from "../../service/serviceSend";
import {inittabpanemodal} from "./tabpanemodal";
import {notif_error,notif} from "./notif";
var twiceerror=null;
export function cruidShow(idcruid,id,vari,maptopost,guid) {
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
scanprepare(modal);
initsaveBrowserLocaly(modal);
  }
    else  /*error*/ notif_error(error);



  }
  /*End CallBack*/
  /*BEGIN for refresh after CRUID check is it loaded filter params becouse if filter
  not applied than filter div will empty*/
  if(countLoadfilter===0) loadFilerRow(idcruid,"firstFilter"+guid,(error,result)=>{
    console.log("idle filter download ",countLoadfilter);
    if (error===null) {
        const modalfilter = document.getElementById("filter"+idcruid);
        if(modalfilter===null) console.log('%c modalfilter is null probably diferent logic filter+'+idcruid, 'background: #222; color: #bada55');
    /*   if(modalfilter!==null)*/  modalfilter.innerHTML=result;
  }
  });
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
   }
  if(event.keyCode===13) {
    let focusel=  document.activeElement;
  if((focusel.className==="text")) return;
   //modal.style.display = "none";
   if(modal.style.display === "none") return;
   //console.log("ID5=",id);
    // modal.removeEventListener("keyup", eventlistener,false);
   docruidone(idcruid,sqlexec,table,vari,id,guid);

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
btn.onclick = function() {
  //modal.style.display = "block";
  docruidone(idcruid,sqlexec,table,vari,id,guid);
}

cancel.onclick = function() {
  modal.style.display = "none";
  if(id!==null) {
      let tablereg = document.getElementById(idcruid);
      let tr=  tablereg.querySelector("tr[id='"+id+"']");
//  tr.style.background="yellow";
if(tr!==null)  tr.style.background="";
  }
}

btndel.onclick = function() {
  //modal.style.display = "block"
  if(btndel.click===1) {
    let varidel=1;
  docruidone(idcruid,sqlexec,table,varidel,id,guid);
}else {
  btndel.click=1;
  btndel.textContent="Еще раз для подтверждения";
}

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

modal.style.display = "block";
//return modal;
}
}

function insert(idtable) {
//  cruid(idtable,null);
let vari=0;//insert;
let guid=guidsmall();
cruidShow(idtable,null,vari,null,guid);
}

function cruid(idtable,id) {

//  let modal = cruidShow(idtable,id);
let vari=2;//Update
let guid=guidsmall();
 cruidShow(idtable,id,vari,null,guid);
//  modal.style.display = "block";
  /*
//  let firstcontroltofocus = modal.getElementById("firstcontroltofocus");
 let firstcontroltofocus = modal.querySelector("input[firstcontroltofocus='true']");
  if(firstcontroltofocus!==null) firstcontroltofocus.focus();
  */
}

function docruidone(idtable,sqlexec,table,varicruid,id,guid){
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
      let pagePagination=1;
        let paginationdiv = document.getElementById(idtable+"tbpg");
if(paginationdiv){
        let liactive=paginationdiv.querySelector("li.active");
        if(liactive) pagePagination=liactive.getAttribute("data-page");
      }
      if(resjson.execFunc===undefined)
      dofilterone(idtable,pagePagination,id,"refresh"+guid);
      else { resjson.guid=guid;resjson.idtable=idtable;resjson.sqlexec=sqlexec;
        resjson.pagePagination=pagePagination;resjson.id=id;
         executeFunctionByName(resjson.execFunc,window,resjson);}

      if(resjson.Message){  notif(resjson.Message);}
      /*
  table.innerHTML=result;
  getPagination("#"+idtable+"tb");
  */
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
slaveparams(paramarray,idtable,id);
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

}

export function prepareArrayFromModal(modal,paramarray) {
  let cisvalue = modal.querySelectorAll("[cis-value]");
  cisvalue.forEach(function(item){
    let tosaveitem=item.getAttribute("browserstoragesave");
    let  tosave=false;if(tosaveitem!=null) tosave=true;
    let param={};
    param.name=item.id;
    param.t=item.getAttribute("cis-value");
  //console.log(item.tagName);
  if(item.tagName==="INPUT") {
  param.v=item.value;
  if(item.getAttribute("type")=="checkbox") {
    param.v=item.checked?1:0;
    if(tosave) saveToLoacalStorage(param);
  }
  if(param.v==="") param.v=null;
    console.log(item.tagName,item.value);
  }

  if(item.tagName==="TEXTAREA") {
  param.v=item.value;
  if(param.v==="") param.v=null;
    //console.log(item.tagName,item.value);
  }
  if(item.tagName==="SELECT") {
  param.v=item.value;
  if(param.v==="") param.v=null;
    console.log(item.tagName,item.value);
  }

  if(item.tagName==="DIV") {
    param.v= item.val_id;
    let radio=item.querySelector("input[type='radio']:checked");

      if((radio!==null)) {
      param.v=radio.getAttribute("value");
        if(tosave) saveToLoacalStorage(param);
        console.log("radio",radio,param.v);
      }
  if(param.v===undefined ) param.v=null;}
  //console.log(item.id,item.val_id,item.getAttribute("cis-value"));
  paramarray.push(param);
  let where=item.getAttribute("where");
  if((where!==null)&&(param.v!==null)) wherearray.push(where);
  });

}

function slaveparams(paramarray,idtable,id){
  //let divid="slave"+idtable+idparent;
    console.log(idtable);
  let table= document.getElementById(idtable);
  let tr=table.closest("tr");
  if((tr===undefined)||(tr===null)) return;
  let slave=tr.querySelector("#slave"+idtable);
    console.log(slave);
  if(slave){
    let hiddenarray=slave.querySelectorAll("input");
    hiddenarray.forEach((item) => {
      let param={};
let id=item.getAttribute("id");
let stype=item.getAttribute("cis-value");
let value=item.getAttribute("value");
      param.name=id;
      param.t=stype;
      param.v=value;
     paramarray.push(param);
    });


  }
}

export function loadRow(idtable,id,guid,cb){

//let lovname=combodiv.getAttribute("lovname");
//let lovsqlnumber=combodiv.getAttribute("lovsqlnumber");
let maptopost={};
let paramarray=[];
let wherearray=[];
  //let param={};
//wherearray.push("id=:id");
//console.log(item.tagName);
//slaveparams(paramarray,idtable,id);
//console.log(item.id,item.val_id,item.getAttribute("cis-value"));
let param={};
param.name="ID";
param.t="integer";
param.v=id;
paramarray.push(param);

maptopost.params=paramarray;
maptopost.where=wherearray;
maptopost.table=idtable;
maptopost.sqlnumber=0;
maptopost.guid=guid;
maptopost.task="row";
 //console.log(maptopost);
 sendPostDataLocation(maptopost,cb);

}

function loadRowMaptopost(maptopost,cb){

 sendPostDataLocation(maptopost,cb);

}

function scanprepare(modal){
  let scanlist = modal.querySelectorAll("[portscan]");
  scanlist.forEach(function(item){
let port=item.getAttribute("portscan");
let socket= new WebSocket("ws://localhost:"+port);
setTimeout(()=>{if(socket) socket.close();},44000);
socket.onopen = openSocket;
socket.onclose = closeSocket;
socket.onmessage = (result)=>{
if((isVisible(item))) { item.value=result.data;
  console.log("set item ",item,result.data);
}
else socket.close();
}
function  openSocket() {
      //  text.innerHTML="Socket open";
      // socket.send("Hello server");
      console.log("websocket for edit open");
  }

  function  closeSocket() {
        //  text.innerHTML="Socket open";
        // socket.send("Hello server");
        console.log("websocket for edit closed");
    }
  });
}
function isVisible(e) {
    return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length );
}



function initsaveBrowserLocaly(modal){
    let browserstoragesavearray = modal.querySelectorAll("[browserstoragesave]");
      browserstoragesavearray.forEach(function(item){
        if(item.tagName==="DIV") {
          let radioarray=item.querySelectorAll("input[type='radio']");
            let id=item.getAttribute("id");
          const value = localStorage.getItem(id);
      //  let value="0";
            if(value==null) return;
radioarray.forEach((radio) => {
if(radio.getAttribute("value")===value) {
  radio.setAttribute("checked","true");
}
else   radio.removeAttribute("checked");

    //  console.log("radio saved value",value);


});

}//End of DIV

if(item.tagName==="INPUT") {

if(item.getAttribute("type")=="checkbox") {
    let id=item.getAttribute("id");
      const value = localStorage.getItem(id);
    //const  value=true;
item.checked=(value==="1");
//console.log(item);
//item.setAttribute("checked","false");
}

}//END CHECK

      });
}

function saveToLoacalStorage(param){
  console.log("savetostorage",param);
  localStorage.setItem(param.name,param.v);
}
