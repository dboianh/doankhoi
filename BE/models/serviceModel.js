const db = require('../database/db')

    class Service {

        getAll() {
            return new Promise((resolve, reject) => {
                db.query('SELECT * FROM services', (err, results) => {
                    if (err) reject(err)
                    resolve(results)
                } )
            })    
        }

        getById(id) {
            return new Promise((resolve, reject) => {
                db.query('SELECT * FROM services WHERE service_id = ?', [id], (error, results) => {
                    if (error) reject(error)
                    resolve(results[0])
                })
            })
        }

        create(service) {
            return new Promise((resolve, reject) => {
                db.query('INSERT INTO services SET ?', service, (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                })
            })
        }

        delete(id) {
            return new Promise((resolve, reject) => {
                db.query('DELETE FROM services WHERE service_id = ?', [id], (error, results) => {
                    if(error) reject(error);
                    resolve(results)
                })
            })  
        }

        update(id, service) {
            return new Promise((resolve, reject) => {
                db.query('UPDATE services SET ? WHERE service_id = ?', [service, id], (error, results) => {
                    if(error) reject(error);
                    resolve(results)
                })
            })
        }

        


    }

module.exports = new Service();