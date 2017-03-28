# staro-webkit
Just another automate workflow with Gulp.js? Maybe. :p<br>
The main goal is to set a final static webpage with minified code in HTML files (final output doesn't have .css or .js files, it's all inside .html without unnecessary requests to server).

This repository is for personal projects, but feel free to use it, fork it and/or give me suggestions/feedback.

This workflow use Pug (old Jade) for HTML, SASS/SCSS for CSS, just an uglify for JS and TinyPNG API for images compression. It's not mandatory to use these modules, but probably you'll need to customize your gulpfile to do that.

You'll need...
<ul>
  <li>Node.js</li>
  <li>NPM</li>
  <li>and, of course, Pug and SASS.</li>
</ul>

Follow this steps:

Download this repository to your empty project and open a terminal there:<br>
<code>
npm install
</code>

Run:<br>
<code>
gulp
</code>

I choose "_dev" for development folder. If you want to change, remember to change the folder name and "src" variable in gulpfile.js.
