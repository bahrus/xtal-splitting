import {XtallatX} from 'xtal-latx/xtal-latx.js';
import {define} from 'xtal-latx/define.js';

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
    static get is(){return 'xtal-split';}
    static get observedAttributes(){
        return super.observedAttributes.concat([search, text_content]);
    }
    attributeChangedCallback(name: string, oldVal: string, newVal: string){
        switch(name){
            case search:
                this._search = newVal;
                break;
            case text_content:
                this._textContent = newVal ? this.strip(newVal) : '';
                break;            
        }
        this.onPropsChange();
    }

    _search: string;
    get search() {
        return this._search;
    }
    set search(val) {
        this.attr(search, val);
    }

    _textContent: string;
    get textContent() {
        return this._textContent;
    }
    set textContent(val) {
        //this._textContent = this.strip(val);
        this.attr(text_content, val);
    }

    strip(html) {
        return html.replace(re, '');
    }



    _connected : boolean;
    connectedCallback(){
        this._connected = true;
        this._upgradeProperties(['search', 'textContent']);
        this.onPropsChange();
    }
    onPropsChange() {
        if (!this._connected) return;
        if(!this._textContent) this.textContent = this.innerText;
        if (!this._search) {
            this.innerText = this._textContent;
        } else {
            const split = this._textContent.split(new RegExp(this._search, 'i'));
            const textContentLength = this._textContent.length;
            const tokenCount = split.length;
            const len = this._search.length;
            let iPos = 0;
            let text = '';
            //console.log(split); 
            split.forEach((token, idx) => {

                iPos += token.length;
                text += token;
                if (idx < tokenCount && iPos < textContentLength) text += "<span class='match'>" + this._textContent.substr(iPos, len) + "</span>";
                iPos += len;
            })
            this.innerHTML = text;
        }

    }
}
define(XtalSplit)