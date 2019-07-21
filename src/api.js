const BASE_URL = "http://192.168.56.1:3333"
const SYMPTOM_LIST = BASE_URL+"/symptoms"
const EXPERT_SYSTEM = BASE_URL+"/experts"

const fetchSymptomList = (callback) => { 
    fetch(SYMPTOM_LIST)
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(error => callback(error, null))
}

const fetchExpertSystem = ({ symptoms }, callback) => {
    fetch(EXPERT_SYSTEM, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({symptoms})
    })
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(error => callback(error, null))
}

export {
    fetchSymptomList,
    fetchExpertSystem,

}