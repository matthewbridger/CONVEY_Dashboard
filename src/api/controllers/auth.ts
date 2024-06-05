import handler from "../handler";

const route = 'authentication/';

export default {
    async sign_up(user: object) {
        return handler().post(`${route}signup`, user);
    },

    async sign_in(user: object) {
        return handler().post(`${route}signin`, user);
    },

    async sign_out() {
        return handler().post(`${route}signout`);
    },

    async validate_session(session_id: string, user: object) {
        return handler().post(`${route}whoami`, { session_id, user });
    },  
}