//created by Jade Cabral, Michael Sarmento, Michael Medeiros, and Ashley Famularo
//some code modified from https://stackoverflow.com/questions/26100481/texture-wrapping-is-not-repeating-as-it-should-be

import { OrbitControls } from "./OrbitControls.js"; // import THREE.js orbit controls

var fish, coral, skull, diver, longFin, floor, rock, log, duck, table; // create holder variables for our objects

//---------------get renderer and create scene-----------------

var renderer = new THREE.WebGLRenderer(); //create a webGL renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene(); //create a new threejs scene

//--------------------create skybox------------------------
scene.background = new THREE.CubeTextureLoader()
  .setPath("textures/")
  .load([
    "posx.jpg",
    "negx.jpg",
    "posy.jpg",
    "negy.jpg",
    "posz.jpg",
    "negz.jpg"
  ]);

//-----------------create camera--------------------------------

var camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  3000
); //get webGL perspective camera and set its paramaters
camera.position.set(1, 30, 10); //place camera in this position

//-------------------creat oribit controls-----------------------

const controls = new OrbitControls(camera, renderer.domElement); //get controls to orbit camera
controls.target.set(0, -20, -100);
controls.update();

//-----------------create sound for the scene-------------------
const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load("sound.mp3", function (buffer) {
  //import water filter sound
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.25);
  sound.play();
});

//-------------create lighting for scene-------------------

var Light = new THREE.PointLight(0xffffff);
Light.position.z = 10;
scene.add(Light); //main light

var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight); // get ambient light

//------------create materials-----------------------------

var textureLoader = new THREE.TextureLoader(); //create texture loader
var map = textureLoader.load("/textures/fish.jpg"); // load fish texture
var material = new THREE.MeshPhongMaterial({ map: map }); //modified phong model

var coralMap = textureLoader.load("/textures/Coral.jpg"); // load coral texture
var coralMaterial = new THREE.MeshPhongMaterial({ map: coralMap }); //modified phong model
coralMap.wrapS = coralMap.wrapT = THREE.RepeatWrapping; // repeat and wrap texture
coralMap.repeat.set(6, 6);

var skullMap = textureLoader.load("/textures/skull.jpg"); //modified phong model
var skullMat = new THREE.MeshPhongMaterial({ map: skullMap }); //load skull texture

var diverMap = textureLoader.load("/textures/diver.jpg"); //modified phong model
var diverMat = new THREE.MeshPhongMaterial({ map: diverMap }); //load diver texture

var longFinMap = textureLoader.load("/textures/LongFin.jpg"); //modified phong model
var longFinMat = new THREE.MeshPhongMaterial({ map: longFinMap }); //load long fin texture

var rockMap = textureLoader.load("/textures/Rock.jpg"); //modified phong model
var rockMat = new THREE.MeshPhongMaterial({ map: rockMap }); //load rock texture

var logMap = textureLoader.load("/textures/log.jpg"); //modified phong model
var logMat = new THREE.MeshPhongMaterial({ map: logMap });

var duckMap = textureLoader.load("/textures/duck.jpg"); //modified phong model
var duckMat = new THREE.MeshPhongMaterial({ map: duckMap });

var tableMap = textureLoader.load("/textures/table.jpg"); //modified phong model
var tableMat = new THREE.MeshPhongMaterial({ map: tableMap });
//----------------------load in models-------------------------------
function loadModel() {
  var loader = new THREE.OBJLoader();
  loader.load("/Models/Fish.obj", addFish);
  loader.load("/Models/Coral.obj", addCoral);
  loader.load("/Models/Skull.obj", addSkull);
  loader.load("/Models/diver.obj", addDiver);
  loader.load("/Models/LongFin.obj", addLongFin);
  loader.load("/Models/Rock.obj", addRock);
  loader.load("/Models/log.obj", addLog);
  loader.load("/Models/duck.obj", addDuck);
  loader.load("/Models/table.obj", addTable);
}
//----------------------add fish to the scene----------------
var addFish = function (object) {
  fish = object;
  object.traverse(function (child) {
    if (child.isMesh) child.material = material; // add material to fish
  });
  scene.add(fish);
  fish.rotation.set(-1.5, 0.15, 0);
  fish.position.set(0, -20, -95);
};

//------------------add coral to the scene-----------
var addCoral = function (object) {
  coral = object;
  object.traverse(function (child) {
    if (child.isMesh) child.material = coralMaterial; //add material to coral
  });
  scene.add(coral);
  coral.rotation.x = -1.5;
  coral.scale.set(1.25,1.25,1.25);
  coral.position.set(0, -52, -105);
};

//------------------add skull to the scene-----------
var addSkull = function (object) {
  skull = object;
  object.traverse(function (child) {
    if (child.isMesh) child.material = skullMat; //add material to coral
  });
  scene.add(skull);
  skull.scale.set(4, 4, 4);
  skull.position.set(-100, -45, -110), skull.rotation.set(5, 0, 0);
};

//------------------add diver to the scene-----------
var addDiver = function (object) {
  diver = object;
  object.traverse(function (child) {
    if (child.isMesh) child.material = diverMat;
  }); //add material to diver
  scene.add(diver);
  diver.scale.set(4, 4, 4); //uniformly scale the diver x2
  diver.position.set(70, -45, -135), diver.rotation.set(5, 0, 0.5);
};

