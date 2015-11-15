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
    var partialFrontMatter = parseFrontMatter(partialString);

    var partial = function (data, options) {
      var partialData = _.extend(partialFrontMatter, data);
      return partialTemplate(partialData, options);
    };
    Handlebars.registerPartial(partialName, partial);
  });
}

function parseFrontMatter(templateString) {
  var frontMatter = {};

  var frontMatterMatch = templateString.match(frontMatterMatcher);
  if (frontMatterMatch) {
    try {
      frontMatter = eval('({' + frontMatterMatch[1] + '})');
    } catch (err) {
      console.error('Bad frontMatter.', err);
    }
  }

  return frontMatter;
}

function toDestPath(src, dist, templateFile) {
  var pathParts = path.parse(templateFile);
  var destPath = path.join(dist, pathParts.dir.substring(src.length), pathParts.name + '.html');

  return destPath;
}

function renderTemplateFile(src, dist, templateFile) {
  var templateString = fs.readFileSync(templateFile).toString();

  var template = Handlebars.compile(templateString); 
  var html = template(parseFrontMatter(templateString));
  var htmlPath = toDestPath(src, dist, templateFile);

  try {
    fs.mkdirSync(path.parse(htmlPath).dir);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
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

    try {      
      glob(path.join(partialsPath, '*.' + ext), function (err, partialFiles) {
        if (err) { throw err; }
        registerPartials(partialFiles);

        glob(hbsFileGlob, function (err, hbsFiles) {
          if (err) { throw err; }
          var changedFiles = _.chain(hbsFiles)
            .filter(function (hbsFile) {
              return notPartialReg.test(hbsFile);
            })
            .each(renderTemplateFile.bind(null, src, dist));
          done();
        });
      });
    } catch (err) {
      done(err);
    }
  });
}
