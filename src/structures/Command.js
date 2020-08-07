class Command {
	constructor(args, fileName) {
		this.name = args.name;
		this.description = args.description;
		this.visible = args.visible;
    this.helpInfo = args.helpInfo;
    this.function = args.execute;
    this.permissionLevel = args.permissionLevel;
		this.fileName = fileName;
	}

	execute(bot, config, message) {
    for (let i = 0; i < this.permissionLevel.length; i++) {
			if (!message.member.permission.json[this.permissionLevel]) return;
		}
		this.function(bot, config, message);
	}

	get help() {
		return [this.name, this.description, this.visible, this.helpInfo, this.permissionLevel];
	}

}

module.exports = Command;
