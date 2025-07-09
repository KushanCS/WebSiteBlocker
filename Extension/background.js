// Log installation for debugging
chrome.runtime.onInstalled.addListener(() => {
  console.log("Purpose Blocker installed.");
});

// Optional: Listen for messages to add new blocked domains dynamically
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "addBlockedDomain") {
    const domain = request.domain;
    if (domain) {
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [{
          id: Date.now(), // Unique ID based on timestamp
          priority: 1,
          action: {
            type: "redirect",
            redirect: { extensionPath: "/redirect.html" }
          },
          condition: {
            urlFilter: domain,
            resourceTypes: ["main_frame"]
          }
        }],
        removeRuleIds: []
      }, () => {
        sendResponse({ success: true, message: `Added ${domain} to blocked list.` });
      });
    } else {
      sendResponse({ success: false, message: "Invalid domain." });
    }
    return true; // Keep the message channel open for async response
  }
});