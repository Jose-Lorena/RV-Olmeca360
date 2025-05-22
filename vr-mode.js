
document.addEventListener('DOMContentLoaded', function () {
  // Create VR Mode button
  var vrButton = document.createElement('a');
  vrButton.href = 'javascript:void(0)';
  vrButton.id = 'vrModeToggle';
  vrButton.innerHTML = '<img class="icon off" src="img/vr.png"><img class="icon on" src="img/vr-exit.png">';
  vrButton.classList.add('viewControlButton');

  // Append VR Mode button next to fullscreen and autorotate buttons
  var controlsContainer = document.querySelector('.viewControlButton').parentElement;
  controlsContainer.appendChild(vrButton);

  // Function to enable VR Mode
  function enableVRMode() {
    document.body.requestFullscreen();
    document.getElementById('sceneList').style.display = 'none';
    document.getElementById('titleBar').style.display = 'none';
    var controlButtons = document.querySelectorAll('.viewControlButton');
    controlButtons.forEach(function (button) {
      button.style.display = 'none';
    });
    vrButton.style.display = 'block'; // Keep VR button visible
    vrButton.innerHTML = '<img class="icon off" src="img/vr-exit.png"><img class="icon on" src="img/vr.png">';

    // Create VR pointer
    var vrPointer = document.createElement('div');
    vrPointer.id = 'vrPointer';
    vrPointer.style.position = 'absolute';
    vrPointer.style.top = '50%';
    vrPointer.style.left = '50%';
    vrPointer.style.width = '20px';
    vrPointer.style.height = '20px';
    vrPointer.style.backgroundColor = 'red';
    vrPointer.style.borderRadius = '50%';
    vrPointer.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(vrPointer);

    // Enable device orientation control
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS: solicitar permiso
      DeviceOrientationEvent.requestPermission().then(function (response) {
        if (response === 'granted') {
          enableDeviceOrientation();
        }
      }).catch(console.error);
    } else {
      // Android: ya se permite tras interacción
      enableDeviceOrientation();
    }
  }

  // Function to disable VR Mode
  function disableVRMode() {
    document.exitFullscreen();
    document.getElementById('sceneList').style.display = 'block';
    document.getElementById('titleBar').style.display = 'block';
    var controlButtons = document.querySelectorAll('.viewControlButton');
    controlButtons.forEach(function (button) {
      button.style.display = 'block';
    });
    vrButton.innerHTML = '<img class="icon off" src="img/vr.png"><img class="icon on" src="img/vr-exit.png">';
    var vrPointer = document.getElementById('vrPointer');
    if (vrPointer) {
      vrPointer.remove();
    }
    viewer.controls().disableMethod('deviceOrientation');
  }

  // Function to enable device orientation control
  function enableDeviceOrientation() {
    var deviceOrientationControlMethod = new Marzipano.DeviceOrientationControlMethod();
    viewer.controls().registerMethod('deviceOrientation', deviceOrientationControlMethod);
    viewer.controls().enableMethod('deviceOrientation');
  }

  // Toggle VR Mode on button click
  vrButton.addEventListener('click', function () {
    if (!document.fullscreenElement) {
      enableVRMode();
    } else {
      disableVRMode();
    }
  });
});
