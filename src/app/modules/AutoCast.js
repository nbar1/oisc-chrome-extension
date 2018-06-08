/**
 * AutoCast
 *
 * @class
 */
class AutoCast {
	/**
	 * @constructor
	 *
	 * @param {CommandRegistry} commandRegistry
	 */
	constructor(commandRegistry) {
		this.isActive = false;

		commandRegistry.registerChatCommand('cast', this.cast.bind(this));
	}

	/**
	 * getAvailableSkills
	 *
	 * @returns {array}
	 */
	getAvailableSkills() {
		let availableSkills = [];

		$('#skillbar .barbuttonskill').each((i, node) => {
			availableSkills.push($(node).attr('alt'));
		});

		return availableSkills;
	}

	/**
	 * cast
	 *
	 * @param {string} skill
	 * @returns {bool}
	 */
	cast(skill) {
		skill = skill.join(' ');

		if (this.getAvailableSkills().indexOf(skill) === -1) {
			SAY('[OISC]', `You must add the "${skill}" skill to your toolbar to use it.`);

			return false;
		}

		$.ogre.sendMessage(`/DO ${skill}`);

		return false;
	}
}

export default AutoCast;
