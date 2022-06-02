//listen to change state of chrome storage
chrome.storage.onChanged.addListener(function (changes, namespace) {
    // console.log(changes);
    if (changes['whiteListWebsite']) {
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                removeAllCSSFile(tab.id);
            });
        });
        applyForTimer();
    }
});

async function Valid(currentUrl) {
    try {
        let a = chrome.storage.sync.get(['whiteListWebsite']);
        let b = await a;
        let arr = JSON.parse(b['whiteListWebsite']);
        console.log(arr.length);
        // if (arr.length == 0) {
        //     return true;
        // }
        // console.log("111111", arr[0].hostName);
        // console.log("22222", arr[1].hostName);
        for (let i = 0; i < arr.length; i++) {
            // console.log(currentUrl);
            // console.log(arr[i].hostName);
            // console.log(currentUrl == arr[i].hostName);
            if (currentUrl == arr[i].hostName)
                return false;
        }
    } catch (e) {
        // console.log(e);
        return true;

    }
    return true;
}
function removeAllCSSFile(tabId) { // we should remove what we injuct by click or update because we do not need any dublicate of injuction
    // chrome.scripting.removeCSS({ //not ready yet
    //     target: { tabId: tabId },
    //     files: ['/CSSTheme/stakoverflow.css']
    // }).catch((e) => {
    // })
    chrome.scripting.removeCSS({
        target: { tabId: tabId },
        files: ['/CSSTheme/twitter.css']
    }).catch((e) => {
    })
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['/js/injectedFiles/removeInjectionAmazon.js']
    }).catch((e) => {
    })
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['/js/injectedFiles/removeInjectionGoogle.js']
    }).catch((e) => {
    })
    chrome.scripting.removeCSS({
        target: { tabId: tabId },
        files: ['/CSSTheme/youtube.css']
    }).catch((e) => {
    })
    chrome.scripting.removeCSS({
        target: { tabId: tabId },
        files: ['/CSSTheme/backgroundStyle.css']
    }).catch((e) => {
    })
}
let flag = true;
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        flag = true;
    }
    if (changeInfo.status === 'loading' && flag) {
        removeAllCSSFile(tabId);
        chrome.storage.sync.get('data-toggle', (data) => {
            // if (tab.url.indexOf("stakoverflow") != -1) {
            //     Valid(new URL(tab.url).hostname).then((notBlackList) => {
            //         if (notBlackList) {
            //             console.log("iam in stak")
            //             if (data['data-toggle'] == "dark") {
            //                 chrome.scripting.insertCSS({
            //                     target: { tabId: tabId },
            //                     files: ['/CSSTheme/stakoverflow.css']
            //                 }).catch((e) => {
            //                 })
            //             }
            //         }
            //     });
            // } else
            if (tab.url.indexOf("twitter") != -1) {
                Valid(new URL(tab.url).hostname).then((notBlackList) => {
                    if (notBlackList) {
                        if (data['data-toggle'] == "dark") {
                            chrome.scripting.insertCSS({
                                target: { tabId: tabId },
                                files: ['/CSSTheme/twitter.css']
                            }).catch((e) => {
                            })
                        }
                    }
                });
            } else if ((tab.url.indexOf("www.google") != -1 || tab.url.indexOf("translate.google") != -1)) {
                Valid(new URL(tab.url).hostname).then((notBlackList) => {
                    if (notBlackList) {
                        if (data['data-toggle'] == "dark") {
                            chrome.scripting.executeScript({
                                target: { tabId: tabId },
                                files: ['/js/injectedFiles/injectGoogle.js']
                            }).catch((e) => {
                            })
                        }
                    }
                });
            }
            else if (tab.url.indexOf("amazon") != -1) {
                Valid(new URL(tab.url).hostname).then((notBlackList) => {
                    if (notBlackList) {
                        if (data['data-toggle'] == "dark") {
                            chrome.scripting.executeScript({
                                target: { tabId: tabId },
                                files: ['/js/injectedFiles/injectAmazon.js']
                            }).catch((e) => {
                            })
                        }
                    }
                });
            } else if (tab.url.indexOf("youtube") != -1) {
                Valid(new URL(tab.url).hostname).then((notBlackList) => {
                    if (notBlackList) {
                        if (data['data-toggle'] == "dark") {
                            chrome.scripting.insertCSS({
                                target: { tabId: tabId },
                                files: ["/CSSTheme/youtube.css"]
                            }).catch((e) => {
                            })
                        }
                    }
                });
            } else {
                Valid(new URL(tab.url).hostname).then((notBlackList) => {
                    if (notBlackList) {
                        if (data['data-toggle'] == "dark") {
                            chrome.scripting.insertCSS({
                                target: { tabId: tabId },
                                files: ["/CSSTheme/backgroundStyle.css"]
                            }).catch((e) => {
                            })
                        }
                    }
                });
            }
        });
        flag = false;
    }
});

