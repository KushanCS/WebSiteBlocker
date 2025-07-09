const urlParams = new URLSearchParams(window.location.search);
const urlMsg = urlParams.get('msg');
chrome.storage.sync.get("customMessage", (data) => {
  const customMsg = urlMsg || data.customMessage || "Default message";
  document.getElementById("message").innerText = decodeURIComponent(customMsg);
});