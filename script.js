const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('./8k_earth.jpg')
const normalTextureSun = textureLoader.load('./8k_sun.jpg')
const normaltextureMercury = textureLoader.load('./8k_mercury.jpg')
const normaltextureSaturnRing = textureLoader.load('./8k_saturn_ring_alpha.png')
const normaltextureVenus = textureLoader.load('./8k_venus_surface.jpg')
const normaltextureSaturn = textureLoader.load('./8k_saturn.jpg')
const normaltextureMars = textureLoader.load('./8k_mars.jpg')
const normaltextureJupiter = textureLoader.load('./8k_jupiter.jpg')
const normaltextureUranus = textureLoader.load('./2k_uranus.jpg')
const normaltextureNeptune = textureLoader.load('./2k_neptune.jpg')


const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const Sungeometry = new THREE.SphereBufferGeometry(1, 32, 32)
const Mercurygeometry = new THREE.SphereBufferGeometry(0.25,32,32)
const Venusgeometry = new THREE.SphereBufferGeometry(0.3,32,32)
const Earthgeometry = new THREE.SphereBufferGeometry(0.35, 32, 32)
const Marsgeometry = new THREE.SphereBufferGeometry(0.18, 32, 32)
const Jupitergeometry = new THREE.SphereBufferGeometry(0.55, 32, 32)
const Saturngeometry = new THREE.SphereBufferGeometry(0.45, 32, 32)
const SaturnRinggeometry = new THREE.RingBufferGeometry(0.55,0.70,30)
const Uranusgeometry = new THREE.SphereBufferGeometry(0.35, 32, 32)
const Neptunegeometry = new THREE.SphereBufferGeometry(0.3, 32, 32)

// Materials

const Earthmaterial = new THREE.MeshStandardMaterial()
Earthmaterial.roughness = 0.4
Earthmaterial.opacity = 0.9
Earthmaterial.map = normalTexture;

const sphereEarth = new THREE.Mesh(Earthgeometry,Earthmaterial)

const Sunmaterial = new THREE.MeshStandardMaterial()
Sunmaterial.transparent = true
Sunmaterial.opacity = 0.9
Sunmaterial.metalness = 0
Sunmaterial.roughness = 0.3
Sunmaterial.map = normalTextureSun;

Sunmaterial.color = new THREE.Color( 0xfff917 )

const Mercurymaterial = new THREE.MeshStandardMaterial()
Mercurymaterial.roughness = 0.4
Mercurymaterial.opacity = 0.9
Mercurymaterial.map = normaltextureMercury;
const sphereMercury = new THREE.Mesh(Mercurygeometry,Mercurymaterial)

const Venusmaterial = new THREE.MeshStandardMaterial()
Venusmaterial.roughness = 0.4
Venusmaterial.opacity = 0.9
Venusmaterial.map = normaltextureVenus;
const sphereVenus = new THREE.Mesh(Venusgeometry,Venusmaterial)

const Marsmaterial = new THREE.MeshStandardMaterial()
Marsmaterial.roughness = 0.4
Marsmaterial.opacity = 0.9
Marsmaterial.map = normaltextureMars;
const sphereMars = new THREE.Mesh(Marsgeometry,Marsmaterial)

const Jupitermaterial = new THREE.MeshStandardMaterial()
Jupitermaterial.roughness = 0.4
Jupitermaterial.opacity = 0.9
Jupitermaterial.map = normaltextureJupiter;
const sphereJupiter = new THREE.Mesh(Jupitergeometry,Jupitermaterial)

const Uranusmaterial = new THREE.MeshStandardMaterial()
Uranusmaterial.roughness = 0.4
Uranusmaterial.opacity = 0.9
Uranusmaterial.map = normaltextureUranus;
const sphereUranus = new THREE.Mesh(Uranusgeometry,Uranusmaterial)

const Neptunematerial = new THREE.MeshStandardMaterial()
Neptunematerial.roughness = 0.4
Neptunematerial.opacity = 0.9
Neptunematerial.map = normaltextureNeptune;
const sphereNeptune = new THREE.Mesh(Neptunegeometry,Neptunematerial)


const SaturnMaterial = new THREE.MeshStandardMaterial()
SaturnMaterial.opacity = 0.9
SaturnMaterial.roughness = 0.4
SaturnMaterial.map = normaltextureSaturn;
const sphereSaturn = new THREE.Mesh(Saturngeometry,SaturnMaterial)

