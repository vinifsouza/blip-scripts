const MENU_TYPES = {
    QUICK_REPLY: {
        BLIP_CHAT: {
            TYPE: 'application/vnd.lime.select+json',
            SCOPE: 'immediate'
        },
        WHATSAPP: {
            TYPE: 'application/json',
            CONTENT_TYPE: 'interactive',
            RECIPIENT_TYPE: 'individual',
            INTERACTIVE_TYPE: 'button',
            BUTTON_TYPE: 'reply'
        }
    }
};

function _generateTextMenu(text, options) {
    const optionsToDisplay = options
        .map((option, idx) => `<b>${idx + 1}.</b> ${option}\n`)
        .join('')
        .split('');

    optionsToDisplay.pop();

    const textMenu = `${text}\n\n${optionsToDisplay.join('')}`;

    return textMenu;
}

// exports
module.exports = {
    _generateTextMenu
};
