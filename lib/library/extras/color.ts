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


// TODO: Change _color to Vector3

"use strict";

class Color {
    /**
     * [Array description]
     * @param {[type]} 3 [description]
     */
    protected _color = new Array(3);
    /**
     * [constructor description]
     * @param {number} r [description]
     * @param {number} g [description]
     * @param {number} b [description]
     */
    constructor(r: number, g: number, b: number) {
        this.setRGB(r, g, b);
    }
    /**
     * @return {number}
     */
    // TODO: get r(): number { return this._color[0]; }
    /**
     * @return {number}
     */
    // TODO: get g(): number { return this._color[1]; }
    /**
     * @return {number}
     */
    // TODO: get b(): number { return this._color[2]; }
    /**
     * @param {number}
     */
    // TODO: set r(r: number) { this._color[0] = r; }
    /**
     * @param {number}
     */
    // TODO: set g(g: number) { this._color[1] = g; }
    /**
     * @param {number}
     */
    // TODO: set b(b: number) { this._color[2] = b; }
    /**
     * [setRGB description]
     * @param  {number} r [description]
     * @param  {number} g [description]
     * @param  {number} b [description]
     * @return {Color}    [description]
     */
    public setRGB(r: number, g: number, b: number): Color {
        // this.r = r;
        // this.g = g;
        // this.b = b;
        this._color[0] = r;
        this._color[1] = g;
        this._color[2] = b;

        return this;
    }
    /**
     * [toHSL description]
     * @return {Color} [description]
     */
    public toHSL(): Color {
        const max = Math.max(this._color[0], this._color[1], this._color[2]),
            min = Math.min(this._color[0], this._color[1], this._color[2]);

        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;  // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case this._color[0]: h = (this._color[1] - this._color[2]) / d +
                    (this._color[1] < this._color[2] ? 6 : 0); break;
                case this._color[1]: h = (this._color[2] - this._color[0]) / d + 2; break;
                case this._color[2]: h = (this._color[0] - this._color[1]) / d + 4; break;
            }
            h /= 6;
        }
        return new Color(h, s, l);
    }
};

export default Color;