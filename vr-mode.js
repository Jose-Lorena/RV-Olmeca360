
document.addEventListener('DOMContentLoaded', function() {
    // Create the VR mode button
    var vrButton = document.createElement('button');
    vrButton.id = 'vrModeToggle';
    vrButton.innerHTML = 'VR Mode';
    vrButton.style.position = 'absolute';
    vrButton.style.bottom = '10px';
    vrButton.style.right = '10px';
    vrButton.style.zIndex = '1000';
    document.body.appendChild(vrButton);

    // Function to enter VR mode
    function enterVRMode() {
        // Fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }

        // Hide UI elements
        document.getElementById('sceneList').style.display = 'none';
        document.getElementById('titleBar').style.display = 'none';
        var viewControlButtons = document.getElementsByClassName('viewControlButton');
        for (var i = 0; i < viewControlButtons.length; i++) {
            viewControlButtons[i].style.display = 'none';
        }
        document.getElementById('fullscreenToggle').style.display = 'none';
        document.getElementById('autorotateToggle').style.display = 'none';
        document.getElementById('sceneListToggle').style.display = 'none';

        // Show VR pointer
        var vrPointer = document.createElement('div');
        vrPointer.id = 'vrPointer';
        vrPointer.style.position = 'absolute';
        vrPointer.style.top = '50%';
        vrPointer.style.left = '50%';
        vrPointer.style.width = '10px';
        vrPointer.style.height = '10px';
        vrPointer.style.backgroundColor = 'red';
        vrPointer.style.borderRadius = '50%';
        vrPointer.style.zIndex = '1000';
        document.body.appendChild(vrPointer);

        // Simulate stereoscopic view (basic simulation)
        var vrView = document.createElement('div');
        vrView.id = 'vrView';
        vrView.style.position = 'absolute';
        vrView.style.top = '0';
        vrView.style.left = '0';
        vrView.style.width = '100%';
        vrView.style.height = '100%';
        vrView.style.zIndex = '999';
        vrView.style.display = 'flex';
        vrView.style.justifyContent = 'space-between';
        document.body.appendChild(vrView);

        var leftEye = document.createElement('div');
        leftEye.style.width = '50%';
        leftEye.style.height = '100%';
        leftEye.style.overflow = 'hidden';
        leftEye.style.borderRight = '1px solid black';
        vrView.appendChild(leftEye);

        var rightEye = document.createElement('div');
        rightEye.style.width = '50%';
        rightEye.style.height = '100%';
        rightEye.style.overflow = 'hidden';
        rightEye.style.borderLeft = '1px solid black';
        vrView.appendChild(rightEye);

        // Add event listener to exit VR mode
        vrButton.innerHTML = 'Exit VR Mode';
        vrButton.onclick = exitVRMode;
    }

    // Function to exit VR mode
    function exitVRMode() {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }

        // Show UI elements
        document.getElementById('sceneList').style.display = 'block';
        document.getElementById('titleBar').style.display = 'block';
        var viewControlButtons = document.getElementsByClassName('viewControlButton');
        for (var i = 0; i < viewControlButtons.length; i++) {
            viewControlButtons[i].style.display = 'block';
        }
        document.getElementById('fullscreenToggle').style.display = 'block';
        document.getElementById('autorotateToggle').style.display = 'block';
        document.getElementById('sceneListToggle').style.display = 'block';

        // Remove VR pointer and view
        var vrPointer = document.getElementById('vrPointer');
        if (vrPointer) {
            vrPointer.remove();
        }
        var vrView = document.getElementById('vrView');
        if (vrView) {
            vrView.remove();
        }

        // Add event listener to enter VR mode
        vrButton.innerHTML = 'VR Mode';
        vrButton.onclick = enterVRMode;
    }

    // Add event listener to enter VR mode
    vrButton.onclick = enterVRMode;
});
