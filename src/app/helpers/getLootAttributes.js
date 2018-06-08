/**
 * getLootAttributes
 *
 * @param {string} data
 * @returns {array}
 */
function getLootAttributes(data) {
	let loot = [];
	let eachItem = data.split(';');

	eachItem.forEach(item => {
		if (item === '') return;

		let itemSplit = item.split(',');
		let description = itemSplit[4].split(' - ');

		let thisItem = {
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

		loot.push(thisItem);
	});

	return loot;
}

export default getLootAttributes;
