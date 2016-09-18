/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"use strict";

namespace MB {
    export namespace core {

        declare var WebGL2RenderingContext: any;

        // TODO: Blit FBO (https://www.opengl.org/wiki/Framebuffer#Blitting)
        /**
         * Framebuffer class
         * @class Framebuffer
         *
         * A framebuffer is a collection of buffers that can be
         * used as the destination for rendering.
         */
        export class Framebuffer {
            protected _size: MB.maths.Vect2;
            protected _handle: WebGLFramebuffer;
            protected _attachments: Array<MB.textures.Texture>;
            public _renderBuffer: MB.textures.RenderBufferTexture;
            public _depth: MB.textures.SimpleTexture2D;

            protected _valid: boolean = false;

            // TODO: Stencil unused
            constructor(textures: Array<MB.textures.Texture>, size: MB.maths.Vect2, depth: boolean = false,
                stencil: boolean = false, options = {}) {
                let numColors = textures.length;
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                if (numColors < 0) {
                    throw new Error("must specify >= 0 color attachments");
                } else if (numColors > 1) {
                    if (numColors > gl.getParameter(MB.ctes.DrawBuffer.MaxColorAttch)) {
                        throw new Error(`GL context doesn´t support ${numColors} color attachments`);
                    }
                }

                options = options || {};

                this._attachments = textures;
                this._size = size;

                this._handle = gl.createFramebuffer();
                gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);

                // Each textures to fbo
                this._attachments.forEach((texture: MB.textures.Texture, i: number) => {
                    texture.bind();

                    // Only supported simple textures
                    let target = texture.target;

                    gl.framebufferTexture2D(gl.FRAMEBUFFER,
                        MB.ctes.DrawBuffer.ColorAttach0 + i,
                        target,
                        texture.handler, 0);

                    texture.unbind();    // TODO: Unbind debería ser un abstract de texture
                });

                // TODO: Check no texture attachments (default render buffer storage)

                if (depth) {
                    this._renderBuffer = new MB.textures.RenderBufferTexture(
                        size,
                        gl.DEPTH_COMPONENT16,
                        gl.DEPTH_ATTACHMENT
                   );
                }

                /**
                // TODO
                if (depth && stencil) {
                    this._depth = new MB.textures.SimpleTexture2D(size, {
                        type: gl.UNSIGNED_INT_24_8,
                        format: gl.DEPTH_STENCIL
                    });
                    let target = this._depth.target;

                    gl.framebufferTexture2D(gl.FRAMEBUFFER,
                        gl.DEPTH_STENCIL_ATTACHMENT,
                        target,
                        this._depth.handle(), 0);
                } else if (depth && !stencil) {
                    this._depth = new MB.textures.SimpleTexture2D(size, {
                        type: gl.UNSIGNED_SHORT,
                        format: gl.DEPTH_COMPONENT
                    });
                    let target = this._depth.target;

                    gl.framebufferTexture2D(gl.FRAMEBUFFER,
                        gl.DEPTH_ATTACHMENT,
                        target,
                        this._depth.handle(), 0);
                } else {
                    this._renderBuffer = new MB.textures.RenderBufferTexture(
                        size,
                        gl.STENCIL_INDEX,
                        gl.STENCIL_ATTACHMENT
                   );
                }
                /**/

                if (numColors > 1) {
                    let drawBuffs = [];
                    for (let i = 0; i < numColors; ++i) {
                        drawBuffs.push(gl.COLOR_ATTACHMENT0 + i);
                    }
                    gl.drawBuffers(drawBuffs);
                }

                // Check status
                let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
                if (status !== gl.FRAMEBUFFER_COMPLETE) {
                    this.destroy();
                    this.checkStatus(status);
                }
                this._valid = true;
                this.unbind();
            };
            /**
             * Enable default framebuffer
             */
            public static RestoreDefaultFBO() {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            };
            /**
             * Replace a texture on the other in an existing framebuffer attachment
             * @param {MB.textures.Texture} tex    New texture
             * @param {number}  attach Attachment index [0, 15]
             */
            public replaceTexture(tex: MB.textures.Texture, attach: number) {
                if (attach > this._attachments.length) {
                    throw new Error("Attachment undefined");
                }
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                // gl.bindTexture(gl.TEXTURE_2D, texture2);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                    gl.TEXTURE_2D, tex.handler, 0);
            };
            /**
             * Check if framebuffer is valid
             * @return {boolean} True if correct framebuffer
             */
            public isValid(): boolean {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                this.bind();
                this._valid = (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE);
                this.unbind();
                return this._valid;
            };
            /**
             * Return framebuffer status
             * @param {number} status
             */
            private checkStatus(status: number) {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                switch (status) {
                    case gl.FRAMEBUFFER_UNSUPPORTED:
                        throw new Error("Framebuffer: Framebuffer unsupported");
                    case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                        throw new Error("Framebuffer: Framebuffer incomplete attachment");
                    case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                        throw new Error("Framebuffer: Framebuffer incomplete dimensions");
                    case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                        throw new Error("Framebuffer: Framebuffer incomplete missing attachment");
                    default:
                        throw new Error("Framebuffer: Framebuffer failed for unspecified reason");
                }
            };
            /**
             * Bind (active) this framebuffer
             */
            public bind() {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);
            };
            /**
             * Bind (active) all textures asociated to this framebuffer
             */
            public onlyBindTextures() {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                this._attachments.forEach((tex: MB.textures.Texture, idx: number) => {
                    tex.bind(idx);
                });
            };
            /**
             * Unbind (disable) this framebuffer.
             * Enable default framebuffer
             */
            public unbind() {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            };
            /**
             * Rebuild framebuffer base in a new size
             * @param {MB.maths.Vect2} size New framebuffer size
             */
            public rebuild(size: MB.maths.Vect2) {
                if (!size.exactEquals(this._size)) {
                    // TODO
                    this._attachments.forEach((tex: MB.textures.Texture) => {
                        tex.resize(size);
                    });
                    if (this._depth) {
                        // TODO
                    }
                    if (this._renderBuffer) {
                        this._renderBuffer.resize(size);
                    }
                }
            };
            /**
             * Destroy framebuffer and asociated textures.
             */
            public destroy() {
                const gl: WebGL2RenderingContext = Core.getInstance().getGL();
                let oldBinding = gl.getParameter(gl.FRAMEBUFFER_BINDING);

                if (oldBinding === this._handle) {
                    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                }

                this._attachments.forEach((texture: MB.textures.Texture) => {
                    texture.destroy();
                });

                gl.deleteFramebuffer(this._handle);

                // Destroy depth/stencil
                if (this._renderBuffer) {
                    this._renderBuffer.destroy();
                    this._renderBuffer = null;
                }

                // Destroy depth
                if (this._depth) {
                    this._depth.destroy();
                    this._depth = null;
                }
            };
        };
    };
};