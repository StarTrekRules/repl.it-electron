function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        title: 'Repl.it',
        icon: path.resolve(__dirname, 'utils/logo.png')
    });
    mainWindow.setBackgroundColor('#393c42');
    mainWindow.InternalId = 1;
    mainWindow.loadURL('https://repl.it/repls');
    mainWindow.webContents.on('did-fail-load', (event, errorCode) => {
        ErrorMessage(mainWindow, errorCode);
    });
    Menu.setApplicationMenu(menu);
    mainWindow.webContents.on('did-frame-finish-load', () => {
        addDark(mainWindow, Dark);
        if (!Dark) {
            mainWindow.setBackgroundColor('#FFF');
        }
    });
    mainWindow.on('close', () => {
        try {
            var url = mainWindow.webContents.getURL();
        } catch (e) {}
        dialog.showMessageBox(
            {
                title: 'Confirm Quit',
                message: `Are you sure you want to quit?`,
                type: 'info',
                buttons: ['Yes', 'No'],
                defaultId: 0
            },
            function(index) {
                if (index === 1) {
                    delete mainWindow;
                    mainWindow = createWindow();
                    try {
                        mainWindow.loadURL(url);
                    } catch (e) {}
                } else {
                    process.exit(0);
                }
            }
        );
    });
    mainWindow.webContents.on('did-start-navigation', (event, url) => {
        if (url.toString().startsWith('about:')) {
            mainWindow.reload()
        }
        if (url.toString().includes('repl.it') || url.toString().includes('repl.co') || url.toString().includes('google.com') || url.toString().includes('repl.run')) {
        } else {
            dialog.showMessageBox({
                title: "Confirm External Links",
                message: `${url} Looks like an external link, would you like to load it externally?`,
                type: 'info',
                buttons: ["No", "Yes"],
                defaultId: 1
            }, function (index) {
                if (index === 1) {
                    shell.openExternal(url);
                    if (mainWindow.webContents.canGoBack()) {
                        mainWindow.webContents.goBack()
                    }
                } else {
                    if (mainWindow.webContents.canGoBack()) {
                        mainWindow.webContents.goBack()
                    }
                }
            });
        }
    });
    return mainWindow;
}

module.exports = createWindow;