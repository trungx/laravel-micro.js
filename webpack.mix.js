const mix = require('laravel-mix');
const WebpackRequireFrom = require('webpack-require-from')
const plugins = [
	new WebpackRequireFrom({
		 //path: '/vendor/cms/',
		 variableName: "chunkURL"
	})
]
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.setPublicPath('docs')
mix.babelConfig({
	'plugins': [
		'syntax-dynamic-import',
		'transform-object-rest-spread'
	]
})
mix.options({
	processCssUrls: false,
	uglify: {
		sourceMap: true,
		uglifyOptions: {
			mangle: {
				keep_fnames: true,
				reserved: [
					'App',
					'Kernel',
					'Config',
					'Request',

					'ServiceV1',
					'ServiceV2',
					'Service_V1',
					'Service_V2',

					'Authenticate',
					'RandomLoadingText',
					'artisanMessage',

					'Vue',
					'Events',
					'EventBus',
					'VueRoot',
					'Router',
					'VueRouter',
					'routerLinks',
					'LazyService',
				]
			},
		}
	}
})
mix.webpackConfig({
	plugins: plugins,
	resolve: {
		alias: {
			'laravel-micro.js': path.resolve(__dirname, 'src'),
			'@components': path.resolve(__dirname, 'docs-src/js/Components'),
			'@pages': path.resolve(__dirname, 'docs-src/js/Pages'),
		}
	},
	output: {
		chunkFilename: 'components/[name].js' //mix.inProduction() ? 'components/[name].[chunkhash].js' : 'components/[name].js',
	}
})
mix.extract([
	'vue',
	'vue-router'
])
mix
	.js('docs-src/js/bootstrap.js', 'app.js')
	.sass('docs-src/sass/app.scss', 'app.css')


if (!mix.inProduction()) {
	mix.sourceMaps()
}
