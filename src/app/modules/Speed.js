/**
 * Speed
 *
 * @class
 */
class Speed {
	/**
	 * @constructor
	 * @param {CommandRegistry} commandRegistry
	 */
	constructor(commandRegistry) {
		this.speed = 50;
		$.ogre.player.speed = this.speed;

		commandRegistry.registerChatCommand('speed', this.setSpeed.bind(this));
		commandRegistry.registerAttributeInterceptor('speed', this.stablizeSpeed.bind(this));
	}

	/**
	 * stablizeSpeed
	 *
	 * @returns {bool}
	 */
	stablizeSpeed() {
		$.ogre.player.speed = this.speed;

		return false;
	}

	/**
	 * setSpeed
	 *
	 * @param {string} speed
	 * @returns {void}
	 */
	setSpeed(speed) {
		if (speed.length === 0) {
			SAY('**', `[OISC] Speed: ${this.speed}`);
			return;
		}

		this.speed = parseInt(speed);
		$.ogre.player.speed = this.speed;

		SAY('**', `[OISC] Speed set to ${this.speed}`);
	}
}

export default Speed;
