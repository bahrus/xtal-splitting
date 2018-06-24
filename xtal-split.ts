import {XtallatX} from 'xtal-latx/xtal-latx.js';
const search = 'search';
const text_content = 'text-content';
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
    _originalText: string;

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
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }


    _connected : boolean;
    connectedCallback(){
        this._connected = true;
        this._upgradeProperties(['search', 'textContent']);
        this.onPropsChange();
    }
    onPropsChange() {
        if (!this._connected || !this._textContent) return;
        if (!this._search) {
            this.innerText = this._textContent;
        } else {
            const split = this._textContent.split(new RegExp(this._search, 'i'));
            const tokenCount = split.length;
            const len = this._search.length;
            let iPos = 0;
            let text = '';
            //console.log(split);
            split.forEach((token, idx) => {

                iPos += token.length;
                text += token;
                if (idx < tokenCount) text += "<span class='match'>" + this._textContent.substr(iPos, len) + "</span>";
                iPos += len;
            })
            this.innerHTML = text;
        }

    }
}

if(!customElements.get(XtalSplit.is)) customElements.define(XtalSplit.is, XtalSplit);