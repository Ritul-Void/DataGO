# **Synclt v2.1 Documentation**

## Overview
**Synclt** v2.1 is a fast and secure peer-to-peer (P2P) file-sharing platform designed for transferring files up to 500MB. It uses WebRTC for direct communication between peers, ensuring efficient and quick transfers. The platform includes advanced file compression techniques (Brotli, Zstandard) and end-to-end encryption (AES-256), making it ideal for secure file sharing with minimal delay.

**Website:** [Synclt v2.1 - Fast P2P File Sharing](https://ritul-void.github.io/Synclt/)

---

## Features

1. **Peer-to-Peer File Sharing**: Uses WebRTC to transfer files directly between users without relying on servers.
2. **Compression**: Supports Brotli and Zstandard for compressing files, reducing transfer time.
3. **End-to-End Encryption**: AES-256 encryption ensures that files are transferred securely.
4. **Real-Time Progress Bar**: Tracks upload and download progress with a visual progress bar.
5. **File Sharing**: Upload multiple files and send them to another user with a unique ID.
6. **Easy-to-Use Interface**: Simple, clean UI for copying your ID, entering the recipient's ID, and sending files.

---

## Setup & Installation

Since **Synclt v2.1** is a frontend-only application, there is no backend setup required. To use the platform, follow these steps:

1. **Visit the Website**:
   - Go to [https://ritul-void.github.io/Synclt/](https://ritul-void.github.io/Synclt/) to access the app.

2. **Using the Application**:
   - Open the webpage and follow the on-screen instructions to generate a unique ID.
   - Copy your ID by clicking the "Copy ID" button.
   - To share a file, input the recipient's ID and choose the file(s) to send.
   - Once a file is selected, click "Send Files" to initiate the transfer. The progress will be displayed visually.
   
3. **Browser Requirements**:
   - **WebRTC support**: Ensure your browser supports WebRTC (Chrome, Firefox, Edge).
   - **File Size**: Up to 500MB per file is supported for transfer.

---

## Future Updates (v2.2 and Beyond)

### Planned Features:
1. **Multi-File Upload Support**: Batch-upload multiple files at once.
2. **Mobile App Support**: Native iOS and Android applications for enhanced accessibility.
3. **File Versioning**: Allow users to upload and track different versions of the same file.
4. **Group Sharing**: Enable file sharing with multiple users at once, with syncing across devices.
5. **File Recovery**: Support automatic recovery of interrupted transfers.

### Security Enhancements:
1. **Two-Factor Authentication (2FA)**: Add an extra layer of security during login.
2. **Advanced Encryption Options**: Improve encryption strength for more sensitive file transfers.

---

## Usage Guide

### Uploading Files
1. **Generate Your ID**: Open the app, and your unique ID will be displayed under "Your ID". Copy it for later use.
2. **Choose Files**: Click the file input field and select one or more files to share.
3. **Enter Recipient’s ID**: In the "Enter recipient's ID" field, input the ID of the user you wish to send files to.
4. **Send Files**: Click the "Send Files" button to initiate the transfer.

### Downloading Files
- Files will automatically be received if the recipient has entered the correct ID and initiated the transfer.

### Progress Tracking
- A progress bar will display the status of the transfer, including the percentage of completion.

---

## Troubleshooting

### Common Issues:
- **Connection Issues**: Ensure both peers have stable internet connections. WebRTC connections may fail on slow or restricted networks.
- **Slow Transfer Speeds**: Compression might be needed for large files to improve speed. Try reducing file sizes or transferring smaller files.

### FAQ:
1. **Can I send multiple files at once?**
   - Yes, multiple files can be selected and transferred at once by using the file input’s multi-select feature.
   
2. **How secure is my data?**
   - Your files are encrypted using AES-256, and the transfer uses WebRTC's secure communication channels, ensuring end-to-end security.

---

## License

Synclt v2.1 is open-source software and licensed under the [MIT License](https://opensource.org/licenses/MIT).

