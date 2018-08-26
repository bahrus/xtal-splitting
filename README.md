[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-splitting)

<a href="https://nodei.co/npm/xtal-splitting/"><img src="https://nodei.co/npm/xtal-splitting.png"></a>

<img src="http://img.badgesize.io/https://rawgit.com/bahrus/xtal-splitting/master/build/ES6/xtal-splitting.js?compression=gzip">

# \<xtal-splitting\>

Web components that can do the splits 

xtal-splitting.js is ~1kb minified and gzipped. It takes a search string, and splits up the textContent into spans, which can be styled to show where the matching text is.

<!--
```
<custom-element-demo>
  <template>
    <div>
        <!-- For re(dge)tro browsers -->
        <script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
        <!-- End re(edge)tro browser support-->
        <script type="module" src="https://unpkg.com/p-d.p-u@0.0.66/p-d.p-u.js"></script>
        <script type="module" src="https://unpkg.com/xtal-splitting@0.0.4/xtal-splitting.js"></script>
      <h3>Basic xtal-splitting demo</h3>
      <style>
        .match{
          background-color: yellowgreen;
          font-weight: bold;
        }
      </style>
      <input type="text"  value="ca">
      <p-d on="input" to="{search}"></p-d>
      <xtal-split text-content="supercalifragilisticexpialidocious"></xtal-split>
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

