let previous = "";

function getPage(oldUrl) {
  window.location.hash = '#r';
  var url = "";
  if (oldUrl != undefined) {
    url = oldUrl;
  } else {
    url = getRandomUrl();
  }
  console.log(url);
  const http = new XMLHttpRequest();
  http.open("GET", url);
  http.send();
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      let re = /https:\/\/i\.imgur\.com\/[^>]+\.png/gm
      let re2 = /https:\/\/image\.prntscr\.com\/image\/[^>]+\.png/gm
      let image = document.getElementById('image');
       if (re2.test(http.responseText)) {
         var result = re2.exec(http.responseText)[0];
         image.src = result;
         document.getElementById("url").href = url;
         document.getElementById("url").innerHTML = url;
       }
       else if (re.test(http.responseText)) {
         var result = re.exec(http.responseText)[0];
         image.src = result;
         document.getElementById("url").href = url;
         document.getElementById("url").innerHTML = url;
       } else {
        setTimeout("getPage()", 1000);
       }
    }
  };
}

function getRandomUrl() {
  var result = "";
   var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
   for ( var i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return "https://prnt.sc/"+result;
}

function autofocus() {
  window.location.hash = '#r';
}

document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyR') {
    getPage();
  }
});
