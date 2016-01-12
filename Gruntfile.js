'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//                                        ██╗       ██████╗   ██████╗  █████╗  ████████╗ ███████╗     ██╗   ██╗ ███████╗
//                                        ██║      ██╔═══██╗ ██╔════╝ ██╔══██╗ ╚══██╔══╝ ██╔════╝     ██║   ██║ ██╔════╝
//                                        ██║      ██║   ██║ ██║      ███████║    ██║    █████╗       ██║   ██║ ███████╗
//                                        ██║      ██║   ██║ ██║      ██╔══██║    ██║    ██╔══╝       ██║   ██║ ╚════██║
//                                        ███████╗ ╚██████╔╝ ╚██████╗ ██║  ██║    ██║    ███████╗     ╚██████╔╝ ███████║
//                                        ╚══════╝  ╚═════╝   ╚═════╝ ╚═╝  ╚═╝    ╚═╝    ╚══════╝      ╚═════╝  ╚══════╝
//                                                                      Created by Westpac Design Delivery Team
// @desc     locate us front-end
// @author   Dominik Wilkowski
// @website  https://github.com/WestpacCXTeam/locateus-front
// @issues   https://github.com/WestpacCXTeam/locateus-front/issues
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// External dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var Chalk = require('chalk');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Settings
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var SETTINGS = function() {
	return {
		'folder': {
			'html': 'HTML',
			'modules': 'HTML/_includes/modules',
			'assets': 'HTML/_assets',
			'js': 'HTML/_assets/js',
			'less': 'HTML/_assets/less',
			'svg': 'HTML/_assets/svg',
			'css': 'HTML/_assets/css',
			'font': 'HTML/_assets/font',
			'img': 'HTML/_assets/img',
			'htaccess': 'HTML/_assets/htaccess',
			'favicons': 'HTML/_assets/favicons',
			'temp': '.temp',
			'root': '',

			'prod': 'jekyll',
			'Packagejson': 'package.json',
		},
	};
};


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt module
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function(grunt) {

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Dependencies
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-lintspaces');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-wakeup');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-font');
	require('time-grunt')(grunt);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Grunt tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.initConfig({


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Package content
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		SETTINGS: SETTINGS(),
		pkg: grunt.file.readJSON( SETTINGS().folder.Packagejson ),


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Clean task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		clean: {
			jekyll: [
				'<%= SETTINGS.folder.prod %>/',
			],

			grunticon: [
				'<%= SETTINGS.folder.prod %>/assets/css/grunticon.loader.js',
				'<%= SETTINGS.folder.prod %>/assets/css/preview.html',
				'<%= SETTINGS.folder.prod %>/assets/css/png/',
			],

			GUI: [
				'<%= SETTINGS.folder.GUImaster %>/',
			],

			temp: [
				'<%= SETTINGS.folder.temp %>/',
			],
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Replace version
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		replace: {
			debugDev: {
				src: [
					'<%= SETTINGS.folder.prod %>/**/*.html',
					'<%= SETTINGS.folder.prod %>/**/*.md',
					'<%= SETTINGS.folder.prod %>/**/*.js',
					'<%= SETTINGS.folder.prod %>/**/*.css',
					'<%= SETTINGS.folder.prod %>/**/*.liquid',
					'<%= SETTINGS.folder.fileserver %>/server.js',
					'!<%= SETTINGS.folder.prod %>/_site/**/*',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Debug]',
						to: 'true',
					},
					{
						from: '[-Debug-]',
						to: '[Debug]',
					},
				],
			},

			debugProd: {
				src: [
					'<%= SETTINGS.folder.prod %>/**/*.html',
					'<%= SETTINGS.folder.prod %>/**/*.md',
					'<%= SETTINGS.folder.prod %>/**/*.js',
					'<%= SETTINGS.folder.prod %>/**/*.css',
					'<%= SETTINGS.folder.prod %>/**/*.liquid',
					'<%= SETTINGS.folder.fileserver %>/server.js',
					'!<%= SETTINGS.folder.prod %>/_site/**/*',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Debug]',
						to: 'false',
					},
					{
						from: '[-Debug-]',
						to: '[Debug]',
					},
				],
			},

			jekyll: {
				src: [
					'<%= SETTINGS.folder.prod %>/_includes/**/*.liquid',
					'<%= SETTINGS.folder.prod %>/_layouts/**/*',
					'<%= SETTINGS.folder.prod %>/_data/**/*',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
				],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Less task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		less: {
			GUI: {
				options: {
					cleancss: true,
					compress: true,
					ieCompat: true,
					report: 'min',
					plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
				},
				files: {
					'<%= SETTINGS.folder.prod %>/assets/css/site-<%= pkg.version %>.min.css': '<%= SETTINGS.folder.assets %>/less/theme.less',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Concat files
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		concat: {
			grunticon: {
				files: {
					'<%= SETTINGS.folder.prod %>/assets/css/symbols-<%= pkg.version %>.data.svg.css': [
						'<%= SETTINGS.folder.prod %>/assets/css/symbols-<%= pkg.version %>.data.svg.css',
						'<%= SETTINGS.folder.css %>/symbols.data.svg.css',
					],
					'<%= SETTINGS.folder.prod %>/assets/css/symbols-<%= pkg.version %>.data.png.css': [
						'<%= SETTINGS.folder.prod %>/assets/css/symbols-<%= pkg.version %>.data.png.css',
						'<%= SETTINGS.folder.css %>/symbols.data.png.css',
					],
					'<%= SETTINGS.folder.prod %>/assets/css/symbols-<%= pkg.version %>.fallback.css': [
						'<%= SETTINGS.folder.prod %>/assets/css/symbols-<%= pkg.version %>.fallback.css',
						'<%= SETTINGS.folder.css %>/symbols.fallback.css',
					],
				},
			},

			js: {
				files: {
					'<%= SETTINGS.folder.prod %>/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'<%= SETTINGS.folder.js %>/**/*store*.js',
						'<%= SETTINGS.folder.prod %>/assets/js/site-<%= pkg.version %>.min.js',
					],
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Minify js
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		uglify: {
			options: {
				mangle: false,
				report: 'gzip',
			},

			BOM: {
				files: {
					'<%= SETTINGS.folder.prod %>/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/**/*.js',
						'!<%= SETTINGS.folder.js %>/**/*jquery*.js',
						'!<%= SETTINGS.folder.js %>/**/*store*.js',
					],
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Grunticon to convert svgs into cross browser css files with png fallbacks
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		grunticon: {
			options: {
				datasvgcss: 'symbols-<%= pkg.version %>.data.svg.css',
				datapngcss: 'symbols-<%= pkg.version %>.data.png.css',
				urlpngcss: 'symbols-<%= pkg.version %>.fallback.css',
				cssprefix: '.sitesymbol-',
				enhanceSVG: true,
				customselectors: {
					'header-bg': ['.header .headerline'],
				},
				pngpath: '../img',
			},

			build: {
				files: [{
					expand: true,
					cwd: '<%= SETTINGS.folder.svg %>/',
					src: [
						'*.svg',
					],
					dest: '<%= SETTINGS.folder.prod %>/assets/css',
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Copy all grunticon fallback pngs to img folder
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		copy: {
			//grunticon cleanup
			fallbackimages: {
				files: [{
					cwd: '<%= SETTINGS.folder.prod %>/assets/css/png/',
					src: ['**/*.png'],
					dest: '<%= SETTINGS.folder.prod %>/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//HTML
			HTML: {
				files: [{
					cwd: '<%= SETTINGS.folder.html %>/',
					src: [
						'**/*.html',
						'**/*.md',
						'**/*.liquid',
						'!_assets/**/*',
						'!_*/**/*',
					],
					dest: '<%= SETTINGS.folder.prod %>/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//fonts
			fonts: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.prod %>/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//images
			img: {
				files: [{
					cwd: '<%= SETTINGS.folder.img %>/',
					src: [
						'**/*.png',
						'**/*.jpg',
						'**/*.gif',
					],
					dest: '<%= SETTINGS.folder.prod %>/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//htaccess files
			htaccess: {
				files: [{
					cwd: '<%= SETTINGS.folder.htaccess %>/',
					src: [
						'*.htaccess',
						'.htaccess',
					],
					dest: '<%= SETTINGS.folder.prod %>/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//favicons files
			favicons: {
				files: [{
					cwd: '<%= SETTINGS.folder.favicons %>/',
					src: [
						'*',
					],
					dest: '<%= SETTINGS.folder.prod %>/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//HTML underscore folders
			HTML_: {
				files: [{
					cwd: '<%= SETTINGS.folder.html %>/',
					src: [
						'_*/**/*.html',
						'_*/**/*.md',
						'_*/**/*.liquid',
						'*.yml',
						'*.htaccess',
						'.htaccess',
						'*.json',
						'_plugins/**/*',
						'!_assets/**/*',
					],
					dest: '<%= SETTINGS.folder.prod %>/',
					filter: 'isFile',
					expand: true,
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// JEKYLL
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		jekyll: {
			options: {
				src : '<%= SETTINGS.folder.prod %>'
			},

			dev: {
				options: {
					dest: '<%= SETTINGS.folder.prod %>/_site',
					config: '<%= SETTINGS.folder.prod %>/_config.yml',
				},
			},
			prod: {
				options: {
					dest: '<%= SETTINGS.folder.prod %>/_site',
					config: '<%= SETTINGS.folder.prod %>/_config.build.yml',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// LINT SPACES
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		lintspaces: {
			all: {
				options: {
					editorconfig: '.editorconfig',
					ignores: [
						'js-comments',
						'c-comments',
						'java-comments',
						'as-comments',
						'xml-comments',
						'html-comments',
						'python-comments',
						'ruby-comments',
						'applescript-comments',
					],
				},
				src: [
					'**/*.js',
					'**/*.less',
					'**/*.css',
					'**/*.html',

					'!jekyll/**/*',
					'!HTML/_assets/js/**/*jquery*.js',
					'!GUI-source-master/**/*',
					'!file-server/server.js',
					'!file-server/node_modules/**/*',
					'!node_modules/**/*',
					'!Gruntfile.js',
				],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Banners
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		font: {
			options: {
				space: false,
				maxLength: 11,
				colors: ['white', 'gray'],
			},

			title: {
				text: '| GUI docs',
			},

			updating: {
				options: {
					font: 'simple',
					maxLength: 30,
					colors: ['magenta'],
				},

				text: 'Updating...',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Wakeup
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		wakeup: {
			wakeme: {
				options: {
					randomize: true,
					notifications: true,
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Watch
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		watch: {
			options: {
				livereload: true,
			},

			node: {
				files: [
					'<%= SETTINGS.folder.fileserver %>/*.js',
					'!<%= SETTINGS.folder.fileserver %>/server.js',
				],
				tasks: [
					// 'lintspaces',
					'_buildNode',
					'replace:node',
					'replace:debugDev',
					'wakeup',
				],
			},

			js: {
				files: [
					'<%= SETTINGS.folder.js %>/**/*.js',
				],
				tasks: [
					// 'lintspaces',
					'uglify',
					'concat:js',
					'replace:jekyll',
					'replace:debugDev',
					'jekyll:dev',
					'wakeup',
				],
			},

			less: {
				files: [
					'<%= SETTINGS.folder.less %>/**/*.less',
				],
				tasks: [
					// 'lintspaces',
					'less',
					'replace:jekyll',
					'replace:debugDev',
					'jekyll:dev',
					'wakeup',
				],
			},

			svg: {
				files: [
					'<%= SETTINGS.folder.svg %>/**/*.svg',
				],
				tasks: [
					'grunticon',
					'copy',
					'less',
					'replace:jekyll',
					'replace:debugDev',
					'concat:grunticon',
					'clean:grunticon',
					'jekyll:dev',
					'wakeup',
				],
			},

			html: {
				files: [
					'<%= SETTINGS.folder.html %>/**/*.md',
					'<%= SETTINGS.folder.html %>/**/*.liquid',
					'<%= SETTINGS.folder.html %>/**/*.html',
					'<%= SETTINGS.folder.html %>/**/*.yml',
					'<%= SETTINGS.folder.html %>/**/*.json',
					'<%= SETTINGS.folder.html %>/_plugins/**/*',
				],
				tasks: [
					// 'lintspaces',
					'copy:HTML',
					'copy:HTML_',
					'replace:jekyll',
					'replace:debugDev',
					'jekyll:dev',
					'wakeup',
				],
			},

			htaccess: {
				files: [
					'<%= SETTINGS.folder.htaccess %>/**/*.htaccess',
					'<%= SETTINGS.folder.htaccess %>/**/.htaccess',
				],
				tasks: [
					// 'lintspaces',
					'copy:htaccess',
					'jekyll:dev',
					'wakeup',
				],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// server
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		connect: {
			server: {
				options: {
					open: false,
					hostname: '127.0.0.1',
					port: 1337,
					directory: '<%= SETTINGS.folder.prod %>/_site/',
					base: '<%= SETTINGS.folder.prod %>/_site/',
				},
			},
		},

	});



	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Private tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('_buildDocs', [
		'clean:jekyll',
		// 'lintspaces',
		'less',
		'uglify',
		'concat:js',
		'grunticon',
		'copy',
		'concat:grunticon',
		'replace:jekyll',
		'clean:grunticon',
	]);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Build tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [ //run build with watch
		'build',
		'connect',
		'watch',
	]);

	grunt.registerTask('build', [ //run everything with debug on
		'font:title',
		'_buildDocs',
		'replace:debugDev',
		'jekyll:dev',
		'wakeup',
	]);

	grunt.registerTask('prod', [ //run everything with debug off
		'font:title',
		'_buildDocs',
		'replace:debugProd',
		'jekyll:prod',
		'wakeup',
	]);

};
