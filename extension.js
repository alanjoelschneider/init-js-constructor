const vscode = require('vscode');
const utils = require('./utils');

function initConstructor() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;

    const lineNumber = editor.selection.active.line;
    const line = document.lineAt(lineNumber);
    const args = line.text.match(/\w+/g);

    if (utils.ipop(args, 0) === 'constructor') {
      const tab = ' '.repeat(2);
      const properties = args
        .reduce((acc, val) => acc.concat('\n', tab, tab, 'this.', val, ' = ', val, ';'), ' {')
        .concat('\n\t}');

      const position = new vscode.Position(lineNumber, line.text.length);
      editor.edit((editBuilder) => editBuilder.insert(position, properties));
    }
  }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const disposable = vscode.commands.registerCommand('init-js-constructor.init', initConstructor);
  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
