export const createFormData = async () => {
    if (typeof window === "undefined") {
        const FormData = await import("form-data")
        return new FormData()
    } else {
        return new FormData()
    }
}