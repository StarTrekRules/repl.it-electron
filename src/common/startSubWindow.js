const { dialog, BrowserWindow } = require('electron');

function startSubWindow(url) {
    if (subWindow !== undefined) {
        return;
    }
    let subWindow = new BrowserWindow({
        width: mainWindow.getSize()[0] - 10,
        height: mainWindow.getSize()[1] - 10,
        title: 'Repl.it',
        icon: path.resolve(__dirname, 'utils/logo.png'),
        parent: mainWindow
    });
    subWindow.setBackgroundColor('#393c42');
    subWindow.InternalId = 2;
    if (url) {
        subWindow.loadURL(url);
    } else {
        subWindow.loadURL('https://repl.it/repls');
    }
    subWindow.webContents.on('did-frame-finish-load', () => {
        addDark(subWindow, Dark);
        if (!Dark) {
            subWindow.setBackgroundColor('#FFF');
        }
    });
    subWindow.webContents.on('did-fail-load', (event, errorCode) => {
        ErrorMessage(subWindow, errorCode);
    });
    subWindow.on('close', () => {
        subWindow.prototype = {};
        subWindow = undefined;
    });
    subWindow.webContents.on('did-start-navigation', (event, url) => {
        if (url.toString().startsWith('about:')) {
            subWindow.reload()
        }
        if (url.toString().includes('repl.it') || url.toString().includes('repl.co') || url.toString().includes('google.com') || url.toString().includes('repl.run')) {
        } else {
            dialog.showMessageBox({
                title: "Confirm External Links",
                message: `${url} Lookas like an external link, would you like to load it externally?`,
                type: 'info',
                buttons: ["No", "Yes"],
                defaultId: 1
            }, function (index) {
                if (index === 1) {
                    shell.openExternal(url);
                    if (subWindow.webContents.canGoBack()) {
                        subWindow.webContents.goBack()
                    }
                } else {
                    if (subWindow.webContents.canGoBack()) {
                        subWindow.webContents.goBack()
                    }
                }
            });
        }
    });
}

module.exports = startSubWindow;