# QR Code Generator

This Node.js application generates a QR code from a given URL, scaling it to a specified size, and saves it as an image file. The user can choose between different output formats: SVG, PNG, or JPEG.

## How to Use

1. Make sure you have Node.js and npm installed. If not, download and install [Node.js](https://nodejs.org/) which includes npm.

2. Clone or download this repository.

3. Navigate to the repository folder in your terminal.

4. Install the necessary dependencies using npm:

    ```bash
    npm install
    ```

5. Run the application:

    ```bash
    node index.js
    ```

6. You will be prompted to enter a URL, the desired scale (default is 5), and the output format (SVG, PNG, or JPEG).

7. The QR code will be generated and saved in the `output` directory with the chosen format and a filename based on the URL.

## Application Details

The application uses several Node.js packages:

- `qrcode`: To generate QR codes.
- `fs`: To interact with the file system.
- `path`: To handle file and directory paths.
- `url`: To parse URLs.
- `inquirer`: To create an interactive command-line interface.
- `chalk`: To add colors to console logs.

The main function, `generateQR`, takes a text (URL), scale, and format as inputs. It generates a QR code using the `QRCode` package and saves it as an image file in the chosen format. The `output` directory is created if it doesn't exist. The generated QR code is saved with a filename derived from the URL, and non-alphanumeric characters are replaced with underscores.

The `inquirer` package is used to prompt the user to enter a URL, scale, and output format. The URL is validated using a regular expression. The scale must be a valid integer, and the output format is selected from a list of available options.

## Contributing

If you want to contribute to this project, please submit a pull request.

## License

This project is licensed under the terms of the MIT license.