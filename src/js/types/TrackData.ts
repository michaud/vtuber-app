import { Matrix4, Vector3 } from "three";

export type TrackData = {
    position: Vector3;
    normal: Vector3;
    rotation: Matrix4;
    scale: number
}
