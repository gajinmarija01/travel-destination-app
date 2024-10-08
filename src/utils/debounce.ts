export const debounce = <F extends (...args: any[]) => any>(func: F, wait: number): F => {
    let timeout: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<F>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    } as F;
};
