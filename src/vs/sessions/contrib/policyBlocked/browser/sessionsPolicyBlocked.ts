/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/sessionsPolicyBlocked.css';
import { Disposable, toDisposable } from '../../../../base/common/lifecycle.js';
import { $, append, EventType, addDisposableListener } from '../../../../base/browser/dom.js';
import { localize } from '../../../../nls.js';
import { ThemeIcon } from '../../../../base/common/themables.js';
import { Codicon } from '../../../../base/common/codicons.js';

/**
 * Full-window impassable overlay shown when the Agents app has been
 * disabled via group policy. Blocks all user interaction.
 */
export class SessionsPolicyBlockedOverlay extends Disposable {

	private readonly overlay: HTMLElement;

	constructor(container: HTMLElement) {
		super();

		this.overlay = append(container, $('.sessions-policy-blocked-overlay'));
		this.overlay.setAttribute('role', 'alert');
		this.overlay.setAttribute('aria-label', localize('policyBlocked.aria', "Agents app disabled by organization policy"));
		this._register(toDisposable(() => this.overlay.remove()));

		// Block all keyboard interaction
		this._register(addDisposableListener(this.overlay, EventType.KEY_DOWN, (e: KeyboardEvent) => {
			e.preventDefault();
			e.stopPropagation();
		}));

		// Block all mouse interaction on the overlay background
		this._register(addDisposableListener(this.overlay, EventType.MOUSE_DOWN, e => {
			e.preventDefault();
			e.stopPropagation();
		}));

		const card = append(this.overlay, $('.sessions-policy-blocked-card'));

		// Shield icon
		const icon = append(card, $('div'));
		icon.classList.add(...ThemeIcon.asClassNameArray(Codicon.lock));

		// Title
		append(card, $('h2', undefined, localize('policyBlocked.title', "Agents App Disabled")));

		// Description
		append(card, $('p', undefined, localize('policyBlocked.description', "The Agents app has been disabled by your organization's policy. Contact your administrator for more information.")));
	}
}
