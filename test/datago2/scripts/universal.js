let globalFileData;

var idshow = document.getElementById("showid")
//peer id generation 
function generateShortId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

var shortId = generateShortId(); 
var peer = new Peer(shortId);

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  idshow.textContent = id
});

//this is for sharimg the file 
function shares(){
const fileInput = document.getElementById('file');
const file = fileInput.files[0];

const reader = new FileReader();
reader.onload = function() {
  globalFileData = reader.result;
  console.log('File data loaded:', globalFileData);
};

DESTINATION_PEER_ID = document.getElementById("sendid").value
console.log(DESTINATION_PEER_ID)
const conn = peer.connect(DESTINATION_PEER_ID);
conn.send(globalFileData);
}
