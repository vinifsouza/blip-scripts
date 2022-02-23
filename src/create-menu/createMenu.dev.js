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

function _generateBlipChatQuickReply(text, options) {
    options = options.map((option, idx) => ({
        order: idx + 1,
        text: option
    }));

    return {
        type: MENU_TYPES.QUICK_REPLY.BLIP_CHAT.TYPE,
        content: {
            scope: MENU_TYPES.QUICK_REPLY.BLIP_CHAT.SCOPE,
            text,
            options
        }
    };
}

function _generateWhatsAppQuickReply(text, options) {
    const buttons = options.map((option) => ({
        type: MENU_TYPES.QUICK_REPLY.WHATSAPP.BUTTON_TYPE,
        reply: {
            id: option,
            title: __checkOptionToQuickReply(option)
        }
    }));

    return {
        type: MENU_TYPES.QUICK_REPLY.WHATSAPP.TYPE,
        content: {
            recipient_type: MENU_TYPES.QUICK_REPLY.WHATSAPP.RECIPIENT_TYPE,
            type: MENU_TYPES.QUICK_REPLY.WHATSAPP.CONTENT_TYPE,
            interactive: {
                type: MENU_TYPES.QUICK_REPLY.WHATSAPP.INTERACTIVE_TYPE,
                body: { text },
                action: { buttons }
            }
        }
    };
}

function __checkOptionToQuickReply(option) {
    if (option.length > 20) {
        throw new Error(
            `Option '${option}' exceed the limit of 20 characters to WhatsApp quick reply`
        );
    }
    return option;
}

// exports
module.exports = {
    _generateTextMenu,
    _generateBlipChatQuickReply,
    _generateWhatsAppQuickReply,
    __checkOptionToQuickReply
};
