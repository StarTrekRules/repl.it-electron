const { dialog } = require('electron');
const ElectronPrompt = require('electron-prompt');

function startCustomSession() {
    ElectronPrompt({
        title: 'Join Multiplayer',
        label: 'URL:',
        value: 'https://repl.it/',
        inputAttrs: {
            type: 'url'
        },
        customStylesheet: Dark
            ? __dirname + '/styles/promptDark.css'
            : __dirname + '/styles/prompt.css'
    })
        .then(r => {
            if (r === undefined || r === null) {
                return;
            }
            if (
                r.toString().replace(' ', '') === '' ||
                !r.toString().startsWith('https://repl.it/')
            ) {
                dialog.showMessageBox({
                    title: '',
                    message: `Please input a valid URL.`,
                    type: 'info',
                    buttons: ['OK'],
                    defaultId: 0
                });
            } else {
                if (subWindow !== undefined) {
                    dialog.showMessageBox(
                        {
                            title: '',
                            message: `Do you want to load ${r} in window 2?`,
                            type: 'info',
                            buttons: ['Yes', 'No'],
                            defaultId: 0
                        },
                        index => {
                            if (index === 0) {
                                subWindow.loadURL(r);
                            } else {
                            }
                        }
                    );
                } else {
                    startSubWindow(r);
                }
            }
        })
        .catch(console.error);
}

module.exports = startCustomSession;
