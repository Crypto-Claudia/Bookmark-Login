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

## Installation

1. **Create a Bookmarklet:**
   - Copy the entire JavaScript code from `bookmarklet.js`.
   - Create a new bookmark in your web browser.
   - Paste the JavaScript code into the bookmark’s URL field.

2. **Add the Bookmarklet:**
   - Name your bookmark (e.g., "Password Decryptor").
   - Save the bookmark.

## Usage

1. **Modify the Script:**
   - Open the `bookmarklet.js` file.
   - Customize the `messages` and `fieldMappings` objects to match the websites you use.

2. **Navigate to a Website:**
   - Go to the login page of the website you configured in the `fieldMappings`.

3. **Activate the Bookmarklet:**
   - Click on the "Password Decryptor" bookmark you created.

4. **Enter Decryption Phrase:**
   - A prompt will appear asking for the decryption phrase. Enter your phrase and click "Submit."

5. **Autofill Credentials:**
   - The bookmarklet will attempt to decrypt the credentials and fill them into the login fields on the page.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer Information

Developed by [Crypto-Claudia](https://github.com/Crypto-Claudia). Feel free to reach out if you have any questions or suggestions.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. Ensure to follow the code style and include tests where applicable.

## Disclaimer

This tool is intended for personal use. Ensure you have permission to use it on the websites where you apply it. The developers are not responsible for any misuse or damage caused by the use of this script.

## Contact

For any inquiries or issues, please open an issue on the GitHub repository or contact [Crypto-Claudia](https://github.com/Crypto-Claudia).
