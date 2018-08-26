(function(){var disabled="disabled";var search="search",text_content="text-content",reSanitize=/(<([^>]+)>)/ig,XtalSplit=function(_XtallatX){babelHelpers.inherits(XtalSplit,_XtallatX);function XtalSplit(){babelHelpers.classCallCheck(this,XtalSplit);return babelHelpers.possibleConstructorReturn(this,(XtalSplit.__proto__||Object.getPrototypeOf(XtalSplit)).apply(this,arguments))}babelHelpers.createClass(XtalSplit,[{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldVal,newVal){switch(name){case search:this._search=newVal;break;case text_content:this._textContent=newVal?this.strip(newVal):"";break;}this.onPropsChange()}},{key:"strip",value:function strip(html){return html.replace(reSanitize,"")}},{key:"connectedCallback",value:function connectedCallback(){this._connected=!0;this._upgradeProperties(["search","textContent"]);this.onPropsChange()}},{key:"onPropsChange",value:function onPropsChange(){var _this3=this;if(!this._connected)return;if(!this._textContent)this._textContent=this.innerText;if(!this._search){this.innerText=this._textContent}else{var split=this._textContent.split(new RegExp(this._search,"i")),textContentLength=this._textContent.length,tokenCount=split.length,len=this._search.length,iPos=0,text="";split.forEach(function(token,idx){iPos+=token.length;text+=token;if(idx<tokenCount&&iPos<textContentLength)text+="<span class='match'>"+_this3._textContent.substr(iPos,len)+"</span>";iPos+=len});this.innerHTML=text}}},{key:"search",get:function get(){return this._search},set:function set(val){this.attr(search,val)}},{key:"textContent",get:function get(){return this._textContent},set:function set(val){this.attr(text_content,val)}}],[{key:"is",get:function get(){return"xtal-split"}},{key:"observedAttributes",get:function get(){return babelHelpers.get(XtalSplit.__proto__||Object.getPrototypeOf(XtalSplit),"observedAttributes",this).concat([search,text_content])}}]);return XtalSplit}(function(superClass){return function(_superClass){babelHelpers.inherits(_class,_superClass);function _class(){var _this;babelHelpers.classCallCheck(this,_class);_this=babelHelpers.possibleConstructorReturn(this,(_class.__proto__||Object.getPrototypeOf(_class)).apply(this,arguments));_this._evCount={};return _this}babelHelpers.createClass(_class,[{key:"attr",value:function attr(name,val,trueVal){var setOrRemove=val?"set":"remove";this[setOrRemove+"Attribute"](name,trueVal||val)}},{key:"to$",value:function to$(number){var mod=number%2;return(number-mod)/2+"-"+mod}},{key:"incAttr",value:function incAttr(name){var ec=this._evCount;if(name in ec){ec[name]++}else{ec[name]=0}this.attr("data-"+name,this.to$(ec[name]))}},{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldVal,newVal){switch(name){case disabled:this._disabled=null!==newVal;break;}}},{key:"de",value:function de(name,detail){var eventName=name+"-changed",newEvent=new CustomEvent(eventName,{detail:detail,bubbles:!0,composed:!1});this.dispatchEvent(newEvent);this.incAttr(eventName);return newEvent}},{key:"_upgradeProperties",value:function _upgradeProperties(props){var _this2=this;props.forEach(function(prop){if(_this2.hasOwnProperty(prop)){var value=_this2[prop];delete _this2[prop];_this2[prop]=value}})}},{key:"disabled",get:function get(){return this._disabled},set:function set(val){this.attr(disabled,val,"")}}],[{key:"observedAttributes",get:function get(){return[disabled]}}]);return _class}(superClass)}(HTMLElement));if(!customElements.get(XtalSplit.is))customElements.define(XtalSplit.is,XtalSplit)})();