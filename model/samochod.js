const db = require('../db/mysql');
class Samochod {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(marka, model, pojemnoscSilnika, skrzyniaBiegow,kolor, numerRejestracyjny, id) {
        this.marka = marka;
        this.model = model;
        this.pojemnoscSilnika = pojemnoscSilnika;
        this.skrzyniaBiegow = skrzyniaBiegow;
        this.kolor = kolor;
        this.numerRejestracyjny = numerRejestracyjny;
        this.id = id;
        //this.selectedIndex;
    }

    //dodawanie obiektu do bazy
    static add(samochod) {
      //wywołuje polecenie sql i zwraca promesę (Promise)
        return db.execute(
          'insert into samochody(marka, model, pojemnosc_silnika, skrzynia_biegow, kolor, numer_rejestracyjny) values (?,?,?,?,?,?)',
          [samochod.marka, samochod.model, samochod.pojemnoscSilnika, samochod.skrzyniaBiegow, samochod.kolor, samochod.numerRejestracyjny]
        );
    }
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
      //wywołuje polecenie sql i zwraca promesę (Promise)
      return db.execute('select * from samochody');
    }
    //edycja obiektu
    static edit(samochod) {
      console.log(JSON.stringify(samochod));
      return db.execute(
         `update samochody 
          set 
          marka = ?,
          model = ?,
          pojemnosc_silnika=?,
          skrzynia_biegow=?,
          kolor=?,
          numer_rejestracyjny=?
          where id_samochodu = ?`,
        [samochod.marka, samochod.model, +samochod.pojemnoscSilnika, +samochod.skrzyniaBiegow, samochod.kolor, samochod.numerRejestracyjny, +samochod.id]
      ); 
    }

    //usuwanie obiektu po id
    static delete(id) {
      return db.execute(
        'delete from samochody where id_samochodu=?',
        [id]
      );
    } 

    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
      return db.query('select * from samochody where id_samochodu=(?)',[id])
    }

    static history(id) {
      return db.execute("select klienci.id_klienta, imie, nazwisko, numer_dowodu, DATE_FORMAT(data_od, '%Y-%m-%d') data_od, DATE_FORMAT(data_do, '%Y-%m-%d') data_do, id_wypozyczenia from klienci join wypozyczenia on klienci.id_klienta = wypozyczenia.id_klienta where id_samochodu = ?",
      [id]
      );
    }

    static search(data_od, data_do){
      return db.execute(
        'SELECT distinct marka, model, numer_rejestracyjny, samochody.id_samochodu  FROM samochody LEFT JOIN wypozyczenia ON samochody.id_samochodu = wypozyczenia.id_samochodu WHERE (? > wypozyczenia.data_do or ? < wypozyczenia.data_od or wypozyczenia.data_od is null or wypozyczenia.data_do is null)',
        [data_od, data_do]
      );
    }
    
   
}
module.exports = Samochod;