function reply(data, sender, sendResponse) {
    const { ctx } = data;
    console.log(
        `Background says "${ctx.message} I am ID ${ctx.id}.", and I say...`,
    );
    console.log(`Hello, ID ${ctx.id}! I am content that you say hi!`);
}

chrome.runtime.onMessage.addListener(reply);
