const firstUpper = (value) => {
    if (typeof value === 'string' && value.length > 0) {
        let firstLetter = value.substring(0,1).toUpperCase();
        return firstLetter + value.substring(1);
    }
    return value;
}

export default firstUpper;