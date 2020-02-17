const db = require('../db/mysql');

class Wypozyczenie {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(id_klienta, id_samochodu, data_od, data_do, id_wypozyczenia) {
        this.id_klienta = id_klienta;
        this.id_samochodu = id_samochodu;
        this.data_od = data_od;
        this.data_do = data_do;
        this.id_wypozyczenia = id_wypozyczenia;
    }

    static add(wypozyczenie) {
        //wywołuje polecenie sql i zwraca promesę (Promise)
          return db.execute(
            'insert into wypozyczenia(id_klienta, id_samochodu, data_od, data_do) values (?,?,?,?)',
            [wypozyczenie.id_klienta, wypozyczenie.id_samochodu, wypozyczenie.data_od, wypozyczenie.data_do]
          );
    }
    static delete(id) {
        return db.execute(
          'delete from wypozyczenia where id_wypozyczenia=?',
          [id]
        );
      }
    static details(id) { 
        return db.execute(
            `SELECT 
            id_wypozyczenia, wypozyczenia.id_klienta, wypozyczenia.id_samochodu, DATE_FORMAT(data_od, '%Y-%m-%d') data_od, DATE_FORMAT(data_do, '%Y-%m-%d') data_do,
            imie, nazwisko, DATE_FORMAT(data_urodzenia, '%Y-%m-%d') data_urodzenia, numer_dowodu,
            marka, model, numer_rejestracyjny
            FROM wypozyczenia join klienci on wypozyczenia.id_klienta = klienci.id_klienta join samochody on wypozyczenia.id_samochodu = samochody.id_samochodu 
            where id_wypozyczenia =?`,
            [id]
        );
    }
    static edit(id_wypozyczenia, id_klienta, id_samochodu, data_od, data_do) {
        console.log(id_wypozyczenia);
        console.log(id_klienta);
        console.log(id_samochodu);
        console.log(data_od);
        console.log(data_do);
        return db.execute(
          `update wypozyczenia 
          set
          id_klienta = ?,
          id_samochodu = ?,
          data_od=?,
          data_do=?
          where id_wypozyczenia = ?`,
         [+id_klienta, +id_samochodu, data_od, data_do, +id_wypozyczenia]
       ); 
     }
}
module.exports = Wypozyczenie;