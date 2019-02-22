let { dialog } = require('electron');
let startSubWindow = require('../common/startSubWindow');
let startCustomSession = require('../common/startCustomSession');
let mainWindow = require('../common/createWindow');

let main = {
    label: 'Main',
    submenu: [
        {
            label: 'New Window',
            accelerator: 'CmdOrCtrl+N',
            click() {
                startSubWindow(mainWindow.webContents.getURL());
            }
        },
        {
            label: 'Join Multiplayer/Custom Repl.it Links',
            accelerator: 'CmdOrCtrl+L',
            click() {
                startCustomSession();
            }
        },
        {
            label: 'Send Sub to Main Window',
            click() {
                if (subWindow) {
                    var subUrl = subWindow.getURL();
                    dialog.showMessageBox({
                        title: "",
                        message: `Do you want to load ${subUrl} in window 1?`,
                        type: 'info',
                        buttons: ["Yes", "No"],
                        defaultId: 0
                    }, (index) => {
                        if (index === 0) {
                            mainWindow.loadURL(subUrl)
                        } else {

                        }
                    })
                }
            }
        },
        {
            label: 'Preference',
            accelerator: 'CmdOrCtrl+,',
            // click() {
            //     Preferences.show()
            // }
        },
        {
            type: 'separator'
        },
        {
            role: 'quit'
        }
    ]
};

module.exports = main;