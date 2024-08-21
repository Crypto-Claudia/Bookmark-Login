javascript:(async function() {
    // Password and plaintext string
    const password = 'password!'; // The string used for decryption
    const plaintext = 'ID-password'; // maintain the format 'ID-password'. example) 'myid123-P@ssworD~!'

    // Encryption and decryption function
    async function encryptDecryptDemo() {
        // Text encoder and decoder
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        // Convert password to SHA-256 hash to generate AES key
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
            ['encrypt', 'decrypt']
        );

        // Encryption
        async function encrypt(plaintext) {
            const iv = crypto.getRandomValues(new Uint8Array(16)); // Generate IV
            const encryptedContent = await crypto.subtle.encrypt(
                {
                    name: 'AES-CBC',
                    iv: iv
                },
                derivedKey,
                encoder.encode(plaintext)
            );

            // Combine ciphertext and IV and encode as Base64
            const combined = new Uint8Array([...iv, ...new Uint8Array(encryptedContent)]);
            return btoa(String.fromCharCode(...combined));
        }

        // Decryption
        async function decrypt(encryptedMessage) {
            const data = new Uint8Array(atob(encryptedMessage).split('').map(c => c.charCodeAt(0)));
            const iv = data.slice(0, 16);
            const encrypted = data.slice(16);

            const decryptedContent = await crypto.subtle.decrypt(
                {
                    name: 'AES-CBC',
                    iv: iv
                },
                derivedKey,
                encrypted
            );

            return decoder.decode(decryptedContent);
        }

        // Perform encryption and decryption
        try {
            const encryptedMessage = await encrypt(plaintext);
            console.log('Encrypted message:', encryptedMessage);

            const decryptedMessage = await decrypt(encryptedMessage);
            console.log('Decrypted message:', decryptedMessage);
        } catch (e) {
            console.error('Error:', e);
        }
    }

    // Execute encryption and decryption
    await encryptDecryptDemo();
})();
