export function safeJsonParse(input) {
    console.log(input)
    try {
        return JSON.parse(input);
    } catch (error) {
        return {};
    }
}