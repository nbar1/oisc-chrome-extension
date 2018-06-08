import getLootAttributes from '../helpers/getLootAttributes.js';

/**
 * AutoLoot
 *
 * @class
 */
class AutoLoot {
	/**
	 * @constructor
	 * @param {CommandRegistry} commandRegistry
	 */
	constructor(commandRegistry) {
		this.contents = [];
		commandRegistry.registerPacketInterceptor('ADDTOBAG', this.lootItems.bind(this));
	}

	/**
	 * lootItems
	 *
	 * @param {object} packet
	 */
	lootItems(packet) {
		// return if bag addition wasn't to a npc loot bag
		if (packet.args[0] !== 'loot2') return true;

		let loot = getLootAttributes(packet.args[1]);

		loot.forEach(lootItem => {
			$.ogre.gameHub.server.command(['CLICKBAGITEM', 'loot', lootItem.id]);

			let lootMessage = `Looted ${lootItem.description}`;
			lootMessage += lootItem.quality ? `, ${lootItem.quality}` : '';
			lootMessage += lootItem.value ? `, ${lootItem.value}` : '';

			SAY('**', `[OISC] ${lootMessage}`);
		});

		console.log(loot);

		return true;
	}
}

export default AutoLoot;
