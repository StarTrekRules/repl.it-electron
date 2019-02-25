function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 600,
        minHeight: 600,
        title: 'Repl.it',
        icon: path.resolve(__dirname, 'utils/logo.png')
    });
    mainWindow.setBackgroundColor('#393c42');
    mainWindow.InternalId = 1;
    mainWindow.loadURL('https://repl.it/repls');
    mainWindow.webContents.on('did-fail-load', (event, errorCode) => {
        ErrorMessage(mainWindow, errorCode);
    });
    mainWindow.webContents.on('did-start-navigation', (event, url) => {
        if (url.toString().startsWith('about:')) {
            mainWindow.reload();
        }
        if (
            url.toString().includes('repl.it') ||
            url.toString().includes('repl.co') ||
            url.toString().includes('google.com') ||
            url.toString().includes('repl.run')
        ) {
        } else {
            dialog.showMessageBox(
                {
                    title: 'Confirm External Links',
                    message: `${url} Looks like an external link, would you like to load it externally?`,
                    type: 'info',
                    buttons: ['No', 'Yes'],
                    defaultId: 1
                },
                function(index) {
                    if (index === 1) {
                        shell.openExternal(url);
                        if (mainWindow.webContents.canGoBack()) {
                            mainWindow.webContents.goBack();
                        }
                    } else {
                        if (mainWindow.webContents.canGoBack()) {
                            mainWindow.webContents.goBack();
                        }
                    }
                }
            );
        }
    });
    return mainWindow;
}

module.exports = createWindow;
