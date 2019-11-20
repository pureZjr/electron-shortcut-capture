module.exports = {
	ignoreFiles: [
		'node_modules/**/*.scss',
		'**/*.md',
		'**/*.ts',
		'**/*.tsx',
		'**/*.js'
	],
	extends: ['stylelint-prettier/recommended'],
	plugins: ['stylelint-order'],
	rules: {
		'prettier/prettier': true,
		'order/order': ['custom-properties', 'declarations'],
		'order/properties-alphabetical-order': true
	}
}
