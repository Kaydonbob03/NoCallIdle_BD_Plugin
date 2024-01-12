/**
 * @name NoCallIdle
 * @version 1.0.0
 * @description Prevents getting kicked from empty calls after 3 minutes.
 * @author Kaydonbob03
 * @website https://github.com/Kaydonbob03/NoCallIdle_BD_Plugin/
 * @source https://github.com/Kaydonbob03/NoCallIdle_BD_Plugin
 * @invite Jx3TjNS
 * @donate https://www.paypal.me/kaydonbob03
 * @updateUrl 
 */


const {
    flux: { intercept, dispatcher }
} = shelter;

const dispatchTypes = ["EMBEDDED_ACTIVITY_DISCONNECT", "VOICE_STATE_UPDATES"];

const onUnload = intercept((payload) => {
    if (dispatchTypes.includes(payload?.type)) {
        // delete handlers that start the call idle timeout
        const actionHandlers = dispatcher?._subscriptions?.[payload.type];
        for (const handler of actionHandlers) {
            if (handler.toString().includes("idleTimeout.start(")) {
                actionHandlers.delete(handler);
            }
        }
    }
});

module.exports = onUnload;
