export function titleCase(input: string) {
return input.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
