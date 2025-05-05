(async () => {
  const videos = document.querySelectorAll('video');
  if (videos.length === 0) {
    alert('No video found on this page.');
    return;
  }
  const video = videos[0];

  // Attempt to remove disablePictureInPicture attribute
  video.removeAttribute('disablePictureInPicture');

  // Remove existing PiP controls if present
  const existingControls = document.getElementById('pip-controls-container');
  if (existingControls) existingControls.remove();

  // Helper to remove the controls
  function removeControls() {
    const controls = document.getElementById('pip-controls-container');
    if (controls) controls.remove();
  }

  // Listen for PiP exit to remove the controls
  video.removeEventListener('leavepictureinpicture', removeControls);
  video.addEventListener('leavepictureinpicture', removeControls);

  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
    removeControls();
  } else {
    try {
      await video.requestPictureInPicture();
      // Create controls container
      const container = document.createElement('div');
      container.id = 'pip-controls-container';
      container.style.position = 'fixed';
      container.style.bottom = '40px';
      container.style.right = '40px';
      container.style.zIndex = 99999;
      container.style.display = 'flex';
      container.style.gap = '10px';
      container.style.opacity = '0.85';
      container.onmouseenter = () => container.style.opacity = '1';
      container.onmouseleave = () => container.style.opacity = '0.85';

      // -10s button
      const backBtn = document.createElement('button');
      backBtn.textContent = '-10s';
      backBtn.style.padding = '12px 20px';
      backBtn.style.fontSize = '18px';
      backBtn.style.background = '#222';
      backBtn.style.color = '#fff';
      backBtn.style.border = 'none';
      backBtn.style.borderRadius = '8px';
      backBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
      backBtn.style.cursor = 'pointer';
      backBtn.onclick = (e) => {
        e.stopPropagation();
        video.currentTime = Math.max(0, video.currentTime - 10);
      };

      // +10s button
      const fwdBtn = document.createElement('button');
      fwdBtn.textContent = '+10s';
      fwdBtn.style.padding = '12px 20px';
      fwdBtn.style.fontSize = '18px';
      fwdBtn.style.background = '#222';
      fwdBtn.style.color = '#fff';
      fwdBtn.style.border = 'none';
      fwdBtn.style.borderRadius = '8px';
      fwdBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
      fwdBtn.style.cursor = 'pointer';
      fwdBtn.onclick = (e) => {
        e.stopPropagation();
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
      };

      container.appendChild(backBtn);
      container.appendChild(fwdBtn);
      document.body.appendChild(container);
    } catch (e) {
      alert('Failed to enter Picture-in-Picture: ' + e);
    }
  }
})(); 