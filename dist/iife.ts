
    (function () {
    function define(custEl: any){
    let tagName = custEl.is;
    if(customElements.get(tagName)){
        console.warn('Already registered ' + tagName);
        return;
    }
    customElements.define(tagName, custEl);
}
const disabled = 'disabled';

interface IXtallatXI extends HTMLElement {
    /**
     * Any component that emits events should not do so if it is disabled.
     * Note that this is not enforced, but the disabled property is made available.
     * Users of this mix-in should ensure not to call "de" if this property is set to true.
    */
    disabled: boolean;
    /**
     * Set attribute value.
     * @param name 
     * @param val 
     * @param trueVal String to set attribute if true.
     */
    attr(name: string, val: string | boolean, trueVal?: string): void;
    /**
     * Dispatch Custom Event
     * @param name Name of event to dispatch ("-changed" will be appended if asIs is false)
     * @param detail Information to be passed with the event
     * @param asIs If true, don't append event name with '-changed'
     */
    de(name: string, detail: any, asIs?: boolean): CustomEvent;
    /**
     * Needed for asynchronous loading
     * @param props Array of property names to "upgrade", without losing value set while element was Unknown
     */
    _upgradeProperties(props: string[]): void;
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
    connectedCallback?(): void;
    // static observedAttributes: string[]; 
}
type Constructor<T = {}> = new (...args: any[]) => T;
/**
 * Base class for many xtal- components
 * @param superClass
 */
function XtallatX<TBase extends Constructor<HTMLElement>>(superClass: TBase) {
    return class extends superClass implements IXtallatXI {
        static get observedAttributes() {
            return [disabled];
        }

        _disabled!: boolean;
        /**
         * Any component that emits events should not do so if it is disabled.
         * Note that this is not enforced, but the disabled property is made available.
         * Users of this mix-in should ensure not to call "de" if this property is set to true.
         */
        get disabled() {
            return this._disabled;
        }
        set disabled(val) {
            this.attr(disabled, val, '');
        }
        /**
         * Set attribute value.
         * @param name 
         * @param val 
         * @param trueVal String to set attribute if true.
         */
        attr(name: string, val: string | boolean | null, trueVal?: string) {
            const v = val ? 'set' : 'remove';  //verb
            (<any>this)[v + 'Attribute'](name, trueVal || val);
        }
        _evCount: { [key: string]: number } = {};
        /**
         * Turn number into string with even and odd values easy to query via css.
         * @param n 
         */
        to$(n: number) {
            const mod = n % 2;
            return (n - mod) / 2 + '-' + mod;
        }
        /**
         * Increment event count
         * @param name
         */
        incAttr(name: string) {
            const ec = this._evCount;
            if (name in ec) {
                ec[name]++;
            } else {
                ec[name] = 0;
            }
            this.attr('data-' + name, this.to$(ec[name]));
        }
        attributeChangedCallback(name: string, oldVal: string, newVal: string) {
            switch (name) {
                case disabled:
                    this._disabled = newVal !== null;
                    break;
            }
        }

        /**
         * Dispatch Custom Event
         * @param name Name of event to dispatch ("-changed" will be appended if asIs is false)
         * @param detail Information to be passed with the event
         * @param asIs If true, don't append event name with '-changed'
         */
        de(name: string, detail: any, asIs: boolean = false) {
            const eventName = name + (asIs ? '' : '-changed');
            const newEvent = new CustomEvent(eventName, {
                detail: detail,
                bubbles: true,
                composed: false,
            } as CustomEventInit);
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
            return newEvent;
        }

        /**
         * Needed for asynchronous loading
         * @param props Array of property names to "upgrade", without losing value set while element was Unknown
         */
        _upgradeProperties(props: string[]) {
            props.forEach(prop => {
                if (this.hasOwnProperty(prop)) {
                    let value = (<any>this)[prop];
                    delete (<any>this)[prop];
                    (<any>this)[prop] = value;
                }
            })

        }
    }
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
    static get is(){return 'xtal-split';}
    static get observedAttributes(){
        return super.observedAttributes.concat([search, text_content]);
    }
    attributeChangedCallback(name: string, oldVal: string, newVal: string){
        switch(name){
            case search:
                this._s = newVal;
                break;
            case text_content:
                this._t = this.strip(newVal);
                break;            
        }
        this.onPropsChange();
    }

    _s: string;
    get search() {
        return this._s;
    }
    set search(val) {
        this.attr(search, val);
    }

    _t: string;
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



    _connected : boolean;
    connectedCallback(){
        this._connected = true;
        this._upgradeProperties(['search', 'textContent']);
        this.onPropsChange();
    }
    onPropsChange() {
        
        if (!this._connected) return;
        if(this._t === undefined){
            if(this.firstChild !== null) {
                this.textContent = this.innerText;
            }else{
                return;
            }
        }
        if (!this._s) {
            this.innerText = this._t;
        } else {
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
                if (i < tc && iP < tcL) text += "<span class='match'>" + this._t.substr(iP, len) + "</span>";
                iP += len;
            })
            this.innerHTML = text;
        }

    }
}
define(XtalSplit);
    })();  
        