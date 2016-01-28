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
// var Chalk = require('chalk');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
function getRandom() {
	var rand = Math.random().toString(36).slice(2);
	console.log('Generating new ID: ' + rand);

	return rand;
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Settings
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var SETTINGS = function() {
	return {
		'folder': {
			'dev': 'dev',
			'html': 'dev/HTML',
			'includes': 'dev/HTML/_includes',
			'js': 'dev/js',
			'less': 'dev/less',
			'svg': 'dev/svg',
			'css': 'dev/css',
			'font': 'dev/fonts',
			'img': 'dev/img',
			'favicons': 'dev/favicons',
			'temp': '.temp',
			'root': '',

			'prod': 'PROD',
			'Packagejson': 'package.json',
		},
		'brands': [
			'BOM',
			'BSA',
			'STG',
			'WBC'
		],
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
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-wakeup');
	grunt.loadNpmTasks('grunt-font');
	require('time-grunt')(grunt);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Grunt tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.initConfig({


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Settings
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		SETTINGS: SETTINGS(),
		pkg: grunt.file.readJSON( SETTINGS().folder.Packagejson ),
		num: 0,


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Clean task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		clean: {
			prod: [
				'<%= SETTINGS.folder.prod %>/',
			],

			grunticon: [
				'<%= SETTINGS.folder.prod %>/<%= SETTINGS.brands[0] %>/assets/css/grunticon.loader.js',
				'<%= SETTINGS.folder.prod %>/<%= SETTINGS.brands[0] %>/assets/css/preview.html',
				'<%= SETTINGS.folder.prod %>/<%= SETTINGS.brands[0] %>/assets/css/png/',

				'<%= SETTINGS.folder.prod %>/<%= SETTINGS.brands[1] %>/assets/css/grunticon.loader.js',
				'<%= SETTINGS.folder.prod %>/<%= SETTINGS.brands[1] %>/assets/css/preview.html',
				'<%= SETTINGS.folder.prod %>/<%= SETTINGS.brands[1] %>/assets/css/png/',

				'<%= SETTINGS.folder.prod %>/<%= SETTINGS.brands[2] %>/assets/css/grunticon.loader.js',
				'<%= SETTINGS.folder.prod %>/<%= SETTINGS.brands[2] %>/assets/css/preview.html',
				'<%= SETTINGS.folder.prod %>/<%= SETTINGS.brands[2] %>/assets/css/png/',

				'<%= SETTINGS.folder.prod %>/<%= SETTINGS.brands[3] %>/assets/css/grunticon.loader.js',
				'<%= SETTINGS.folder.prod %>/<%= SETTINGS.brands[3] %>/assets/css/preview.html',
				'<%= SETTINGS.folder.prod %>/<%= SETTINGS.brands[3] %>/assets/css/png/',
			],

			temp: [
				'<%= SETTINGS.folder.temp %>/',
			],
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Replace version
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		replace: {
			//////////////////////////// DEBUG ON
			devBOM: {
				src: [
					'<%= SETTINGS.folder.temp %>/BOM/**/*.liquid',
					'<%= SETTINGS.folder.temp %>/BOM/**/*.less',
					'<%= SETTINGS.folder.temp %>/BOM/**/*.js',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Brand]',
						to: 'BOM',
					},
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
					{
						from: '[Debug]',
						to: 'true',
					},
					{
						from: '[-Debug-]',
						to: '[Debug]',
					},
					// {
					// 	from: '[Random]',
					// 	to: getRandom(),
					// },
				],
			},

			devBSA: {
				src: [
					'<%= SETTINGS.folder.temp %>/BSA/**/*.liquid',
					'<%= SETTINGS.folder.temp %>/BSA/**/*.md',
					'<%= SETTINGS.folder.temp %>/BSA/**/*.less',
					'<%= SETTINGS.folder.temp %>/BSA/**/*.js',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Brand]',
						to: 'BSA',
					},
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
					{
						from: '[Debug]',
						to: 'true',
					},
					{
						from: '[-Debug-]',
						to: '[Debug]',
					},
					// {
					// 	from: '[Random]',
					// 	to: getRandom(),
					// },
				],
			},

			devSTG: {
				src: [
					'<%= SETTINGS.folder.temp %>/STG/**/*.liquid',
					'<%= SETTINGS.folder.temp %>/STG/**/*.md',
					'<%= SETTINGS.folder.temp %>/STG/**/*.less',
					'<%= SETTINGS.folder.temp %>/STG/**/*.js',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Brand]',
						to: 'STG',
					},
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
					{
						from: '[Debug]',
						to: 'true',
					},
					{
						from: '[-Debug-]',
						to: '[Debug]',
					},
					// {
					// 	from: '[Random]',
					// 	to: getRandom(),
					// },
				],
			},

			devWBC: {
				src: [
					'<%= SETTINGS.folder.temp %>/WBC/**/*.liquid',
					'<%= SETTINGS.folder.temp %>/WBC/**/*.md',
					'<%= SETTINGS.folder.temp %>/WBC/**/*.less',
					'<%= SETTINGS.folder.temp %>/WBC/**/*.js',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Brand]',
						to: 'WBC',
					},
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
					{
						from: '[Debug]',
						to: 'true',
					},
					{
						from: '[-Debug-]',
						to: '[Debug]',
					},
					// {
					// 	from: '[Random]',
					// 	to: getRandom(),
					// },
				],
			},


			//////////////////////////// DEBUG OFF
			prodBOM: {
				src: [
					'<%= SETTINGS.folder.temp %>/BOM/**/*.liquid',
					'<%= SETTINGS.folder.temp %>/BOM/**/*.md',
					'<%= SETTINGS.folder.temp %>/BOM/**/*.less',
					'<%= SETTINGS.folder.temp %>/BOM/**/*.js',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Brand]',
						to: 'BOM',
					},
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
					{
						from: '[Debug]',
						to: 'false',
					},
					{
						from: '[-Debug-]',
						to: '[Debug]',
					},
					// {
					// 	from: '[Random]',
					// 	to: getRandom(),
					// },
				],
			},

			prodBSA: {
				src: [
					'<%= SETTINGS.folder.temp %>/BSA/**/*.liquid',
					'<%= SETTINGS.folder.temp %>/BSA/**/*.md',
					'<%= SETTINGS.folder.temp %>/BSA/**/*.less',
					'<%= SETTINGS.folder.temp %>/BSA/**/*.js',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Brand]',
						to: 'BSA',
					},
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
					{
						from: '[Debug]',
						to: 'false',
					},
					{
						from: '[-Debug-]',
						to: '[Debug]',
					},
					// {
					// 	from: '[Random]',
					// 	to: getRandom(),
					// },
				],
			},

			prodSTG: {
				src: [
					'<%= SETTINGS.folder.temp %>/STG/**/*.liquid',
					'<%= SETTINGS.folder.temp %>/STG/**/*.md',
					'<%= SETTINGS.folder.temp %>/STG/**/*.less',
					'<%= SETTINGS.folder.temp %>/STG/**/*.js',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Brand]',
						to: 'STG',
					},
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
					{
						from: '[Debug]',
						to: 'false',
					},
					{
						from: '[-Debug-]',
						to: '[Debug]',
					},
					// {
					// 	from: '[Random]',
					// 	to: getRandom(),
					// },
				],
			},

			prodWBC: {
				src: [
					'<%= SETTINGS.folder.temp %>/WBC/**/*.liquid',
					'<%= SETTINGS.folder.temp %>/WBC/**/*.md',
					'<%= SETTINGS.folder.temp %>/WBC/**/*.less',
					'<%= SETTINGS.folder.temp %>/WBC/**/*.js',
				],
				overwrite: true,
				replacements: [
					{
						from: '[Brand]',
						to: 'WBC',
					},
					{
						from: '[Version]',
						to: '<%= pkg.version %>',
					},
					{
						from: '[Debug]',
						to: 'false',
					},
					{
						from: '[-Debug-]',
						to: '[Debug]',
					},
					// {
					// 	from: '[Random]',
					// 	to: getRandom(),
					// },
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
					'<%= SETTINGS.folder.temp %>/<%= SETTINGS.brands[0] %>/HTML/assets/css/site-<%= pkg.version %>.min.css':
						'<%= SETTINGS.folder.temp %>/<%= SETTINGS.brands[0] %>/less/theme.less',
					'<%= SETTINGS.folder.temp %>/<%= SETTINGS.brands[1] %>/HTML/assets/css/site-<%= pkg.version %>.min.css':
						'<%= SETTINGS.folder.temp %>/<%= SETTINGS.brands[1] %>/less/theme.less',
					'<%= SETTINGS.folder.temp %>/<%= SETTINGS.brands[2] %>/HTML/assets/css/site-<%= pkg.version %>.min.css':
						'<%= SETTINGS.folder.temp %>/<%= SETTINGS.brands[2] %>/less/theme.less',
					'<%= SETTINGS.folder.temp %>/<%= SETTINGS.brands[3] %>/HTML/assets/css/site-<%= pkg.version %>.min.css':
						'<%= SETTINGS.folder.temp %>/<%= SETTINGS.brands[3] %>/less/theme.less',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Concat files
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		concat: {
			grunticonBOM: {
				files: {
					'<%= SETTINGS.folder.temp %>/BOM/HTML/assets/css/symbols-<%= pkg.version %>.data.svg.css': [
						'<%= SETTINGS.folder.temp %>/BOM/grunticon/svg.css',
						'<%= SETTINGS.folder.css %>/BOM/symbols.data.svg.css',
					],
					'<%= SETTINGS.folder.temp %>/BOM/HTML/assets/css/symbols-<%= pkg.version %>.data.png.css': [
						'<%= SETTINGS.folder.temp %>/BOM/grunticon/png.css',
						'<%= SETTINGS.folder.css %>/BOM/symbols.data.png.css',
					],
					'<%= SETTINGS.folder.temp %>/BOM/HTML/assets/css/symbols-<%= pkg.version %>.fallback.css': [
						'<%= SETTINGS.folder.temp %>/BOM/grunticon/fallback.css',
						'<%= SETTINGS.folder.css %>/BOM/symbols.fallback.css',
					],
				},
			},

			grunticonBSA: {
				files: {
					'<%= SETTINGS.folder.temp %>/BSA/HTML/assets/css/symbols-<%= pkg.version %>.data.svg.css': [
						'<%= SETTINGS.folder.temp %>/BSA/grunticon/svg.css',
						'<%= SETTINGS.folder.css %>/BSA/symbols.data.svg.css',
					],
					'<%= SETTINGS.folder.temp %>/BSA/HTML/assets/css/symbols-<%= pkg.version %>.data.png.css': [
						'<%= SETTINGS.folder.temp %>/BSA/grunticon/png.css',
						'<%= SETTINGS.folder.css %>/BSA/symbols.data.png.css',
					],
					'<%= SETTINGS.folder.temp %>/BSA/HTML/assets/css/symbols-<%= pkg.version %>.fallback.css': [
						'<%= SETTINGS.folder.temp %>/BSA/grunticon/fallback.css',
						'<%= SETTINGS.folder.css %>/BSA/symbols.fallback.css',
					],
				},
			},

			grunticonSTG: {
				files: {
					'<%= SETTINGS.folder.temp %>/STG/HTML/assets/css/symbols-<%= pkg.version %>.data.svg.css': [
						'<%= SETTINGS.folder.temp %>/STG/grunticon/svg.css',
						'<%= SETTINGS.folder.css %>/STG/symbols.data.svg.css',
					],
					'<%= SETTINGS.folder.temp %>/STG/HTML/assets/css/symbols-<%= pkg.version %>.data.png.css': [
						'<%= SETTINGS.folder.temp %>/STG/grunticon/png.css',
						'<%= SETTINGS.folder.css %>/STG/symbols.data.png.css',
					],
					'<%= SETTINGS.folder.temp %>/STG/HTML/assets/css/symbols-<%= pkg.version %>.fallback.css': [
						'<%= SETTINGS.folder.temp %>/STG/grunticon/fallback.css',
						'<%= SETTINGS.folder.css %>/STG/symbols.fallback.css',
					],
				},
			},

			grunticonWBC: {
				files: {
					'<%= SETTINGS.folder.temp %>/WBC/HTML/assets/css/symbols-<%= pkg.version %>.data.svg.css': [
						'<%= SETTINGS.folder.temp %>/WBC/grunticon/svg.css',
						'<%= SETTINGS.folder.css %>/WBC/symbols.data.svg.css',
					],
					'<%= SETTINGS.folder.temp %>/WBC/HTML/assets/css/symbols-<%= pkg.version %>.data.png.css': [
						'<%= SETTINGS.folder.temp %>/WBC/grunticon/png.css',
						'<%= SETTINGS.folder.css %>/WBC/symbols.data.png.css',
					],
					'<%= SETTINGS.folder.temp %>/WBC/HTML/assets/css/symbols-<%= pkg.version %>.fallback.css': [
						'<%= SETTINGS.folder.temp %>/WBC/grunticon/fallback.css',
						'<%= SETTINGS.folder.css %>/WBC/symbols.fallback.css',
					],
				},
			},

			jsBOM: {
				files: {
					'<%= SETTINGS.folder.temp %>/BOM/HTML/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/lib/**/*.js',
						'<%= SETTINGS.folder.temp %>/BOM/js/uglified.js',
					],
				},
			},

			jsBSA: {
				files: {
					'<%= SETTINGS.folder.temp %>/BSA/HTML/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/lib/**/*.js',
						'<%= SETTINGS.folder.temp %>/BSA/js/uglified.js',
					],
				},
			},

			jsSTG: {
				files: {
					'<%= SETTINGS.folder.temp %>/STG/HTML/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/lib/**/*.js',
						'<%= SETTINGS.folder.temp %>/STG/js/uglified.js',
					],
				},
			},

			jsWBC: {
				files: {
					'<%= SETTINGS.folder.temp %>/WBC/HTML/assets/js/site-<%= pkg.version %>.min.js': [
						'<%= SETTINGS.folder.js %>/lib/**/*.js',
						'<%= SETTINGS.folder.temp %>/WBC/js/uglified.js',
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
					'<%= SETTINGS.folder.temp %>/BOM/js/uglified.js': [
						'<%= SETTINGS.folder.temp %>/BOM/js/**/*.js',
						'!<%= SETTINGS.folder.temp %>/BOM/js/lib/**/*.js',
					],
				},
			},

			BSA: {
				files: {
					'<%= SETTINGS.folder.temp %>/BSA/js/uglified.js': [
						'<%= SETTINGS.folder.temp %>/BSA/js/**/*.js',
						'!<%= SETTINGS.folder.temp %>/BSA/js/lib/**/*.js',
					],
				},
			},

			STG: {
				files: {
					'<%= SETTINGS.folder.temp %>/STG/js/uglified.js': [
						'<%= SETTINGS.folder.temp %>/STG/js/**/*.js',
						'!<%= SETTINGS.folder.temp %>/STG/js/lib/**/*.js',
					],
				},
			},

			WBC: {
				files: {
					'<%= SETTINGS.folder.temp %>/WBC/js/uglified.js': [
						'<%= SETTINGS.folder.temp %>/WBC/js/**/*.js',
						'!<%= SETTINGS.folder.temp %>/WBC/js/lib/**/*.js',
					],
				},
			},

		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Grunticon to convert svgs into cross browser css files with png fallbacks
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		grunticon: {
			options: {
				datasvgcss: 'svg.css',
				datapngcss: 'png.css',
				urlpngcss: 'fallback.css',
				cssprefix: '.svg-',
				enhanceSVG: true,
				pngpath: '../img',
				customselectors: {
					'arrow': ['.link-more:after'],
				},
			},

			BOM: {
				files: [{
					expand: true,
					cwd: '<%= SETTINGS.folder.svg %>/',
					src: [
						'BOM/*.svg',
						'all/*.svg',
					],
					dest: '<%= SETTINGS.folder.temp %>/BOM/grunticon',
				}],
			},

			BSA: {
				files: [{
					expand: true,
					cwd: '<%= SETTINGS.folder.svg %>/',
					src: [
						'BSA/*.svg',
						'all/*.svg',
					],
					dest: '<%= SETTINGS.folder.temp %>/BSA/grunticon',
				}],
			},

			STG: {
				files: [{
					expand: true,
					cwd: '<%= SETTINGS.folder.svg %>/',
					src: [
						'STG/*.svg',
						'all/*.svg',
					],
					dest: '<%= SETTINGS.folder.temp %>/STG/grunticon',
				}],
			},

			WBC: {
				files: [{
					expand: true,
					cwd: '<%= SETTINGS.folder.svg %>/',
					src: [
						'WBC/*.svg',
						'all/*.svg',
					],
					dest: '<%= SETTINGS.folder.temp %>/WBC/grunticon',
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// JEKYLL
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		jekyll: {
			BOM: {
				options: {
					src : '<%= SETTINGS.folder.temp %>/BOM/html/',
					config: '<%= SETTINGS.folder.temp %>/BOM/html/_config.yml',
					dest: '<%= SETTINGS.folder.prod %>/BOM/',
				},
			},

			BSA: {
				options: {
					src : '<%= SETTINGS.folder.temp %>/BSA/html/',
					config: '<%= SETTINGS.folder.temp %>/BSA/html/_config.yml',
					dest: '<%= SETTINGS.folder.prod %>/BSA/',
				},
			},

			STG: {
				options: {
					src : '<%= SETTINGS.folder.temp %>/STG/html/',
					config: '<%= SETTINGS.folder.temp %>/STG/html/_config.yml',
					dest: '<%= SETTINGS.folder.prod %>/STG/',
				},
			},

			WBC: {
				options: {
					src : '<%= SETTINGS.folder.temp %>/WBC/html/',
					config: '<%= SETTINGS.folder.temp %>/WBC/html/_config.yml',
					dest: '<%= SETTINGS.folder.prod %>/WBC/',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Copy stuff around
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		copy: {
			moveTempBOM: {
				files: [{
					src: [
						'**/*.liquid',
						'**/*.less',
						'**/*.js',
						'**/*.yml',
						'**/*.md',
						'**/*.html',
					],
					cwd: '<%= SETTINGS.folder.dev %>',
					dest: '<%= SETTINGS.folder.temp %>/<%= SETTINGS.brands[0] %>',
					filter: 'isFile',
					expand: true,
				}],
			},

			moveTempBSA: {
				files: [{
					src: [
						'**/*.liquid',
						'**/*.less',
						'**/*.js',
						'**/*.yml',
						'**/*.md',
						'**/*.html',
					],
					cwd: '<%= SETTINGS.folder.dev %>',
					dest: '<%= SETTINGS.folder.temp %>/<%= SETTINGS.brands[1] %>',
					filter: 'isFile',
					expand: true,
				}],
			},

			moveTempSTG: {
				files: [{
					src: [
						'**/*.liquid',
						'**/*.less',
						'**/*.js',
						'**/*.yml',
						'**/*.md',
						'**/*.html',
					],
					cwd: '<%= SETTINGS.folder.dev %>',
					dest: '<%= SETTINGS.folder.temp %>/<%= SETTINGS.brands[2] %>',
					filter: 'isFile',
					expand: true,
				}],
			},

			moveTempWBC: {
				files: [{
					src: [
						'**/*.liquid',
						'**/*.less',
						'**/*.js',
						'**/*.yml',
						'**/*.md',
						'**/*.html',
					],
					cwd: '<%= SETTINGS.folder.dev %>',
					dest: '<%= SETTINGS.folder.temp %>/<%= SETTINGS.brands[3] %>',
					filter: 'isFile',
					expand: true,
				}],
			},

			//grunticon fallbacks
			fallback1BOM: {
				files: [{
					src: ['**/*.png'],
					cwd: '<%= SETTINGS.folder.temp %>/BOM/grunticon/png/',
					dest: '<%= SETTINGS.folder.temp %>/BOM/HTML/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			fallback2BOM: {
				files: [{
					src: ['**/*.png'],
					cwd: '<%= SETTINGS.folder.dev %>/img/BOM/',
					dest: '<%= SETTINGS.folder.temp %>/BOM/HTML/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},

			fallback1BSA: {
				files: [{
					src: ['**/*.png'],
					cwd: '<%= SETTINGS.folder.temp %>/BSA/grunticon/png/',
					dest: '<%= SETTINGS.folder.temp %>/BSA/HTML/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			fallback2BSA: {
				files: [{
					src: ['**/*.png'],
					cwd: '<%= SETTINGS.folder.dev %>/img/BSA/',
					dest: '<%= SETTINGS.folder.temp %>/BSA/HTML/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},

			fallback1STG: {
				files: [{
					src: ['**/*.png'],
					cwd: '<%= SETTINGS.folder.temp %>/STG/grunticon/png/',
					dest: '<%= SETTINGS.folder.temp %>/STG/HTML/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			fallback2STG: {
				files: [{
					src: ['**/*.png'],
					cwd: '<%= SETTINGS.folder.dev %>/img/STG/',
					dest: '<%= SETTINGS.folder.temp %>/STG/HTML/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},

			fallback1WBC: {
				files: [{
					src: ['**/*.png'],
					cwd: '<%= SETTINGS.folder.temp %>/WBC/grunticon/png/',
					dest: '<%= SETTINGS.folder.temp %>/WBC/HTML/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
			fallback2WBC: {
				files: [{
					src: ['**/*.png'],
					cwd: '<%= SETTINGS.folder.dev %>/img/WBC/',
					dest: '<%= SETTINGS.folder.temp %>/WBC/HTML/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//HTML
			// htmlBOM: {
			// 	files: [{
			// 		cwd: '<%= SETTINGS.folder.temp %>/BOM/html',
			// 		src: [
			// 			'**/*.html',
			// 			'**/*.md',
			// 			'**/*.liquid',
			// 		],
			// 		dest: '<%= SETTINGS.folder.prod %>/BOM/',
			// 		filter: 'isFile',
			// 		expand: true,
			// 	}],
			// },

			// htmlBSA: {
			// 	files: [{
			// 		cwd: '<%= SETTINGS.folder.temp %>/BSA/html',
			// 		src: [
			// 			'**/*.html',
			// 			'**/*.md',
			// 			'**/*.liquid',
			// 		],
			// 		dest: '<%= SETTINGS.folder.prod %>/BSA/',
			// 		filter: 'isFile',
			// 		expand: true,
			// 	}],
			// },

			// htmlSTG: {
			// 	files: [{
			// 		cwd: '<%= SETTINGS.folder.temp %>/STG/html',
			// 		src: [
			// 			'**/*.html',
			// 			'**/*.md',
			// 			'**/*.liquid',
			// 		],
			// 		dest: '<%= SETTINGS.folder.prod %>/STG/',
			// 		filter: 'isFile',
			// 		expand: true,
			// 	}],
			// },

			// htmlWBC: {
			// 	files: [{
			// 		cwd: '<%= SETTINGS.folder.temp %>/WBC/html',
			// 		src: [
			// 			'**/*.html',
			// 			'**/*.md',
			// 			'**/*.liquid',
			// 		],
			// 		dest: '<%= SETTINGS.folder.prod %>/WBC/',
			// 		filter: 'isFile',
			// 		expand: true,
			// 	}],
			// },

			//fonts
			allFontBOM: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/all',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.temp %>/BOM/HTML/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},
			fontBOM: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/BOM',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.temp %>/BOM/HTML/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},

			allFontBSA: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/all',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.temp %>/BSA/HTML/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},
			fontBSA: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/BSA',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.temp %>/BSA/HTML/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},

			allFontSTG: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/all',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.temp %>/STG/HTML/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},
			fontSTG: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/STG',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.temp %>/STG/HTML/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},

			allFontWBC: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/all',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.temp %>/WBC/HTML/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},
			fontWBC: {
				files: [{
					cwd: '<%= SETTINGS.folder.font %>/WBC',
					src: [
						'**/*.eot',
						'**/*.svg',
						'**/*.ttf',
						'**/*.woff',
						'**/*.woff2',
					],
					dest: '<%= SETTINGS.folder.temp %>/WBC/HTML/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//images
			imgBOM: {
				files: [{
					cwd: '<%= SETTINGS.folder.img %>/all',
					src: [
						'**/*.png',
						'**/*.jpg',
						'**/*.gif',
					],
					dest: '<%= SETTINGS.folder.temp %>/BOM/HTML/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},

			imgBSA: {
				files: [{
					cwd: '<%= SETTINGS.folder.img %>/all',
					src: [
						'**/*.png',
						'**/*.jpg',
						'**/*.gif',
					],
					dest: '<%= SETTINGS.folder.temp %>/BSA/HTML/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},

			imgSTG: {
				files: [{
					cwd: '<%= SETTINGS.folder.img %>/all',
					src: [
						'**/*.png',
						'**/*.jpg',
						'**/*.gif',
					],
					dest: '<%= SETTINGS.folder.temp %>/STG/HTML/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},

			imgWBC: {
				files: [{
					cwd: '<%= SETTINGS.folder.img %>/all',
					src: [
						'**/*.png',
						'**/*.jpg',
						'**/*.gif',
					],
					dest: '<%= SETTINGS.folder.temp %>/WBC/HTML/assets/img/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//favicons files
			faviconsAllBOM: {
				files: [{
					cwd: '<%= SETTINGS.folder.favicons %>/all',
					src: ['*'],
					dest: '<%= SETTINGS.folder.temp %>/BOM/HTML/',
					filter: 'isFile',
					expand: true,
				}],
			},
			faviconsBOM: {
				files: [{
					cwd: '<%= SETTINGS.folder.favicons %>/BOM',
					src: ['*'],
					dest: '<%= SETTINGS.folder.temp %>/BOM/HTML/',
					filter: 'isFile',
					expand: true,
				}],
			},

			faviconsAllBSA: {
				files: [{
					cwd: '<%= SETTINGS.folder.favicons %>/all',
					src: ['*'],
					dest: '<%= SETTINGS.folder.temp %>/BSA/HTML/',
					filter: 'isFile',
					expand: true,
				}],
			},
			faviconsBSA: {
				files: [{
					cwd: '<%= SETTINGS.folder.favicons %>/BSA',
					src: ['*'],
					dest: '<%= SETTINGS.folder.temp %>/BSA/HTML/',
					filter: 'isFile',
					expand: true,
				}],
			},

			faviconsAllSTG: {
				files: [{
					cwd: '<%= SETTINGS.folder.favicons %>/all',
					src: ['*'],
					dest: '<%= SETTINGS.folder.temp %>/STG/HTML/',
					filter: 'isFile',
					expand: true,
				}],
			},
			faviconsSTG: {
				files: [{
					cwd: '<%= SETTINGS.folder.favicons %>/STG',
					src: ['*'],
					dest: '<%= SETTINGS.folder.temp %>/STG/HTML/',
					filter: 'isFile',
					expand: true,
				}],
			},

			faviconsAllWBC: {
				files: [{
					cwd: '<%= SETTINGS.folder.favicons %>/all',
					src: ['*'],
					dest: '<%= SETTINGS.folder.temp %>/WBC/HTML/',
					filter: 'isFile',
					expand: true,
				}],
			},
			faviconsWBC: {
				files: [{
					cwd: '<%= SETTINGS.folder.favicons %>/WBC',
					src: ['*'],
					dest: '<%= SETTINGS.folder.temp %>/WBC/HTML/',
					filter: 'isFile',
					expand: true,
				}],
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
				text: '| Locate-us',
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

			js: {
				files: [
					'<%= SETTINGS.folder.js %>/**/*.js',
				],
				tasks: [
					'_buildDev',
					// '_replaceDev',
					// '_js',
					// '_html',
					// 'clean:temp',
					'wakeup',
				],
			},

			less: {
				files: [
					'<%= SETTINGS.folder.less %>/**/*.less',
				],
				tasks: [
					'_buildDev',
					// '_replaceDev',
					// '_less',
					// '_html',
					// 'clean:temp',
					'wakeup',
				],
			},

			svg: {
				files: [
					'<%= SETTINGS.folder.svg %>/**/*.svg',
				],
				tasks: [
					'_buildDev',
					// '_replaceDev',
					// '_svg',
					// '_html',
					// 'clean:temp',
					'wakeup',
				],
			},

			html: {
				files: [
					'<%= SETTINGS.folder.html %>/**/*.html',
					'<%= SETTINGS.folder.html %>/**/*.liquid',
					'<%= SETTINGS.folder.html %>/**/*.md',
				],
				tasks: [
					'_buildDev',
					// '_replaceDev',
					// '_html',
					// 'clean:temp',
					'wakeup',
				],
			},

			favicons: {
				files: [
					'<%= SETTINGS.folder.favicons %>/**/*',
				],
				tasks: [
					'_buildDev',
					// '_replaceDev',
					// '_favicons',
					// 'clean:temp',
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
					directory: '<%= SETTINGS.folder.prod %>',
					base: '<%= SETTINGS.folder.prod %>',
				},
			},
		},

	});



	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Private tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('_replaceDev', [
		'copy:moveTempBOM',
		'copy:moveTempBSA',
		'copy:moveTempSTG',
		'copy:moveTempWBC',
		'replace:devBOM',
		'replace:devBSA',
		'replace:devSTG',
		'replace:devWBC',
	]);

	grunt.registerTask('_replaceProd', [
		'copy:moveTempBOM',
		'copy:moveTempBSA',
		'copy:moveTempSTG',
		'copy:moveTempWBC',
		'replace:prodBOM',
		'replace:prodBSA',
		'replace:prodSTG',
		'replace:prodWBC',
	]);

	grunt.registerTask('_less', [
		'less',
	]);

	grunt.registerTask('_svg', [
		'grunticon:BOM',
		'grunticon:BSA',
		'grunticon:STG',
		'grunticon:WBC',
		'concat:grunticonBOM',
		'concat:grunticonBSA',
		'concat:grunticonSTG',
		'concat:grunticonWBC',
		'copy:fallback1BOM',
		'copy:fallback2BOM',
		'copy:fallback1BSA',
		'copy:fallback2BSA',
		'copy:fallback1STG',
		'copy:fallback2STG',
		'copy:fallback1WBC',
		'copy:fallback2WBC',
	]);

	grunt.registerTask('_js', [
		'uglify:BOM',
		'uglify:BSA',
		'uglify:STG',
		'uglify:WBC',
		'concat:jsBOM',
		'concat:jsBSA',
		'concat:jsSTG',
		'concat:jsWBC',
	]);

	grunt.registerTask('_html', [
		// 'jekyll:BOM',
		// 'jekyll:BSA',
		// 'jekyll:STG',
		'jekyll:WBC',
	]);

	grunt.registerTask('_fonts', [
		'copy:allFontBOM',
		'copy:fontBOM',
		'copy:allFontBSA',
		'copy:fontBSA',
		'copy:allFontSTG',
		'copy:fontSTG',
		'copy:allFontWBC',
		'copy:fontWBC',
	]);

	grunt.registerTask('_img', [
		'copy:imgBOM',
		'copy:imgBSA',
		'copy:imgSTG',
		'copy:imgWBC',
	]);

	grunt.registerTask('_favicons', [
		'copy:faviconsAllBOM',
		'copy:faviconsBOM',
		'copy:faviconsAllBSA',
		'copy:faviconsBSA',
		'copy:faviconsAllSTG',
		'copy:faviconsSTG',
		'copy:faviconsAllWBC',
		'copy:faviconsWBC',
	]);


	grunt.registerTask('_buildDev', [
		'clean:temp',
		'clean:prod',

		'_replaceDev',
		'_less',
		'_svg',
		'_js',
		'_fonts',
		'_img',
		'_favicons',
		'_html',

		'clean:temp',
	]);

	grunt.registerTask('_buildProd', [
		'clean:temp',
		'clean:prod',

		'_replaceProd',
		'_less',
		'_svg',
		'_js',
		'_fonts',
		'_img',
		'_favicons',
		'_html',

		'clean:temp',
	]);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Build tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('build', [ //run everything with debug on
		'font:title',
		'_buildDev',
		'wakeup',
	]);

	grunt.registerTask('prod', [ //run everything with debug off
		'font:title',
		'_buildProd',
		'wakeup',
	]);


	grunt.registerTask('default', [ //run build in dev mode with watch and server
		'build',
		'connect',
		'watch',
	]);

};