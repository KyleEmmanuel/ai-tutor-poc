export function safeJsonParse(input) {
    console.log(input)
    try {
        return JSON.parse(input);
    } catch (error) {
        return {};
    }
}

export function waitFor(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
