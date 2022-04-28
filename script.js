// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('./8k_earth.jpg')
const normalTextureSUN = textureLoader.load('./8k_sun.jpg')
const normaltextureMOON = textureLoader.load('./8k_moon.jpg')
const normaltextureMercury = textureLoader.load('./8k_mercury.jpg')
const normaltextureSaturnRing = textureLoader.load('./8k_saturn_ring_alpha.png')
const normaltextureVenus = textureLoader.load('./8k_venus_surface.jpg')
const normaltextureSaturn = textureLoader.load('./8k_saturn.jpg')
const normaltextureMars = textureLoader.load('./8k_mars.jpg')
const normaltextureJupiter = textureLoader.load('./8k_jupiter.jpg')
const normaltextureUranus = textureLoader.load('./2k_uranus.jpg')
const normaltextureNeptune = textureLoader.load('./2k_neptune.jpg')


// Debug


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const SUNgeometry = new THREE.SphereBufferGeometry(0.8, 64, 64)
const Mercurygeometry = new THREE.SphereBufferGeometry(0.17,64,64)
const Venusgeometry = new THREE.SphereBufferGeometry(0.2,64,64)
const EARTHgeometry = new THREE.SphereBufferGeometry(0.25, 64, 64)
const MOONgeometry = new THREE.SphereBufferGeometry(0.1, 64, 64)
const Marsgeometry = new THREE.SphereBufferGeometry(0.16, 64, 64)
const Jupitergeometry = new THREE.SphereBufferGeometry(0.5, 64, 64)
const Saturngeometry = new THREE.SphereBufferGeometry(0.4, 64, 64)
const SaturnRinggeometry = new THREE.RingBufferGeometry(0.5,0.65,60)
const Uranusgeometry = new THREE.SphereBufferGeometry(0.35, 64, 64)
const Neptunegeometry = new THREE.SphereBufferGeometry(0.3, 64, 64)

// Materials

const EARTHmaterial = new THREE.MeshStandardMaterial()
EARTHmaterial.roughness = 0.4
EARTHmaterial.opacity = 0.9
EARTHmaterial.map = normalTexture;

const sphereEARTH = new THREE.Mesh(EARTHgeometry,EARTHmaterial)

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

const MOONmaterial= new THREE.MeshStandardMaterial()
MOONmaterial.opacity = 0.9
MOONmaterial.roughness = 0.4
MOONmaterial.map = normaltextureMOON;
const sphereMOON = new THREE.Mesh(MOONgeometry,MOONmaterial)

const SaturnMaterial = new THREE.MeshStandardMaterial()
SaturnMaterial.opacity = 0.9
SaturnMaterial.roughness = 0.4
SaturnMaterial.map = normaltextureSaturn;
const sphereSaturn = new THREE.Mesh(Saturngeometry,SaturnMaterial)

const SaturnRingMAterial = new THREE.MeshBasicMaterial()
SaturnRingMAterial.map = normaltextureSaturnRing;
const sphereSaturnRing = new THREE.Mesh(SaturnRinggeometry,SaturnRingMAterial)

const SUNmaterial = new THREE.MeshStandardMaterial()
SUNmaterial.transparent = true
SUNmaterial.opacity = 0.9
SUNmaterial.metalness = 0
SUNmaterial.roughness = 0.3
SUNmaterial.map = normalTextureSUN;

SUNmaterial.color = new THREE.Color( 0xfff917 )

// Mesh
const sphere = new THREE.Mesh(SUNgeometry,SUNmaterial)
scene.add(sphere)
scene.add(sphereEARTH)
sphereEARTH.add(sphereMOON)
scene.add(sphereSaturn)
sphereSaturn.add(sphereSaturnRing)
scene.add(sphereMercury)
scene.add(sphereVenus)
scene.add(sphereMars)
scene.add(sphereJupiter)
scene.add(sphereUranus)
scene.add(sphereNeptune)

