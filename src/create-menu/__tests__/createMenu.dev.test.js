const { _generateTextMenu } = require('../createMenu.dev');

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
