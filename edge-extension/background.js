chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.id) {
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async () => {
        if (window.__guideOverlay && typeof window.__guideOverlay.toggle === 'function') {
          await window.__guideOverlay.toggle();
        }
      }
    });
  } catch (error) {
    console.error('Failed to toggle overlay:', error);
  }
});
