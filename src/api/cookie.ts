import Cookies from "universal-cookie"
import { CookieSetOptions } from "universal-cookie"

const cookies = new Cookies()

export const setCookie = (name: string, value: string, options?: CookieSetOptions) => {
	return cookies.set(name, value, { ...options })
}

export const getCookie = (name: string) => {
	return cookies.get(name)
}

export const removeCookie = (name: string, options?: CookieSetOptions) => {
	return cookies.remove(name, { ...options })
}
