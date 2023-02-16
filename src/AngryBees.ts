/* Lecture 10
 * CSCI 4611, Spring 2023, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class AngryBees extends gfx.GfxApp
{
    private ground: gfx.BoxMesh;
    private skybox: gfx.BoxMesh;
    private bee: gfx.Transform3;
    private line: gfx.BoxMesh;

    private beeVelocity: gfx.Vector3;

    private mouseStart: gfx.Vector2;

    constructor()
    {
        super();

        this.ground = new gfx.BoxMesh();
        this.skybox = new gfx.BoxMesh();
        this.bee = new gfx.Transform3();
        this.line = new gfx.BoxMesh();

        this.beeVelocity = new gfx.Vector3();

        this.mouseStart = new gfx.Vector2();
    }

    createScene(): void 
    {
        // Setup the camera projection matrix and position.
        // We will learn more about camera models later in this course.
        this.camera.setPerspectiveCamera(60, 1920/1080, 0.1, 100);
        this.camera.position.set(0, 1.5, 0);

        // Create an ambient light that illuminates everything in the scene
        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.4, 0.4, 0.4));

        // Create a directional light that is infinitely far away (sunlight)
        const directionalLight = new gfx.DirectionalLight(new gfx.Color(0.6, 0.6, 0.6));
        directionalLight.position.set(1, 2, 1);

        this.ground.position.set(0, -0.5, 0);
        this.ground.scale.set(50, 1, 50);
        this.ground.material.setColor(new gfx.Color(83/255, 209/255, 110/255));

        this.skybox.scale.set(100, 100, 100);
        this.skybox.material = new gfx.UnlitMaterial();
        this.skybox.material.setColor(new gfx.Color(0.698, 1, 1));
        this.skybox.material.side = gfx.Side.BACK;

        const beeBody = new gfx.SphereMesh(1, 2);
        beeBody.scale.set(0.5, 0.5, 0.8);
        beeBody.rotation.setRotationX(Math.PI / 4);
        beeBody.material.setColor(new gfx.Color(1, 0.82, 0));
        this.bee.add(beeBody);

        const beeHead = new gfx.SphereMesh(1, 2);
        beeHead.position.set(0, 0.6, -0.6);
        beeHead.scale.set(0.4, 0.4, 0.4);
        beeHead.material.setColor(new gfx.Color(1, 0.82, 0));
        this.bee.add(beeHead);

        const beeWing = new gfx.SphereMesh(1, 2);
        beeWing.scale.set(0.2, 0.05, 0.8);
        beeWing.material = new gfx.UnlitMaterial();
        beeWing.material.setColor(gfx.Color.WHITE);

        const beeWingLeft = new gfx.MeshInstance(beeWing);
        beeWingLeft.position.set(-0.55, 0.56, .5);
        beeWingLeft.rotateY(-Math.PI/8);
        beeWingLeft.rotateZ(Math.PI/8);
        this.bee.add(beeWingLeft);

        const beeWingRight = new gfx.MeshInstance(beeWing);
        beeWingRight.position.set(0.55, 0.56, .5);
        beeWingRight.rotateY(Math.PI/8);
        beeWingRight.rotateZ(-Math.PI/8);
        this.bee.add(beeWingRight);

        this.bee.position.set(-3.5, 0.5, -5);
        this.bee.rotation.setRotationY(-Math.PI/2);
        this.bee.scale.set(0.25, 0.25, 0.25);

        this.line.scale.set(0.02, 0.02, 1);
        this.line.material = new gfx.UnlitMaterial();
        this.line.material.setColor(gfx.Color.BLUE);
        this.line.visible = false;

        this.scene.add(ambientLight);
        this.scene.add(directionalLight);
        this.scene.add(this.ground);
        this.scene.add(this.skybox);
        this.scene.add(this.bee);
        this.scene.add(this.line);
    }

    update(deltaTime: number): void 
    {
        const a = new gfx.Vector3(0, 0, 0);

        // v' = v + a * dt
        this.beeVelocity.add(gfx.Vector3.multiplyScalar(a, deltaTime));

        // p' = p + v' * dt
        this.bee.position.add(gfx.Vector3.multiplyScalar(this.beeVelocity, deltaTime));
    }

    onMouseDown(event: MouseEvent): void 
    {

    }

    onMouseUp(event: MouseEvent): void 
    {

    }

    onMouseMove(event: MouseEvent): void 
    {

    }
}