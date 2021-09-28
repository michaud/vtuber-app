import {
	ShaderMaterial,
	UniformsUtils
} from 'three';
import { Pass, FullScreenQuad } from 'three/examples/postprocessing/Pass.js';
import { DotScreenShader } from './DotScreenShader.js';

class DotScreenPass extends Pass {

	constructor( center, angle, scale ) {

		super();

        this.center = center;
        this.angle = angle;
        this.scale = scale;

		if ( DotScreenShader === undefined ) console.error( 'THREE.DotScreenPass relies on DotScreenShader' );

		var shader = DotScreenShader;

		this.uniforms = UniformsUtils.clone( shader.uniforms );

		if ( this.center !== undefined ) this.uniforms[ 'center' ].value.copy( this.center );
		if ( this.angle !== undefined ) this.uniforms[ 'angle' ].value = this.angle;
		if ( this.scale !== undefined ) this.uniforms[ 'scale' ].value = this.scale;

		this.material = new ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		} );

		this.fsQuad = new FullScreenQuad( this.material );

	}

	render( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

        this.uniforms[ 'center' ].value.copy( this.center );
        this.uniforms[ 'angle' ].value = this.angle;
        this.uniforms[ 'scale' ].value = this.scale;

		this.uniforms[ 'tDiffuse' ].value = readBuffer.texture;
		this.uniforms[ 'tSize' ].value.set( readBuffer.width, readBuffer.height );

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