//we are here in service messgae from pop-up when button is toggeled
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.log("reach to clear toggled");
    chrome.alarms.clearAll();
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
            removeAllCSSFile(tab.id);
            // if (tab.url.indexOf("https://stackoverflow.com") != -1) {
            //     Valid(new URL(tab.url).hostname).then((notBlackList) => {
            //         if (notBlackList) {
            //             if (message.name === "light") {
            //                 chrome.scripting.removeCSS({
            //                     target: { tabId: tab.id },
            //                     files: ['/CSSTheme/stakoverflow.css']
            //                 }).catch((e) => {
            //                 })
            //             } else {
            //                 chrome.scripting.insertCSS({
            //                     target: { tabId: tab.id },
            //                     files: ['/CSSTheme/stakoverflow.css']
            //                 }).catch((e) => {
            //                 })
            //             }
            //         }
            //     });
            // } else 
            if (tab.url.indexOf("twitter") != -1) {
                Valid(new URL(tab.url).hostname).then((notBlackList) => {
                    if (notBlackList) {
                        if (message.name === "light") {
                            chrome.scripting.removeCSS({
                                target: { tabId: tab.id },
                                files: ['/CSSTheme/twitter.css']
                            }).catch((e) => {
                            })
                        } else {
                            chrome.scripting.insertCSS({
                                target: { tabId: tab.id },
                                files: ['/CSSTheme/twitter.css']
                            }).catch((e) => {
                            })
                        }
                    }
                });
            } else if (tab.url.indexOf("www.google") != -1 || tab.url.indexOf("translate.google") != -1) {
                Valid(new URL(tab.url).hostname).then((notBlackList) => {
                    if (notBlackList) {
                        if (message.name === "light") {
                            chrome.scripting.executeScript({
                                target: { tabId: tab.id },
                                files: ['/js/injectedFiles/removeInjectionGoogle.js']
                            }).catch((e) => {
                            });
                        } else {
                            chrome.scripting.executeScript({
                                target: { tabId: tab.id },
                                files: ['/js/injectedFiles/injectGoogle.js']
                            }).catch((e) => {
                            });
                        }
                    }
                });
            } else if (tab.url.indexOf("amazon") != -1) {
                Valid(new URL(tab.url).hostname).then((notBlackList) => {
                    if (notBlackList) {
                        if (message.name === "light") {
                            chrome.scripting.executeScript({
                                target: { tabId: tab.id },
                                files: ['/js/injectedFiles/removeInjectionAmazon.js']
                            }).catch((e) => {
                            });
                        } else {
                            chrome.scripting.executeScript({
                                target: { tabId: tab.id },
                                files: ['/js/injectedFiles/injectAmazon.js']
                            }).catch((e) => {
                            });
                        }
                    }
                });
            } else if (tab.url.indexOf("youtube") != -1) {
                Valid(new URL(tab.url).hostname).then((notBlackList) => {
                    if (notBlackList) {
                        if (message.name === "light") {
                            chrome.scripting.removeCSS({
                                target: { tabId: tab.id },
                                files: ['/CSSTheme/youtube.css']
                            }).catch((e) => {
                            })
                        } else {
                            chrome.scripting.insertCSS({
                                target: { tabId: tab.id },
                                files: ['/CSSTheme/youtube.css']
                            }).catch((e) => {
                            })
                        }
                    }
                });
            } else {
                Valid(new URL(tab.url).hostname).then((notBlackList) => {
                    if (notBlackList) {
                        if (message.name === "light") {
                            chrome.scripting.removeCSS({
                                target: { tabId: tab.id },
                                files: ['/CSSTheme/backgroundStyle.css']
                            }).catch((e) => {
                            })
                        } else {
                            chrome.scripting.insertCSS({
                                target: { tabId: tab.id },
                                files: ['/CSSTheme/backgroundStyle.css']
                            }).catch((e) => {
                            })
                        }
                    }
                });
            }
        });
    });
    return true;
});


