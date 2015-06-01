/*
 * grunt-jsonappend
 * https://github.com/whowgames/grunt-jsonappend
 *
 * Copyright (c) 2015 Marko Kercmar
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('jsonappend', 'The best Grunt plugin ever.', function() {
    var _fs = require('fs');
    
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
        var output = {};

        var src = f.src.filter(function(filepath) {
            var full = f.cwd + '/' + filepath;

            if (!grunt.file.exists(full)) {
                return;
            }

            grunt.log.writeln('Reading ' + full);

            var source = grunt.file.read(full);

            var json = JSON.parse(source);

            for (var x in json) {
                var tree = json[x];

                if (typeof output[x] == 'undefined') {
                    output[x] = {};
                }

                for (var k in tree) {
                    if (k.match(f.match)) {
                        json[x][k] = json[x][k] + f.append;
                    }

                    output[x][k] = json[x][k];
                }
            }
        });

        var out = f.dest + '/' + f.target;

        grunt.file.write(out, JSON.stringify(output));
        grunt.log.writeln('File "' + out + '" written');
    });
  });
};
