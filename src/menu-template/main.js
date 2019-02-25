let startSubWindow = require('../common/startSubWindow');

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
            }
        ]
    };

    return main;
}

module.exports = createMainTemplate;
