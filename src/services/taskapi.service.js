/* eslint-disable class-methods-use-this */
import { decorate, injectable } from 'inversify';
import environment from '../environment';

class TaskApiService {
  getSingle(id) {
    return fetch(`${environment.apiUrl}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          console.log(data.payload);
          return data.payload;
        }
        throw new Error(data);
      });
  }

  getAll() {
    return fetch(environment.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          console.log(data.payload);
          return data.payload;
        }
        throw new Error(data);
      });
  }

  createTask(body) {
    return fetch(environment.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          return data.payload;
        }
        throw new Error(data);
      });
  }

  updateTask(body) {
    return fetch(environment.apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          console.log(data.payload);
          return data.payload;
        }
        throw new Error(data);
      });
  }

  deleteTask(id) {
    return fetch(`${environment.apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          console.log(data.payload);
          return data.payload;
        }
        throw new Error(data);
      });
  }
}

decorate(injectable(), TaskApiService);

export default TaskApiService;
