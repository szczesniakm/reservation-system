const { BadRequestError } = require("../errors");

const hosts = [
    { name: 's1', status: 'running' },
    { name: 's2', status: 'running' },
    { name: 's3', status: 'unavaliable' },
    { name: 's4', status: 'booting' },
    { name: 's7', status: 'unavaliable' },
    { name: 's8', status: 'booting' }
];

const getHostStatus = async (hostname) => {
    const host = hosts.find( h => h.name == hostname);

    if(!host) {
        throw new BadRequestError('Host not found');
    }

    return host.status; 
}

const getHosts = async () => {
    return hosts;
}

module.exports = { getHostStatus, getHosts };