document.addEventListener('DOMContentLoaded', function () {
    let globalFileData;
    var idshow = document.getElementById("showid");

    // Peer ID generation
    function generateShortId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 6; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    var shortId = generateShortId();
    var peer = new Peer(shortId);

    peer.on('open', function (id) {
        console.log('My peer ID is: ' + id);
        idshow.textContent = id;
    });

    peer.on('connection', function (conn) {
        conn.on('data', function (data) {
            console.log('Received file data:', data);
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = data;
            downloadLink.download = 'received_file';
            Object.assign(downloadLink.style, {
                display: 'block',
                padding: '1em',
                background: 'red',
                width: '174px',
                position: 'relative',
                left: '5.5em',
                height: '3.2em',
                top: '.5em',
                cursor: 'pointer',
                borderRadius: '2em',
                fontSize: '18px',
                color: 'white'
            });
            downloadLink.textContent = 'Download received file';
        });
    });
    function showConfirm() {
        if (confirm("File sent successfully")) {
            location.reload(); // This will reload the page if "OK" is clicked
        }
    }
    // Sharing the file
    function shares() {
        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select a file to share.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            globalFileData = event.target.result;
            console.log('File data loaded');


            
            //the new peer id get method 
            function getPeerID() {
                var peerID = '';
                var peerInputs = document.getElementsByClassName('peerid-digit');
                for (var i = 0; i < peerInputs.length; i++) {
                    peerID += peerInputs[i].value;
                }
                if (peerID.length === 6) {
                    console.log('Entered Peer ID:', peerID);
                    
                    const DESTINATION_PEER_ID =peerID;
           
            console.log(DESTINATION_PEER_ID)

            const conn = peer.connect(DESTINATION_PEER_ID);
            conn.on('open', function () {
                conn.send(globalFileData);
                console.log('File sent successfully.');
                showConfirm()
            });

            conn.on('error', function (err) {
                console.error('Error during connection:', err);
                alert('Error connecting to peer. Please try again.');
            });
                    
                } else {
                    alert('Please enter a valid 6-character Peer ID.');
                }
            return peerID
            }
              
            getPeerID();
           
        };
        reader.readAsDataURL(file);
    }

    window.shares = shares;
});