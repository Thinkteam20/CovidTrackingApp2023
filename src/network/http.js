export default class CovidStatus {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.url = "/payment";
    }

    async getPaymentData(url) {
        const res = await fetch(`${this.baseURL}${this.url}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        let data;
        try {
            data = await res.json();
        } catch (error) {
            console.error(error);
        }
        return data;
    }
}
