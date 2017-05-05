(function() {
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

		var container, stats;
		var camera, scene, renderer, controls;

		init();
		animate();

		function init() {

			container = document.getElementById( 'container' );

			camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
			//camera.position.set( 0, 5, 10 );
			// camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
			camera.position.set( 0, 5, 25 );

			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0x0000 );

			// collada

			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			loader.load( '../models/AGR_.dae', function ( collada ) {

				var object = collada.scene;

				object.scale.set( 0.0025, 0.0025, 0.0025 );
				object.position.set( - 2, -1, 0 );
				//object.position.set( - 2, 0.2, 0 );
				scene.add( object );

			} );

			//

			// var gridHelper = new THREE.GridHelper( 10, 20 );
			// scene.add( gridHelper );

			//

			var ambientLight = new THREE.AmbientLight( 0xcccccc );
			scene.add( ambientLight );

			var directionalLight = new THREE.DirectionalLight( 0xffffff );
			directionalLight.position.set( 0, 1, -1 ).normalize();
			scene.add( directionalLight );

			//

			renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			container.appendChild( renderer.domElement );

			//

			//controls = new THREE.OrbitControls( scene, renderer.domElement );
			controls = new THREE.OrbitControls( camera, renderer.domElement );
			controls.enableRotate = false;
			controls.enableZoom = false;

			//

			// stats = new Stats();
			// container.appendChild( stats.dom );

			//

			window.addEventListener( 'resize', onWindowResize, false );

		}

		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );

		}

		function animate() {

			requestAnimationFrame( animate );
			scene.rotation.y += 0.01;
			render();
			//stats.update();

		}

		function render() {

			renderer.render( scene, camera );

		}
} ());