const SaturnRingMaterial = new THREE.MeshBasicMaterial()
SaturnRingMaterial.map = normaltextureSaturnRing;
const sphereSaturnRing = new THREE.Mesh(SaturnRinggeometry,SaturnRingMaterial)


// Mesh
const sphere = new THREE.Mesh(Sungeometry,Sunmaterial)
scene.add(sphere)
scene.add(sphereEarth)
scene.add(sphereSaturn)
sphereSaturn.add(sphereSaturnRing)
scene.add(sphereMercury)
scene.add(sphereVenus)
scene.add(sphereMars)
scene.add(sphereJupiter)
scene.add(sphereUranus)
scene.add(sphereNeptune)


const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 0
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)



const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphereMercury.position.y = window.scrollY * .001
    sphereVenus.position.y = window.scrollY * .001
    sphereEarth.position.y = window.scrollY * .001
    sphereMars.position.y = window.scrollY * .001
    sphereJupiter.position.y = window.scrollY * .001
    sphereSaturn.position.y = window.scrollY * .001
    sphereUranus.position.y = window.scrollY * .001
    sphereNeptune.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere);


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001


    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.z = 0.5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)
            
    sphereEarth.rotation.z = 1.2 * elapsedTime
    sphereEarth.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereEarth.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereEarth.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereMercury.rotation.z = 1.2 * elapsedTime
    sphereMercury.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereMercury.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereMercury.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereVenus.rotation.z = 1.2 * elapsedTime
    sphereVenus.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereVenus.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereVenus.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereMars.rotation.z = 1.2 * elapsedTime
    sphereMars.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereMars.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereMars.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereJupiter.rotation.z = 1.2 * elapsedTime
    sphereJupiter.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereJupiter.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereJupiter.position.z += -.05 * (targetY - sphereEarth.rotation.x)
 
    sphereSaturn.rotation.z = 1.2 * elapsedTime
    sphereSaturn.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereSaturn.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereSaturn.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereUranus.rotation.z = 1.2 * elapsedTime
    sphereUranus.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereUranus.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereUranus.position.z += -.05 * (targetY - sphereEarth.rotation.x)
            
    sphereNeptune.rotation.z = 1.2 * elapsedTime
    sphereNeptune.rotation.y += .05 * (targetX - sphereEarth.rotation.y)
    sphereNeptune.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereNeptune.position.z += -.05 * (targetY - sphereEarth.rotation.x)

    const rotMercury = Date.now() * 0.0009;
   
    sphereMercury.position.x = 2.5 * Math.cos(rotMercury)
    sphereMercury.position.y = 1.5 * Math.sin(rotMercury)

    const rotVenus = Date.now() * 0.0008;
   
    sphereVenus.position.x = 3.5 * Math.cos(rotVenus)
    sphereVenus.position.y = 2 * Math.sin(rotVenus)
            
   
       
    const rotEarth = Date.now() * 0.0007;

    sphereEarth.position.x = 5 * Math.cos(rotEarth)
    sphereEarth.position.y = 2.5 * Math.sin(rotEarth)

    const rotMars = Date.now() * 0.0006;
    
    sphereMars.position.x = 6 * Math.cos(rotMars)
    sphereMars.position.y = 3.6 * Math.sin(rotMars)

    const rotJupiter = Date.now() * 0.0005;
    
    sphereJupiter.position.x = 7 * Math.cos(rotJupiter)
    sphereJupiter.position.y = 4.3 * Math.sin(rotJupiter)

    const rotSaturn = Date.now() * 0.0004;
   
    sphereSaturn.position.x = 8 * Math.cos(rotSaturn)
    sphereSaturn.position.y = 5.5 * Math.sin(rotSaturn)

    const rotUranus = Date.now() * 0.0003;
  
    sphereUranus.position.x = 9 * Math.cos(rotUranus)
    sphereUranus.position.y = 6 * Math.sin(rotUranus)

    const rotNeptune = Date.now() * 0.0002;
    
    sphereNeptune.position.x = 9.7 * Math.cos(rotNeptune)
    sphereNeptune.position.y = 6.7 * Math.sin(rotNeptune)
    
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
