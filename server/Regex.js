// CONNECTED TO ../CLIENT/SRC/REGEX.TS - WHEN CHANGING THIS FILE, CHANGE BOTH

export const nameRegex = /^[a-zA-Zа-яА-Я]{2,50}$/
export const middleNameRegex = /^[a-zA-Zа-яА-Я]{0,50}$/
export const jobTitleRegex = /^[a-zA-Zа-яА-Я]{0,40}$/
export const phoneRegex = /^(?:\+?\d{8,16}|)$/

export const priceRegex = /^[0-9]{1,4}$/
export const serviceNameRegex = /^[a-zA-Zа-яА-Я]{1,50}$/

export const categoryNameRegex = /^[a-zA-Zа-яА-Я ]{1,30}$/
