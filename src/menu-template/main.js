let startSubWindow = require('../common/startSubWindow');
let startCustomSession = require('../common/startCustomSession');

function createMainTemplate(mainWindow) {
    let main = {
        label: 'Main',
        submenu: [
            {
                role: 'undo'
            },
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
            }
        ]
    };

    return main;
}

module.exports = createMainTemplate;
