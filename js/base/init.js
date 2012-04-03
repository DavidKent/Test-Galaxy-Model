Scene = {};
Scene.clock = new THREE.Clock;
Scene.width = window.innerWidth, Scene.height = window.innerHeight;
var init = function() {
    this.setupContainer = (function() {
        Scene.container = document.createElement('div');
        document.body.appendChild(Scene.container);
    })();

    this.setupCamera = (function() {
        Scene.camera = new THREE.PerspectiveCamera(35, (Scene.width) / (Scene.height), 1, 100000);
        Scene.camera.target = new THREE.Vector3(0, 0, 0);
        Scene.camera.position = new THREE.Vector3(20,21,-30);
    })();

    this.setupScene = (function() {
        Scene.scene = new THREE.Scene();
        Scene.scene.add(Scene.camera);
        Scene.camera.lookAt(Scene.scene.position);
    })();

    this.setupControls = (function() {
        Scene.controls = new THREE.FirstPersonControls ( Scene.camera );
        Scene.controls.movementSpeed = 35;
        Scene.controls.lookSpeed = 0.1;
        Scene.controls.activeLook = true;
        Scene.controls.lon = -229;
        Scene.controls.lat = -29;
    })();

    this.addLights = (function() {
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(12, 16, -13).normalize();
        directionalLight.lookAt(Scene.scene.position);
        Scene.scene.add(directionalLight);
        Scene.scene.add(new THREE.AmbientLight(0x00020));
        var pl = new THREE.PointLight(0xffffff, 3, 20);
        pl.y = 1;
        Scene.scene.add(pl);
    })();

    this.addGrid = (function(size) {
        var line_material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe:true,
            opacity: 0.2
        });
        var geometry = new THREE.PlaneGeometry(25,25,12,12);
        var mesh = new THREE.Mesh(geometry, line_material);
        mesh.rotation.x = -90 * Math.PI/180;
        Scene.scene.add(mesh);
    });

    this.addGalaxy = (function(){
        var galaxy1Mat = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('images/galaxy.png'),
            transparent: true,
            opacity: 0.5
        });
        var galaxy2Mat = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('images/galaxy2.png'),
            transparent: true,
            opacity: 0.5
        });
        var galaxy3Mat = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('images/galaxy3.png'),
            transparent: true,
            opacity: 0.5
        });
        for(var i = 0; i < 10; i++) {
            var geometry = new THREE.PlaneGeometry(25,25,12,12);
            var material = Math.random() > 0.5 ? galaxy1Mat : galaxy2Mat;
            if(i >= 4 && i <= 6) material = galaxy3Mat;
            var mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.x = -90 * Math.PI/180;
            mesh.position.y = i * 0.08;
            Scene.scene.add(mesh);

        }
    })();

    this.setupRenderer = (function() {
        Scene.renderer = new THREE.WebGLRenderer({antialias:true});
        Scene.renderer.AA = 12;
        Scene.renderer.setSize(Scene.width, Scene.height);
        Scene.container.appendChild(Scene.renderer.domElement);
    })();

    this.addStats = (function() {
        Scene.stats = new Stats();
        Scene.stats.domElement.style.position = 'absolute';
        Scene.stats.domElement.style.top = '0px';
        Scene.container.appendChild( Scene.stats.domElement );
    })();
    
    this.runAnimation = (function() {
        Scene.animate();
    })();

};

Scene.animate = function() {
    Scene.stats.update();
    requestAnimationFrame(Scene.animate);
    Scene.render();
};

Scene.render = function() {
    this.renderer.render( this.scene, this.camera );
    this.controls.update( this.clock.getDelta() );
};
    
