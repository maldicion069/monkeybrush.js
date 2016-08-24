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


/// <reference path="light.ts" />

import Light from "./light";
import Vector3 from "../maths/vector3";

"use strict";

// TODO: Replace Vector3 to Vect3


/**
 * Point light class
 * @class PointLight
 */
class PointLight extends Light {
    /**
     * [Light position]
     * @type {Vector3<number>}
     */
    public/*protected*/ _position: Vector3<number>;
    /**
     * @param {Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)} position
     */
    constructor(position: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)) {
        super();
        this._position = position;
    }
    /**
     * Get light position
     * @return {Vector3<number>}
     */
    // TODO: get position(): Vector3<number> { return this._position; }
    /**
     * Set light position
     * @param {Vector3<number>} position
     */
    // TODO: set position(position: Vector3<number>) { this._position = position; }

    /**
     * Increment position from current position
     * @param {number = 0.0} x
     * @param {number = 0.0} y
     * @param {number = 0.0} z
     */
    public addTransform(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
        this._position.x += x;
        this._position.y += y;
        this._position.z += z;
    }
};

export default PointLight;