# Password Decryptor Bookmarklet

This repository contains a bookmarklet script designed to decrypt and autofill passwords on various websites. The bookmarklet prompts the user for a decryption phrase, decrypts the stored credentials, and populates the login fields on the current page.

## Features

- **Decryption**: Allows users to decrypt encrypted password data using a user-provided phrase.
- **Autofill**: Automatically fills in login credentials (username and password) into the appropriate fields on the page.
- **Customizable**: Modify the `messages` and `fieldMappings` objects in the script to fit your needs.

## Encryption Details

- **Encryption Algorithm**: AES-CBC (Advanced Encryption Standard in Cipher Block Chaining mode)
- **Key Derivation**: PBKDF2 (Password-Based Key Derivation Function 2)
- **Hash Function**: SHA-256
- **Key Length**: 256 bits
- **Initialization Vector (IV)**: 16 bytes

The encryption process involves deriving a key from the user-provided decryption phrase using PBKDF2, and then using that key to decrypt data encrypted with AES-CBC.

For detailed information on how to generate the encrypted strings and how keys are derived, refer to `encrypt.js`.

## Installation

1. **Create a Bookmarklet:**
   - Copy the entire JavaScript code from `bookmarklet.js`. This file contains test data specifically for use with `nid.naver.com`, and the test password included is `claudia`.
   - Ensure that there are no comments in the middle of the code.
   - Create a new bookmark in your web browser.
   - Paste the JavaScript code into the bookmark’s URL field.


2. **Add the Bookmarklet:**
   - Name your bookmark (e.g., "Password Decryptor").
   - Save the bookmark.

## Usage

1. **Modify the Script:**
   - Open the `bookmarklet.js` file.
   - Customize the `messages` and `fieldMappings` objects to match the websites you use.
   - The file must not contain any comments.

2. **Navigate to a Website:**
   - Go to the login page of the website you configured in the `fieldMappings`.

3. **Activate the Bookmarklet:**
   - Click on the "Password Decryptor" bookmark you created.

4. **Enter Decryption Phrase:**
   - A prompt will appear asking for the decryption phrase. Enter your phrase and click "Submit."

5. **Autofill Credentials:**
   - The bookmarklet will attempt to decrypt the credentials and fill them into the login fields on the page.

## `messages` Object Structure

The `messages` object is used to store encrypted account information for various websites. Here’s a breakdown of its structure:

- **Key**: Represents the `location.hostname` of the login page.
- **Value**: Can be:
  - A single string for encrypted credentials for one account.
  - An object where each key is an account name and each value is the encrypted credentials for that account.

### Example

```javascript
const messages = {
    'nid.naver.com': '/gICR6WWMg3qkCxt+a7JCRWE9wL4Bxl11EMiyCT150SjwIs4BnCeXwC5JjqGB824',
    'sign.dcinside.com': {
        'asdf': 'j/UR4ac8m4rX0x+tU+8JDHaAVUtwR8td1Yj1OD7ylAWV/VqMbHm23Cz++W8Y2fRg',
        'QWER': 'fUd2ZL3+FXNdUIydwLm7dUwbbMIhBhsEm2YJT3xxHuDrSSduPBsf+iQrBu1DnRWD',
        'zXcV': 'jCq53tymg/PgUqnD6jk2FJ7Lyhn0PnY52QyMB4P3MRrRUGBjXQDkpkrju8cM99uu'
    },
    'nxlogin.nexon.com': {
        'First Account': 'fEmf2rTaxBDQ2aQA6hm7sFm1Oj2d/ntlLH95Sni4N0vG0D9JFEwjBwDhBMEbTZS4VslrJuw79YJd+/vH+gCpLA==',
        'Second Account': '/lp2wWQ10WNw58RbgWLWpUsd3Kje+M0p1gy60CY/QCAyH8eUl2yJRD3klCVbXk6daVffScz1/LMkqjcKvGsa+g==',
        'Third Account': '4tFkBpBYchRlXyqWIvEt6OlZf92CZ9xUTP3oznzySb21ghMyqOAjFDe+w/l/8HgwOqkxsbibqJUlTJsup4f14w=='
    },
    'accounts.kakao.com': 'PDdZ2HLEa8vIqhDPpt+ZSJNUN+/RFKuReq5scXcWIZByp6sf0f/C2sQ+QQBmd8ghrGXTbj9j81YrUImeBYQ/Xg==',
};
```
## `fieldMappings` Object Structure

The `fieldMappings` object maps the `location.hostname` of a login page to the corresponding field IDs used in login forms. Here’s a breakdown of its structure:

- **Key**: Represents the `location.hostname` of the login page.

- **Value**: An object containing:
  - **`idFieldId`**: The ID of the input field for the username.
  - **`pwFieldId`**: The ID of the input field for the password.

- **Default**: Provides a fallback mapping for cases where specific field IDs are not provided. It is used when the field IDs are `"id"` for the username and `"pw"` for the password.

### Example

```javascript
const fieldMappings = {
    'nxlogin.nexon.com': {
        idFieldId: 'txtNexonID',
        pwFieldId: 'txtPWD'
    },
    'accounts.kakao.com': {
        idFieldId: 'loginId--1',
        pwFieldId: 'password--2'
    },
    'default': {
        idFieldId: 'id',
        pwFieldId: 'pw'
    }
};
```

## Description

- **Single String Value**: Used for a single account's encrypted credentials.
- **Object Value**: Allows multiple accounts. Each key is an account name and each value is the encrypted credentials for that specific account.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer Information

Developed by [Crypto-Claudia](https://github.com/Crypto-Claudia). Feel free to reach out if you have any questions or suggestions.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. Ensure to follow the code style and include tests where applicable.

## Disclaimer

This tool is intended for personal use. Ensure you have permission to use it on the websites where you apply it. The developers are not responsible for any misuse, damage, or security issues that may arise from the use of this script. Users are solely responsible for ensuring that the tool is used in a manner that does not violate the terms of service of the websites or compromise security.

## Contact

For any inquiries or issues, please open an issue on the GitHub repository or contact [Crypto-Claudia](https://github.com/Crypto-Claudia).
