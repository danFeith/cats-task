// @ts-check

import eslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginPrototypePollution from "eslint-plugin-prototype-pollution";
import eslintPluginSecurity from "eslint-plugin-security";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: ["dist/", "node_modules/", "src/scripts/db/createInitMigrationFile.js"]
	},
	eslint.configs.recommended,
	...tseslint.configs.strictTypeChecked.map(config => ({
		...config,
		files: ["**/*.ts"]
	})),
	eslintPluginPrettierRecommended,
	eslintPluginPrototypePollution.configs.recommended,
	eslintPluginSecurity.configs.recommended,
	{
		files: ["**/*.js", "**/*.ts"],
		languageOptions: {
			parserOptions: {
				project: ["tsconfig.json", "src/tests/tsconfig.json"]
			}
		},
		linterOptions: {
			reportUnusedDisableDirectives: true
		},
		name: "custom-config",
		rules: {
			"array-callback-return": "error",
			camelcase: "warn",
			eqeqeq: ["error", "smart"],
			"no-duplicate-imports": ["error", { includeExports: true }],
			"no-empty": ["error", { allowEmptyCatch: true }],
			"no-eval": "error",
			"no-unused-expressions": "warn",
			"no-unused-vars": [
				"error",
				{
					args: "none",
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					ignoreRestSiblings: true,
					varsIgnorePattern: "^_|^set"
				}
			],
			"no-var": "error",
			"security/detect-object-injection": "off",
			yoda: ["error", "never", { exceptRange: true }]
		}
	},
	{
		files: ["**/*.ts"],
		languageOptions: {
			parserOptions: {
				project: ["tsconfig.json", "src/tests/tsconfig.json"]
			}
		},
		linterOptions: {
			reportUnusedDisableDirectives: true
		},
		name: "custom-config-ts",
		rules: {
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-confusing-void-expression": "off",
			"@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
			"@typescript-eslint/no-extraneous-class": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/restrict-plus-operands": "warn",
			"@typescript-eslint/no-unnecessary-condition": "off",
			"@typescript-eslint/no-unnecessary-type-parameters": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unused-expressions": "warn",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "none",
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					ignoreRestSiblings: true,
					varsIgnorePattern: "^_|^set"
				}
			],
			"@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
			"@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
			"no-unused-expressions": "off",
			"no-unused-vars": "off"
		}
	},
	{
		files: ["**/*.js", "**/*.ts"],
		name: "perfectionist",
		plugins: {
			perfectionist
		},
		rules: {
			"perfectionist/sort-exports": [
				"error",
				{
					order: "asc",
					type: "natural"
				}
			],
			"perfectionist/sort-imports": [
				"error",
				{
					groups: [
						"builtin",
						"external",
						"internal",
						"sibling",
						"parent",
						"index",
						"object",
						"unknown",
						"builtin-type",
						"external-type",
						"internal-type",
						"sibling-type",
						"parent-type",
						"index-type"
					],
					internalPattern: [
						"common/**",
						"db/**",
						"extensions/**",
						"fastifyPlugins/**",
						"modules/**",
						"providers/**",
						"scripts/**",
						"services/**",
						"tests/**",
						"config",
						"logger",
						"shutdown",
						"fastify.config",
						"swagger"
					],
					newlinesBetween: "never",
					order: "asc",
					type: "natural"
				}
			]
		}
	},
	{
		files: ["**/*.js"],
		languageOptions: tseslint.configs.disableTypeChecked.languageOptions,
		name: "js-specific",
		rules: {
			"no-undef": "off",
			...tseslint.configs.disableTypeChecked.rules
		}
	},
	{
		files: ["src/tests/**/*"],
		languageOptions: {
			globals: {
				...globals.jest
			}
		},
		name: "jest-custom-config",
		rules: {
			"@typescript-eslint/unbound-method": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/no-unsafe-return": "off"
		}
	}
);
