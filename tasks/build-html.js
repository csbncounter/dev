var fs = require('fs');
var path = require('path');
var glob = require('glob');
var _ = require('underscore');
var Handlebars = require('handlebars');
var camelize = require('camelize');

var frontMatterMatcher = /\{\{!((?:.|[\r\n])*?)\}\}/;

function registerPartials(partialFiles) {
  partialFiles.forEach(function (partialFile) {
    var partialFileName = path.parse(partialFile).name;
    var partialName = camelize(partialFileName);

    var partialString = fs.readFileSync(partialFile).toString();
    var partialTemplate = Handlebars.compile(partialString);
    Handlebars.registerPartial(partialName, partialTemplate);

    var frontMatter = getFrontMatter(partialString);
    for (name in frontMatter) {
      Handlebars.registerHelper(name, frontMatter[name]);
    }
  });
}

function getFrontMatter(templateString) {
  var frontMatter = {};

  var frontMatterMatch = templateString.match(frontMatterMatcher);
  if (frontMatterMatch) {
    try {
      frontMatter = eval('({' + frontMatterMatch[1] + '})');
    } catch (err) {
      console.error('Bad frontMatter.');
    }
  }

  return frontMatter;
}

function getDestPath(src, dist, templateFile) {
  var pathParts = path.parse(templateFile);
  var destPath = path.join(dist, pathParts.dir.substring(src.length), pathParts.name + '.html');

  return destPath;
}

function processTemplateFile(src, dist, templateFile) {
  var templateString = fs.readFileSync(templateFile).toString();

  var template = Handlebars.compile(templateString); 
  var html = template(getFrontMatter(templateString));
  var htmlPath = getDestPath(src, dist, templateFile);

  try {
    fs.mkdirSync(path.parse(htmlPath).dir);
  } catch (err) {}
  fs.writeFileSync(htmlPath, html);
}

module.exports = function(grunt) {

  grunt.registerMultiTask('buildHtml', function() {
    var done = this.async();
    var target = this.target;
    var ext = this.data.ext;
    var src = this.data.src;
    var dist = this.data.dist;
    var partialsPath = this.data.partials;

    var hbsFileGlob = path.join(src, '**/*.' + ext);
    var notPartialReg = new RegExp('^(?!' + partialsPath + '/)');

    glob(path.join(partialsPath, '*.' + ext), function (err, partialFiles) {
      registerPartials(partialFiles);

      glob(hbsFileGlob, function (er, hbsFiles) {
        _.filter(hbsFiles, function (hbsFile) {
          return notPartialReg.test(hbsFile);
        })
          .forEach(processTemplateFile.bind(null, src, dist));
        done();
      });
    });
  });
}
