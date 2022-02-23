const {
    _generateTextMenu,
    _generateBlipChatQuickReply,
    _generateWhatsAppQuickReply,
    __checkOptionToQuickReply
} = require('../createMenu.dev');

describe('text menu', () => {
    it('should generate text menu with numered options', () => {
        const payloadText = 'Choose an option';
        const payloadOptions = [
            'First Option',
            'Second Option',
            'Third Option'
        ];

        const response = _generateTextMenu(payloadText, payloadOptions);

        const expected =
            'Choose an option\n\n<b>1.</b> First Option\n<b>2.</b> Second Option\n<b>3.</b> Third Option';

        expect(response).toStrictEqual(expected);
    });
});

describe('generate quick reply', () => {
    const payloadText = 'Choose an option';
    const payloadOptions = ['First Option', 'Second Option', 'Third Option'];

    it('should generate quick reply to BLIPCHAT', () => {
        const response = _generateBlipChatQuickReply(
            payloadText,
            payloadOptions
        );

        const expected = {
            type: 'application/vnd.lime.select+json',
            content: {
                scope: 'immediate',
                text: payloadText,
                options: [
                    {
                        order: 1,
                        text: 'First Option'
                    },
                    {
                        order: 2,
                        text: 'Second Option'
                    },
                    {
                        order: 3,
                        text: 'Third Option'
                    }
                ]
            }
        };

        expect(response).toStrictEqual(expected);
    });

    it('should generate quick reply to WHATSAPP', () => {
        const expected = {
            content: {
                recipient_type: 'individual',
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: payloadText
                    },
                    action: {
                        buttons: [
                            {
                                type: 'reply',
                                reply: {
                                    id: 'First Option',
                                    title: 'First Option'
                                }
                            },
                            {
                                type: 'reply',
                                reply: {
                                    id: 'Second Option',
                                    title: 'Second Option'
                                }
                            },
                            {
                                type: 'reply',
                                reply: {
                                    id: 'Third Option',
                                    title: 'Third Option'
                                }
                            }
                        ]
                    }
                }
            },
            type: 'application/json'
        };

        const response = _generateWhatsAppQuickReply(
            payloadText,
            payloadOptions
        );

        expect(response).toStrictEqual(expected);
    });
});

describe('test props and options validation', () => {
    it('should throw new error when option length exceed the limit of 20 characters', () => {
        const option = 'Lorem ipsum dolor sit amet'; // 26 characters
        const messageErrorExpected = `Option '${option}' exceed the limit of 20 characters to WhatsApp quick reply`;
        expect(() => {
            __checkOptionToQuickReply(option);
        }).toThrow(messageErrorExpected);
    });

    it('should return option when option length not exceed the limit of 20 characters', () => {
        const option = 'Lorem ipsum dolor si'; // 20 characters
        expect(__checkOptionToQuickReply(option)).toStrictEqual(option);
    });
});