//timer
chrome.alarms.onAlarm.addListener((alarm) => {
    // console.log('reach after delete');
    chrome.storage.sync.get('data-toggle', (data) => {
        // console.log(data['data-toggle']);
        if (alarm.name === "fromAlarm") {
            if (data['data-toggle'] === "light") {
                // console.log('reach from');
                chrome.storage.sync.set({ 'data-toggle': 'dark' });
                applyForTimer();
            } else {
                chrome.alarms.clearAll();
                chrome.storage.sync.remove('fromInput');
                chrome.storage.sync.remove('toInput');
            }
        } else {
            if (data['data-toggle'] === "dark") {
                // console.log('reach to');
                chrome.storage.sync.set({ 'data-toggle': 'light' });
                applyForTimer();
                // chrome.runtime.sendMessage({ name: "rest" });
            }
        }
    });
});


function applyForTimer() {
    chrome.storage.sync.get('data-toggle', (data) => {
        // console.log(data['data-toggle']);
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                // if (tab.url.indexOf("stackoverflow") != -1) {
                //     Valid(new URL(tab.url).hostname).then((notBlackList) => {
                //         if (notBlackList) {
                //             if (data['data-toggle'] === "light") {
                //                 chrome.scripting.removeCSS({
                //                     target: { tabId: tab.id },
                //                     files: ['/CSSTheme/stakoverflow.css']
                //                 }).catch((e) => {
                //                 })
                //             } else {
                //                 chrome.scripting.insertCSS({
                //                     target: { tabId: tab.id },
                //                     files: ['/CSSTheme/stakoverflow.css']
                //                 }).catch((e) => {
                //                 })
                //             }
                //         }
                //     });
                // } else
                if (tab.url.indexOf("twitter") != -1) {
                    Valid(new URL(tab.url).hostname).then((notBlackList) => {
                        if (notBlackList) {
                            if (data['data-toggle'] === "light") {
                                chrome.scripting.removeCSS({
                                    target: { tabId: tab.id },
                                    files: ['/CSSTheme/twitter.css']
                                }).catch((e) => {
                                })
                            } else {
                                chrome.scripting.insertCSS({
                                    target: { tabId: tab.id },
                                    files: ['/CSSTheme/twitter.css']
                                }).catch((e) => {
                                })
                            }
                        }
                    });
                } else if (tab.url.indexOf("www.google") != -1 || tab.url.indexOf("translate.google") != -1) {
                    Valid(new URL(tab.url).hostname).then((notBlackList) => {
                        if (notBlackList) {
                            if (data['data-toggle'] === "light") {
                                chrome.scripting.executeScript({
                                    target: { tabId: tab.id },
                                    files: ['/js/injectedFiles/removeInjectionGoogle.js']
                                }).catch((e) => {
                                });
                            } else {
                                chrome.scripting.executeScript({
                                    target: { tabId: tab.id },
                                    files: ['/js/injectedFiles/injectGoogle.js']
                                }).catch((e) => {
                                });
                            }
                        }
                    });
                } else if (tab.url.indexOf("amazon") != -1) {
                    Valid(new URL(tab.url).hostname).then((notBlackList) => {
                        if (notBlackList) {
                            if (data['data-toggle'] === "light") {
                                chrome.scripting.executeScript({
                                    target: { tabId: tab.id },
                                    files: ['/js/injectedFiles/removeInjectionAmazon.js']
                                }).catch((e) => {
                                });
                            } else {
                                chrome.scripting.executeScript({
                                    target: { tabId: tab.id },
                                    files: ['/js/injectedFiles/injectAmazon.js']
                                }).catch((e) => {
                                });
                            }
                        }
                    });
                } else if (tab.url.indexOf("youtube") != -1) {
                    Valid(new URL(tab.url).hostname).then((notBlackList) => {
                        if (notBlackList) {
                            if (data['data-toggle'] === "light") {
                                chrome.scripting.removeCSS({
                                    target: { tabId: tab.id },
                                    files: ['/CSSTheme/youtube.css']
                                }).catch((e) => {
                                })
                            } else {
                                chrome.scripting.insertCSS({
                                    target: { tabId: tab.id },
                                    files: ['/CSSTheme/youtube.css']
                                }).catch((e) => {
                                })
                            }
                        }
                    });
                } else {
                    Valid(new URL(tab.url).hostname).then((notBlackList) => {
                        if (notBlackList) {
                            if (data['data-toggle'] === "light") {
                                chrome.scripting.removeCSS({
                                    target: { tabId: tab.id },
                                    files: ['/CSSTheme/backgroundStyle.css']
                                }).catch((e) => {
                                })
                            } else {
                                chrome.scripting.insertCSS({
                                    target: { tabId: tab.id },
                                    files: ['/CSSTheme/backgroundStyle.css']
                                }).catch((e) => {
                                })
                            }
                        }
                    });
                }
            });
            return true;
        });
    });
}
