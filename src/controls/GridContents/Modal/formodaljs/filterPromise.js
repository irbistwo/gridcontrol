import {sendPostDataLocation} from "../../../../service/serviceSend";
import {inittabpanemodal} from "./tabpanemodal";
import {loadRow, prepareArrayFromModal} from "./cruid";
import {comboprepare} from "./combocontrol2";
import {notif_error,notif} from "./notif";
var countLoadfilter=0;
export function  filterShowPromise(idfilter,guid) {
    return new Promise((resolve,reject)=> {
    countLoadfilter = 1;
    var modal = document.getElementById("filter" + idfilter);
    var modalclone = modal.cloneNode(true);
    modal.parentNode.replaceChild(modalclone, modal);
    modal = document.getElementById("filter" + idfilter);

    function cb(error, result) {
        //  console.log(error,result);
        if (error === null) {
            modal.innerHTML = result;
            comboprepare("filter" + idfilter);
            inner();
            //  let firstcontroltofocus = modal.getElementById("firstcontroltofocus");
            let firstcontroltofocus = modal.querySelector("input[firstcontroltofocus='true']");
            if (firstcontroltofocus !== null) firstcontroltofocus.focus();
            /*Tabpanel assign events*/
            inittabpanemodal("filter" + idfilter);
            // scanprepare(modal);
        } else /*error*/ notif_error(error);

    }

    loadFilerRow(idfilter, guid, cb);

    function inner() {
// Get the button that opens the modal
        var btn = modal.querySelector("#dofilter");
        var cancel = modal.querySelector("#cancel");

// Get the <span> element that closes the modal
        var span = modal.getElementsByClassName("close")[0];
        if (modal.keyup === undefined) {
            modal.keyup = true;
            modal.addEventListener("keyup", function (event) {
                //console.log(event.keyCode);
                if (event.keyCode === 27/*ESC*/) {
                    modal.style.display = "none";
                }
                if (event.keyCode === 13) {
                    let focusel = document.activeElement;
                    if ((focusel.className === "text")) return;
                    modal.style.display = "none";
                 const maptopost=   dofilterone(idfilter, null, guid);
                 resolve(maptopost);
                }
            }, true);
        }

// When the user clicks the button, open the modal

        btn.onclick = function () {
            //modal.style.display = "block";
            const maptopost=dofilterone(idfilter,  null, guid);
            modal.style.display = "none";
            resolve(maptopost);
        }

        cancel.onclick = function () {
            modal.style.display = "none";
            resolve(null);
        }

// When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
            resolve(null);
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                resolve(null);
            }
        }

    }

    modal.style.display = "block";
});
}




function dofilterone(idtable,id,guid) {



    let modal = document.getElementById("filter" + idtable);
//console.log("dofilter "+idtable);

    let maptopost = {};

    prepareMapArrayToFilter(modal, maptopost);

    maptopost.table = idtable;
    maptopost.guid = guid;
    maptopost.task = "filter";
    //console.log(maptopost);
   // sendPostDataLocation(maptopost, cb);
        return maptopost;


}

function loadFilerRow(idtable,guid,cb){
    countLoadfilter++;
//let lovname=combodiv.getAttribute("lovname");
//let lovsqlnumber=combodiv.getAttribute("lovsqlnumber");
    let maptopost={};
    let paramarray=[];
    let wherearray=[];
    //let param={};

//console.log(item.tagName);
//console.log(item.id,item.val_id,item.getAttribute("cis-value"));


    maptopost.params=paramarray;
    maptopost.where=wherearray;
    maptopost.table=idtable;
    maptopost.sqlnumber=0;
    maptopost.guid=guid;
    maptopost.task="filterRow";
    //console.log(maptopost);
    sendPostDataLocation(maptopost,cb);

}

function prepareMapArrayToFilter(modal,maptopost){
    let paramarray=[];
    let wherearray=[];
    let order=null;
    let cisvalue = modal.querySelectorAll("[cis-value]");
    cisvalue.forEach(function(item){
        let param={};
        param.name=item.id;
        param.t=item.getAttribute("cis-value");
        if(item.tagName==="INPUT") {
            param.v=item.value;
            if(item.getAttribute("type")=="checkbox") {
                param.v=item.checked?1:0;
            }
            if(param.v==="") param.v=null;
        }

        if(item.tagName==="SELECT") {
            param.v=item.value;
            if(param.v==="") param.v=null;
            var option = item.options[item.selectedIndex];
            var whereop=option.getAttribute("where");
            item.setAttribute("where", whereop);
        }
        if(item.tagName==="DIV") {
            param.v= item.val_id;
            let radio=item.querySelector("input[type='radio']:checked");
            if((radio!==null)) {
                order=radio.getAttribute("order");
                param.v=radio.getAttribute("value");
                let where=radio.getAttribute("where");
                if((where!==null)&&(param.v!==null)) wherearray.push(where);

            }
            if(param.v===undefined ) param.v=null;}

        //console.log(item.id,item.val_id,item.getAttribute("cis-value"));
        paramarray.push(param);
        let where=item.getAttribute("where");
        if(item.getAttribute("type")=="checkbox") {
            let val=item.checked?1:0;
            if(val===0) where=null;
        }
        if((where!==null)&&(param.v!==null)) wherearray.push(where);
    });
    maptopost.params=paramarray;
    maptopost.where=wherearray;
    maptopost.order=order;
}
// When the user clicks anywhere outside of the modal, close it
