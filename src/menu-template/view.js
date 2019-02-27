// Not in use yet
function createViewTemplate(mainWindow, subWindow) {
    let template = [
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
        }
    ];
    return template;
}

module.exports = createViewTemplate;
