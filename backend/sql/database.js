const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'kave',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function selectall() {
    const query = 'SELECT * FROM exampletable;';
    const [rows] = await pool.execute(query);
    return rows;
}
async function osszes() {
    const query = 'SELECT kave.nev, ar, orszag.nev AS szarmazas, o2.nev AS gyartas FROM kave INNER JOIN orszag ON orszag.id = kave.bab_szarmazasi_orszag INNER JOIN orszag o2 ON o2.id = kave.bab_gyartasi_orszag;';
    const [rows] = await pool.execute(query);
    return rows;
}
async function coffees() {
    const query = 'SELECT kave.nev, ar, orszag.nev AS szarmazas, o2.nev AS gyartas FROM kave INNER JOIN orszag ON orszag.id = kave.bab_szarmazasi_orszag INNER JOIN orszag o2 ON o2.id = kave.bab_gyartasi_orszag;';
    const [rows] = await pool.execute(query);
    return rows;
}
async function coffeesPost(nev, ar, bab_szarmazasi_orszag, bab_gyartasi_orszag) {
    const query = 'INSERT INTO kave(nev, ar, bab_szarmazasi_orszag, bab_gyartasi_orszag) VALUES(?,?,?,?);';
    const [rows] = await pool.execute(query, [nev, ar, bab_szarmazasi_orszag, bab_gyartasi_orszag]);
    return rows;
}
async function countriesByBean() {
    const query = 'SELECT COUNT(kave.nev) AS db, orszag.nev AS szarmazas FROM kave INNER JOIN orszag ON orszag.id = kave.bab_szarmazasi_orszag INNER JOIN orszag o2 ON o2.id = kave.bab_gyartasi_orszag GROUP BY orszag.nev;';
    const [rows] = await pool.execute(query);
    return rows;
}
async function coffeesByCountry(id) {
    const query = 'SELECT COUNT(kave.nev) AS db, orszag.nev AS szarmazas FROM kave INNER JOIN orszag ON orszag.id = kave.bab_szarmazasi_orszag WHERE orszag.id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows;
}
async function countries() {
    const query = 'SELECT orszag.id, orszag.nev FROM orszag;';
    const [rows] = await pool.execute(query);
    return rows;
}
//!Export
module.exports = {
    selectall,
    osszes,
    coffees,
    coffeesPost,
    countriesByBean,
    coffeesByCountry,
    countries
};
