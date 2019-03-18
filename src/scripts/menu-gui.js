/* eslint-disable no-undef */
/* eslint-disable eol-last */
import 'datguivr';

export default function createGUI(scene, camera, object, world) {
  // Allow mouse input for non-VR app and testing without a VR device.
  dat.GUIVR.enableMouse(camera);

  // Gaze Input is use for on VR devices without controllers.
  const gazeInput = dat.GUIVR.addInputObject(camera);
  scene.add(gazeInput.cursor);

  // Bind mouse or touch on the GUI to a press.
  ['mousedown', 'touchstart', 'keydown']
    .forEach((e) => {
      window.addEventListener(e, () => {
        gazeInput.pressed(true);
      }, false);
    });

  ['mouseup', 'touchend', 'keyup']
    .forEach((e) => {
      window.addEventListener(e, () => {
        gazeInput.pressed(false);
      }, false);
    });

  // Create name test to show at thte top of the gui tab.
  const gui = dat.GUIVR.create('Settings');
  gui.position.set(3, 0.5, -13);

  // Set the size of the gui.
  gui.scale.set(2, 2, 2);

  // Gravity Slider.
  gui.add(world.gravity, 'y', -9.8, 9.8).step(0.2)
    .name('Gravity')
    .listen();

  gui.add(object.position, 'x').min(-1)
    .max(1)
    .step(0.25)
    .name('Position X')
    .listen();

  gui.add(object.position, 'y').min(-1)
    .max(1)
    .step(0.25)
    .name('Position Y')
    .listen();

  gui.add(object.position, 'z').min(-1)
    .max(1)
    .step(0.25)
    .name('Position Z')
    .listen();

  // Toggle for specific object material as wireframe.
  gui.add(object.material, 'wireframe')
    .name('Wireframe')
    .listen();

  scene.add(gui);
}