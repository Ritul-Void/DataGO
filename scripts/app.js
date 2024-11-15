
let peer = null;

let conn = null;

let files = [];

const CHUNK_SIZE = 16384;

function initialize() {

    peer = new Peer();

    

    peer.on('open', (id) => {

        document.getElementById('myId').value = id;

        updateStatus('Ready to share!', 'success');

    });

    peer.on('connection', (connection) => {

        conn = connection;

        setupConnection();

    });

    peer.on('error', (err) => {

        updateStatus('Connection error: ' + err, 'error');

    });

    document.getElementById('fileInput').addEventListener('change', handleFileSelect);

}

function handleFileSelect(event) {

    files = Array.from(event.target.files);

    updateFileList();

}

function updateFileList() {

    const fileList = document.getElementById('fileList');

    fileList.innerHTML = '';

    

    files.forEach((file, index) => {

        const fileItem = document.createElement('div');

        fileItem.className = 'file-item';

        fileItem.innerHTML = `

            <div class="file-info">

                <span>${file.name}</span>

                <span>(${formatFileSize(file.size)})</span>

            </div>

        `;

        fileList.appendChild(fileItem);

    });

}

function formatFileSize(bytes) {

    if (bytes === 0) return '0 Bytes';

    const k = 1024;

    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];

}

async function sendFiles() {

    const peerId = document.getElementById('peerId').value.trim();

    if (!peerId) {

        updateStatus('Please enter recipient\'s ID', 'error');

        return;

    }

    if (!files.length) {

        updateStatus('Please select files to send', 'error');

        return;

    }

    updateStatus('Connecting...', 'success');

    

    try {

        // If there's an existing connection to a different peer, close it

        if (conn && conn.peer !== peerId) {

            conn.close();

        }

        // Only create a new connection if we don't have one or if it's closed

        if (!conn || conn.peer !== peerId) {

            conn = peer.connect(peerId, { reliable: true });

            setupConnection();

        }

        // Wait for connection to be established

        await new Promise((resolve, reject) => {

            const timeout = setTimeout(() => reject(new Error('Connection timeout')), 10000);

            

            if (conn.open) {

                clearTimeout(timeout);

                resolve();

            } else {

                conn.on('open', () => {

                    clearTimeout(timeout);

                    resolve();

                });

            }

        });

        // Start sending files

        for (const file of files) {

            updateStatus(`Sending: ${file.name}`, 'success');

            conn.send({

                type: 'file-info',

                name: file.name,

                size: file.size

            });

            const buffer = await file.arrayBuffer();

            let offset = 0;

            

            while (offset < buffer.byteLength) {

                const chunk = buffer.slice(offset, offset + CHUNK_SIZE);

                conn.send({

                    type: 'file-chunk',

                    chunk: chunk

                });

                offset += chunk.byteLength;

                const progress = (offset / buffer.byteLength) * 100;

                updateProgress(progress);

                await new Promise(resolve => setTimeout(resolve, 10));

            }

        }

        updateStatus('Files sent successfully!', 'success');

        hideProgress();

    } catch (error) {

        updateStatus(`Error: ${error.message}`, 'error');

        hideProgress();

    }

}

function setupConnection() {

    conn.on('open', () => {

        updateStatus('Connected!', 'success');

    });

    conn.on('data', handleReceiveData);

    conn.on('close', () => {

        updateStatus('Connection closed', 'error');

        conn = null;

    });

}

let receivingFile = null;

let receivedChunks = [];

let receivedSize = 0;

function handleReceiveData(data) {

    if (data.type === 'file-info') {

        receivingFile = data;

        receivedChunks = [];

        receivedSize = 0;

        updateStatus(`Receiving: ${receivingFile.name}`, 'success');

        updateProgress(0);

    } else if (data.type === 'file-chunk') {

        receivedChunks.push(data.chunk);

        receivedSize += data.chunk.byteLength;

        const progress = (receivedSize / receivingFile.size) * 100;

        updateProgress(progress);

        if (receivedSize === receivingFile.size) {

            const blob = new Blob(receivedChunks);

            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');

            a.href = url;

            a.download = receivingFile.name;

            a.click();

            URL.revokeObjectURL(url);

            updateStatus('File received!', 'success');

            hideProgress();

        }

    }

}

function updateStatus(message, type) {

    const status = document.getElementById('status');

    status.textContent = message;

    status.className = type;

}

function updateProgress(percent) {

    const progressBar = document.querySelector('.progress-bar');

    const progress = document.querySelector('.progress');

    progressBar.style.display = 'block';

    progress.style.width = `${percent}%`;

}

function hideProgress() {

    const progressBar = document.querySelector('.progress-bar');

    progressBar.style.display = 'none';

}

function copyId() {

    const myId = document.getElementById('myId');

    myId.select();

    document.execCommand('copy');

    updateStatus('ID copied to clipboard!', 'success');

}

initialize();