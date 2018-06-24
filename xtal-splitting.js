
    //@ts-check
    (function () {
    const disabled = 'disabled';
function XtallatX(superClass) {
    return class extends superClass {
        static get observedAttributes() {
            return [disabled];
        }
        get disabled() {
            return this._disabled;
        }
        set disabled(val) {
            this.attr(disabled, val, '');
        }
        attr(name, val, trueVal) {
            if (val) {
                this.setAttribute(name, trueVal || val);
            }
            else {
                this.removeAttribute(name);
            }
        }
        attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
                case disabled:
                    this._disabled = newVal !== null;
                    break;
            }
        }
        de(name, detail) {
            const newEvent = new CustomEvent(name + '-changed', {
                detail: detail,
                bubbles: true,
                composed: false,
            });
            this.dispatchEvent(newEvent);
            return newEvent;
        }
        _upgradeProperties(props) {
            props.forEach(prop => {
                if (this.hasOwnProperty(prop)) {
                    let value = this[prop];
                    delete this[prop];
                    this[prop] = value;
                }
            });
        }
    };
}
//# sourceMappingURL=xtal-latx.js.map
const search = 'search';
const text_content = 'text-content';
class XtalSplit extends XtallatX(HTMLElement) {
    static get is() { return 'xtal-split'; }
    static get observedAttributes() {
        return super.observedAttributes.concat([search, text_content]);
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case search:
                this._search = newVal;
                break;
            case text_content:
                this._textContent = newVal ? this.strip(newVal) : '';
                break;
        }
        this.onPropsChange();
    }
    get search() {
        return this._search;
    }
    set search(val) {
        this.attr(search, val);
    }
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
    connectedCallback() {
        this._connected = true;
        this._upgradeProperties(['search', 'textContent']);
        this.onPropsChange();
    }
    onPropsChange() {
        if (!this._connected || !this._textContent)
            return;
        if (!this._search) {
            this.innerText = this._textContent;
        }
        else {
            const split = this._textContent.split(new RegExp(this._search, 'i'));
            const tokenCount = split.length;
            const len = this._search.length;
            let iPos = 0;
            let text = '';
            //console.log(split);
            split.forEach((token, idx) => {
                iPos += token.length;
                text += token;
                if (idx < tokenCount)
                    text += "<span class='match'>" + this._textContent.substr(iPos, len) + "</span>";
                iPos += len;
            });
            this.innerHTML = text;
        }
    }
}
if (!customElements.get(XtalSplit.is))
    customElements.define(XtalSplit.is, XtalSplit);
//# sourceMappingURL=xtal-split.js.map
    })();  
        