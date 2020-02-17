const db = require('../db/mysql');
class Klient {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(imie, nazwisko, dataUrodzenia, numerDowodu, id) {
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.dataUrodzenia = dataUrodzenia;
        this.numerDowodu = numerDowodu;
        this.id = id;
        //this.selectedIndex;
    }

    //dodawanie obiektu do bazy
    static add(klient) {
      //wywołuje polecenie sql i zwraca promesę (Promise)
        return db.execute(
          'insert into klienci(imie, nazwisko, data_urodzenia, numer_dowodu) VALUES (?,?,?,?)',
          [klient.imie, klient.nazwisko, klient.dataUrodzenia, klient.numerDowodu]
        );
    }
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
      //wywołuje polecenie sql i zwraca promesę (Promise)
      return db.execute('select * from klienci');
    }
    //edycja obiektu
    static edit(klient) {
      console.log(JSON.stringify(klient));
      return db.execute(
        `update klienci 
        set
        imie = ?,
        nazwisko = ?,
        data_urodzenia=?,
        numer_dowodu=?
        where id_klienta = ?`,
       [klient.imie, klient.nazwisko, klient.dataUrodzenia, klient.numerDowodu, +klient.id]
     ); 
   }
   //klient.imie, klient.nazwisko, klient.dataUrodzenia, klient.numerDowodu, 
    //usuwanie obiektu po id
    static delete(id) {
      return db.execute(
        'delete from klienci where id_klienta=?',
        [id]
      );
    } 
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) { 
      return db.execute("select id_klienta, imie, nazwisko, DATE_FORMAT (data_urodzenia, '%Y-%m-%d') data_urodzenia, numer_dowodu from klienci where id_klienta=(?)",[id])
    }

    static history(id) { 
      return db.execute("select samochody.id_samochodu, marka, model, pojemnosc_silnika, skrzynia_biegow, kolor, numer_rejestracyjny, DATE_FORMAT(data_od, '%Y-%m-%d') data_od, DATE_FORMAT(data_do, '%Y-%m-%d') data_do, id_wypozyczenia from samochody join wypozyczenia on samochody.id_samochodu = wypozyczenia.id_samochodu where id_klienta = ?",
      [id]
      );
    }

    static search(string) {
      return db.execute(
        "select * from klienci where imie=? or nazwisko=? or numer_dowodu=?",
        [string, string, string]
      );
    }
}
module.exports = Klient;
// "set @str=?; select * from klienci where imie like CONCAT('%',@str,'%') or nazwisko like CONCAT('%',@str,'%')"