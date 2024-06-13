import handler from "../handler";

const route = 'statistic/';

export default {
    async get_table_count(target: string) {
        return handler().get(`${route}table-count/${target}`);
    },

    async get_latest_updated_items(target: string, amount: number) {
        return handler().get(`${route}latest-updated-items/${target}?amount=${amount}`);
    },
}