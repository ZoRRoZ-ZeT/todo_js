/* eslint-disable class-methods-use-this */
import { decorate, injectable } from 'inversify';
import environment from '../environment';

class TaskApiService {
  async getSingle(id) {
    const response = await fetch(`${environment.apiUrl}/${id}`);
    const data = await this.getDataFromResponse(response);

    return data;
  }

  async getAll() {
    const response = await fetch(environment.apiUrl);
    const data = await this.getDataFromResponse(response);

    return data;
  }

  async createTask(body) {
    const response = await fetch(environment.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await this.getDataFromResponse(response);

    return data;
  }

  async updateTask(body) {
    const response = await fetch(environment.apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await this.getDataFromResponse(response);

    return data;
  }

  async deleteTask(id) {
    const response = await fetch(`${environment.apiUrl}/${id}`, {
      method: 'DELETE',
    });
    const data = await this.getDataFromResponse(response);

    return data;
  }

  async getDataFromResponse(response) {
    const data = await response.json();
    if (data.statusCode === 200) {
      return data.payload;
    }
    throw new Error(JSON.stringify(data));
  }
}

decorate(injectable(), TaskApiService);

export default TaskApiService;
