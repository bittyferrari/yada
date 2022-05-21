const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = (env, options) => {
	const isProduction = options.mode === 'production';

	const config = {
		entry: './src/index',

		module: {
			rules: [],
		},

		plugins: [
			new Dotenv({
				path: isProduction ? './.env' : './.env.dev', // Path to .env file (this is the default)
				safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
			}),
			new ESLintPlugin(),
		],

		target: 'node',

		optimization: { minimize: isProduction ? true : false },

		performance: { hints: false },

		devtool: isProduction ? 'source-map' : 'inline-source-map',

		externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.

		externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
	};

	if (!isProduction) {
		config.plugins.push(
			new NodemonPlugin({
				nodeArgs: ['--inspect'],
			})
		);
	}

	return config;
};

module.exports = config;
