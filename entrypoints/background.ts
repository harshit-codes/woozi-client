export default defineBackground(() => {
  console.log('Woozi Extension Background Script Started');

  // Handle extension icon clicks to open side panel directly
  browser.action.onClicked.addListener(async (tab) => {
    console.log('Extension icon clicked, opening side panel');
    
    try {
      // Open the side panel for the current window
      await chrome.sidePanel.open({ windowId: tab.windowId });
    } catch (error) {
      console.error('Error opening side panel:', error);
    }
  });

  // Set up side panel behavior on installation
  browser.runtime.onInstalled.addListener(() => {
    console.log('Extension installed/updated');
  });

  // Handle Supabase authentication session management
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SUPABASE_SESSION_CHANGED') {
      console.log('Supabase session changed, updating storage');
      
      // Store session securely
      chrome.storage.local.set({
        'supabase_session': message.session,
        'supabase_session_timestamp': Date.now()
      }).then(() => {
        console.log('Supabase session stored successfully');
        sendResponse({ success: true });
      }).catch((error) => {
        console.error('Error storing Supabase session:', error);
        sendResponse({ success: false, error: error.message });
      });
      
      return true; // Keep message channel open for async response
    }
    
    if (message.type === 'GET_SUPABASE_SESSION') {
      chrome.storage.local.get(['supabase_session', 'supabase_session_timestamp']).then((result) => {
        const session = result.supabase_session;
        const timestamp = result.supabase_session_timestamp;
        
        // Check if session is recent and valid
        if (session && timestamp) {
          // Check if session is expired
          const expiresAt = new Date(session.expires_at).getTime();
          if (Date.now() < expiresAt) {
            sendResponse({ session });
          } else {
            sendResponse({ session: null, expired: true });
          }
        } else {
          sendResponse({ session: null });
        }
      }).catch((error) => {
        console.error('Error retrieving Supabase session:', error);
        sendResponse({ session: null, error: error.message });
      });
      
      return true; // Keep message channel open for async response
    }
    
    if (message.type === 'CLEAR_SUPABASE_SESSION') {
      chrome.storage.local.remove(['supabase_session', 'supabase_session_timestamp']).then(() => {
        console.log('Supabase session cleared successfully');
        sendResponse({ success: true });
      }).catch((error) => {
        console.error('Error clearing Supabase session:', error);
        sendResponse({ success: false, error: error.message });
      });
      
      return true;
    }
  });
});