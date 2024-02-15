var totals = 40;
// var dtime = 15;
// var onetInput = 4;
var kitnahuaa = 0;
var isRunning = false;

// Creating an object with the data
const data = {
    totals:totals,
    kitnahuaa:kitnahuaa,
    isRunning:isRunning
};
// dtime:dtime,
// onetInput:onetInput,

if (!localStorage.getItem('data')) {
    // Writing the JSON string to local storage
    const jsonString = JSON.stringify(data);
    localStorage.setItem('data', jsonString);
    console.log('Data has been written to localStorage for the first time.');
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('updateButton').addEventListener('click', Update);
    document.getElementById('startStopButton').addEventListener('click', toggleStartStop);
});

// Reading the contents of local storage
const jsonStringread = localStorage.getItem('data');
// Parsing the JSON string back to an object
const dataread = JSON.parse(jsonStringread);



document.getElementById('totalsInput').value = dataread.totals;
document.getElementById('kitna').innerHTML = 'hello';
// document.getElementById('dtimeInput').value = dataread.dtime;
// document.getElementById('onetInput').value = dataread.onetInput;
document.getElementById('updateButton').innerHTML = 'Save';
document.getElementById('startStopButton').innerHTML = 'Start';


function Update() {
    var updsa = document.getElementById('updateButton');
    updsa.innerHTML='Saved';
    
    data.totals = document.getElementById('totalsInput').value;
    
    // data.dtime = document.getElementById('dtimeInput').value;
    // data.onetInput = document.getElementById('onetInput').value;

    const jsonString = JSON.stringify(data);
    localStorage.setItem('data', jsonString);
    console.log('Data has been written to localStorage.');

    chrome.runtime.sendMessage({ action: 'updateTotals', totals: data.totals });
}



document.addEventListener('DOMContentLoaded', function () {
    // Check if background.js is running initially
    checkBackgroundStatus();
  
    // Check background.js status every second
    setInterval(checkBackgroundStatus, 1000);
  
    function checkBackgroundStatus() {
      chrome.runtime.sendMessage({ action: 'getIsRunning' }, (response) => {
        const isBackgroundRunning = response.isRunning;
  
        if (isBackgroundRunning) {
            document.getElementById('startStopButton').innerHTML = 'Stop';
        } else {
            document.getElementById('startStopButton').innerHTML = 'Start';
        }
      });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Check if background.js is running initially
    checkvalueoftotal();
  
    // Check loop status every second
    setInterval(checkvalueoftotal, 1000);
  
    function checkvalueoftotal() {
      chrome.runtime.sendMessage({ action: 'valueoft' }, (response) => {
        var valueoftotal = response.kitnahuaa;
        document.getElementById('kitna').innerHTML = valueoftotal;
        
      });
    }
});

function toggleStartStop() {
    chrome.runtime.sendMessage({ action: 'getIsRunning' }, (response) => {
        const isBackgroundRunning = response.isRunning;
  
        if (isBackgroundRunning) {
            //chrome.runtime.sendMessage({ action: 'updateTotals', totals: 0 });
            // Move this line here
            //document.getElementById('startStopButton').innerHTML = 'Start';
            chrome.runtime.sendMessage({action:'stopBb',stopB:true});
        } else {
            chrome.runtime.sendMessage({ action: 'updateTotals', totals: data.totals });
            chrome.runtime.sendMessage({ action: "openTabs" });
            // No change needed here
        }
    });
    // chrome.runtime.sendMessage({ action: 'updateTotals', totals: data.totals });
    // chrome.runtime.sendMessage({ action: "openTabs" });
}