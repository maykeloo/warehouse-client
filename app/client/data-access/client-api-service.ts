export class ClientApiService {
  async registerClient(email: string, password: string) {
    const response = await fetch("http://localhost:3000/api/client/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return res.json();
    });

    if (response.error) {
      throw response.error;
    }

    return response;
  }
}
