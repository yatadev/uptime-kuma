/**
 * String.prototype.replaceAll() polyfill
 * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr){

        // If a regex pattern
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            return this.replace(str, newStr);
        }

        // If a string
        return this.replace(new RegExp(str, 'g'), newStr);

    };
}

const pkg = require('../package.json');
const fs = require("fs");
const oldVersion = pkg.version
const newVersion = oldVersion + "-nightly"

console.log("Old Version: " + oldVersion)
console.log("New Version: " + newVersion)

if (newVersion) {
    // Process package.json
    pkg.version = newVersion
    pkg.scripts.setup = pkg.scripts.setup.replaceAll(oldVersion, newVersion)
    pkg.scripts["build-docker"] = pkg.scripts["build-docker"].replaceAll(oldVersion, newVersion)
    fs.writeFileSync("package.json", JSON.stringify(pkg, null, 4) + "\n")

    // Process README.md
    if (fs.existsSync("README.md")) {
        fs.writeFileSync("README.md", fs.readFileSync("README.md", 'utf8').replaceAll(oldVersion, newVersion))
    }
}
