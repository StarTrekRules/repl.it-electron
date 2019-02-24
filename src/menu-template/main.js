function createMainTemplate() {
    let main = {
        label: 'Main',
        submenu: [
            {
                label: 'New Window',
                accelerator: 'CmdOrCtrl+N',
                click() {
                    startSubWindow(mainWindow.webContents.getURL());
                }
            }
        ]
    };

    return main;
}

module.exports = createMainTemplate;