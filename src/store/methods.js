const path = require('path');
const { shell, dialog, BrowserWindow } = require('electron');
const ErrorMessage = require('../common/ErrorMessage');
let mutations = require('./mutations');

let createWindow = () => {
    let mainWindow = new BrowserWindow({
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
    mutations.setMainWindow(mainWindow);
    return mainWindow;
};

let startSubWindow = (mainWindow, subWindow, url) => {
    if (subWindow !== undefined) {
        return;
    }
    subWindow = new BrowserWindow({
        width: mainWindow.getSize()[0] - 10,
        height: mainWindow.getSize()[1] - 10,
        minWidth: 600,
        minHeight: 600,
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
    subWindow.webContents.on('did-fail-load', (event, errorCode) => {
        ErrorMessage(subWindow, errorCode);
    });
    subWindow.webContents.on('did-start-navigation', (event, url) => {
        if (url.toString().startsWith('about:')) {
            subWindow.reload();
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
                        if (subWindow.webContents.canGoBack()) {
                            subWindow.webContents.goBack();
                        }
                    } else {
                        if (subWindow.webContents.canGoBack()) {
                            subWindow.webContents.goBack();
                        }
                    }
                }
            );
        }
    });
    mutations.setSubWindow(subWindow);
    return subWindow;
};

let methods = {
    createWindow,
    startSubWindow
};

module.exports = methods;
