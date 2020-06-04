function displayInput () {
  let pathname = window.location.pathname
  let trackNum = pathname.split('tracking=')[1];

  document.getElementById("display").innerHTML = trackNum

};


function changeURL () {
  let trackNum = document.getElementById("input").value
  let form = this;

  form.action =  window.location.href="result.html" /* TEMPORARY PAGE CHANGE */


  
  /* "https://www.fastlanetracking.com/tracking=" + trackNum; */


  form.submit;
};
