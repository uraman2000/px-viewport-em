// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

const width = 1920;
const height = 1080;
const basicPixel = 48;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "px-viewport" is now active!');

  const highlight = () => {
    const editor = vscode.window.activeTextEditor;
    let cursorPosition = editor.selection.start;
    let wordRange = editor.document.getWordRangeAtPosition(cursorPosition);
    let highlight = editor.document.getText(wordRange);
    return highlight;
  };

  const convertToViewport = (viewport, value) => {
    // $vh: (768 * 0.01) * 1px;
    // @return ($object / $vh) * 1vh;
    const vp = viewport * 0.01 * 1;
    // @ts-ignore
    let output = (highlight().replace("px", "") / vp) * 1;
    return `${output}${value}`;
  };

  const ConvertToEm = () => {
    // target ÷ context = result
    // @ts-ignore
    const result = highlight().replace("px", "") / basicPixel;

    return `${result.toFixed(3)}em`;
  };

  let em = vscode.commands.registerCommand("px-viewport.em", function () {
    const editor = vscode.window.activeTextEditor;
    try {
      let cursorPosition = editor.selection.start;
      let wordRange = editor.document.getWordRangeAtPosition(cursorPosition);
      editor.edit((editBuilder) => {
        editBuilder.replace(wordRange, ConvertToEm());
      });
      vscode.window.showInformationMessage("converted to em");
    } catch (error) {
      vscode.window.showInformationMessage(error);
    }
  });

  let vh = vscode.commands.registerCommand("px-viewport.vh", function () {
    const editor = vscode.window.activeTextEditor;
    try {
      let cursorPosition = editor.selection.start;
      let wordRange = editor.document.getWordRangeAtPosition(cursorPosition);
      editor.edit((editBuilder) => {
        editBuilder.replace(wordRange, convertToViewport(height, "vh"));
      });

      vscode.window.showInformationMessage("converted to vh");
    } catch (error) {
      vscode.window.showInformationMessage(error);
    }
  });

  let vw = vscode.commands.registerCommand("px-viewport.vw", function () {
    const editor = vscode.window.activeTextEditor;
    try {
      let cursorPosition = editor.selection.start;
      let wordRange = editor.document.getWordRangeAtPosition(cursorPosition);
      editor.edit((editBuilder) => {
        editBuilder.replace(wordRange, convertToViewport(width, "vw"));
      });
      vscode.window.showInformationMessage("converted to vw");
    } catch (error) {
      vscode.window.showInformationMessage(error);
    }
  });

  context.subscriptions.push(vh);
  context.subscriptions.push(vw);
  context.subscriptions.push(em);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
