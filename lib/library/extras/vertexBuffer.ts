/// <reference path="../core/core.ts" />
/// <reference path="../constants/_constants.ts" />

import Core from "../core/core";
import BufferType from "../constants/BufferType";
import UsageType from "../constants/UsageType";

"use strict";

// TODO: Move to core

const gl = Core.getInstance().getGL();

class VertexBuffer {
    /**
     * [_buffer description]
     * @type {WebGLBuffer}
     */
    protected _buffer: WebGLBuffer;
    /**
     * [_type description]
     * @type {BufferType}
     */
    protected _type: BufferType = BufferType.Array;
    /**
     * Vertex buffer constructor
     * @param {BufferType = BufferType.Array}
     */
    constructor(type: BufferType = BufferType.Array) {
        this._buffer = gl.createBuffer();
        this._type = type;
        this.bind();
    }
    /**
     * [bind description]
     * @param {BufferType} type [description]
     */
    public bind(type?: BufferType) {
        if (type !== undefined) {
            this._type = type;
        }
        gl.bindBuffer(this._type, this._buffer);
    }
    /**
     * [unbind description]
     */
    public unbind() {
        gl.bindBuffer(this._type, null);
    }
    /**
     * [getBufferType description]
     * @return {BufferType} [description]
     */
    public getBufferType(): BufferType {
        return this._type;
    }
    /**
     * [getBuffer description]
     * @return {WebGLBuffer} [description]
     */
    public getBuffer(): WebGLBuffer {
        return this._buffer;
    }
    /**
     * [destroy description]
     */
    public destroy() {
        gl.bindBuffer(this._type, 0);
        if (!this._buffer) {
            gl.deleteBuffer(this._buffer);
        }
        this._buffer = null;
    }
    /**
     * [bufferData description]
     * @param {Float32Array | Uint16Array}          data  [description]
     * @param {UsageType    = UsageType.StaticDraw} usage [description]
     */
    public bufferData(data: Float32Array | Uint16Array, usage: UsageType = UsageType.StaticDraw) {
        this.bind();
        gl.bufferData(this._type, data, usage);
    }
    /**
     * [attribDivisor description]
     * @param {number}    position [description]
     * @param {number}    length   [description]
     * @param {number}    divisor  [description]
     * @param {number =        0}           stride [description]
     */
    public attribDivisor(position: number, length: number, divisor: number, stride: number = 0) {
        this.bind();
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position,
            length,
            gl.FLOAT,
            false,
            length * Float32Array.BYTES_PER_ELEMENT,
            0);
        (<any>gl).vertexAttribDivisor(position, divisor);
    }
    /**
     * [vertexAttribPointer description]
     * @param {number}     attribLocation [description]
     * @param {number}     numElems       [description]
     * @param {number}     type           [description]
     * @param {boolean =              false}       normalized [description]
     * @param {number  =              0}           offset     [description]
     */
    public vertexAttribPointer(attribLocation: number, numElems: number, type: number,
        normalized: boolean = false, offset: number = 0) {
        this.bind();
        gl.enableVertexAttribArray(attribLocation);
        gl.vertexAttribPointer(
            attribLocation, // Attribute location
            numElems, // Number of elements per attribute
            type, // Type of elements
            normalized,
            numElems * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            offset // Offset from the beginning of a single vertex to this attribute
        );
    }
}

export default VertexBuffer;
