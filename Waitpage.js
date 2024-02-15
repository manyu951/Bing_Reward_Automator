document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('checkbutton').addEventListener('click', rewardpointcheck);
});

function rewardpointcheck(){
    var url = 'https://www.bing.com/';
    chrome.tabs.create({ url: url });
}
