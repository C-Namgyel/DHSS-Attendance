//Setup
var absenteeNum = -1;
var classes = ["VII", "VIII", "IX", "X", "XI", "XII"]
var sections = ["A", "B", "C", "D", "E"]
var periods = ["Bridging", 1, 2, 3, 4, 5, 6, 7]
var subsSeven = ["English", "Dzongkha", "Mathematics", "Science", "History", "Geography", "ICT", "Life Skills", "VE", "GC", "Substitution", "HPE", "Scout"];
var subsNine = ["English", "Dzongkha", "Mathematics", "Biology", "Physics", "Chemistry", "History", "Geography", "Economics", "EVS", "AgFS", "ICT", "Life Skills", "VE", "GC", "Substitution", "HPE", "Scout"];
var subsEleven = ["English", "Dzongkha", "Mathematics", "Biology", "Physics", "Chemistry", "History", "Geography", "B&E", "Accountancy", "Economics", "ICT", "Life Skills", "VE", "GC", "Substitution", "HPE", "Scout"];
//Functions
function setOptions(id, options) {
  document.getElementById(id).innerHTML = "";
  for (let opts = 0; opts < options.length; opts++) {
    let option = document.createElement("option");
    option.innerHTML = options[opts];
    document.getElementById(id).appendChild(option);
  }
}
setOptions("subject", subsSeven);
setOptions("class", classes);
setOptions("section", sections);
setOptions("period", periods)
function setScreen(scrnId) {
  for (i = 0; i < document.querySelectorAll(".scrn").length; i++) {
      if(document.getElementsByClassName("scrn")[i].id == scrnId) {
          document.getElementById(document.getElementsByClassName("scrn")[i].id).hidden = false;
      } else {
          document.getElementById(document.getElementsByClassName("scrn")[i].id).hidden = true;
      }
  }
}
function animation(id, animationName, duration) {
  document.getElementById(id).style.animationName=animationName;
  document.getElementById(id).style.animationDuration=duration
  document.getElementById(id).style.animationFillMode="forwards"
}
function getFullDates() {
  let dates = new Date();
  let date = dates.getDate();
  let month = parseInt(dates.getMonth()) + 1;
  if (date < 10) {
      date = "0" + date
  }
  if (month < 10) {
      month = "0" + month
  }
  return(date + ":" + month + ":" + (dates.getFullYear()))
}
function getCurrentTime() {
  let date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let ampm = "am"
  if (hour > 12) {
      hour = hour - 12;
      ampm = "pm";
  }
  if (hour < 10) {
      hour = "0" + hour;
  }
  if (minute < 10) {
      minute = "0" + minute;
  }
  return(hour+":"+minute+" "+ampm)
}
function message(placeHolder, enableSeconds, id) {
  let div = document.createElement("div")
  div.style.width = "65%"
  div.style.position = "fixed"
  div.style.top = "0%"
  div.style.left = "12.5%"
  div.style.borderStyle = "solid"
  div.style.borderWidth ="1px"
  div.style.borderRadius = "15px"
  div.style.backgroundColor = "white"
  div.style.zIndex = "150"
  div.style.padding ="5%"
  let label = document.createElement("label")
  label.innerHTML = placeHolder,
  label.style.display = "inline-block"
  label.style.width = "100%";
  let ok = document.createElement("button");
  ok.style.width = "25%"
  ok.innerHTML = "OK (" + enableSeconds + "s)"
  ok.style.float = "right"
  ok.style.borderStyle = "none"
  ok.style.backgroundColor = "white"
  ok.disabled = true;
  if (id != undefined) {
      ok.id = id
  }
  div.appendChild(label)
  div.appendChild(document.createElement("br"))
  div.appendChild(document.createElement("br"))
  div.appendChild(ok)
  document.body.appendChild(div)
  div.style.top = (((window.getComputedStyle(document.body).height).slice(0,this.length - 2) / 2) - (div.clientHeight / 2)) + "px"
  document.getElementById("barrier2").hidden = false;
  if (enableSeconds < 0) {
      ok.hidden = true;
  } else if (enableSeconds == 0 || enableSeconds == undefined) {
      ok.innerHTML = "OK"
      ok.hidden = false;
      ok.disabled = false;
  } else {
      let CDNum = enableSeconds;
      let CD = setInterval(function() {
          CDNum -= 1;
          ok.innerHTML = "OK (" + CDNum + "s)"
          if (CDNum <= 0) {
              ok.disabled = false;
              ok.innerHTML = "OK";
              clearInterval(CD);
          }
      }, 1000)
  }
  ok.onclick = function() {
      div.remove()
      document.getElementById("barrier2").hidden = true;
  }
}
function getNums(str, ind) {
  return(parseInt(str.match(/\d+/)[ind]))
}
function navDisable(id) {
  for (let n = 0; n < document.querySelectorAll(".navBtns").length; n++) {
    if (document.querySelectorAll(".navBtns")[n].id == id) {
      document.querySelectorAll(".navBtns")[n].disabled = true;
    } else {
      document.querySelectorAll(".navBtns")[n].disabled = false;
    }
  }
} 
function dayInWords() {
  switch (new Date().getDay()) {
    case 1:
      return("Monday")
      break;
    case 2:
      return("Tuesday")
      break;
    case 3:
      return("Wednesday")
      break;
    case 4:
      return("Thursday")
      break;
    case 5:
      return("Friday")
      break;
    case 6:
      return("Saturday")
      break;
    case 7:
      return("Sunday")
      break;
  }
}
//Version check
readRecords("version", {}, function(records) {
  if (records[records.length - 1].version != "1.0") {
    message("New update available. Update the app from <a href='"+records[records.length - 1].link+"' target='_blank'>here</a> to continue using the app. <br>Or open the latest version in browser with extra data usage from <a href='https://c-namgyel.github.io/DHSS-Attendance/'>here</a>", -1)
  }
});
//Menu
document.getElementById("barrier").onclick = function() {
  document.getElementById("navClose").click();
}
document.getElementById("menuBtn").onclick = function() {
  animation("navDiv", "navOpen", "0.5s");
  document.getElementById("barrier").hidden = false;
}
document.getElementById("navEditTT").onclick = function() {
  setScreen("TTScrn")
  navDisable(this.id)
  document.getElementById("navClose").click();
}
document.getElementById("navLP").onclick = function() {
  document.getElementById("navClose").click();
  if ("TT" in localStorage == true) { 
    setScreen("LPScrn")
    navDisable(this.id)
  } else {
    message("Create your timetable before creating the lesson plans")
  }
}
document.getElementById("navAttendance").onclick = function() {
  setScreen("attendanceScrn")
  navDisable(this.id)
  document.getElementById("navClose").click();
}
//Main
document.getElementById("absenteeAdd").onclick = function() {
  absenteeNum += 1;
  let absenteeDiv = document.createElement("div")
  absenteeDiv.id = "absenteeDiv" + absenteeNum
  let stdName = document.createElement("input")
  stdName.id = "absenteeName"+absenteeNum
  stdName.style.width = "45%"
  stdName.style.float = "left"
  stdName.placeholder = "Name"
  let reason = document.createElement("input")
  reason.id = "absenteeReason"+absenteeNum
  reason.style.width = "45%"
  reason.style.float = "left"
  reason.placeholder = "Reason"
  let delBtn = document.createElement("button")
  delBtn.id = "absenteeDel"+absenteeNum;
  delBtn.style.width = "10%";
  delBtn.style.backgroundColor = "red"
  delBtn.style.backgroundImage = "url(assets/delLogo.png)";
  delBtn.style.backgroundSize = "contain";
  delBtn.style.backgroundRepeat = "no-repeat";
  delBtn.style.backgroundPosition = "center";
  delBtn.innerHTML = "&nbsp"
  delBtn.value = absenteeNum;
  delBtn.onclick = function(btn) {
    let val = (btn.target.value)
    for (d = val; d <= absenteeNum; d++) {
        if (d != absenteeNum) {
            document.getElementById("absenteeName"+d).value = document.getElementById("absenteeName"+(parseInt(d)+1)).value;
            document.getElementById("absenteeReason"+d).value = document.getElementById("absenteeReason"+(parseInt(d)+1)).value
        }
    }
    document.getElementById("absenteeDiv"+(absenteeNum)).remove()
    absenteeNum -= 1
  }
  absenteeDiv.appendChild(stdName)
  absenteeDiv.appendChild(reason)
  absenteeDiv.appendChild(delBtn)
  document.getElementById("absenteeHolder").appendChild(absenteeDiv);
  stdName.focus();
  stdName.onchange = function() {
    reason.focus()
  }
  document.getElementById("absentee").scrollTop = document.getElementById("absentee").scrollHeight
}
document.getElementById("class").oninput = function() {
  if (document.getElementById("class").value == "VII" || document.getElementById("class").value == "VIII") {
    setOptions("subject", subsSeven);
  } else if (document.getElementById("class").value == "IX" || document.getElementById("class").value == "X") {
    setOptions("subject", subsNine);
  } else if (document.getElementById("class").value == "XI" || document.getElementById("class").value == "XII") {
    setOptions("subject", subsEleven);
  }
};
document.getElementById("submit").onclick = function() {
  let required = false;
  let elems = ["lesson", "initial"]
  for (let r = 0; r < elems.length; r++) {
    if ((document.getElementById(elems[r]).value).trim() == "") {
      required = true;
      r = elems.length + 1;
    }
  }
  if (required == false) {
    document.getElementById("submit").innerHTML = "Submitting"
    document.getElementById("submit").disabled = true;
    let absenteeJSON = []
    for (aj = 0; aj <= absenteeNum; aj++) {
      absenteeJSON.push({
        name: document.getElementById("absenteeName"+aj).value,
        reason: document.getElementById("absenteeReason"+aj).value
      })
    }
    if (absenteeNum == -1) {
      absenteeJSON = "No Absentee"
    }
    createRecord("attendance", {date:getFullDates(), time:getCurrentTime(), class:document.getElementById("class").value, section:document.getElementById("section").value, period:document.getElementById("period").value, subject:document.getElementById("subject").value, lesson:(document.getElementById("lesson").value), absentee: JSON.stringify(absenteeJSON), initial:document.getElementById("initial").value}, function(record) {
      document.getElementById("submit").innerHTML = "Submit"
      document.getElementById("submit").disabled = false;
      message("Successfully Submitted", 0);
      for (let clearElemNum = 0; clearElemNum < elems.length; clearElemNum++) {
        document.getElementById(elems[clearElemNum]).value = "";
      }
      for (let x = absenteeNum; x >= 0; x--) {
        document.getElementById("absenteeDel"+x).click()
      }
    });
  } else {
    message("Please fill up all the space", 0);
  }
};