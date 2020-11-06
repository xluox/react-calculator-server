const logs = [];



const addLog = ({id, log}) => {
    const newLog = {id, log};
    logs.push(newLog);

    return {newLog};
}

const getLogs = () => logs;


module.exports = {addLog, getLogs};