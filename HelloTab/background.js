function getActiveTab() {
    // I think Firefox doesn't like `chrome` namespace for
    // tabs.query(), so conditionally switching namespace here.
    const isChrome = navigator.userAgent.indexOf('Chrome') > -1;
    const userBrowser = isChrome ? chrome : browser;
    return userBrowser.tabs.query({ active: true, currentWindow: true });
}

function greet() {
    getActiveTab().then((tabs, sender, sendResponse) => {
        console.log(tabs);
        console.log('Hello from brackground!');
        // console.log('SHOHEI@background.js:8 ##### VAR: "tabs[0]" =', tabs[0]);
        // console.log(`Hello, ID ${tabs[0].id}!`);
        // console.log(
        //     'SHOHEI@background.js:15 ##### VAR: "tabs[0].url" =',
        //     tabs[0].url,
        // );
        const ctx = {
            id: tabs[0].id,
            message: 'Hello, content!',
        };

        if (!tabs[0].url.includes('about:')) {
            chrome.tabs.sendMessage(tabs[0].id, { ctx });
        } else {
            console.log(`Unsupported url: ${tabs[0].url}`); // technically not an error
        }
    });
}

// Alternatively you can use `browser` for Firefox extensions
// chrome.tabs.onUpdated.addListener(greet);
chrome.tabs.onActivated.addListener(greet);
