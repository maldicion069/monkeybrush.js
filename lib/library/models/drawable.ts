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


/// <reference path="../core/core.ts" />
/// <reference path="../core/vertexArray.ts" />
/// <reference path="../core/vertexBuffer.ts" />
/// <reference path="../constants/_constants.ts" />
/// <reference path="../extras/extensions.ts" />

import Core from "../core/core.ts";
import VertexArray from "../core/vertexArray.ts";
import VertexBuffer from "../core/vertexBuffer.ts";
import UsageType from "../constants/UsageType.ts";
import BufferType from "../constants/BufferType.ts";
import extensions from "../extras/extensions";

"use strict";

const gl = Core.getInstance().getGL();

declare var WebGL2RenderingContext: any;

/**
 * Drawable abstract class
 * @class Drawable
 */
abstract class Drawable {
    protected _indicesLen: number;
    protected _handle: Array<VertexBuffer>;
    protected _vao: VertexArray;
    /**
     * Drawable constructor
     */
    constructor() {
        this._vao = new VertexArray();
    };

    /**
     * Add Element buffer object.
     * @param {Uint16Array} data [description]
     * @param {UsageType = UsageType.StaticDraw} type [description]
     */
    protected addElementArray(data: Uint16Array, type: UsageType = UsageType.StaticDraw) {
        let vb: VertexBuffer = new VertexBuffer(BufferType.ElementArray);
        vb.bufferData(new Uint16Array(data), type);
        this._handle.push(vb);
        return vb;
    };

    /**
     * Add Vertex buffer object.
     * @param  {number} attribLocation [description]
     * @param  {Float32Array} data [description]
     * @param  {number} numElems [description]
     * @param  {UsageType = UsageType.StaticDraw} type [description]
     * @return {VertexBuffer} [description]
     */
    protected addBufferArray(attribLocation: number,
        data: Float32Array, numElems: number, type: UsageType = UsageType.StaticDraw): VertexBuffer {
        let vb: VertexBuffer = new VertexBuffer(BufferType.Array);
        vb.bufferData(data, type);
        vb.vertexAttribPointer(attribLocation, numElems, gl.FLOAT);
        this._handle.push(vb);
        return vb;
    };

    /**
     * Normal render
     */
    public render() {
        this._vao.bind();
        gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
        this._vao.unbind();
    };

    /**
     * Render with element instance mode
     * @param {number} numInstances: Instances to render
     */
    public renderElementInstance(numInstances: number) {
        this._vao.bind();
        if (gl instanceof WebGL2RenderingContext) {
            (<any>gl).drawElementsInstanced(
                gl.TRIANGLES,
                this._indicesLen,
                gl.UNSIGNED_SHORT,
                0,
                numInstances
            );
        } else {
            const ext = extensions.get("ANGLE_instanced_arrays");
            if (ext) {
                ext.drawElementsInstancedANGLE(
                    gl.TRIANGLES,
                    this._indicesLen,
                    gl.UNSIGNED_SHORT,
                    0,
                    numInstances
                );
            }
        }
        this._vao.unbind();
    };

    /**
     * Render with array instance mode
     * @param {number} numInstances: Instances to render
     */
    public renderArrayInstance(numInstances: number) {
        this._vao.bind();
        if (gl instanceof WebGL2RenderingContext) {
            (<any>gl).drawArraysInstanced(
                gl.TRIANGLES,
                0,
                this._indicesLen,
                numInstances
            );
        } else {
            const ext = extensions.get("ANGLE_instanced_arrays");
            if (ext) {
                ext.drawArraysInstancedANGLE(
                    gl.TRIANGLES,
                    0,
                    this._indicesLen,
                    numInstances
                );
            }
        }
        this._vao.unbind();
    };

}

export default Drawable;