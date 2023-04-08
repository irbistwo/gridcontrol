export function inittabpanemodal(idcruid) {
  var modal = document.getElementById(idcruid);
var tabs = modal.querySelectorAll(".tabs_wrap ul li");
tabs.forEach((tab)=>{
  tab.addEventListener("click", ()=>{

    tabs.forEach((item)=>{
      item.classList.remove("active");
    });

    tab.classList.add("active");
    let indef=tab.getAttribute("tab-value");
//  location.href="/cis/?page=goods&tab-value="+indef;
//  var modal = document.getElementById("cruid"+idcruid);
//var modal = document.querySelector(".modal-body");

var tabsitems=modal.querySelectorAll(".horizontaltablayout");
//console.log(tabsitems);
tabsitems.forEach((tablayout)=>{
  if(tablayout.getAttribute("id")==="tab"+indef) tablayout.style.display = "block";
else tablayout.style.display = "none";

});

//params.set("tab-value",indef);

  });
});
}
