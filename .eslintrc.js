module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
   "indent": [
   	"off"
   ],
   "generator-star-spacing": "off",
   "no-tabs": "off",
   "no-unused-vars": "off",
   "no-console": "off",
   "no-irregular-whitespace": "off",
   "no-debugger": "off",
   "no-mixed-spaces-and-tabs": "off",
   "no-trailing-spaces": "off",
   "linebreak-style": [
   	0,
   	"error",
   	"windows"
   ],
   "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
   "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
   "vue/no-v-html": "off",
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
