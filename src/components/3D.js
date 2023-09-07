import React, { Suspense, useRef, useState } from 'react'
import {
    Canvas,
    useFrame,
    useLoader,
    useThree,
    extend
} from '@react-three/fiber'
// import {
//     PerspectiveCamera,
//     OrthographicCamera,
//     OrbitControls
// } from '@react-three/drei'
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

import './3D.css';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import im1 from "../assets/images/sky-map.png";
import barrel from "../assets/models/pw1000-barrel-allone.glb";
import yoke from "../assets/models/pw1000-yoke.glb";
// import dome_bottom from "../assets/models/dome-bottom.glb";
import dome_bottom from "../assets/models/pw1000-building-base.glb";
// import dome_top from "../assets/models/dome-top.glb";
import dome_top from "../assets/models/pw1000-building-dome-lowres.glb";
// import dome_top from "../assets/models/pw1000-dome.glb";
import left_shutter from "../assets/models/pw1000-left_shutter.glb";
import right_shutter from "../assets/models/pw1000-right_shutter.glb";
import pine from "../assets/models/low-poly-pine.glb";
import ground from "../assets/images/Ground.jpeg";

// Extend will make OrbitControls available as a JSX element
// called orbitControls for us to use.
extend({ OrbitControls });
extend({ TrackballControls });

function PWBarrel() {

    const b = useLoader(GLTFLoader, barrel)
    b.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.side = THREE.DoubleSide;
            object.material.color.set(0x000004);
            object.castShadow = true;
            // object.receiveShadow = true;
            // object.material.opacity = 0.9;
        }
    });
    return <primitive object={b.scene} position={[0, 0, 0]}
        rotation={[-0 * 0.0174533, 0 * 0.0174533, 0 * 0.0174533]}
        castShadow />
}

function PWYoke() {
    const b = useLoader(GLTFLoader, yoke)
    b.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.side = THREE.DoubleSide;
            object.material.color.set(0x7070ff);
            // object.castShadow = true;
            object.receiveShadow = true;
            // object.material.opacity = 0.9;
        }
    });
    return <primitive object={b.scene} position={[0, -6, 0]}
        castShadow />
}

function DomeBottom() {
    const b = useLoader(GLTFLoader, dome_bottom)
    b.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.side = THREE.DoubleSide;
            object.material.color.set(0xffffff);
            // object.castShadow = true;
            object.receiveShadow = true;
            object.material.transparent = true;
            object.material.opacity = 0.5;
        }
    });
    return <primitive object={b.scene} position={[0, -34, 0]}
        receiveShadow />
}

function DomeLeftShutter() {
    const b = useLoader(GLTFLoader, left_shutter)
    b.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.side = THREE.DoubleSide;
            object.material.color.set(0xffffff);
            // object.castShadow = true;
            object.receiveShadow = true;
            object.material.transparent = true;
            object.material.opacity = 0.3;
        }
    });
    return <primitive object={b.scene} position={[0, -34, 0]}
        receiveShadow />
}

function DomeRightShutter() {
    const b = useLoader(GLTFLoader, right_shutter)
    b.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.side = THREE.DoubleSide;
            object.material.color.set(0xffffff);
            // object.castShadow = true;
            object.receiveShadow = true;
            object.material.transparent = true;
            object.material.opacity = 0.3;
        }
    });
    return <primitive object={b.scene} position={[0, -34, 0]}
        receiveShadow />
}

function DomeTop() {
    const b = useLoader(GLTFLoader, dome_top)
    // const xyz = new THREE.MeshStandardMaterial({
    // })
    b.scene.traverse(function (object) {
        if (object.isMesh) {
            // object.material = xyz;
            object.material.side = THREE.DoubleSide;
            // object.castShadow = true;
            object.receiveShadow = true;
            object.material.transparent = true;
            object.material.opacity = 0.3;
        }
    });
    return <primitive object={b.scene} position={[0, -34, 0]}
        receiveShadow />
}

function Pine(props) {
    const gltf = useLoader(GLTFLoader, pine),
        [geometry, setGeometry] = useState();

    gltf.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.side = THREE.DoubleSide;
            object.material.color.set(0xb0ffb0);
            // object.castShadow = true;
            object.receiveShadow = true;
        }
    });

    // init
    if (!geometry) {
        // Scene settings
        const scene = gltf.scene.clone(true); // so we can instantiate multiple copies of this geometry
        setGeometry(scene);
    }

    const primitiveProps = {
        object: geometry,
        position: props.position,
        rotation: props.rotation,
        scale: props.scale,
    };
    return <primitive {...primitiveProps} />;
}

