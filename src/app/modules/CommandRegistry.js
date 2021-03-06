/**
 * CommandRegistry
 *
 * @class
 */
class CommandRegistry {
	/**
	 * @constructor
	 */
	constructor() {
		this.registry = {};
		this.incomingPacketIntercepts = [];
		this.incomingCommandIntercepts = [];
		this.incomingAttributeIntercepts = [];

		this.initalizePacketInterceptor();
		this.initalizeCommandInterceptor();
		this.initializeAttributeInterceptor();
	}

	/**
	 * registerChatCommand
	 * This will register custom commands sent in chat.
	 * OISC will use the chat to initiate commands and allow
	 * the register to intercept them.
	 *
	 * @param {string} command
	 * @param {function} callback
	 * @returns {bool}
	 */
	registerChatCommand(command, callback) {
		console.log(`Registered OISC command ${command}`);
		this.registry[command] = callback;
	}

	/**
	 * interceptChat
	 *
	 * @returns {void}
	 */
	interceptChat() {
		window.OISC.overrides.ogre_sendMessage = $.ogre.sendMessage;
		$.ogre.sendMessage = message => {
			let messageArray = message.split(' ');

			if (messageArray[0] !== '/oisc' || this.registry[messageArray[1]] === undefined) {
				return window.OISC.overrides.ogre_sendMessage(message);
			}

			let registryCommand = messageArray[1];
			messageArray.splice(0, 2);
			let localResult = this.registry[registryCommand](messageArray);

			return false;
		}
	}

	/**
	 * registerPacketInterceptor
	 *
	 * @param {string} command
	 * @param {function} callback
	 * @returns {any}
	 */
	registerPacketInterceptor(command, callback) {
		this.incomingPacketIntercepts.push({
			command,
			callback,
		});
	}

	/**
	 * initializePacketInterceptor
	 *
	 * @returns {any}
	 */
	initalizePacketInterceptor() {
		window.OISC.overrides.ogre_gameHub_client_packet = $.ogre.gameHub.client.packet;

		$.ogre.gameHub.client.packet = packet => {
			let shouldContinue = true;
			let activeCallbacks = this.incomingPacketIntercepts.filter(intercept => intercept.command === packet.command);

			activeCallbacks.forEach(intercept => {
				let localIntercept = intercept.callback(packet);

				if (localIntercept === false) {
					shouldContinue = false;
				}
			});

			if (shouldContinue === true) {
				return window.OISC.overrides.ogre_gameHub_client_packet(packet);
			}

			return false;
		}
	}

	/**
	 * registerCommandInterceptor
	 *
	 * @param {string} command
	 * @param {function} callback
	 * @returns {any}
	 */
	registerCommandInterceptor(command, callback) {
		this.incomingCommandIntercepts.push({
			command,
			callback,
		});
	}

	/**
	 * initalizeCommandInterceptor
	 *
	 * @returns {any}
	 */
	initalizeCommandInterceptor() {
		window.OISC.overrides.ogre_gameHub_server_command = $.ogre.gameHub.server.command;

		$.ogre.gameHub.server.command = command => {
			let shouldContinue = true;
			let activeCallbacks = this.incomingCommandIntercepts.filter(localCommand => localCommand.command === command[0]);

			activeCallbacks.forEach(intercept => {
				let localIntercept = intercept.callback(command);

				if (localIntercept === false) {
					shouldContinue = false;
				}
			});

			if (shouldContinue === true) {
				return window.OISC.overrides.ogre_gameHub_server_command(command);
			}

			return false;
		}
	}

	/**
	 * registerAttributeInterceptor
	 *
	 * @param {string} attribute
	 * @param {function} callback
	 * @returns {any}
	 */
	registerAttributeInterceptor(attribute, callback) {
		this.incomingAttributeIntercepts.push({
			attribute,
			callback,
		});
	}

	/**
	 * initializeAttributeInterceptor
	 *
	 * @returns {any}
	 */
	initializeAttributeInterceptor() {
		window.OISC.overrides.ogre_gameHub_client_setAttribute = $.ogre.gameHub.client.setAttribute;

		$.ogre.gameHub.client.setAttribute = (id, attribute, value) => {
			let shouldContinue = true;
			let activeCallbacks = this.incomingAttributeIntercepts.filter(intercept => intercept.attribute === attribute);

			activeCallbacks.forEach(intercept => {
				let localIntercept = intercept.callback(id, attribute, value);

				if (localIntercept === false) {
					shouldContinue = false;
				}
			});

			if (shouldContinue === true) {
				return window.OISC.overrides.ogre_gameHub_client_setAttribute(id, attribute, value);
			}

			return false;
		}
	}
}

export default CommandRegistry;
