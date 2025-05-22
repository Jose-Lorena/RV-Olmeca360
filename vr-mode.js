document.addEventListener('DOMContentLoaded', function () {
  // Usar el botón ya existente en el HTML
  var vrButton = document.getElementById('vrModeToggle');

  // Asegurar que tenga los íconos correctos y clases necesarias
  vrButton.innerHTML = '<img class="icon off" src="img/vr.png"><img class="icon on" src="img/vr-exit.png">';
  vrButton.classList.add('viewControlButton');

  // Función para activar el modo VR
  function enableVRMode() {
    document.body.requestFullscreen();
    document.getElementById('sceneList').style.display = 'none';
    document.getElementById('titleBar').style.display = 'none';

    var controlButtons = document.querySelectorAll('.viewControlButton');
    controlButtons.forEach(function (button) {
      button.style.display = 'none';
    });

    vrButton.style.display = 'block'; // Mantener visible el botón VR
    vrButton.classList.add('enabled');

    // Crear puntero rojo
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

    // Activar control de orientación
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().then(function (response) {
        if (response === 'granted') {
          enableDeviceOrientation();
        }
      }).catch(console.error);
    } else {
      enableDeviceOrientation();
    }
  }

  // Función para desactivar el modo VR
  function disableVRMode() {
    document.exitFullscreen();
    document.getElementById('sceneList').style.display = 'block';
    document.getElementById('titleBar').style.display = 'block';

    var controlButtons = document.querySelectorAll('.viewControlButton');
    controlButtons.forEach(function (button) {
      button.style.display = 'block';
    });

    vrButton.classList.remove('enabled');

    var vrPointer = document.getElementById('vrPointer');
    if (vrPointer) {
      vrPointer.remove();
    }

    viewer.controls().disableMethod('deviceOrientation');
  }

  // Activar control de orientación
  function enableDeviceOrientation() {
    var deviceOrientationControlMethod = new Marzipano.DeviceOrientationControlMethod();
    viewer.controls().registerMethod('deviceOrientation', deviceOrientationControlMethod);
    viewer.controls().enableMethod('deviceOrientation');
  }

  // Alternar modo VR al hacer clic
  vrButton.addEventListener('click', function () {
    if (!document.fullscreenElement) {
      enableVRMode();
    } else {
      disableVRMode();
    }
  });
});
