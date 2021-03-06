const BASE_URL = "http://10.0.2.2:3333"
const SYMPTOM_LIST = BASE_URL+"/symptoms"
const DISEASE_LIST = BASE_URL+"/diseases"
const EXPERT_SYSTEM = BASE_URL+"/experts"
const RECORDS = BASE_URL+"/records"
const SIGNUP = BASE_URL+"/accounts/register"
const LOGIN = BASE_URL+"/accounts/login"

const fetchSymptomList = (childAge, callback) => { 
    fetch(`${SYMPTOM_LIST}?childAge=${childAge}`)
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(error => callback(error, null))
}

const fetchDiseaseList = (callback) => { 
    fetch(`${DISEASE_LIST}`)
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(error => callback(error, null))
}

const fetchSaveDisease = (data, callback) => { 
    // console.log({ data })
    alert(JSON.stringify(data))
    fetch(`${DISEASE_LIST}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(error => callback(error, null))
}

const fetchExpertSystem = (childAge, { symptoms, username }, callback) => {
    fetch(`${EXPERT_SYSTEM}?childAge=${childAge}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({symptoms, username})
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data)
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

const fetchRecords = (username, callback) => { 
    // console.log(`${RECORDS}?username=${username}`)
    fetch(`${RECORDS}?username=${username}`)
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(error => callback(error, null))
}

export {
    fetchSymptomList,
    fetchDiseaseList,
    fetchExpertSystem,
    fetchSignup,
    fetchLogin,
    fetchSaveDisease,
    fetchRecords
}