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
    export class RenderBufferTexture extends RenderBuffer {
        constructor(size: MB.Vect2, format: number, attachment: number) {
            const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
            super(size, format, attachment);

            gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
            gl.renderbufferStorage(gl.RENDERBUFFER, this._format, this._size.x, this._size.y);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, this._attachment,
                gl.RENDERBUFFER, this._handle);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        };
        /**
         * Resize renderbuffer size
         * @param {MB.Vect2} size New size
         */
        public resize(size: MB.Vect2) {
            if (!size.exactEquals(this._size)) {
                const gl: WebGL2RenderingContext = MB.Core.getInstance().getGL();
                this.bind();
                gl.renderbufferStorage(gl.RENDERBUFFER, this._format, size.x, size.y);
                this.unbind();
            }
        }
    };
};
