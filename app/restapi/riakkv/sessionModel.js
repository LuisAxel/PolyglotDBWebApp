const Riak = require('basho-riak-client');
const client = new Riak.Client(['172.17.0.3:8087']);

const BUCKET_TYPE = 'sesiones';
const BUCKET = 'sesion';

const createSession = async (data) => {
    const key = `sesion_${data.usuario_id}`;
    return new Promise((resolve, reject) => {
        client.storeValue({ bucketType: BUCKET_TYPE, bucket: BUCKET, key: key, value: data }, (err, response) => {
            if (err) return reject(err);
            resolve(response);
        });
    });
};

const getSession = async (id) => {
    return new Promise((resolve, reject) => {
        client.fetchValue({ bucketType: BUCKET_TYPE, bucket: BUCKET, key: id }, (err, response) => {
            if (err) return reject(err);
            const result = response.values.map(value => JSON.parse(value.value.toString()));
            resolve(result[0]);
        });
    });
};

const updateSession = async (id, data) => {
    return new Promise((resolve, reject) => {
        client.fetchValue({ bucketType: BUCKET_TYPE, bucket: BUCKET, key: id }, (err, fetchResponse) => {
            if (err) return reject(err);
            if (fetchResponse.values.length === 0) {
                return resolve({ message: 'Session not found', updated: false });
            }

            const existingObject = fetchResponse.values[0];
            const existingData = JSON.parse(existingObject.value.toString());

            const updatedData = {
                ...existingData,
                ...data
            };

            existingObject.setValue(JSON.stringify(updatedData));

            client.storeValue({ value: existingObject }, (err, storeResponse) => {
                if (err) return reject(err);
                resolve(storeResponse);
            });
        });
    });
};

const deleteSession = async (id) => {
    return new Promise((resolve, reject) => {
        client.deleteValue({ bucketType: BUCKET_TYPE, bucket: BUCKET, key: id }, (err, response) => {
            if (err) return reject(err);
            resolve(response);
        });
    });
};

module.exports = {
    createSession,
    getSession,
    updateSession,
    deleteSession
};