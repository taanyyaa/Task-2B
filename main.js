const canvas = document.querySelector('.webgl')
// creating a scene
const scene = new THREE.Scene()

// initialising loader
const loader = new THREE.GLTFLoader()
console.log(loader)
loader.load('Elephant3d.glb', function (glb) {
    console.log("success")
    const root = glb.scene
    root.scale.set(2,2,2)
    scene.add(root)
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "% loaded")
}, function (error) {
    console.log("error")
})


const light=new THREE.DirectionalLight(0xffffff,1)
light.position.set(2,2,5)
light.castShadow=true
scene.add(light)

const pointLight=new THREE.PointLight(0xc4c4c4,10)
pointLight.position.set(0,300,500)
scene.add(pointLight)

// camera 
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 100)
camera.position.set(0, 1, 2)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})

// rotate and zoom the model
const controls = new THREE.OrbitControls(camera,renderer.domElement)
controls.addEventListener("change", renderer)

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
renderer.render(scene, camera)

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()

// panorama 
const panorama = new PANOLENS.ImagePanorama('Forestpan-2.jpeg');
const containerBody = document.querySelector(".containerImage")
containerBody.style.width = innerWidth
containerBody.style.height = innerHeight
console.log(containerBody)
const viewer = new PANOLENS.Viewer({
    container: containerBody
});
viewer.add(panorama);