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


/// <reference path="../core/context.ts" />
/// <reference path="../extras/extensions.ts" />

import Context from "../core/context";
import extensions from "../extras/extensions";

"use strict";

let gl: any;

declare var WebGL2RenderingContext: any;

if (gl instanceof WebGL2RenderingContext) {
    gl = Context.getContext();
} else {
    gl = extensions.get("WEBGL_draw_buffers");
}

enum DrawBuffer {
    MaxDrawBuffers = (<any>gl).MAX_DRAW_BUFFERS || gl.MAX_DRAW_BUFFERS_WEBGL,
    DrawBuffer0  = (<any>gl).DRAW_BUFFER0  ||  gl.DRAW_BUFFER0_WEBGL,
    DrawBuffer1  = (<any>gl).DRAW_BUFFER1  ||  gl.DRAW_BUFFER1_WEBGL,
    DrawBuffer2  = (<any>gl).DRAW_BUFFER2  ||  gl.DRAW_BUFFER2_WEBGL,
    DrawBuffer3  = (<any>gl).DRAW_BUFFER3  ||  gl.DRAW_BUFFER3_WEBGL,
    DrawBuffer4  = (<any>gl).DRAW_BUFFER4  ||  gl.DRAW_BUFFER4_WEBGL,
    DrawBuffer5  = (<any>gl).DRAW_BUFFER5  ||  gl.DRAW_BUFFER5_WEBGL,
    DrawBuffer6  = (<any>gl).DRAW_BUFFER6  ||  gl.DRAW_BUFFER6_WEBGL,
    DrawBuffer7  = (<any>gl).DRAW_BUFFER7  ||  gl.DRAW_BUFFER7_WEBGL,
    DrawBuffer8  = (<any>gl).DRAW_BUFFER8  ||  gl.DRAW_BUFFER8_WEBGL,
    DrawBuffer9  = (<any>gl).DRAW_BUFFER9  ||  gl.DRAW_BUFFER9_WEBGL,
    DrawBuffer10 = (<any>gl).DRAW_BUFFER10 ||  gl.DRAW_BUFFER9_WEBGL10,
    DrawBuffer11 = (<any>gl).DRAW_BUFFER11 ||  gl.DRAW_BUFFER9_WEBGL11,
    DrawBuffer12 = (<any>gl).DRAW_BUFFER12 ||  gl.DRAW_BUFFER9_WEBGL12,
    DrawBuffer13 = (<any>gl).DRAW_BUFFER13 ||  gl.DRAW_BUFFER9_WEBGL13,
    DrawBuffer14 = (<any>gl).DRAW_BUFFER14 ||  gl.DRAW_BUFFER9_WEBGL14,
    DrawBuffer15 = (<any>gl).DRAW_BUFFER15 ||  gl.DRAW_BUFFER9_WEBGL15,

    MaxColorAttch = (<any>gl).MAX_COLOR_ATTACHMENTS || gl.MAX_COLOR_ATTACHMENTS_WEBGL,
    ColorAttach1  = (<any>gl).COLOR_ATTACHMENT1   ||  gl.DRAW_BUFFER1_WEBGL,
    ColorAttach2  = (<any>gl).COLOR_ATTACHMENT2   ||  gl.DRAW_BUFFER2_WEBGL,
    ColorAttach3  = (<any>gl).COLOR_ATTACHMENT3   ||  gl.DRAW_BUFFER3_WEBGL,
    ColorAttach4  = (<any>gl).COLOR_ATTACHMENT4   ||  gl.DRAW_BUFFER4_WEBGL,
    ColorAttach5  = (<any>gl).COLOR_ATTACHMENT5   ||  gl.DRAW_BUFFER5_WEBGL,
    ColorAttach6  = (<any>gl).COLOR_ATTACHMENT6   ||  gl.DRAW_BUFFER6_WEBGL,
    ColorAttach7  = (<any>gl).COLOR_ATTACHMENT7   ||  gl.DRAW_BUFFER7_WEBGL,
    ColorAttach8  = (<any>gl).COLOR_ATTACHMENT8   ||  gl.DRAW_BUFFER8_WEBGL,
    ColorAttach9  = (<any>gl).COLOR_ATTACHMENT9   ||  gl.DRAW_BUFFER9_WEBGL,
    ColorAttach10 = (<any>gl).COLOR_ATTACHMENT10  ||  gl.DRAW_BUFFER10_WEBGL,
    ColorAttach11 = (<any>gl).COLOR_ATTACHMENT11  ||  gl.DRAW_BUFFER11_WEBGL,
    ColorAttach12 = (<any>gl).COLOR_ATTACHMENT12  ||  gl.DRAW_BUFFER12_WEBGL,
    ColorAttach13 = (<any>gl).COLOR_ATTACHMENT13  ||  gl.DRAW_BUFFER13_WEBGL,
    ColorAttach14 = (<any>gl).COLOR_ATTACHMENT14  ||  gl.DRAW_BUFFER14_WEBGL,
    ColorAttach15 = (<any>gl).COLOR_ATTACHMENT15  ||  gl.DRAW_BUFFER15_WEBGL
};

export default DrawBuffer;

/**
 * extension( WEBGL_draw_buffers )
 * - COLOR_ATTACHMENT0_WEBGL
 * - DRAW_BUFFER0_WEBGL
 */