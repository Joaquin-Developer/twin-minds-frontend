
const API_URL = "" || "http://127.0.0.1:8069";


export default class APIService {
    static async mailExists(mail) {
        const url = `${API_URL}/users/mail-exists/${mail}`;
        const res = await fetch(url);
        const data = await res.json();
        const exists = data.exists;
        console.log(exists ? "Email already exists" : "Email not exists")
        return exists;
    }

    static async createNewUser(userData) {
        const url = `${API_URL}/users/create`;
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
        return await res.json();
    }
}
