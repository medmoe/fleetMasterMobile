export function zip<T>(...arrays: T[][]): T[][] {
    const length = Math.min(...arrays.map(arr => arr.length));
    const result: T[][] = [];

    for (let i = 0; i < length; i++) {
        result.push(arrays.map(arr => arr[i]));
    }

    return result;
}


export const isPositiveInteger = (str: string): boolean => {
    const pattern = new RegExp('^[0-9]\\d*$')
    return pattern.test(str)
}
