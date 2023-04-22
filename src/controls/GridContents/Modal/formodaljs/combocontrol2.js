import {sendPostDataLocation} from "../../../../service/serviceSend";
export function comboprepare(idregion){
var combocontrol=null;
if(idregion) {
  var modal = document.getElementById(idregion);
  combocontrol=modal.querySelectorAll(".select_wrap");
}
else combocontrol=document.querySelectorAll(".select_wrap");
combocontrol.forEach(function(combodiv){
var editdiv=combodiv.querySelector(".default_option .option");
var edit=combodiv.querySelector(" .option .text");
//var input_items =combodiv.querySelectorAll(".option .Text");
//var input_items =combodiv.querySelectorAll(".select_ul li");
var jstag=combodiv.querySelector(".ng-scopetag");
var jstagtext=combodiv.querySelector(".ng-scope");
var ullist=combodiv.querySelector(".select_ul");
var iconload=combodiv.querySelector(".iconload");
showprepareIFfromcashe(jstag,edit,ullist,jstagtext,combodiv)

var tengoeligir=false;
var keyselected=null;
//console.log(input_items);
// ✅ Remove event listeners from Element
//edit.replaceWith(edit.cloneNode(false));
edit.addEventListener("keyup",function(event ){
  //console.log(event.keyCode);
  //  console.log(edit.id,edit.value,edit.value==="*");
  function cb(error,result){
    //console.log(error,result);
  if (error===null) {
  ullist.innerHTML=result;
  edit.is_load=true;
  ullist=combodiv.querySelector(".select_ul");
  iconload.style.display="none";
  inner();
  }

  }
  if(edit.is_load===undefined){
    if(edit.is_loading) return;
    iconload.style.display="block";
    edit.is_loading=true;
loadLOV(edit,ullist,combodiv,cb);
//setTimeout(() => {edit.is_load=true, console.log("Edit release after 5 seconds!")}, 5000)
//  while(!edit.is_load);

    // edit.is_load=true;

  }
  else inner();
  //Wait assync
function inner() {
  var input_items=ullist.querySelectorAll("li");
  input_items.forEach(function(item){
    item.addEventListener("click",function(){
    //  console.log(item);
  clicklistitem(item,jstag,edit,ullist,jstagtext,combodiv);
  //item.parentNode.parentNode.parentNode.children[0].classList.toggle("active");

  });
  //console.log(jstagtext);
  });

let commonlitera=true;
if(event.keyCode===13||event.keyCode===40||event.keyCode===38)  commonlitera=false;
  tengoeligir=false;
input_items.forEach(function(item){
  if((item.classList.contains("keyselected"))&&commonlitera) item.classList.toggle("keyselected");
  var item0=item.querySelector("span");
  item0.parentNode.parentNode.style.display="none"
if(item0.textContent.toLowerCase().includes(edit.value.toLowerCase()))  {
if(edit.value==="") { ullist.style.display="none";return;}
item0.parentNode.parentNode.style.display="block";
ullist.style.display="block";
tengoeligir=true;
}
else {item0.parentNode.parentNode.style.display="none";

}
});

if(edit.value==="*"){
/*SetVisible*/
  ullist.style.display="block";
  input_items.forEach(function(item){
      var item0=item.querySelector("span");
      item0.parentNode.parentNode.style.display="block";
  });
  tengoeligir=true;
//  return;
}
 /*Navigate by list*/
if((event.keyCode===13||event.keyCode===40||event.keyCode===38)&&tengoeligir) {
let elements = [];
  input_items.forEach(function(item){
      if(item.style.display=="block") {
        elements.push(item);
      }
  });
  if(event.keyCode===38) elements=elements.reverse();
let indxsel=-1;
  console.log(elements.length);
  for (let i=0;i<elements.length;i++){
    let item=elements[i];

if(item.classList.contains("keyselected")) {indxsel=i; break;}

  }
if (event.keyCode===13) {
if(indxsel===-1)  console.log(elements);
  if(indxsel===-1) return;
  clicklistitem(elements[indxsel],jstag,edit,ullist,jstagtext,combodiv);
  elements[indxsel].classList.toggle("keyselected");
  return;
}
if(indxsel===-1) {indxsel=0;
  elements[indxsel].classList.toggle("keyselected");
}
else {
elements[indxsel].classList.toggle("keyselected");
elements[(indxsel+1-elements.length===-0?elements.length-1:indxsel+1)].classList.toggle("keyselected");
}
}//End on key


}//end of innderfunction



},true);//edit on keylistener end;
//onclick

jstag.addEventListener("click",function(){
  jstag.style.display="none";
  combodiv.val_id=null;
  edit.style.display="block";
});

});

function clicklistitem(item,jstag,edit,ullist,jstagtext,combodiv){
  item.classList.toggle("active");
  jstag.style.display="inline-block";
  //jstag.parentNode.style.display="inline-block";
  //jstagtext.classList.("active");
  edit.style.display="none";
  ullist.style.display="none";
  jstagtext.textContent=item.textContent;
  combodiv.val_id=item.id;
  console.log(combodiv.val_id);

}

function showprepareIFfromcashe(jstag,edit,ullist,jstagtext,combodiv){
//  item.classList.toggle("active");
let id = combodiv.getAttribute("valuenumber");
let text = combodiv.getAttribute("valuetext");
if(id) {
  jstag.style.display="inline-block";
  //jstag.parentNode.style.display="inline-block";
  //jstagtext.classList.("active");
  edit.style.display="none";
  ullist.style.display="none";
  jstagtext.textContent=text+" ";
  combodiv.val_id=id;
  console.log(combodiv.val_id);
}

}


function loadLOV(edit,ullist,combodiv,cb){

let lovname=combodiv.getAttribute("lovname");
let lovsqlnumber=combodiv.getAttribute("lovsqlnumber");
let maptopost={};
let paramarray=[];
let wherearray=[];
  //let param={};

//console.log(item.tagName);

//console.log(item.id,item.val_id,item.getAttribute("cis-value"));


maptopost.params=paramarray;
maptopost.where=wherearray;
maptopost.table=lovname;
maptopost.sqlnumber=lovsqlnumber;
maptopost.task="lov";
 //console.log(maptopost);
 sendPostDataLocation(maptopost,cb);

}
}
//comboprepare();
