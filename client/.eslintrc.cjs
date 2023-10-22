module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react-refresh', 'react', 'react-hooks'],
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			rules: {
				'@typescript-eslint/array-type': 'error',
				'@typescript-eslint/indent': ['error', 'tab'],
				'@typescript-eslint/object-curly-spacing': ['error', 'always'],
				'@typescript-eslint/type-annotation-spacing': 'error',
				'@typescript-eslint/typedef': [
					'error',
					{
						parameter: true,
						arrowParameter: true,
						propertyDeclaration: true,
					},
				],
				'@typescript-eslint/space-before-function-paren': [
					'error',
					{
						anonymous: 'never',
						named: 'never',
						asyncArrow: 'ignore',
					},
				],
				'@typescript-eslint/prefer-function-type': 'error',
				'@typescript-eslint/prefer-ts-expect-error': 'error',
				'@typescript-eslint/quotes': [
					'error',
					'single',
					{ avoidEscape: true },
				],

				'arrow-parens': 'error',
				'comma-dangle': ['error', 'always-multiline'],
				'new-parens': 'error',
				'max-params': ['error', { max: 3 }],
			},
		},
		{
			files: ['**/*.tsx'],
			rules: {
				'jsx-quotes': ['error', 'prefer-double'],
				'react/jsx-curly-spacing': [
					'error',
					{ when: 'always', children: true },
				],
				'react/jsx-equals-spacing': 'error',
				'react/jsx-wrap-multilines': 'error',
				'react/no-string-refs': 'error',
			},
		},
	],
	rules: {
		curly: ['error', 'all'],
		'no-invalid-regexp': 'error',
		'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
		'no-multi-spaces': ['error', { ignoreEOLComments: true }],
		'no-regex-spaces': 'error',
		'no-return-await': 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': ['error', 'always'],
	},
};
