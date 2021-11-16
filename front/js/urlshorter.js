// ==============================
// ======== Function ============
// ==============================

function validShortUrl(shortUrl) {
  if (shortUrl === "") {
    throw { message: "Short url cant be null" };
  }
}

function validCustom(custom) {
  if (custom === "") {
    throw { message: "Custom name cant be null" };
  }
}

function validYear(year) {
  if (year < 2020 || year >= 2030) {
    throw { message: "Year should be between 2020 - 2030" };
  }
}

function isUrlValid(url) {
  if (url === "") {
    throw { message: "Url cant be null" };
  } else if (url.length > 800) {
    throw { message: "Url is too long" };
  } else {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    if (pattern.test(url)) {
      return true;
    }
    throw { message: "Url is not valid" };
  }
}

function getLogsByYear(logsArray, year) {
  let returnArray = [];
  for (date of logsArray) {
    if (new Date(date).getFullYear() === parseInt(year)) {
      returnArray.push(new Date(date));
    }
  }
  return returnArray;
}

function createChart(
  header,
  columsFunction,
  logsArray,
  xTitle,
  year,
  month = undefined
) {
  let chart = new CanvasJS.Chart("chartContainer", {
    title: {
      text: header,
    },
    axisY: {
      title: "Entries",
    },
    axisX: {
      title: xTitle,
    },
    data: [
      {
        type: "line",
        dataPoints: columsFunction(logsArray, year, month),
      },
    ],
  });
  chart.render();
}

function countMonthEntries(array, month) {
  return array.filter((date) => {
    return date.getMonth() + 1 === month;
  });
}

function countDayEntries(array, month, day) {
  return array.filter((date) => {
    return date.getMonth() + 1 === month && date.getDate() === day;
  });
}

function getColumnsMonth(logArray) {
  let array = [];
  for (let month = 1; month <= 12; month++) {
    array.push({ label: month, y: countMonthEntries(logArray, month).length });
  }
  return array;
}

function getColumnsDays(logArray, year, month) {
  let array = [];
  let numberOfDays = new Date(year, month, 0).getDate();
  for (let day = 1; day <= numberOfDays; day++) {
    array.push({ label: day, y: countDayEntries(logArray, month, day).length });
  }
  return array;
}

// ==============================
// ====== Add Events ============
// ==============================

document.querySelector("#activate").addEventListener("click", onActivateClick);
document.querySelector("#copyToClip").addEventListener("click", onCopyClick);
document
  .querySelector("#copyToClipCustom")
  .addEventListener("click", onCopyCustomClick);

document
  .querySelector("#activateCustom")
  .addEventListener("click", onActivateCustomClick);
document
  .querySelector("#getStatisticsMonth")
  .addEventListener("click", onStatisticsMonthClick);
document
  .querySelector("#getStatisticsYear")
  .addEventListener("click", onStatisticsYearClick);

// ==============================
// ====== On Load ===============
// ==============================

window.onload = async (event) => {
  try {
    let response = await axios.get(`http://localhost:3000/username`);
    document.getElementById(
      "username"
    ).textContent = `Welcome ${response.data.username}`;
    console.log(username);
  } catch (error) {
    document.getElementById("username").textContent = "*not found*";
  }
};

// ==============================
// ====== Event Listeners =======
// ==============================

async function onActivateClick(event) {
  event.preventDefault();
  try {
    resetErrors();
    let url = document.querySelector("#url").value;
    if (isUrlValid(url)) {
      let shortUrl = await getShortUrl(url);
      document.querySelector("#result").value = "";
      document.querySelector("#result").value = "/api/shorturl/" + shortUrl;
    }
  } catch (error) {
    if (typeof error === "string") {
      document.querySelector("#urlError").textContent =
        "Connection problem /" + error;
    } else {
      document.querySelector("#urlError").textContent = error.message;
      if (error.message === "wrong authorization") {
        location.replace("./index.html");
      }
    }
  }
}

function onCopyCustomClick() {
  copyToClipBoard("resultCustom");
  resetErrors();
}