//------------------add long fin to the scene-----------
var addLongFin = function (object) {
  longFin = object;
  object.traverse(function (child) {
    if (child.isMesh) child.material = longFinMat; //add material to long fin
  });
  scene.add(longFin);
  longFin.scale.set(8, 8, 8);
  longFin.position.set(45, -30, -145), longFin.rotation.set(5, 0, 0);
};
//----------------------add rock---------------------------------------
var addRock = function (object) {
  rock = object;
  object.traverse(function (child) {
    if (child.isMesh) child.material = rockMat; //add material to long fin
  });
  rock.scale.set(20,20,20);
  scene.add(rock);
  rock.position.set(70, -10, -20);
};
//-------------------add log--------------------------------
var addLog = function (object) {
  log = object;
  object.traverse(function (child) {
    if (child.isMesh) child.material = logMat; //add material to long fin
  });
  log.scale.set(4,4,4);
  scene.add(log);
  log.position.set(-90, -25, -210);
};
//-----------------------------add duck--------------------------------
var addDuck = function (object) {
  duck = object;
  object.traverse(function (child) {
    if (child.isMesh) child.material = duckMat; //add material to long fin
  });
  duck.scale.set(2,2,2);
  scene.add(duck);
  duck.position.set(-90, -30, -35);
  duck.rotation.set(4.68,0,1)
};
//------------------------add table----------------
var addTable = function (object) {
  table = object;
  object.traverse(function (child) {
    if (child.isMesh) child.material = tableMat; //add material to long fin
  });
  table.scale.set(6,6,6);
  scene.add(table);
  table.position.set(-85, -468, -100);
  table.rotation.set(4.65,0,0)
};

//-----------------------------create a floor----------------------------------
var floorTexture = new THREE.ImageUtils.loadTexture("unnamed.png");
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; // repeat the texture
floorTexture.repeat.set(10, 10); //repeat the texture 10 times each way
var floorMaterial = new THREE.MeshBasicMaterial({
  map: floorTexture,
  side: THREE.DoubleSide
});
var floor = new THREE.PlaneGeometry(330, 220, 100);
var mesh = new THREE.Mesh(floor, floorMaterial); // add texture to floor object
mesh.rotation.x = -Math.PI / 2; //make floor horizontal
scene.add(mesh);
mesh.position.set(0, -45, -100);
mesh.recieveShadow = true;

var backWallMaterial = new THREE.MeshBasicMaterial({
  color: 0xa1b4d4,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide
});
var backWall = new THREE.PlaneGeometry(330, 220, 100);
var backWallObj = new THREE.Mesh(backWall, backWallMaterial); // add texture to floor object
scene.add(backWallObj);
backWallObj.position.set(0, 65, -210);

var frontWallMaterial = new THREE.MeshBasicMaterial({
  color: 0xa1b4d4,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide
});
var frontWall = new THREE.PlaneGeometry(330, 220, 100);
var frontWallObj = new THREE.Mesh(frontWall, frontWallMaterial); // add texture to floor object
scene.add(frontWallObj);
frontWallObj.position.set(0, 65, 10);

var leftWallMaterial = new THREE.MeshBasicMaterial({
  color: 0xa1b4d4,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide
});
var leftWall = new THREE.PlaneGeometry(220, 220, 100);
var leftWallObj = new THREE.Mesh(leftWall, leftWallMaterial); // add texture to floor object
scene.add(leftWallObj);
leftWallObj.position.set(-165, 65, -100);
leftWallObj.rotation.y = 4.712;

var rightWallMaterial = new THREE.MeshBasicMaterial({
  color: 0xa1b4d4,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide
});
var rightWall = new THREE.PlaneGeometry(220, 220, 100);
var rightWallObj = new THREE.Mesh(rightWall, rightWallMaterial); // add texture to floor object
scene.add(rightWallObj);
rightWallObj.position.set(165, 65, -100);
rightWallObj.rotation.y = 4.712;


//--------------create animation controls---------------
var speed = 1;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 87) {
    //on W key press
    if (fish.position.z >= -200) {
      //if fish within limits
      fish.position.z -= speed; //translate backward
      camera.position.z -= speed; //translate camera to follow fish
      fish.rotation.z = 4.68; //rotate the fish the direction that its moving in
    }
  } else if (keyCode == 83) {// on S press
    if(fish.position.z <= -5){
    fish.position.z += speed; //move fish forward
    camera.position.z += speed; //translate camera to follow fish
    fish.rotation.z = -4.68; // rotate fish to look at camera
    }
  } else if (keyCode == 68) {//on D press
    if (fish.position.x <= 150) {
      fish.position.x += speed;
      camera.position.x += speed;
      fish.rotation.z = 9.5;
    }
  } else if (keyCode == 65) {// on A press
    if(fish.position.x >= -150){
    fish.position.x -= speed;
    camera.position.x -= speed;
    fish.rotation.z = 0;
    }
  } else if (keyCode == 32) {
    if(fish.position.y <= 100){
    fish.position.y += speed;
    camera.position.y += speed;
    }
  } else if (keyCode == 88) {
    if(fish.position.y >= -35){
    fish.position.y -= speed;
    camera.position.y -= speed;
    }
  }
}

var i = 0 // counter variable

var moveLongFin = function(){ // move fish left and right
  if(i == 1){
   longFin.position.x += 0.25;
   duck.position.y -= 0.25
   if(longFin.position.x == 60){
     longFin.rotation.z =0; // rotate 180 when reaching x = 35
     i = 0;
   } 
  }else if(i == 0){  
  duck.position.y += 0.25
  longFin.position.x -= 0.25;
    if(longFin.position.x == -60){
      longFin.rotation.z =9.5; // rotate 180 when reaching x = -35
      i = 1;
    }
  }
}



//----------------animate and render the scene------------------
var animate = function () {
  requestAnimationFrame(animate);
  moveLongFin();
  camera.lookAt(fish.position);
  renderer.render(scene, camera);
};

loadModel(); //load in all the 3d models
animate(); // render and animate the scene
