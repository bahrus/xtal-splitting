import { XtallatX } from 'xtal-latx/xtal-latx.js';
import { define } from 'xtal-latx/define.js';
const search = 'search';
const text_content = 'text-content';
const re = /(<([^>]+)>)/ig;
/**
 * `xtal-split`
 *  Split property textContent with search property
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class XtalSplit extends XtallatX(HTMLElement) {
    static get is() { return 'xtal-split'; }
    static get observedAttributes() {
        return super.observedAttributes.concat([search, text_content]);
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case search:
                this._s = newVal;
                break;
            case text_content:
                this._t = newVal ? this.strip(newVal) : '';
                break;
        }
        this.onPropsChange();
    }
    get search() {
        return this._s;
    }
    set search(val) {
        this.attr(search, val);
    }
    get textContent() {
        return this._t;
    }
    set textContent(val) {
        //this._textContent = this.strip(val);
        this.attr(text_content, val);
    }
    strip(html) {
        return html.replace(re, '');
    }
    connectedCallback() {
        this._connected = true;
        this._upgradeProperties(['search', 'textContent']);
        this.onPropsChange();
    }
    onPropsChange() {
        if (!this._connected)
            return;
        if (!this._t)
            this.textContent = this.strip(this.innerText);
        if (!this._s) {
            this.innerText = this._t;
        }
        else {
            const split = this._t.split(new RegExp(this._s, 'i'));
            const tcL = this._t.length; //token content length;
            const tc = split.length;
            const len = this._s.length;
            let iP = 0;
            let text = '';
            //console.log(split); 
            split.forEach((t, i) => {
                iP += t.length;
                text += t;
                if (i < tc && iP < tcL)
                    text += "<span class='match'>" + this._t.substr(iP, len) + "</span>";
                iP += len;
            });
            this.innerHTML = text;
        }
    }
}
define(XtalSplit);
//# sourceMappingURL=xtal-split.js.map