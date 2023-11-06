(function() {
    // Check if the panel already exists to prevent duplicates
    if (document.getElementById('my-side-panel')) {
      return;
    }
  
    // Create a wrapper for the existing content
    const contentWrapper = document.createElement('div');
    contentWrapper.id = 'my-content-wrapper';
    contentWrapper.style.width = '66%';
    contentWrapper.style.float = 'right';
  
    // Move existing body content into the wrapper
    while (document.body.firstChild) {
      contentWrapper.appendChild(document.body.firstChild);
    }
    document.body.appendChild(contentWrapper);
  
    // Create the side panel
    const panel = document.createElement('div');
    panel.id = 'my-side-panel';
    panel.style.width = '34%';
    panel.style.height = '100%';
    panel.style.position = 'fixed';
    panel.style.top = '0';
    panel.style.left = '0';
    panel.style.backgroundColor = '#f3f3f3';
    panel.style.zIndex = '1000';
    panel.style.overflow = 'auto';
  
    // Fetch and load the side-panel.html into the side panel
    fetch(chrome.runtime.getURL('side-panel.html'))
      .then(response => response.text())
      .then(data => {
        panel.innerHTML = data;
      })
      .catch(error => console.error('Error loading side-panel.html:', error));
  
    // Create a button to close the panel
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close Panel';
    closeButton.onclick = function() {
      panel.style.display = 'none';
      contentWrapper.style.width = '100%';
    };
  
    // Append the button to the panel
    panel.appendChild(closeButton);
    document.body.appendChild(panel);
  })();
  