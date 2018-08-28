
    //@ts-check
    (function () {
    function define(custEl) {
    let tagName = custEl.is;
    if (customElements.get(tagName)) {
        console.warn('Already registered ' + tagName);
        return;
    }
    customElements.define(tagName, custEl);
}
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
const re = /(<([^>]+)>)/ig;
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
                this._s = newVal;
                break;
            case text_content:
                this._t = this.strip(newVal);
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
        if (this._t === undefined) {
            if (this.firstChild !== null) {
                this.textContent = this.innerText;
            }
            else {
                return;
            }
        }
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
    })();  
        