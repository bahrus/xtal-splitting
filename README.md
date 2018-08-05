[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-splitting)

<a href="https://nodei.co/npm/xtal-splitting/"><img src="https://nodei.co/npm/xtal-splitting.png"></a>

<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20">
<linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
</linearGradient>
<rect rx="3" width="100" height="20" fill="#555"/>
<rect rx="3" x="45" width="55" height="20" fill="#4c1"/>
<path fill="#4c1" d="M45 0h4v20h-4z"/>
<rect rx="3" width="100" height="20" fill="url(#a)"/>
<g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="24" y="15" fill="#010101" fill-opacity=".3">build</text>
    <text x="24" y="14">build</text>
    <text x="72" y="15" fill="#010101" fill-opacity=".3">passing</text>
    <text x="72" y="14">passing</text>
</g>
</svg>s

# \<xtal-splitting\>

Web components that can do the splits 

xtal-splitting.js is ~1kb minified and gzipped. It takes a search string, and splits up the textContent into spans, which can be styled to show where the matching text is.

<!--
```
<custom-element-demo>
  <template>
    <script type="module" src="https://unpkg.com/xtal-splitting@0.0.1/xtal-splitting.js"></script>
    <script src="https://unpkg.com/p-d.p-u@0.0.16/p-d.p-d-x.p-u.js"></script>
      <style>
        .match{
          background-color: yellowgreen;
          font-weight: bold;
        }
      </style>
      <input type="text"  value="ca">
      <p-d on="input" to="{search}"></p-d>
      <xtal-split text-content="supercalifragilisticexpialidocious"></xtal-split>
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
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
