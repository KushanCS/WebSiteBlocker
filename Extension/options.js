const unlockBtn = document.getElementById('unlockBtn');
const passwordInput = document.getElementById('passwordInput');
const settingsDiv = document.getElementById('settings');
const messageInput = document.getElementById('messageInput');
const saveBtn = document.getElementById('saveBtn');

const CORRECT_PASSWORD_HASH = "e99a18c428cb38d5f260853678922e03"; // md5('abc123')

unlockBtn.addEventListener('click', () => {
  const entered = passwordInput.value.trim();
  const hashed = CryptoJS.MD5(entered).toString();

  if (hashed === CORRECT_PASSWORD_HASH) {
    settingsDiv.style.display = 'block';
  } else {
    alert('Wrong password!');
  }
});

saveBtn.addEventListener('click', () => {
  const msg = messageInput.value.trim();
  chrome.storage.sync.set({ customMessage: msg }, () => {
    alert("Message saved.");
  });
});