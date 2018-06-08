import { outOfGameScripts } from './out-of-game-scripts.js';
import { inGameScripts } from './in-game-scripts.js';

// set OISC global object
window.OISC = {
	overrides: {},
};

let location = window.location.href;

if (location !== 'https://www.ogreisland.com/Play5') {
	// load website scripts to show OISC is loaded
	outOfGameScripts();
}
else {
	inGameScripts();
}
