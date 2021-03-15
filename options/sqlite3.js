const path = require('path');

const options = {
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '../DB/mydb.sqlite')
    }, 
    useNullAsDefault: true
}

module.exports = {
    options
}