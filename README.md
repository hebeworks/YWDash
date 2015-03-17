# Hebe-dash

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`
* `ember install:npm broccoli-sass`
* `gem install scss-lint`
* `npm i ember-cli-scsslint`
* `npm install ember-cli-bourbon --save-dev`
* `ember g ember-cli-bourbon`
* 'when given the option, resolve to 3.2.1'

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### SVGs
* We use SVGs to ensure the app looks sharp at all pixel densities (e.g. retina). We use SVG for some icons, and by design some of these also require hover states. If an SVG is used as a bg image, the paths inside cannot be manipulated using CSS, and therefore the SVG code must sit in the markup to achieve it.
* Including lots of SVG code for things like icons will bloat the markup quite a considerable amount and slow page loading speeds, so we lazy load them instead using [grunticon](https://github.com/filamentgroup/grunticon)
* grunticon takes a folder full of SVGs (/public/assets/img/svg/embed), converts them to data URIs and injects them into a stylesheet. It then generates & uses grunticon.loader.js to match the generated CSS classnames from the stylesheet against specific markup in the DOM, such as: <span class="svg-toolbox" data-grunticon-embed></span>, and injects the SVG code inside that element.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

