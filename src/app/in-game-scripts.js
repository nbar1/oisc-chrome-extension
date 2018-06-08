import CommandRegistry from './modules/CommandRegistry.js';
import AutoCast from './modules/AutoCast.js';
import AutoLoot from './modules/AutoLoot.js';
import Bank from './modules/Bank.js';

/**
 * overridePLAY
 * Overrides the default PLAY function
 *
 * @returns {void}
 */
const overridePLAY = () => {
	window.OISC.overrides.PLAY = PLAY;
	const commandRegistry = new CommandRegistry();
	const mBank = new Bank(commandRegistry);

	window.PLAY = () => {
		SAY('[OISC]', 'Ogre Island Super Client initialized.');
		SAY('[OISC]', 'This software may be considered against the Ogre Island rules. Use at your own risk.');

		initialize(commandRegistry);

		commandRegistry.interceptChat();

		return window.OISC.overrides.PLAY();
	}
}

const initialize = (commandRegistry) => {
	$('body').addClass('oisc');

	// Allow for further zooming
	$('#zoombar #zoom').attr('min', '0.1');

	// fix request bombardment to OI. You're welcome Vaga.
	$('#zoom').off('mousemove');

	// modules initialization
	let mAutoCast = new AutoCast(commandRegistry);
	let mAutoLoot = new AutoLoot(commandRegistry);
}


const inGameScripts = () => {
	overridePLAY();
}

export { inGameScripts };
