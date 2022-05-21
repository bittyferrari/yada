const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 9,
		sourceType: 'module',
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': 'off',
		'no-debugger': isProd ? 'error' : 'off',
	},
};
