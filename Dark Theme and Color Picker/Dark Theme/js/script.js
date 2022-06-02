// start toggle between taps 
let tapToggle = document.querySelectorAll(`.content .taps .tab`);
let mainWindow = document.querySelector(`.content .main`);
let blacklistWindow = document.querySelector(`.content .blacklist`);
//timer
let from = document.getElementById("from");
let to = document.getElementById("to");
let apply = document.getElementById("apply");
let reset = document.getElementById("reset");
// white list
let addtionButton = document.querySelector(".addtion-button");

tapToggle.forEach((tap) => {
    tap.addEventListener("click", () => {
        if (!tap.classList.contains("selected")) {
            tap.classList.add("selected");

            if (tap.classList.contains("main-tap")) {
                blacklistWindow.style.display = "none";
                mainWindow.style.display = "flex";
                tapToggle[1].classList.remove("selected");
            } else {
                mainWindow.style.display = "none";
                blacklistWindow.style.display = "flex";
                tapToggle[0].classList.remove("selected");
            }
        }
    })
});
// end toggle between taps
// start toggle between darkTheme types
// let directType = document.querySelector(`.content .main .direct`);
// let timerType = document.querySelector(`.content .main .timer`);
// let directTypeSpan = document.getElementById("disable-direct");
// let timerTypeSpan = document.getElementById("disable-timer");
// directType.addEventListener("click", () => {
//     directTypeSpan.classList.remove("disable-direct");
//     timerTypeSpan.classList.add("disable-timer");
//     restTimer();
// })
// timerType.addEventListener("click", () => {
//     timerTypeSpan.classList.remove("disable-timer");
//     directTypeSpan.classList.add("disable-direct");
//     restDirect();
// })
// function restTimer() {
//     //later
// }
// function restDirect() {
//     //later
// }
// end toggle between darkTheme types
//start toggle light&dark button
let toggleButton = document.querySelector(`.content .direct .toggle`);
let pool = document.querySelector(`.content .direct .toggle span`);
let sun = document.getElementById("sun")
let moon = document.getElementById(`moon`);
function applyChangesToggle() {
    chrome.storage.sync.get('data-toggle', (data) => {
        console.log(data['data-toggle']);
        if (data['data-toggle'] == "light") {
            pool.classList.add("to-left");
            pool.classList.remove("to-right");
            sun.style.color = "#231773";
            moon.style.color = "#acb0f2";
        } else {
            pool.classList.add("to-right");
            pool.classList.remove("to-left");
            moon.style.color = "#231773";
            sun.style.color = "#acb0f2";
        }
    });
}
window.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get('fromInput', (data) => {
        if (data['fromInput']) {
            from.value = data['fromInput'];
            from.disabled = true;
        } else {
            console.log("reach to clear domcontetn");
            from.value = "";
            to.value = "";
            from.disabled = false;
            to.disabled = false;
            chrome.storage.sync.remove('fromInput');
            chrome.alarms.clearAll();
        }
    });
    chrome.storage.sync.get('toInput', (data) => {
        if (data['toInput']) {
            to.value = data['toInput'];
            to.disabled = true;
        } else {
            console.log("reach to clear domcontetn");
            from.value = "";
            to.value = "";
            from.disabled = false;
            to.disabled = false;
            chrome.storage.sync.remove('toInput');
            chrome.alarms.clearAll();
        }
    });

});
chrome.storage.sync.get('data-toggle', (data) => {
    if (data['data-toggle']) {
        toggleButton.dataset.toggle = data['data-toggle'];
        applyChangesToggle();
    } else {
        chrome.storage.sync.set({ 'data-toggle': toggleButton.dataset.toggle });
        applyChangesToggle();
    }
});

toggleButton.addEventListener("click", () => {
    if (toggleButton.dataset.toggle == "light") {
        toggleButton.setAttribute("data-toggle", "dark");
        chrome.storage.sync.set({ 'data-toggle': "dark" });
        pool.classList.add("to-right");
        pool.classList.remove("to-left");
        moon.style.color = "#231773";
        moon.style.transition = "0.3s";
        sun.style.color = "#acb0f2";
        sun.style.transition = "0.3s";
    } else {
        toggleButton.setAttribute("data-toggle", "light");
        chrome.storage.sync.set({ 'data-toggle': "light" });
        pool.classList.add("to-left");
        pool.classList.remove("to-right");
        sun.style.color = "#231773";
        sun.style.transition = "0.3s";
        moon.style.color = "#acb0f2";
        moon.style.transition = "0.3s";
    }
});