/* const GetInfo = () => {
    const { gl } = useThree();
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap
    useEffect(() => {
        // gl === WebGLRenderer
        // gl.info.calls
        gl.shadowMap.enabled = true;
        console.log(gl.info);
    });
    return null;
}; */

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    const {
        camera,
        gl: { domElement },
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    /* <CameraControls enableZoom={false} enablePan={false} enableDamping
                        dampingFactor={20.2} autoRotate rotateSpeed={-0.5} /> */
    const controls = useRef();
    useFrame((state) => controls.current.update());
    return <orbitControls ref={controls} args={[camera, domElement]} zoomSpeed={0.1}
        enablePan={true} rotateSpeed={0.1} />;
};

// const CameraTrackControls = () => {
//     // Get a reference to the Three.js Camera, and the canvas html element.
//     // We need these to setup the OrbitControls component.
//     // https://threejs.org/docs/#examples/en/controls/OrbitControls
//     const {
//         camera,
//         gl: { domElement },
//     } = useThree();
//     // Ref to the controls, so that we can update them on every frame using useFrame
//     /* <CameraControls enableZoom={false} enablePan={false} enableDamping
//                         dampingFactor={20.2} autoRotate rotateSpeed={-0.5} /> */
//     const controls = useRef();
//     useFrame((state) => controls.current.update());
//     return <trackballControls ref={controls} args={[camera, domElement]} zoomSpeed={0.1}
//         enablePan={true} rotateSpeed={0.1} />;
// };
function SkyAndTrees(props) {
    const texture = useLoader(THREE.TextureLoader, im1)
    const ref = useRef()
    return (
        <object3D>
            <object3D><Pine position={[24, -33.2, 24]}
                rotation={[0, 0, 0]}
                scale={.7} /></object3D>
            <object3D><Pine position={[-40, -33.2, -27]}
                rotation={[0, 2, 0]}
                scale={.9} /></object3D>
            <object3D><Pine position={[-20, -33.2, 27]}
                rotation={[0, 4, 0]}
                scale={.4} /></object3D>
            <object3D><Pine position={[45, -33.2, -47]}
                rotation={[0, 5, 0]}
                scale={1} /></object3D>
            <object3D><Pine position={[65, -33.2, -47]}
                rotation={[0, 5, 0]}
                scale={.6} /></object3D>
            <object3D><Pine position={[65, -33.2, -67]}
                rotation={[0, 5, 0]}
                scale={.8} /></object3D>
            {/* the 3d object below is sky dome */}
            <object3D>
                <mesh
                    {...props}
                    ref={ref} >
                    <sphereBufferGeometry attach="geometry" args={[300, 360, 90]} />

                    <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
                </mesh>
            </object3D>
        </object3D>
    )
}
function Dome(props) {
    const texture = useLoader(THREE.TextureLoader, im1)
    const ref = useRef()
    const domeRef = useRef()
    // var domeazimuth = props.domeazimuth;
    // console.log(props.domeazimuth)
    // const rotation = (props.uiConfig && props.uiConfig.rotation) || props.rotation,
    //     position = (props.uiConfig && props.uiConfig.position) || props.position,
    //     scale = (props.uiConfig && props.uiConfig.scale) || props.scale;

    // useFrame(state => {
    //     domeRef.current.rotation.y = (domeazimuth - 90.0) * 0.0174533
    // })

    return (
        <object3D ref={domeRef}>
            <object3D >
                <DomeBottom receiveShadow currentColor={"Red"} />
            </object3D>
            <object3D >
                <DomeTop transparent receiveShadow currentColor={"Red"} />
            </object3D>
            <object3D >
                <DomeLeftShutter receiveShadow currentColor={"Red"} />
            </object3D>
            <object3D >
                <DomeRightShutter receiveShadow currentColor={"Red"} />
            </object3D>

        </object3D>


    )
}

