function rnd(l, u){
  return Math.floor(Math.random()*(u-l) + l);
}

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene"); //CSS Selector

  // Add static physics to walls and ground so the camera cannot pass through.
  document.querySelectorAll('#wall a-box, #wall2 a-box, a-plane').forEach(el => {
    // Avoid adding to sky or unrelated planes accidentally.
    if (el.closest('#wall') || el.closest('#wall2') || el.getAttribute('color') === 'green') {
      el.setAttribute('static-body', '');
    }
  });

  // Add a dynamic body for the camera rig so it collides with static walls.
  const cameraRig = document.querySelector('#cameraRig');
  if (cameraRig) {
    cameraRig.setAttribute('dynamic-body', 'shape: sphere; sphereRadius: 0.5; mass: 5;');
    cameraRig.setAttribute('collision-filter', 'collisionForces: true;');
  }

  let ct = 0
  for(let i = 0; i < 70; i++){
    let x = rnd(-70,70);
    let z = rnd(-70,70);
    if(distanceRaw(x,z,0,0)>8){
      createTree(x,0,z);
      ct++;
    }else{
      console.log(`Too close ${x} ${z}`);
    }
    
  }
  console.log(ct)
})

function createTree(x, y, z){
  let tree = document.createElement("a-entity");
  
  let pines = document.createElement("a-cone");
  pines.setAttribute("color","green");
  pines.setAttribute("position","0 2 0");
  pines.setAttribute("height","3");
  tree.append( pines );

  let stump = document.createElement("a-cylinder");
  stump.setAttribute("position","0 1 0");
  stump.setAttribute("color","brown");
  stump.setAttribute("radius","0.25");
  stump.setAttribute("height","2");
  tree.append( stump );

  tree.setAttribute("position",{x:x, y:y, z:z});
  scene.append( tree )

}
  
function distanceRaw(x1,z1,x2,z2){

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(z1-z2,2));
  return d;
}