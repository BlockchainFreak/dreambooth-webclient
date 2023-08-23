export const extractRawFile = (file: File) => {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
        reader.onload = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result)
            } else {
                reject("Error reading file")
            }
        }
        reader.readAsDataURL(file)
    })
}