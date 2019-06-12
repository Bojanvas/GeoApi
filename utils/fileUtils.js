const fs = require('fs');
const readline = require('readline');

const fileUtils = {

    /*
    * Read .txt file and return array of lines
    * @arg1 name of the file with extension
    * @arg2 complete callback with array of lines
    */
    async processLineByLine(fileName, lines) {
        const fileStream = fs.createReadStream(fileName);
      
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.
      
        var linesList = []
        for await (const line of rl) {
          // Each line in input.txt will be successively available here as `line`.
          console.log(`Line from file: ${line}`);
          linesList.push(line);
        }
        lines(linesList);
    }
}

module.exports = fileUtils;