/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Benjamin Wodhams
 *
 */

const baseAPI = '/api';

const userService = {
  get() {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/users`)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  create(user) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/user/create`, {
          method: 'PUT',
          body: JSON.stringify(user),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  update(user) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/user/update`, {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  destroy(user) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/user/${user.email}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  login(info) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/user/login`, {
          method: 'POST',
          body: JSON.stringify(info),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  updateStripe(info){
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/user/updateStripe`, {
          method: 'POST',
          body: JSON.stringify(info),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getCards(email){
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/user/getCards/${email}`)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default userService;