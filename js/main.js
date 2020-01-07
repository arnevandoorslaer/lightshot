function ready() {
  getPage();
}

function getImg(text){
  let regex = /https:\/\/image\.prntscr\.com\/image\/[^>]+\.png/gm
   if (regex.test(text)) {
     return regex.exec(text);
   }
   else{
     return getImg(httpGet(getRandomUrl()));
   }
}

function getRandomUrl() {
  var result = "";
   var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
   for ( var i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return "https://prnt.sc/"+result;
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getPage() {
  var url = getRandomUrl();
  console.log(url);
  const http = new XMLHttpRequest();
  http.open("GET", url);
  http.send();
  http.onreadystatechange = function() {
    console.log(http.readyState + " " + http.status);
    if (http.readyState == 4 && http.status == 200) {
      let re = /https:\/\/i\.imgur\.com\/[^>]+\.png/gm
       if (re.test(http.responseText)) {
         var result = re.exec(http.responseText);
         console.log(result[0]);
         $("#kakinboekentas").attr('src', result[0]);
         $("#url").attr('src', url);
       } else {
         setTimeout("getPage()", 1000);
       }
    }
  };
}
