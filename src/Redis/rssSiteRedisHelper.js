const RedisHelper = require('./redisHelper');
const StatusMessage = require('../Constants/statusMessages');
const { RssSite, sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');

const client = RedisHelper.client;

module.exports.pushRssSitesToRedis = async function () {
    let response = {
        message: ''
    }
    try {
        let availableSites = await sequelize.query('SELECT id, url, title, description, "siteLink", "imageUrl" FROM rss_site', {
            type: QueryTypes.SELECT
        });
        availableSites.forEach(async (rssSite) => {
            await client.hmset("rss_site", rssSite.id, JSON.stringify(rssSite));
        })
        response.message = StatusMessage.Stored_Site_Details_To_Redis;
        return response;
    } catch (error) {
        console.log(error);
        response.message = error;
        return response;
    }
}

module.exports.getAvailableSitesFromRedis = async function () {
    let response = {
        message: '',
        isSiteDetailsFetched: false
    }
    return new Promise(function (resolve, reject) {
        try {
            client.hgetall("rss_site", function (err, results) {

                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    if (results) {
                        let rssSiteData = results;
                        let rssSiteKeys = [];
                        rssSiteKeys = Object.keys(rssSiteData);
                        let rssSiteList = [];
                        rssSiteKeys.forEach((key) => {
                            rssSiteList.push(JSON.parse(rssSiteData[key]));
                        })
                        response.rssSiteList = rssSiteList;
                        response.isSiteDetailsFetched = true;
                        response.message = StatusMessage.Available_Rss_Sites_Fetched_Success;
                        resolve(response);
                    }
                    else {
                        response.message = StatusMessage.No_Site_Details_Found_In_Redis;
                        resolve(response);
                    }
                }
            });

        } catch (error) {
            console.log(error);
            response.message = error;
            reject(response);
        }
    })
}

module.exports.addRssSiteToRedis = async function (rssSite) {
    let response = {
        message: ''
    }
    try {
        await client.hmset("rss_site", rssSite.id, JSON.stringify(rssSite));
        response.message = StatusMessage.Stored_Site_Details_To_Redis;
        return response;
    } catch (error) {
        console.log(error);
        response.message = error;
        return response;
    }
}


module.exports.getSiteDetailsFromRedis = async function (rssId) {
    let response = {
        message: '',
        isSiteDetailsFetched: false
    }
    return new Promise(function (resolve, reject) {
        try {
            client.hget("rss_site", rssId, function (err, results) {

                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    if (results) {
                        let rssSiteData = results;
                        response.siteData = JSON.parse(rssSiteData);
                        response.isSiteDetailsFetched = true;
                        response.message = StatusMessage.Available_Rss_Sites_Fetched_Success;
                        resolve(response);
                    }
                    else {
                        response.message = StatusMessage.No_Site_Details_Found_In_Redis;
                        resolve(response);
                    }
                }
            });

        } catch (error) {
            console.log(error);
            response.message = error;
            reject(response);
        }
    })
}