function Telescope(props) {
    // This reference will give us direct access to the THREE.Mesh object

    // const ref = useRef()
    //const mountRef = useRef()
    //const mountRef2 = useRef()
    const floorRef = useRef()
    const group = useRef()
    const mountGroup = useRef()
    const floorGroup = useRef()

    // var azimuth = props.azimuth;
    // var elevation = 90.0 - props.elevation;

    const gtexture = useLoader(TextureLoader, ground);
    gtexture.wrapS = gtexture.wrapT = THREE.RepeatWrapping;
    gtexture.repeat.set(16, 16);
    gtexture.anisotropy = 16;

    // GetInfo()

    useFrame(state => {
        // group.current.position.x = 0.0
        // group.current.position.y = 0.0
        // group.current.position.z = 0.0
        // group.current.rotation.y = azimuth * 0.0174533
        // group.current.rotation.z = elevation * 0.0174533
        floorGroup.current.rotation.y = 0 * 0.0174533
        floorGroup.current.rotation.x = 90 * 0.0174533
        floorGroup.current.rotation.z = 0 * 0.0174533
        floorGroup.current.position.y = -12.0
        // mountGroup.current.rotation.y = azimuth * 0.0174533

    })

    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <object3D>
            {/* <object3D ref={group} >
                <PWBarrel receiveShadow currentColor={"Red"} />
            </object3D>
            <object3D ref={mountGroup}>
                <PWYoke receiveShadow />
            </object3D> */}
            <object3D ref={floorGroup}>
                <mesh
                    ref={floorRef}
                    scale={1.0}
                    position={[0, 0, 22.0]} >
                    <planeGeometry args={[1000, 1000]} />
                    {/* {ftexture && <meshBasicMaterial attach="material" map={ftexture} />} */}
                    <meshStandardMaterial side={THREE.DoubleSide} transparent
                        opacity={1.0} color={'rgb(50,50,50)'} attach="material"
                        map={gtexture} repeat={[2.2, 2.2]} />
                </mesh>
            </object3D>
        </object3D>

    )
}

// const Camera = (props) => {
//     const ref = useRef();
//     const set = useThree((state) => state.set);
//     useEffect(() => void set({ camera: ref.current }), []);
//     useFrame(() => ref.current.updateMatrixWorld());
//     return <perspectiveCamera ref={ref} {...props} />;
// };

function ThreeD({ azimuth, elevation, domeazimuth }) {

    // const controls = OrbitControls;


    return (
        <div id="threedcdiv" >
            <Suspense fallback={<div>Loading... </div>}>
                {/* <Canvas shadows colorManagement camera={{ scale: 1, fov: 50, position: [0, 100, 100] }} onCreated={({ gl }) => {
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = THREE.PCFShadowMap;
                }}> */}
                {/* <Canvas colorManagement camera={{ scale: 1, fov: 50, position: [0, 100, 100] }}> */}
                {/* <Canvas colorManagement > */}
                <Canvas colorManagement camera={{ scale: 1, fov: 50, position: [0, 100, 100] }}>
                    <CameraControls />

                    {/* <PerspectiveCamera
                        makeDefault
                        position={[0, 10, 100]}
                        fov={60}
                        zoom={0.9} /> */}

                    {/* <OrthographicCamera
                        makeDefault
                        zoom={10}
                        top={2000}
                        bottom={-2000}
                        left={2000}
                        right={-2000}
                        near={0.1}
                        far={2000}
                        position={[-50, 10, 10]}
                    /> */}

                    {/* <OrbitControls
                        enableZoom={true}
                        enablePan={true}
                        enableRotate={true}
                    /> */}

                    <ambientLight intensity={10} />
                    <directionalLight
                        intensity={.5}
                        position={[20, 40, 30]} />
                    {/* <pointLight
                        castShadow
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        shadow-camera-near={0.5}
                        shadow-camera-far={500}
                        position={[-15, 10, 0]} /> */}
                    {/* <pointLight
                        castShadow
                        intensity={3}
                        color={"#999999"}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[20, 40, 30]} /> */}
                    {/* <pointLight
                        castShadow
                        intensity={.1}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[0, 14, 0]} />
                    <pointLight
                        // castShadow
                        intensity={.1}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[0, 10, 10]} />
                    <pointLight
                        // castShadow
                        intensity={.1}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[0, 10, -10]} /> */}
                    <pointLight
                        // castShadow
                        intensity={.2}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[0, 10, -50]} />
                    <pointLight
                        // castShadow
                        intensity={.2}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[50, 10, 50]} />
                    <pointLight
                        // castShadow
                        intensity={.2}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[-50, 10, -50]} />
                    <pointLight
                        // castShadow
                        intensity={.2}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[-50, 10, 50]} />
                    <pointLight
                        // castShadow
                        intensity={.5}
                        color={"#ffffff"}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[20, 90, -20]} />
                    <pointLight
                        // castShadow
                        intensity={.5}
                        color={"#ffffff"}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[-20, 90, -20]} />
                    <SkyAndTrees position={[0, -10.0, 0]} />
                    {/* <Dome position={[0, -10.0, 0]} domeazimuth={domeazimuth} /> */}
                    <Dome position={[0, -10.0, 0]}  />
                    {/* <Telescope position={[0.0, 0, 0]} azimuth={azimuth} elevation={elevation} /> */}
                    <Telescope position={[0.0, 0, 0]}  />
                </Canvas>
            </Suspense>

        </div >
    );
}

export default ThreeD;