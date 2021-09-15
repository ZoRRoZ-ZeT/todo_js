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
      })
      .catch((error) => {
        throw new Error(error.message);
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
      })
      .catch((error) => {
        throw new Error(error.message);
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
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  updateTask(body) {
    return fetch(environment.apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
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
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
}

decorate(injectable(), TaskApiService);

export default TaskApiService;
