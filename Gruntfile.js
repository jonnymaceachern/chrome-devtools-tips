module.exports = function(grunt) {

	// Display elapsed time for tasks
	require('time-grunt')(grunt);

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-sass');

	// Configure
	grunt.initConfig({

		// Watch
		watch: {
			styles: {
				files: ['!node_modules', 'scss/**/*.scss'],
				tasks: ['compile']
			}
		},

		// SCSS
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'main.css':'scss/main.scss'
				}
			}
		},

		// Vendor prefixes
		postcss: {
			options: {
				map: true,

				processors: [
					require('pixrem')(),
					require('autoprefixer')({
						browsers: ['last 2 versions', 'ie 8', 'ie 9']
					}),
					// require('cssnano')() 
				],
			},
			'main.min.css' : 'main.css'
		},

		browserSync: {
			bsFiles: {
				src: ['main.min.css', 'index.html'],
			},
			options: {
				watchTask: true,
				server: './'
			}
		}

	});

	// Register tasks
	grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('compile', ['sass', 'postcss']);

}