//send message told the backgroud that the button is toggled and what status of it [light OR dark]
window.addEventListener("DOMContentLoaded", () => {
    toggleButton.addEventListener("click", sendMessageToBackground);
    function sendMessageToBackground() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.runtime.sendMessage({ name: toggleButton.dataset.toggle, id: tabs[0].id, url: tabs[0].url });
        });

    }
});
//start timer
apply.addEventListener("click", setTimer);
let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function setTimer() {
    let fromInput = from.value;
    let toInput = to.value;
    chrome.storage.sync.set({ "fromInput": fromInput });
    chrome.storage.sync.set({ "toInput": toInput });
    let validateFrom = true;
    let validateTo = true;
    if (fromInput.length === 0) {
        validateFrom = false;
    }
    if (toInput.length === 0) {
        validateTo = false;
    }
    if (!validateFrom || !validateTo) {
        if (!validateFrom) {
            from.classList.add("wrong-input");
        }
        else {
            from.classList.remove("wrong-input");
        }
        if (!validateTo) {
            to.classList.add("wrong-input");
        } else {
            to.classList.remove("wrong-input");
        }
    } else {
        from.classList.remove("wrong-input");
        to.classList.remove("wrong-input");
        let currentTime = new Date();
        console.log(currentTime);
        let fromSplit = fromInput.split(":");
        let fromHour = fromSplit[0];
        if (fromHour == '00') { fromHour = '24' }
        let fromMinute = fromSplit[1];
        let fromTime = new Date(`${monthNames[currentTime.getMonth()]} ${currentTime.getDate()}, ${currentTime.getFullYear()} ${fromHour}:${fromMinute}:00`);
        let toSplit = toInput.split(":");
        let toHour = toSplit[0];
        if (toHour == '00') { toHour = '24' }
        let toMinute = toSplit[1];
        let toTime = new Date(`${monthNames[currentTime.getMonth()]} ${currentTime.getDate()}, ${currentTime.getFullYear()} ${toHour}:${toMinute}:00`);
        if (toTime.getTime() < fromTime.getTime()) {
            let temp = fromTime;
            fromTime = toTime;
            toTime = temp;
        }
        if (fromTime.getTime() - currentTime.getTime() < 0) {
            fromTime.setDate(fromTime.getDate() + 1);
            toTime.setDate(toTime.getDate() + 1);
        }
        const toggle = "fromAlarm";
        chrome.alarms.create(toggle, {
            when: fromTime.getTime()
        });
        const unToggle = "toAlarm";
        chrome.alarms.create(unToggle, {
            when: toTime.getTime()
        });
        from.disabled = true;
        to.disabled = true;
    }
}
apply.addEventListener("dblclick", () => {
    from.disabled = false;
    to.disabled = false;
})
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.name === "rest") {
        console.log("reach to clear rest message");
        from.value = "";
        to.value = "";
        from.disabled = false;
        to.disabled = false;
        chrome.storage.sync.remove('fromInput');
        chrome.storage.sync.remove('toInput');
    }
    return true;
});
reset.addEventListener("click", () => {
    from.value = "";
    to.value = "";
    from.disabled = false;
    to.disabled = false;
    chrome.storage.sync.remove('fromInput');
    chrome.storage.sync.remove('toInput');
    chrome.alarms.clearAll();
})
//end timer
//start white list
let divForAll = document.querySelector(".all-added");
let whiteListWebsites = [];
chrome.storage.sync.get("whiteListWebsite", (data) => {
    divForAll.innerHTML = "";
    if (data['whiteListWebsite']) {
        console.log(data['whiteListWebsite']);
        whiteListWebsites.push(...JSON.parse(data['whiteListWebsite']));
        addToWhiteList();
    }
});

addtionButton.addEventListener("click", () => {
    divForAll.innerHTML = "";
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
        let urlParse = new URL(tab[0].url);
        chrome.storage.sync.get("whiteListWebsite").then((data) => {
            if (data['whiteListWebsite']) {
                let arr = JSON.parse(data['whiteListWebsite']);
                for (let i = 0; i < arr.length; i++) {
                    if (urlParse.hostname == arr[i].hostName)
                        return;
                }
            }
            whiteListWebsites.push({
                id: new Date().getTime(),
                hostName: urlParse.hostname,
                origin: urlParse.origin
            });

            chrome.storage.sync.set({ whiteListWebsite: JSON.stringify(whiteListWebsites) });
        }).then(() => {
            addToWhiteList();
        })

    });

})
function addToWhiteList() {
    chrome.storage.sync.get('whiteListWebsite', (data) => {
        let dataArray = JSON.parse(data['whiteListWebsite']);
        for (item of dataArray) {
            let div = document.createElement("div");
            div.className = "added-website";
            div.id = item.id;
            let url = document.createElement("div");
            url.className = "url";
            let urlText = document.createTextNode(`${item.origin}`);
            url.appendChild(urlText);
            let deleteButton = document.createElement("button");
            deleteButton.className = "delete";
            deleteButton.innerHTML = "X";
            div.appendChild(url);
            div.appendChild(deleteButton);
            divForAll.appendChild(div);
        }
    })
}
divForAll.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        console.log(e.target.parentElement.id);
        document.getElementById(e.target.parentElement.id).remove();
        deleteFromStorage(e.target.parentElement.id);
        whiteListWebsites = whiteListWebsites.filter((item) => {
            return item.id != e.target.parentElement.id;
        })
    }
})
function deleteFromStorage(itemId) {
    chrome.storage.sync.get("whiteListWebsite", (data) => {
        let newOne = JSON.parse(data['whiteListWebsite']);
        newOne = newOne.filter((item) => {
            return item.id != itemId;
        })
        chrome.storage.sync.set({ whiteListWebsite: JSON.stringify(newOne) });
    });
}

//end white list

