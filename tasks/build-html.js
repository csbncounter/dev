var fs = require('fs');
var path = require('path');
var glob = require('glob');
var _ = require('underscore');
var Handlebars = require('handlebars');
var camelize = require('camelize');

var PARTIALS_PATH = 'partials';
var TEMPLATE_EXT = 'hbs';

var hbsFileMatcher = new RegExp('^(?!node_modules|' + PARTIALS_PATH + ')(?:.*/)?(.*)\.' + TEMPLATE_EXT);
var frontMatterMatcher = /\{\{!((?:.|[\r\n])*?)\}\}/;

Handlebars.registerHelper('cond', function(test, yes, no) {
  return test ? yes : no;
});

// Fetch and register partials
fs.readdirSync(PARTIALS_PATH).forEach(function (partialFile) {
  var hbsFileMatch = partialFile.match(hbsFileMatcher);
  if (!hbsFileMatch) { return; }

  var partialName = camelize(hbsFileMatch[1]);
  var partialString = fs.readFileSync(path.resolve(PARTIALS_PATH, partialFile)).toString();
  var partialTemplate = Handlebars.compile(partialString);
  Handlebars.registerPartial(partialName, partialTemplate);

  var frontMatter = getFrontMatter(partialString);
  for (name in frontMatter) {
    Handlebars.registerHelper(name, frontMatter[name]);
  }
});

function getFrontMatter(templateString) {
  var frontMatter = {};
  var frontMatterMatch = templateString.match(frontMatterMatcher);
  if (frontMatterMatch) {
    frontMatter = eval('({' + frontMatterMatch[1] + '})');
  }
  return frontMatter;
}

function processTemplateFile(distPath, templateFile) {
  var templateString = fs.readFileSync(templateFile).toString();

  var template = Handlebars.compile(templateString); 
  var html = template(getFrontMatter(templateString));
  var htmlPath = path.join(distPath, templateFile.match(hbsFileMatcher)[1] + '.html');

  fs.writeFileSync(htmlPath, html);
}

module.exports = function(grunt) {

  grunt.registerMultiTask('buildHtml', function() {
    var done = this.async();
    var target = this.target;
    var hbsFileGlob = this.data.src + '**/*.' + TEMPLATE_EXT;
    var distPath = this.data.dist;

    glob(hbsFileGlob, function (er, hbsFiles) {
      hbsFiles = _.filter(hbsFiles, function (hbsFile) {
        return hbsFileMatcher.test(hbsFile);
      });
      hbsFiles.forEach(processTemplateFile.bind(null, distPath));
      done();
    });
  });
}
