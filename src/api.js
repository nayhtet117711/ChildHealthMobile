const BASE_URL = "http://192.168.43.123:3333"
const SYMPTOM_LIST = BASE_URL+"/symptoms"
const EXPERT_SYSTEM = BASE_URL+"/experts"
const SIGNUP = BASE_URL+"/accounts/register"
const LOGIN = BASE_URL+"/accounts/login"

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
    .then(data => {
        console.log(data)
        callback(null, data)
    })
    .catch(error => callback(error, null))
}

const fetchSignup = (user, callback) => {
    fetch(SIGNUP, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(error => callback(error, null))
}

const fetchLogin = (user, callback) => {
    fetch(LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(error => callback(error, null))
}

export {
    fetchSymptomList,
    fetchExpertSystem,
    fetchSignup,
    fetchLogin,
}