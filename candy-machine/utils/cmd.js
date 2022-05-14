const util = require("util");
const exec = util.promisify(require("child_process").exec);

exports.runCommand = async (command) => {
  const { stdout, stderr, error } = await exec(command);
  if (stderr) {
    console.error("stderr:", stderr);
    return false;
  }
  if (error) {
    console.error("error:", error);
    return false;
  }
  return stdout;
};