const loader = new THREE.TextureLoader();
loader.load('./Star.jpg' , function(texture)
            {
             scene.background = texture;  
            });




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
    sphereEARTH.position.y = window.scrollY * .001
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

    const r1 = Date.now() * 0.0009;
    sphereMercury.rotation.z = 1.2 * elapsedTime
    sphereMercury.rotation.y += .05 * (targetX - sphereEARTH.rotation.y)
    sphereMercury.rotation.x += .05 * (targetY - sphereEARTH.rotation.x)
    sphereMercury.position.z += -.05 * (targetY - sphereEARTH.rotation.x)
    sphereMercury.position.x = 2.5 * Math.cos(r1)
    sphereMercury.position.y = 1.5 * Math.sin(r1)

    const r2 = Date.now() * 0.0007;
    sphereVenus.rotation.z = 1.2 * elapsedTime
    sphereVenus.rotation.y += .05 * (targetX - sphereEARTH.rotation.y)
    sphereVenus.rotation.x += .05 * (targetY - sphereEARTH.rotation.x)
    sphereVenus.position.z += -.05 * (targetY - sphereEARTH.rotation.x)
    sphereVenus.position.x = 3.5 * Math.cos(r2)
    sphereVenus.position.y = 2 * Math.sin(r2)
    
    //sphereEARTH.position.y = -1
    sphereEARTH.rotation.z = 1.2 * elapsedTime
    sphereEARTH.rotation.y += .05 * (targetX - sphereEARTH.rotation.y)
    sphereEARTH.rotation.x += .05 * (targetY - sphereEARTH.rotation.x)
    sphereEARTH.position.z += -.05 * (targetY - sphereEARTH.rotation.x)
    
    const r3 = Date.now() * 0.0006;
    
    sphereEARTH.position.x = 5 * Math.cos(r3)
    sphereEARTH.position.y = 2.5 * Math.sin(r3)
    //sphereEARTH.position.z = 2.5 * Math.sin(r)
    sphereMOON.position.x = -0.6

    const r4 = Date.now() * 0.0005;
    sphereMars.rotation.z = 1.2 * elapsedTime
    sphereMars.rotation.y += .05 * (targetX - sphereEARTH.rotation.y)
    sphereMars.rotation.x += .05 * (targetY - sphereEARTH.rotation.x)
    sphereMars.position.z += -.05 * (targetY - sphereEARTH.rotation.x)
    sphereMars.position.x = 6 * Math.cos(r4)
    sphereMars.position.y = 3.6 * Math.sin(r4)

    const r5 = Date.now() * 0.0004;
    sphereJupiter.rotation.z = 1.2 * elapsedTime
    sphereJupiter.rotation.y += .05 * (targetX - sphereEARTH.rotation.y)
    sphereJupiter.rotation.x += .05 * (targetY - sphereEARTH.rotation.x)
    sphereJupiter.position.z += -.05 * (targetY - sphereEARTH.rotation.x)
    sphereJupiter.position.x = 7 * Math.cos(r5)
    sphereJupiter.position.y = 4.3 * Math.sin(r5)

    const r6 = Date.now() * 0.0003;
    sphereSaturn.rotation.z = 1.2 * elapsedTime
    sphereSaturn.rotation.y += .05 * (targetX - sphereEARTH.rotation.y)
    sphereSaturn.rotation.x += .05 * (targetY - sphereEARTH.rotation.x)
    sphereSaturn.position.z += -.05 * (targetY - sphereEARTH.rotation.x)
    sphereSaturn.position.x = 8 * Math.cos(r6)
    sphereSaturn.position.y = 5.5 * Math.sin(r6)

    const r7 = Date.now() * 0.00025;
    sphereUranus.rotation.z = 1.2 * elapsedTime
    sphereUranus.rotation.y += .05 * (targetX - sphereEARTH.rotation.y)
    sphereUranus.rotation.x += .05 * (targetY - sphereEARTH.rotation.x)
    sphereUranus.position.z += -.05 * (targetY - sphereEARTH.rotation.x)
    sphereUranus.position.x = 9 * Math.cos(r7)
    sphereUranus.position.y = 6 * Math.sin(r7)

    const r8 = Date.now() * 0.0002;
    sphereNeptune.rotation.z = 1.2 * elapsedTime
    sphereNeptune.rotation.y += .05 * (targetX - sphereEARTH.rotation.y)
    sphereNeptune.rotation.x += .05 * (targetY - sphereEARTH.rotation.x)
    sphereNeptune.position.z += -.05 * (targetY - sphereEARTH.rotation.x)
    sphereNeptune.position.x = 9.7 * Math.cos(r8)
    sphereNeptune.position.y = 6.7 * Math.sin(r8)
    
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
