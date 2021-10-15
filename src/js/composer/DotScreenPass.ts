import {
	ShaderMaterial,
	UniformsUtils,
	Vector2,
	WebGLRenderer
} from 'three';
import {
	Pass,
	FullScreenQuad
} from 'three/examples/jsm/postprocessing/Pass';
import { DotScreenShader, Uniforms } from './DotScreenShader';

class DotScreenPass extends Pass {

	uniforms:Uniforms;

	material: ShaderMaterial;
	fsQuad:FullScreenQuad;
	renderToScreen:boolean;
	clear:boolean;

	constructor(
		public center:Vector2,
		public angle:number,
		public scale:number
	) {

		super();

		if ( DotScreenShader === undefined ) console.error( 'THREE.DotScreenPass relies on DotScreenShader' );

		var shader = DotScreenShader;

		this.uniforms = UniformsUtils.clone( shader.uniforms );

		if ( this.center !== undefined ) (this.uniforms[ 'center' ].value as Vector2).copy( this.center );
		if ( this.angle !== undefined ) this.uniforms[ 'angle' ].value = this.angle;
		if ( this.scale !== undefined ) this.uniforms[ 'scale' ].value = this.scale;

		this.material = new ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		} );

		this.fsQuad = new FullScreenQuad( this.material );

	}

	render(renderer : WebGLRenderer, writeBuffer:any, readBuffer:any /*, deltaTime, maskActive */ ) {

        (this.uniforms[ 'center' ].value as Vector2).copy( this.center );
        this.uniforms[ 'angle' ].value = this.angle;
        this.uniforms[ 'scale' ].value = this.scale;

		this.uniforms[ 'tDiffuse' ].value = readBuffer.texture;
		(this.uniforms[ 'tSize' ].value as Vector2).set( readBuffer.width, readBuffer.height );

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear();
			this.fsQuad.render( renderer );

		}
	}
}

export { DotScreenPass };
