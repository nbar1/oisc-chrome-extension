/**
 * Bank
 *
 * @class
 */
class Bank {
	/**
	 * @constructor
	 * @param {CommandRegistry} commandRegistry
	 */
	constructor(commandRegistry) {
		this.contents = [];
		commandRegistry.registerPacketInterceptor('ADDTOBAG', this.analyzeItems.bind(this));
		commandRegistry.registerCommandInterceptor('CLICKBAGITEM', this.clickItemInBag.bind(this));
	}

	/**
	 * analyzeItems
	 *
	 * @param {object} packet
	 */
	analyzeItems(packet) {
		if (packet.args[0].indexOf('bag') !== 0 && packet.args[0].indexOf('bank') !== 0) {
			return true;
		}

		let eachItem = packet.args[1].split(';');

		eachItem.forEach(item => {
			if (item === '') return;

			let itemSplit = item.split(',');
			let description = itemSplit[4].split(' - ');

			let thisItem = {
				container: packet.args[0],
				id: itemSplit[0],
				x: itemSplit[1],
				y: itemSplit[2],
				z: itemSplit[3],
				description: description[0].trim(),
			};

			if (description[1] !== undefined) {
				thisItem.quality = description[1].replace('Quality: ', '');
			}
			if (description[2] !== undefined) {
				thisItem.value = description[2].replace('Value: ', '');
			}

			this.contents.push(thisItem);
		});

		setTimeout(() => {
			this.formatElements();
		});

		return true;
	}

	/**
	 * clickItemInBag
	 *
	 * @param {array} packet
	 * @returns {void}
	 */
	clickItemInBag(packet) {
		if ($('#bankwin').is(':visible') === false || packet[1] !== 'bag') return;

		setTimeout(() => $.ogre.gameHub.server.command(['CLICKBANK', 'bank2', 0, 0]));
	}

	/**
	 * formatElements
	 *
	 * @returns {void}
	 */
	formatElements() {
		this.contents.forEach(bagItem => {
			if (bagItem.container !== 'bank2') return;

			$(`#${bagItem.id}`).html(`<div>${bagItem.description}</div><div>${bagItem.quality || ''}</div><div>${bagItem.value || ''}</div>`);
		});
	}
}

export default Bank;
