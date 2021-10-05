import { FaceMeshFaceGeometry } from "../face/face";

export type UpdateAction = (geom:FaceMeshFaceGeometry, moment:number) => void;

export type ActionList = { [index:string]: UpdateAction }

export type ActionResources = {
    updateActions:UpdateAction[],
    actions:ActionList
}
