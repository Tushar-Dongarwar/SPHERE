const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('./Earth.jpeg')
const normalTextureSUN = textureLoader.load('./Sun.jpeg')

const canvas = document.querySelector('canvas.webgl')


const scene = new THREE.Scene()


const SUNgeometry = new THREE.SphereBufferGeometry(.4, 64, 64)
const EARTHgeometry = new THREE.SphereBufferGeometry(.2, 64, 64)



const EARTHmaterial = new THREE.MeshStandardMaterial()
EARTHmaterial.metalness = 0
EARTHmaterial.roughness = 0.4
EARTHmaterial.map = normalTexture;


const SUNmaterial = new THREE.MeshStandardMaterial()
SUNmaterial.transparent = true
SUNmaterial.opacity = 0.9
SUNmaterial.metalness = 0
SUNmaterial.roughness = 0.3
SUNmaterial.map = normalTextureSUN;
SUNmaterial.color = new THREE.Color( 0xfff917 )


// Mesh
const sphereEARTH = new THREE.Mesh(EARTHgeometry,EARTHmaterial)


const sphere = new THREE.Mesh(SUNgeometry,SUNmaterial)
scene.add(sphere)
sphere.add(sphereEARTH)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 3)
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
camera.position.z = 2
scene.add(camera)



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
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere);


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001


    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.z = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)
    
    sphereEARTH.position.y = -1
    sphereEARTH.rotation.y = .5 * elapsedTime
    sphereEARTH.rotation.y += .5 * (targetX - sphereEARTH.rotation.y)
    sphereEARTH.rotation.x += .05 * (targetY - sphereEARTH.rotation.x)
    sphereEARTH.position.z += -.05 * (targetY - sphereEARTH.rotation.x)
    
    
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
