let { dialog } = require('electron');

// Not in use yet
function createViewTemplate(mainWindow, subWindow) {
    return [
        {
            label: 'Send Sub to Main Window',
            click() {
                if (subWindow) {
                    let subUrl = subWindow.getURL();
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
        }
    ];
}

module.exports = createViewTemplate;
