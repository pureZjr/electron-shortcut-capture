module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	extends: [
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'prettier/@typescript-eslint', // 使用eslint-config-prettier的@ typescript-eslint/eslint-plugin禁用与prettier的冲突的ESLint规则。
		'plugin:prettier/recommended' // 启用eslint-plugin-prettier和eslint-config-prettier。确保这是扩展中的最后一个。
	],
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true // 允许解析JSX
		}
	},
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		// e.g. "@typescript-eslint/explicit-function-return-type": "off",
	},
	settings: {
		react: {
			version: 'detect' // 自动检测要使用的React版本
		}
	}
}
