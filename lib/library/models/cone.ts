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


/// <reference path="drawable.ts" />

import Drawable from "./drawable";

"use strict";

/**
 * Cone class
 * @class Cone
 */
class Cone extends Drawable {
    /**
     * Cone constructor
     * @param {number} bottomRadius: Cone bottom radius
     * @param {number} topRadius: Cone top radius
     * @param {number} height: Cone height
     * @param {number = 3.0} radialSubDiv: Radial subdivisions around cone
     * @param {number = 1.0} heightSubDiv Height subdivisions
     * @param {boolean = true} createTopBase: Create top base
     * @param {boolean = true} createBottomBase: Create bottom base
     */
    constructor(bottomRadius: number, topRadius: number,
        height: number, radialSubDiv: number = 3.0, heightSubDiv: number = 1.0,
        createTopBase: boolean = true, createBottomBase: boolean = true) {
        super();

        if (radialSubDiv < 3) {
            throw Error("radialSubDiv must be 3 or greater");
        }

        if (heightSubDiv < 1) {
            throw Error("heightSubDiv must be 1 or greater");
        }

        const extra = (createTopBase ? 2 : 0) + (createBottomBase ? 2 : 0);

        const nv = (radialSubDiv + 1) * (heightSubDiv + 1 + extra);

        let verts = new Array(3 * nv);
        let norms = new Array(3 * nv);
        let tex = new Array(2 * nv);
        let el = new Array(3 * radialSubDiv * (heightSubDiv + extra) * 2);

        const vertsAroundEdge = radialSubDiv + 1;

        // Slant: Distance from the top of a cone, down the side to a point on the edge of the base.
        const slantH = Math.atan2(bottomRadius - topRadius, height);
        const cSlantH = Math.cos(slantH);
        const sSlantH = Math.sin(slantH);

        const start = createTopBase ? -2 : 0;
        const end = heightSubDiv + (createBottomBase ? 2 : 0);

        let vv = 0;
        let nn = 0;
        let tt = 0;

        for (let yy = start; yy <= end; ++yy) {
            let v = yy / heightSubDiv;
            let y = height * v;
            let ringRadius;
            if (yy < 0) {
                y = 0;
                v = 1;
                ringRadius = bottomRadius;
            } else if (yy > heightSubDiv) {
                y = height;
                v = 1;
                ringRadius = topRadius;
            } else {
                ringRadius = bottomRadius +
                    (topRadius - bottomRadius) * (yy / heightSubDiv);
            }
            if (yy === -2 || yy === heightSubDiv + 2) {
                ringRadius = 0;
                v = 0;
            }
            y -= height / 2;

            for (let ii = 0; ii < vertsAroundEdge; ++ii) {
                let sin = Math.sin(ii * Math.PI * 2 / radialSubDiv);
                let cos = Math.cos(ii * Math.PI * 2 / radialSubDiv);

                verts[vv++] = sin * ringRadius;
                verts[vv++] = y;
                verts[vv++] = cos * ringRadius;

                norms[nn++] = (yy < 0 || yy > heightSubDiv) ? 0 : (sin * cSlantH);
                norms[nn++] = (yy < 0) ? -1 : (yy > heightSubDiv ? 1 : sSlantH);
                norms[nn++] = (yy < 0 || yy > heightSubDiv) ? 0 : (cos * cSlantH);

                tex[tt++] = (ii / radialSubDiv);
                tex[tt++] = 1.0 - v;
            }
        }

        for (let yy = 0; yy < heightSubDiv + extra; ++yy) {
            for (let ii = 0; ii < radialSubDiv; ++ii) {
                el.push(vertsAroundEdge * (yy + 0) + 0 + ii,
                                         vertsAroundEdge * (yy + 0) + 1 + ii,
                                         vertsAroundEdge * (yy + 1) + 1 + ii);
                el.push(vertsAroundEdge * (yy + 0) + 0 + ii,
                                         vertsAroundEdge * (yy + 1) + 1 + ii,
                                         vertsAroundEdge * (yy + 1) + 0 + ii);
            }
        }

        this._handle = [];
        this._vao.bind();

        this.addElementArray(new Uint16Array(el));

        this.addBufferArray(0, new Float32Array(verts), 3);
        this.addBufferArray(1, new Float32Array(norms), 3);
        this.addBufferArray(2, new Float32Array(tex), 2);

        this._indicesLen = el.length;
    }
};

export default Cone;