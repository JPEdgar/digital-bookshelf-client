const cropString = (str = "", maxLength = 0) => {
    const test = str
    const returnStr = str.length <= maxLength ? str : test.substring(0, maxLength) + "..."
    return returnStr
}

export default cropString