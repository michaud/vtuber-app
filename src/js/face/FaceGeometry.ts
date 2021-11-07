import {
    FACES as indices,
    UVS as texCoords
} from "./geometry";

import {
    BufferGeometry,
    BufferAttribute,
    Vector3,
    Triangle,
    Matrix4,
} from "three";
import {
    AnnotatedPrediction
} from '@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh';
import {
    Coords3D
} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh/util";

function getScale(
    face : AnnotatedPrediction,
    id1 : number,
    id2 : number,
    customScale: number
) {

    if(!face) return 1;

    const p1 = (face.mesh as Coords3D)[id1];
    const p1_scaled = (face.scaledMesh as Coords3D)[id1];
    const p2 = (face.mesh as Coords3D)[id2];
    const p2_scaled = (face.scaledMesh as Coords3D)[id2];

    const a = p2[0] - p1[0];
    const b = p2_scaled[0] - p1_scaled[0];

    return (b / a) * customScale;
};

export type FaceOptions = {
    useVideoTexture? : boolean;
    normalizeCoords? : boolean;
    customScale: number
}

class FaceGeometry extends BufferGeometry {

    useVideoTexture : boolean;
    normalizeCoords : boolean;
    flipped : boolean;
    positions : Float32Array;
    uvs : Float32Array;
    p0 : Vector3;
    p1 : Vector3
    p2 : Vector3
    face : AnnotatedPrediction;
    triangle : Triangle;
    w : number;
    h : number;
    customScale : number;
    
    constructor(options : FaceOptions = {
        useVideoTexture: false,
        normalizeCoords : false,
        customScale: 1
    }) {

        super();

        this.useVideoTexture = options.useVideoTexture;
        this.normalizeCoords = options.normalizeCoords;
        this.customScale = options.customScale
        this.flipped = false;
        this.positions = new Float32Array(468 * 3);
        this.uvs = new Float32Array(468 * 2);
        this.setAttribute("position", new BufferAttribute(this.positions, 3));
        this.setAttribute("uv", new BufferAttribute(this.uvs, 2));
        this.setUvs();
        this.setIndex(indices);
        this.computeVertexNormals();
        this.applyMatrix4(new Matrix4()
            .makeScale(
                this.customScale,
                this.customScale,
                this.customScale
            )
        );
        this.p0 = new Vector3();
        this.p1 = new Vector3();
        this.p2 = new Vector3();
        this.face = null;
        this.triangle = new Triangle();
    }

    setUvs() {

        for (let j = 0; j < 468; j++) {

            this.uvs[j * 2] = this.flipped ? 1 - texCoords[j][0] : texCoords[j][0];
            this.uvs[j * 2 + 1] = 1 - texCoords[j][1];
        }

        this.getAttribute("uv").needsUpdate = true;
    }

    setVideoUvs() {

        let ptr = 0;

        for (let j = 0; j < 468 * 2; j += 2) {

            this.uvs[j] = this.flipped
                ? this.positions[ptr] / this.w + 0.5
                : 1 - (this.positions[ptr] / this.w + 0.5);
            this.uvs[j + 1] = this.positions[ptr + 1] / this.h + 0.5;
            ptr += 3;
        }

        this.getAttribute("uv").needsUpdate = true;
    }

    setSize(w : number, h : number) {

        this.w = w;
        this.h = h;
    }

    update(
        face : AnnotatedPrediction,
        cameraFlipped : boolean
    ) {

        let ptr = 0;
        this.face = face;

        for (const p of (face.scaledMesh as Coords3D)) {

            this.positions[ptr] = cameraFlipped
                ? p[0] + 0.5 * this.w
                : p[0] - 0.5 * this.w;
            this.positions[ptr + 1] = this.h - p[1] - 0.5 * this.h;
            this.positions[ptr + 2] = -p[2];
            ptr += 3;
        }

        if (this.useVideoTexture) {

            this.setVideoUvs();

            if (this.normalizeCoords) {

                let ptr = 0;
                const ar = this.h / this.w;
                const scale = 2 * Math.sqrt(this.w / 1000);

                for (const p of (face.scaledMesh as Coords3D)) {

                    this.positions[ptr] = scale * (p[0] / this.w + 0.5);
                    this.positions[ptr + 1] = scale * (-p[1] / this.h + 0.5) * ar;
                    this.positions[ptr + 2] = scale * (-p[2] / 500);
                    ptr += 3;
                }
            }

        } else {

            if (cameraFlipped !== this.flipped) {

                this.flipped = cameraFlipped;
                this.setUvs();
            }
        }

        this.applyMatrix4(new Matrix4()
            .makeScale(
                this.customScale,
                this.customScale,
                this.customScale
            )
        );

        this.attributes.position.needsUpdate = true;

        this.computeVertexNormals();
    }

    track(id0 : number, id1 : number, id2 : number) {

        const points = this.positions;
        this.p0.set(points[id0 * 3], points[id0 * 3 + 1], points[id0 * 3 + 2]);
        this.p1.set(points[id1 * 3], points[id1 * 3 + 1], points[id1 * 3 + 2]);
        this.p2.set(points[id2 * 3], points[id2 * 3 + 1], points[id2 * 3 + 2]);

        this.triangle.set(this.p0, this.p1, this.p2);

        const center = new Vector3();
        this.triangle.getMidpoint(center);

        const normal = new Vector3();
        this.triangle.getNormal(normal);

        const matrix = new Matrix4();

        const x = this.p1.clone().sub(this.p2).normalize();
        const y = this.p1.clone().sub(this.p0).normalize();
        const z = new Vector3().crossVectors(x, y);
        const y2 = new Vector3().crossVectors(x, z).normalize();
        const z2 = new Vector3().crossVectors(x, y2).normalize();

        matrix.makeBasis(x, y2, z2);

        return {
            position: center,
            normal,
            rotation: matrix,
            scale: getScale(
                this.face,
                id1,
                id2,
                this.customScale
            )
        };
    }
}

export default FaceGeometry;
