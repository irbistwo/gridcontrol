export function notif(message) {
const messagehtml=`<div id="htmldbMessageHolder">
      <div class="aNotification success" id="MESSAGE" onClick=hidenotif>
          <div class="aNotificationText">
              <h2 class="visuallyhidden">Success Message</h2>
              <img src="/img/prior.png" alt="" class="iconMedium success">
              </img>
              <p>${message}</p>

              <a href="#" class="closeMessage">
                  <img src="/img/prior.png"
                       alt="Close" class="iconSmall close">
                  </img>
              </a>
          </div>
      </div>
  </div>`;

//const content = document.createtNode(messagehtml);
const body=document.querySelector("body");
//body.append(messagehtml);
var div = document.createElement('div');
div.addEventListener("click",hidenotif,true);
  div.innerHTML = messagehtml.trim();

body.appendChild(div);
setTimeout(()=>{hidenotif();},3000);
//console.log("notif");
}
function hidenotif(){
const body=document.querySelector("body");
const notif=body.querySelector("#htmldbMessageHolder");
if (notif) body.removeChild(notif.parentNode);
}

export function notif_error(message) {
var messagehtml=  `<div id="htmldbMessageHolder">
      <div class="aNotification error" id="MESSAGE" onClick=hidenotif>
          <div class="aNotificationText">
              <h2 class="visuallyhidden">Error Message</h2>
              <img src="/img/offline.png" alt="" class="iconMedium success">
              </img>
              <p>${message}</p>

              <a href="#" class="closeMessage">
                  <img src="/img/offline.png"
                       alt="Close" class="iconSmall close">
                  </img>
              </a>
          </div>
      </div>
  </div>`;

  const body=document.querySelector("body");
  //body.append(messagehtml);
  var div = document.createElement('div');
  div.addEventListener("click",hidenotif,true);
    div.innerHTML = messagehtml.trim();
    body.appendChild(div);
    setTimeout(()=>{hidenotif();},10000);
    console.log("notif");

}
