
document.addEventListener('DOMContentLoaded', function () {
  const GAZE_TIME = 3000; // Tiempo en milisegundos para activar el hotspot (3 segundos)
  let gazeTimer = null;
  let currentHotspot = null;

  function getCenterCoordinates() {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    return { x, y };
  }

  function checkHotspotUnderPointer() {
    const { x, y } = getCenterCoordinates();
    const element = document.elementFromPoint(x, y);

    if (element && element.classList.contains('hotspot')) {
      if (currentHotspot !== element) {
        clearTimeout(gazeTimer);
        currentHotspot = element;
        gazeTimer = setTimeout(() => {
          element.click(); // Simula clic en el hotspot
        }, GAZE_TIME);
      }
    } else {
      clearTimeout(gazeTimer);
      currentHotspot = null;
    }
  }

  // Solo activa la detección si el puntero VR está presente
  setInterval(() => {
    const vrPointer = document.getElementById('vrPointer');
    if (vrPointer && vrPointer.style.display !== 'none') {
      checkHotspotUnderPointer();
    }
  }, 100); // Verifica cada 100ms
});
