const path = require('path')

const buildEslintCommand = (filenames) =>
   `next lint --fix --file ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(' --file ')}`

module.exports = {
   '*.{css,js,mjs,ts,tsx,md,mdx}': 'prettier --write',
   '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
