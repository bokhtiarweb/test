const allData = JSON.parse(mainData).data;
const storeData = [];

function loadMilestone() {
  const el = document.querySelector(".milestones");
  el.innerHTML = `${allData.map((miles) => {
    return `<div class="milestone border-b" id="${miles._id}">
    <div class="flex">
      <div class="checkbox"><input type="checkbox" onclick="checkboxMove(this, ${miles._id})" /></div>
      <div onclick="openMilestone(this, ${miles._id})">
        <p>
          ${miles.name}
          <span><i class="fas fa-chevron-down"></i></span>
        </p>
      </div>
    </div>
    <div class="hidden_panel">
      ${miles.modules.map((modul) => {
        return `<div class="module border-b">
        <p>${modul.name}</p>
      </div>`;
      }).join("")}
    </div>
  </div>`;
  }).join("")}`;
}

function openMilestone(selfelmnt, imgid) {
  const curntPanel = selfelmnt.parentNode.nextElementSibling;
  const shownPanel = document.querySelector(".show");
  const panelActivate = document.querySelector(".active");

  if(!curntPanel.classList.contains("show") && shownPanel) {
    shownPanel.classList.remove("show")
  }
  curntPanel.classList.toggle("show");

  if(!selfelmnt.classList.contains("active") && panelActivate) {
    panelActivate.classList.remove("active")
  }
  selfelmnt.classList.toggle("active");

  imageLoader(imgid)
}

function imageLoader(img) {
  const imgDiv = document.querySelector(".milestoneImage");
  const titlDiv = document.querySelector(".title");
  const dtlDiv = document.querySelector(".details");

  imgDiv.style.opacity = "0";
  imgDiv.src = allData[img].image;
  titlDiv.innerText = allData[img].name;
  dtlDiv.innerText = allData[img].description;
}

document.querySelector(".milestoneImage").onload = function() {
  this.style.opacity = "1";
};

function checkboxMove(selfel, chckid) {
  const mileList = document.querySelector(".milestones");
  const dnList = document.querySelector(".doneList");
  const checkItem = document.getElementById(chckid)

  if(selfel.checked) {
    mileList.removeChild(checkItem);
    dnList.appendChild(checkItem);
  }else {
    dnList.removeChild(checkItem);
    mileList.appendChild(checkItem);

    const twoEl = document.querySelectorAll(".milestones .milestone");
    const elmnt = [];
    twoEl.forEach((el) => elmnt.push(el));
    elmnt.sort((x, y) => x.id - y.id);
    elmnt.forEach((check) => mileList.appendChild(check))
  }
}

loadMilestone()