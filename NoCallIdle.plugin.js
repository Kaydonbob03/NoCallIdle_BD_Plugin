/**
 * @name NoCallIdle
 * @version 1.0.0
 * @description Prevents getting kicked from empty calls after 3 minutes.
 * @author Kaydonbob03
 * @website https://github.com/Kaydonbob03/NoCallIdle_BD_Plugin/
 * @source https://github.com/Kaydonbob03/NoCallIdle_BD_Plugin
 * @donate https://www.paypal.me/kaydonbob03
 * @updateUrl https://github.com/Kaydonbob03/NoCallIdle_BD_Plugin/blob/main/NoCallIdle.plugin.js
 */

module.exports = class NoCallIdle {
    constructor() {
        this.cancelPatch = null;
    }

    load() {
        // Called when the plugin is loaded
    }

    start() {
        // Called when the plugin is started
        this.patchVoiceModule();
    }

    stop() {
        // Called when the plugin is stopped
        if (this.cancelPatch) {
            this.cancelPatch();
            this.cancelPatch = null;
        }
    }

    patchVoiceModule() {
        const voiceModule = BdApi.findModuleByProps("startCallIdleTimer");
        if (!voiceModule) return;

        this.cancelPatch = BdApi.Patcher.instead("NoCallIdle", voiceModule, "startCallIdleTimer", (thisObject, args, originalFunction) => {
            // You can modify or skip the call to originalFunction based on your needs
            // For example, to prevent the idle timer from starting, you can simply not call the original function
            console.log("Prevented call idle timer from starting.");
        });
    }
};

