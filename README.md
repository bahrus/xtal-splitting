[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/xtal-splitting)

<a href="https://nodei.co/npm/xtal-splitting/"><img src="https://nodei.co/npm/xtal-splitting.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/xtal-splitting">

# \<xtal-splitting\>

Web components that can do the splits 

xtal-splitting.js is ~1kb minified and gzipped. It takes a search string, and splits up the textContent into spans, which can be styled to show where the matching text is.

<!--
```
<custom-element-demo>
  <template>
    <div>

      <h3>Basic xtal-splitting demo</h3>
      <style>
        .match{
          background-color: yellowgreen;
          font-weight: bold;
        }
      </style>
      <input type="text"  value="ca">
      <!-- pass down (p-d) input.value to xtal-split's search property -->
      <p-d on="input" prop="search" val="target.value"></p-d>
      <xtal-split>superc<span>alifragil</span>isticexpialidocious</xtal-split>
      <script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
      <script type="module" src="https://unpkg.com/p-d.p-u@0.0.105/p-d.js?module"></script>
      <script type="module" src="https://unpkg.com/xtal-splitting@0.0.9/xtal-split.js?module"></script>
    </div>
  </template>
</custom-element-demo>
```
-->

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ npm test
```

