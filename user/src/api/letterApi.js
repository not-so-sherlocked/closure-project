

import axios from "axios";

const BASE_URL= "https://love-link-mtyd.onrender.com/api/letter";

export const listAllLetters=async ()=>{
    return axios.get(`${BASE_URL}/get-letter/`)
}

export const getLetterById=async (id)=>{
    return axios.get(`${BASE_URL}/get-letter/${id}`);
}

export const getLetterByIdWithQuestions=async (id,answers)=>{

    return axios.post(`${BASE_URL}/get-letter/${id}`,{answers});

}

export const uploadLetter=async (payload)=>{
    return axios.post(`${BASE_URL}/upload`,payload);
}