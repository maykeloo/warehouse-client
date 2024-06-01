export class ClientApiService {
  async registerClient(email: string, password: string) {
    const response = await fetch("http://localhost:3000/api/client/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    if (response.error) {
      throw response.error;
    }
    return response.json();
  }

  async loginClient(email: string, password: string) {
    const response = await fetch("http://localhost:3000/api/client/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    if (response.error) {
      throw response.error;
    }
    return response.json();
  }
}
