'use strict';

import * as vscode from 'vscode';
import * as uiflow from 'uiflow';
import { CancellationToken, CompletionList, Definition, DefinitionProvider, ExtensionContext, Location, TextDocument, Position } from 'vscode';
import { selector } from './mode';

export function activate(context: ExtensionContext) {
	const provider = new UiflowDefinitionProvider();
	const registration = vscode.languages.registerDefinitionProvider(selector, provider);
	context.subscriptions.push(registration);
}

export class UiflowDefinitionProvider implements DefinitionProvider {
	public provideDefinition(document: TextDocument, position: Position, token: CancellationToken): Definition {
		const lineText = document.lineAt(position.line);
		if (!lineText.text.substring(0, position.character).match(/=.*=>/)) {
			return undefined;
		}
		const match = lineText.text.match(/=.*=>+\s*([^:\]]*)/);
		if (!match) {
			return undefined;
		}
		const name = match[1];
		const json = uiflow.parser.parse(document.getText(), '');
		const section = json[name];
		if (!section) {
			return undefined;
		}
		const match_comment = lineText.text.match(/#.*/)
		if (!match_comment) {
			return undefined;
		}
		const pos = new Position(section.lines, 0);
		const location = new Location(document.uri, pos);
		return location;
	}
}