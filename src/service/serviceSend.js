export function sendPostDataLocation (arraytosend,cb) {
    let guid =null;
    if(arraytosend.guid) guid=arraytosend.guid+arraytosend.task;
  //  if(!checgGuid(guid)) return;
    let postname="/rest";
//  console.log(postname);
    let promise=sendPostDatapLocation(postname,arraytosend);
    promise.then((result) => {cb(null,result);
    }, (err) => {cb(err,null);});
}

 function sendPostDatapLocation (postname,arraytosend) {
    return new Promise((resolve,reject)=> {
        let data= JSON.stringify(arraytosend);
        let is_error=false;
        let statusup;
        console.info("spd", data);
        let result= fetch(postname,{
            method: "post",
            headers: {'Content-Type':'application/json'},
            body:data
        });
        result.then(function(response) {
            // console.log('response', response)
            let status=response.status;
            if(status!=200) {is_error=true;//throw (" error status "+status);
                statusup=status;}
            let header=response.headers.get('Content-Type');
            //  console.log('header', header);
            if(header===null){throw "Проблема с откликом";}

            // var arr = eval('(' + text + ')');
            // console.log(arr);
            return response.text();
        }).then(function(text) {
            let result=text;
            if(is_error) throw ("status:"+statusup+" "+result);

            resolve(result);

        }).catch(function(ex) {
            console.log('failed', ex);
            // throw new Error('failed send '+ ex)
            reject(ex);
        });
    });
}
