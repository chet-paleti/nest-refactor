

const db = require('../database');

exports.login = (uname,passwd) => {
    
    return db.execute(
        'select user from members WHERE user = ? and pass = ?',
        [uname, passwd]
      )
}