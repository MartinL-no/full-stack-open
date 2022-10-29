import { useEffect } from "react"
import axios from 'axios'

const baseUrl = "https://restcountries.com/v3.1/name/"

export const useCountry = (userInput) => {
  useEffect(() => {
    const request = axios.get(`https://restcountries.com/v3.1/name/${baseUrl}?fullText=true`)
    const data = request.then(response => response.data)
    console.log(data)

  }, [userInput])
}