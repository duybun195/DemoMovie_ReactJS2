const fs = require("fs")
const path = require("path")

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"))

module.exports = {
  extends: ["react-app", "prettier", "prettier/react"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["warn", prettierOptions],
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      rules: {
        "react/jsx-wrap-multilines": "warn",
        "react/no-string-refs": "warn",
        "react-hooks/exhaustive-deps": "off",
        "prettier/prettier": ["warn", prettierOptions],
        "jsx-a11y/anchor-is-valid": [
          "off",
          {
            components: ["Link"],
            specialLink: ["hrefLeft", "hrefRight"],
            aspects: ["noHref", "invalidHref", "preferButton"],
          },
        ],
      },
    },
  ],
}
