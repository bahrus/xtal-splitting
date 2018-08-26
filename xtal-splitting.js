
    //@ts-check
    (function () {
    const disabled = 'disabled';
function XtallatX(superClass) {
    return class extends superClass {
        constructor() {
            super(...arguments);
            this._evCount = {};
        }
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
            const setOrRemove = val ? 'set' : 'remove';
            this[setOrRemove + 'Attribute'](name, trueVal || val);
        }
        to$(number) {
            const mod = number % 2;
            return (number - mod) / 2 + '-' + mod;
        }
        incAttr(name) {
            const ec = this._evCount;
            if (name in ec) {
                ec[name]++;
            }
            else {
                ec[name] = 0;
            }
            this.attr('data-' + name, this.to$(ec[name]));
        }
        attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
                case disabled:
                    this._disabled = newVal !== null;
                    break;
            }
        }
        de(name, detail) {
            const eventName = name + '-changed';
            const newEvent = new CustomEvent(eventName, {
                detail: detail,
                bubbles: true,
                composed: false,
            });
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
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
const search = 'search';
const text_content = 'text-content';
const reSanitize = /(<([^>]+)>)/ig;
/**
 * `xtal-split`
 *  Split property textContent with search property
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
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
        return html.replace(reSanitize, '');
    }
    connectedCallback() {
        this._connected = true;
        this._upgradeProperties(['search', 'textContent']);
        this.onPropsChange();
    }
    onPropsChange() {
        if (!this._connected)
            return;
        if (!this._textContent)
            this._textContent = this.innerText;
        if (!this._search) {
            this.innerText = this._textContent;
        }
        else {
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
                if (idx < tokenCount && iPos < textContentLength)
                    text += "<span class='match'>" + this._textContent.substr(iPos, len) + "</span>";
                iPos += len;
            });
            this.innerHTML = text;
        }
    }
}
if (!customElements.get(XtalSplit.is))
    customElements.define(XtalSplit.is, XtalSplit);
    })();  
        