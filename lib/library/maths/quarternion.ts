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


/// <reference path="../../typings/gl-matrix.d.ts" />

"use strict";

/**
 * Quaternion class
 * @class Quaternion
 */
class Quaternion {
    protected _value: Float32Array;
    /**
     * Creates a new quaternion
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     * @param {number = 0.0} w
     */
    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0, w: number = 0.0) {
        this._value = quat.fromValues(x, y, z, w);
    }
    /**
     * Sets a quaternion to represent the shortest rotation from one
     *      vector to another.
     * @param {Float32Array} init: Initial vector
     * @param {Float32Array} dest: Destination vector
     */
    public rotationTo(init: Float32Array, dest: Float32Array) {
        quat.rotationTo(this._value, init, dest);
    }
    /**
     * Set quaternion value to identity
     */
    public setIdentity() {
        quat.identity(this._value);
    }
    /**
     * Create a copy of this quaternion
     * @return {Quaternion}
     */
    public clone(): Quaternion {
        return new Quaternion(
            this._value[0],
            this._value[1],
            this._value[2],
            this._value[3]
        );
    }
    /**
     * Calculate dot product with another quaternion
     * @param {Quaternion}
     */
    public dot(q: Quaternion) {
        quat.dot(this._value, q._value);
    }
    /**
     * Calculate multiplication with another quaternion
     * @param {Quaternion}
     */
    public mult(q: Quaternion) {
        quat.multiply(this._value, this._value, q._value);
    }
    /**
     * Normalize quaternion
     */
    public normalize() {
        quat.normalize(this._value, this._value);
    }
    /**
     * Invert quaternion
     */
    public invert() {
        quat.invert(this._value, this._value);
    }
    /**
     * Rotates quaternion by the given angle (in radians) about the X axis
     * @param {number} angle: Angle (in radians) to rotate
     */
    public rotateX(angle: number) {
        quat.rotateX(this._value, this._value, angle);
    }
    /**
     * Rotates quaternion by the given angle (in radians) about the Y axis
     * @param {number} angle: Angle (in radians) to rotate
     */
    public rotateY(angle: number) {
        quat.rotateY(this._value, this._value, angle);
    }
    /**
     * Rotates quaternion by the given angle (in radians) about the Z axis
     * @param {number} angle: Angle (in radians) to rotate
     */
    public rotateZ(angle: number) {
        quat.rotateZ(this._value, this._value, angle);
    }

    public toString = () : string => {
        return quat.str(this._value);
    }

    /**
     * Performs a linear interpolation between this and another Quaternion
     * @param {Quaternion}
     * @param {number} t: Intepolation amount between quaternions
     */
    public lerp(q: Quaternion, t: number) {
        // TODO
    }
};

export default Quaternion;