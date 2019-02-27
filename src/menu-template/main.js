let startSubWindow = require('../common/startSubWindow');
let startCustomSession = require('../common/startCustomSession');

function createMainTemplate(mainWindow, subWindow, Preferences) {
    return {
        label: 'Main',
        submenu: [
            {
                label: 'New Window',
                accelerator: 'CmdOrCtrl+N',
                click() {
                    let url = mainWindow.webContents.getURL();
                    startSubWindow(mainWindow, url);
                }
            },
            {
                label: 'Sub Window',
                accelerator: 'CmdOrCtrl+N',
                click() {
                    let url = mainWindow.webContents.getURL();
                    startSubWindow(mainWindow, url);
                }
            },
            {
                label: 'Join Multiplayer/Custom Repl.it Links',
                accelerator: 'CmdOrCtrl+L',
                click() {
                    startCustomSession(mainWindow);
                }
            },
            {
                label: 'Send Sub to Main Window',
                click() {
                    if (subWindow) {
                        var subUrl = subWindow.getURL();
                        dialog.showMessageBox(
                            {
                                title: '',
                                message: `Do you want to load ${subUrl} in window 1?`,
                                type: 'info',
                                buttons: ['Yes', 'No'],
                                defaultId: 0
                            },
                            index => {
                                if (index === 0) {
                                    mainWindow.loadURL(subUrl);
                                } else {
                                }
                            }
                        );
                    }
                }
            },
            {
                label: 'Preferences',
                accelerator: 'CmdOrCtrl+,',
                click() {
                    Preferences.show();
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ]
    };
}

module.exports = createMainTemplate;