function onCopyClick() {
  copyToClipBoard("result");
  resetErrors();
}

async function onActivateCustomClick() {
  try {
    resetErrors();
    let url = document.querySelector("#urlCustomInput").value;
    if (isUrlValid(url)) {
      let custom = document.querySelector("#castonShortUrlInput").value;
      validCustom(custom);
      let short = await getCustomShortUrl(url, custom);
      document.querySelector("#resultCustom").value = "";
      document.querySelector("#resultCustom").value = "/api/shorturl/" + short;
    }
  } catch (error) {
    if (typeof error === "string") {
      document.querySelector("#customError").textContent = "Connection problem";
    } else {
      document.querySelector("#customError").textContent = error.message;
      if (error.message === "wrong authorization") {
        location.replace("./index.html");
      }
    }
  }
}

async function onStatisticsMonthClick() {
  try {
    resetErrors();
    let shortUrl = document.querySelector("#satisticInput").value;
    validShortUrl(shortUrl);
    let shortUrlInfo = await getInfo(shortUrl);
    let date = new Date(document.querySelector("#satisticInputMonth").value);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let yearLogsArray = getLogsByYear(shortUrlInfo.redirectEntriesLog, year);
    let monthName = date.toLocaleString("en-US", { month: "long" });
    let header = `Entries for year ${year} in ${monthName}`;
    document.querySelector(".div8").classList.add("visible");
    createChart(header, getColumnsDays, yearLogsArray, "Days", year, month);
  } catch (error) {
    if (typeof error === "string") {
      document.querySelector("#statistisError").textContent =
        "Connection problem";
    } else {
      document.querySelector("#statistisError").textContent = error.message;
      if (error.message === "wrong authorization") {
        location.replace("./index.html");
      }
    }
  }
}

async function onStatisticsYearClick() {
  try {
    resetErrors();
    let shortUrl = document.querySelector("#satisticInput").value;
    validShortUrl(shortUrl);
    let shortUrlInfo = await getInfo(shortUrl);
    let year = document.querySelector("#satisticInputYear").value;
    validYear(year);
    let yearLogArray = getLogsByYear(shortUrlInfo.redirectEntriesLog, year);
    let header = `Entries for year ${year}`;
    document.querySelector(".div8").classList.add("visible");
    createChart(header, getColumnsMonth, yearLogArray, "Month", year);
  } catch (error) {
    if (typeof error === "string") {
      document.querySelector("#statistisError").textContent =
        "Connection problem";
    } else {
      document.querySelector("#statistisError").textContent = error.message;
      if (error.message === "wrong authorization") {
        location.replace("./index.html");
      }
    }
  }
}

// ==============================
// ====== DOM Functions ========
// ==============================

function resetErrors() {
  document.querySelector("#statistisError").textContent = "";
  document.querySelector("#customError").textContent = "";
  document.querySelector("#urlError").textContent = "";
}

function copyToClipBoard(inputId) {
  let resultInput = document.querySelector(`#${inputId}`);
  resultInput.select();
  resultInput.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(resultInput.value);
}

// ==============================
// ===== Server Requests ========
// ==============================

async function getInfo(shortUrl) {
  try {
    let response = await axios.get(
      `http://localhost:3000/api/shorturl/info/${shortUrl}`
    );
    return response.data;
  } catch (error) {
    throw error.response.hasOwnProperty("data")
      ? error.response.data
      : "Connection problem";
  }
}

async function getShortUrl(fullUrl) {
  try {
    let response = await axios.post("http://localhost:3000/api/shorturl/", {
      url: fullUrl,
    });
    return response.data.shorturl;
  } catch (error) {
    throw error.response.hasOwnProperty("data")
      ? error.response.data
      : "Connection problem";
  }
}

async function getCustomShortUrl(fullUrl, custom) {
  try {
    let response = await axios.post(
      "http://localhost:3000/api/shorturl/custom",
      {
        url: fullUrl,
        custom: custom,
      }
    );
    return response.data.custom;
  } catch (error) {
    throw error.response.hasOwnProperty("data")
      ? error.response.data
      : "Connection problem";
  }
}
