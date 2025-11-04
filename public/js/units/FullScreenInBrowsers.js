export function getBodyFullscreenMethods() {
    const body = document.body;
    if (body.requestFullscreen) {
      return {
        request: 'requestFullscreen',
        exit: 'exitFullscreen',
        changeEvent: 'fullscreenchange',
        enabled: 'fullscreenEnabled'
      };
    }
    if (body.mozRequestFullScreen) {
      return {
        request: 'mozRequestFullScreen',
        exit: 'mozCancelFullScreen',
        changeEvent: 'mozfullscreenchange',
        enabled: 'mozFullScreenEnabled'
      };
    }
    if (body.webkitRequestFullscreen) {
      return {
        request: 'webkitRequestFullscreen',
        exit: 'webkitExitFullscreen',
        changeEvent: 'webkitfullscreenchange',
        enabled: 'webkitFullscreenEnabled'
      };
    }
    if (body.msRequestFullscreen) {
      return {
        request: 'msRequestFullscreen',
        exit: 'msExitFullscreen',
        changeEvent: 'MSFullscreeenChange',
        enabled: 'msFullscreenEnabled'
      };
    }
    return null;
    
  }