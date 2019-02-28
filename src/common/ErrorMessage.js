const ChromeErrors = require('chrome-network-errors');
const { app } = require('electron');

function ErrorMessage(windowObject, errorCode) {
    let id = windowObject.InternalId;
    let reason = ChromeErrors[errorCode];
    if (
        reason === 'ABORTED' ||
        reason === 'INVALID_ARGUMENT' ||
        reason === 'FAILED'
    ) {
        windowObject.reload(true);
    }
    dialog.showMessageBox(
        {
            title: 'Loading Failed',
            message: `loading Failed on window ${id} reason ${reason}, do you want to try again?`,
            type: 'error',
            buttons: ['Try again please', 'Quit'],
            defaultId: 0
        },
        function(index) {
            // if clicked "Try again please"
            if (index === 0) {
                windowObject.reload();
            } else {
                app.quit();
            }
        }
    );
}

module.exports = ErrorMessage;
