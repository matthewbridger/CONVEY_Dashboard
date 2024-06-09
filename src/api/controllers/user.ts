import handler from "../handler";

const route = 'user/';

export default {
    async get_list() {
        return handler().get(`${route}list`);
    },

    async get(key: string) {
        return handler().get(`${route}${key}`);
    },

    async add(user: any) {
        return handler().post(`${route}add`, user);
    },

    async edit(user: any) {
        return handler().put(`${route}edit`, user);
    },

    async restore(id: any) {
        return handler().post(`${route}restore/${id}`);
    },

    async soft_delete(id: any) {
        return handler().delete(`${route}delete/${id}`);
    },
}