javascript:(function() {
    const messages = {
        'nid.naver.com': {
            'TEST ACCOUNT NO.1': 'vt09eFgsFMB9wOi6EjE64fyM/XqdEhf8UtJrPjYqKrN6tbgiHAuQNDgi5agBUCar',
            'TEST ACCOUNT No.2': 'nbEGNqRkvz9m4sR6kvgoCnfE0EkzXrbg+mrNYog611jb2F3ZBAFphbeMsAm4bc/b',
        },
    };
    const hostname = location.hostname;
    const encryptedMessage = messages[hostname];

    if (!encryptedMessage) {
        showTemporaryError('No encrypted dataSet found for this site.');
        return;
    }

    function createInputDiv() {
        if (document.getElementById('password-input-div')) {
            const decryptInput = document.getElementById('decrypt-input');
            decryptInput.focus();
            return;
        }

        const div = document.createElement('div');
        div.id = 'password-input-div';
        div.style.position = 'fixed';
        div.style.top = '50%';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, -50%)';
        div.style.padding = '20px';
        div.style.backgroundColor = '#f9f9f9';
        div.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
        div.style.zIndex = 1000;
        div.style.borderRadius = '8px';
        div.style.minWidth = '350px';
        div.style.maxWidth = '450px';
        div.style.boxSizing = 'border-box';
        div.style.border = '1px solid #ddd';
        div.style.fontFamily = 'Arial, sans-serif';

        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.backgroundColor = '#f44336';
        closeButton.style.color = '#fff';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '50%';
        closeButton.style.width = '24px';
        closeButton.style.height = '24px';
        closeButton.style.fontSize = '16px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.textAlign = 'center';
        closeButton.style.lineHeight = '24px';
        closeButton.style.transition = 'background-color 0.3s ease';
        closeButton.addEventListener('mouseover', () => {
            closeButton.style.backgroundColor = '#e53935';
        });
        closeButton.addEventListener('mouseout', () => {
            closeButton.style.backgroundColor = '#f44336';
        });
        closeButton.addEventListener('click', () => {
            document.body.removeChild(div);
        });

        const decryptLabel = document.createElement('label');
        decryptLabel.textContent = 'Enter the decryption phrase:';
        decryptLabel.style.display = 'block';
        decryptLabel.style.marginBottom = '12px';
        decryptLabel.style.fontSize = '16px';
        decryptLabel.style.color = '#333';

        const decryptInputDiv = document.createElement('div');
        decryptInputDiv.style.position = 'relative';

        const decryptInput = document.createElement('input');
        decryptInput.type = 'password';
        decryptInput.id = 'decrypt-input';
        decryptInput.style.width = '100%';
        decryptInput.style.boxSizing = 'border-box';
        decryptInput.style.padding = '12px';
        decryptInput.style.marginBottom = '12px';
        decryptInput.style.border = '1px solid #ddd';
        decryptInput.style.borderRadius = '4px';
        decryptInput.style.fontSize = '16px';

        const showPasswordButton = document.createElement('button');
        showPasswordButton.textContent = 'Show';
        showPasswordButton.style.position = 'absolute';
        showPasswordButton.style.right = '10px';
        showPasswordButton.style.top = '50%';
        showPasswordButton.style.transform = 'translateY(-70%)';
        showPasswordButton.style.backgroundColor = '#007bff';
        showPasswordButton.style.color = '#fff';
        showPasswordButton.style.border = 'none';
        showPasswordButton.style.borderRadius = '4px';
        showPasswordButton.style.cursor = 'pointer';
        showPasswordButton.style.padding = '6px';
        showPasswordButton.style.fontSize = '12px';
        showPasswordButton.style.transition = 'background-color 0.3s ease';

        decryptInputDiv.appendChild(decryptInput);
        decryptInputDiv.appendChild(showPasswordButton);

        const decryptButton = document.createElement('button');
        decryptButton.textContent = 'Submit';
        decryptButton.style.width = '100%';
        decryptButton.style.padding = '12px';
        decryptButton.style.backgroundColor = '#007bff';
        decryptButton.style.color = '#fff';
        decryptButton.style.border = 'none';
        decryptButton.style.borderRadius = '4px';
        decryptButton.style.cursor = 'pointer';
        decryptButton.style.fontSize = '16px';
        decryptButton.style.transition = 'background-color 0.3s ease';
        decryptButton.addEventListener('mouseover', () => {
            decryptButton.style.backgroundColor = '#0056b3';
        });
        decryptButton.addEventListener('mouseout', () => {
            decryptButton.style.backgroundColor = '#007bff';
        });

        const errorMessage = document.createElement('div');
        errorMessage.id = 'error-message';
        errorMessage.style.color = '#f44336';
        errorMessage.style.marginTop = '12px';
        errorMessage.style.fontSize = '16px';

        const accountSelect = document.createElement('select');
        accountSelect.id = 'account-select';
        accountSelect.style.width = '100%';
        accountSelect.style.boxSizing = 'border-box';
        accountSelect.style.padding = '10px';
        accountSelect.style.marginBottom = '12px';
        accountSelect.style.border = '1px solid #ddd';
        accountSelect.style.borderRadius = '4px';
        accountSelect.style.fontSize = '16px';

        if (typeof encryptedMessage === 'object') {
            Object.keys(encryptedMessage).forEach(account => {
                const option = document.createElement('option');
                option.value = account;
                option.textContent = account;
                accountSelect.appendChild(option);
            });
            div.appendChild(accountSelect);
        }

        accountSelect.addEventListener('change', () => {
            decryptInput.focus();
        });

        decryptButton.addEventListener('click', () => {
            const password = decryptInput.value;
            const selectedAccount = accountSelect ? accountSelect.value : null;
            if (password) {
                handlePassword(password, selectedAccount);
            } else {
                displayError('Password is required.');
                decryptInput.focus();
            }
        });

        decryptInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                decryptButton.click();
            }
        });

        const developerInfo = document.createElement('a');
        developerInfo.href = 'https://github.com/Crypto-Claudia';
        developerInfo.textContent = 'Created by Crypto-Claudia';
        developerInfo.style.fontSize = '12px';
        developerInfo.style.color = '#888';
        developerInfo.style.textAlign = 'center';
        developerInfo.style.marginTop = '20px';
        developerInfo.style.display = 'block';
        developerInfo.style.textDecoration = 'none';
        developerInfo.style.transition = 'color 0.3s ease';
        developerInfo.addEventListener('mouseover', () => {
            developerInfo.style.color = '#555';
        });
        developerInfo.addEventListener('mouseout', () => {
            developerInfo.style.color = '#888';
        });

        div.appendChild(closeButton);
        div.appendChild(decryptLabel);
        div.appendChild(decryptInputDiv);
        div.appendChild(decryptButton);
        div.appendChild(errorMessage);
        div.appendChild(developerInfo);

        document.body.appendChild(div);

        decryptInput.focus();
        
        showPasswordButton.addEventListener('mouseenter', () => {
            decryptInput.type = 'text';
            showPasswordButton.textContent = 'Hide';
        });

        showPasswordButton.addEventListener('mouseleave', () => {
            decryptInput.type = 'password';
            showPasswordButton.textContent = 'Show';
        });
    }

    function displayError(message) {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }

    function showTemporaryError(message) {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '50%';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, -50%)';
        div.style.padding = '15px';
        div.style.backgroundColor = '#f44336';
        div.style.color = '#fff';
        div.style.borderRadius = '8px';
        div.style.zIndex = 1001;
        div.style.fontSize = '16px';
        div.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
        div.style.textAlign = 'center';
        div.style.transition = 'opacity 2s ease-out, background-color 2s ease-out';
        div.style.opacity = '1';
        div.style.maxWidth = '400px';
        div.style.boxSizing = 'border-box';

        div.textContent = message;
        document.body.appendChild(div);

        setTimeout(() => {
            div.style.backgroundColor = '#ffffff';
            div.style.opacity = '0';
        }, 2000);

        setTimeout(() => {
            document.body.removeChild(div);
        }, 3000);
    }

    async function handlePassword(password, selectedAccount) {
        async function decryptMessage(encryptedMessage, password) {
            const decoder = new TextDecoder();
            const encoder = new TextEncoder();

            const keyMaterial = await crypto.subtle.importKey(
                'raw',
                encoder.encode(password),
                'PBKDF2',
                false,
                ['deriveKey']
            );

            const derivedKey = await crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt: encoder.encode('salt'),
                    iterations: 100000,
                    hash: 'SHA-256'
                },
                keyMaterial,
                { name: 'AES-CBC', length: 256 },
                false,
                ['decrypt']
            );

            const data = new Uint8Array(atob(encryptedMessage).split('').map(c => c.charCodeAt(0)));
            const ivLength = 16;
            const iv = data.slice(0, ivLength);
            const encrypted = data.slice(ivLength);

            try {
                const decryptedBytes = await crypto.subtle.decrypt(
                    {
                        name: 'AES-CBC',
                        iv: iv
                    },
                    derivedKey,
                    encrypted
                );

                const decryptedText = decoder.decode(decryptedBytes);
                return decryptedText;
            } catch (e) {
                console.error('Decryption failed:', e);
                displayError('Decryption failed. Make sure the password and encrypted dataSet are correct.');
                return null;
            }
        }

        try {
            const messageToDecrypt = typeof encryptedMessage === 'object' && selectedAccount
                ? encryptedMessage[selectedAccount]
                : encryptedMessage;

            const decryptedMessage = await decryptMessage(messageToDecrypt, password);
            if (!decryptedMessage) return;

            const [userId, userPw] = decryptedMessage.split('-');
            const hostname = location.hostname;

            const fieldMappings = {
                'default': {
                    idFieldId: 'id',
                    pwFieldId: 'pw'
                }
            };

            const fields = fieldMappings[hostname] || fieldMappings['default'];
            console.log(fields);

            function setFieldValues(userId, userPw) {
                const idField = document.getElementById(fields.idFieldId);
                const pwField = document.getElementById(fields.pwFieldId);
                if (idField && pwField) {
                    idField.value = userId;
                    pwField.value = userPw;
                    pwField.focus();

                    console.log('User ID:', userId);
                    console.log('Password:', userPw);

                    const passwordDiv = document.getElementById('password-input-div');
                    if (passwordDiv) {
                        document.body.removeChild(passwordDiv);
                    }
                } else {
                    displayError(`Input fields with IDs "${fields.idFieldId}" and "${fields.pwFieldId}" not found on the page.`);
                }
            }

            setFieldValues(userId, userPw);
        } catch (e) {
            displayError('An unexpected error occurred. Please check the console for details.');
            console.error(e);
        }
    }

    createInputDiv();
})();
