import axios from 'axios';
import axiosRetry from 'axios-retry';
import ProgressBar from 'progress';

const instance = axios.create({
    baseURL: 'https://online.moysklad.ru/api/remap/1.2',
    headers: {
        Authorization: `Bearer ${process.env.MS_TOKEN}`,
    },
});

axiosRetry(instance, {
    retries: 3,
    retryDelay: count => 1000 * count,
    retryCondition: error => {
        try {
            const errorCode = error.response && error.response.data.errors[0] && error.response.data.errors[0].code;
            if ([1073].includes(errorCode)) return true;
        } catch {}

        return false;
    },
});

instance.interceptors.request.use(config => {
    return config;
});

export const downloadListSize = async (url, params) => {
    return instance
        .get(url, {
            params: {
                limit: 0,
                filter: params.filter,
            },
        })
        .then(response => response.data);
};

export const downloadList = async (url, params, chunkCallback, metaCallback) => {
    let result = null;

    const preloadData = await downloadListSize(url, params);

    let size = params.limit === 1 ? 1 : preloadData.meta.size;

    if (!size) return preloadData;

    if (!params.offset) params.offset = 0;
    if (!params.limit) params.limit = 0;
    if (!params.expand) params.expand = [];

    let offset = params.offset | 0;
    const limit = Math.max(params.limit, params.expand && params.expand.length ? 100 : 1000);
    const expand = params.expand.join(',');
    const filter = params.filter && params.filter.join(';');
    if (!params.order) params.order = {};
    const order = Object.keys(params.order)
        .map(key => (params.order && params.order[key] === 1 ? `${key},asc` : `${key},desc`))
        .join(';');

    const progress = new ProgressBar('[:bar] :current/:total :rate/bps :percent :etas', {
        total: size,
        width: 20,
        complete: '=',
    });

    progress.render();

    while (!offset || offset < size) {
        const data = await instance
            .get(url, {
                params: {
                    limit,
                    offset,
                    expand,
                    filter,
                    order,
                },
            })
            .then(response => response.data);

        if (chunkCallback) await chunkCallback(data.rows);
        if (metaCallback) await metaCallback(data.meta);

        progress.total = data.meta.size;

        if (data.rows.length) progress.tick(data.rows.length);

        size = data.meta.size;

        size && offset + size < data.rows.length && console.info(`${url.slice(0, 30)} ... ${offset + size}/${data.meta.size}`);

        if (!result) {
            result = data;
        } else {
            result.meta = data.meta;
            result.rows.push(...data.rows);
        }

        offset = offset + limit;
    }

    if (!result) throw '!result';

    return result;
};

export default instance;
