
document.addEventListener('DOMContentLoaded', function () {
  var vrButton = document.createElement('button');
  vrButton.id = 'vrButton';
  vrButton.innerHTML = 'VR Mode';
  vrButton.style.position = 'absolute';
  vrButton.style.bottom = '10px';
  vrButton.style.right = '10px';
  vrButton.style.zIndex = '1000';
  vrButton.style.padding = '10px';
  vrButton.style.backgroundColor = '#ff0000';
  vrButton.style.color = '#ffffff';
  vrButton.style.border = 'none';
  vrButton.style.borderRadius = '5px';
  vrButton.style.cursor = 'pointer';
  document.body.appendChild(vrButton);

  vrButton.addEventListener('click', function () {
    if (vrButton.innerHTML === 'VR Mode') {
      enterVRMode();
    } else {
      exitVRMode();
    }
  });

  function enterVRMode() {
    vrButton.innerHTML = 'Exit VR Mode';
    document.documentElement.requestFullscreen();
    document.getElementById('sceneList').style.display = 'none';
    document.getElementById('titleBar').style.display = 'none';
    var viewControlButtons = document.getElementsByClassName('viewControlButton');
    for (var i = 0; i < viewControlButtons.length; i++) {
      viewControlButtons[i].style.display = 'none';
    }
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
    vrPointer.style.zIndex = '1000';
    document.body.appendChild(vrPointer);

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

  function exitVRMode() {
    vrButton.innerHTML = 'VR Mode';
    document.exitFullscreen();
    document.getElementById('sceneList').style.display = 'block';
    document.getElementById('titleBar').style.display = 'block';
    var viewControlButtons = document.getElementsByClassName('viewControlButton');
    for (var i = 0; i < viewControlButtons.length; i++) {
      viewControlButtons[i].style.display = 'block';
    }
    var vrPointer = document.getElementById('vrPointer');
    if (vrPointer) {
      vrPointer.remove();
    }
    disableDeviceOrientation();
  }

  function enableDeviceOrientation() {
    var deviceOrientationControlMethod = new Marzipano.DeviceOrientationControlMethod();
    viewer.controls().registerMethod('deviceOrientation', deviceOrientationControlMethod);
    viewer.controls().enableMethod('deviceOrientation');
  }

  function disableDeviceOrientation() {
    viewer.controls().disableMethod('deviceOrientation');
  }
});
