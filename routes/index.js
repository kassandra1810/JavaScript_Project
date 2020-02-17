const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');

const Klient = require('../model/klient');
const Samochod = require('../model/samochod');
const Wypozyczenie = require('../model/wypozyczenie')
const bodyParser = require('body-parser');
const alert = require('alert-node');
const urlencodedParser = bodyParser.urlencoded({ extended: false }) //


router.get('/', (req, res) => {
   res.render('home');
});

//SAMOCHODY

router.get("/samochody", (req, res, next) => {
   Samochod.list()
      .then( ([samochodList, metadata]) => {
         //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
         res.render('samochody', {samochodList: samochodList});
      })
      .catch(err => {
         //błąd komunikacji z bazą danych
         console.log(err);
      });
});

router.get("/dodawanieSamochodu", (req, res, next) => {
   res.render('dodawanieSamochodu', {pageTitle: "Nowy samochód", formAction: "add", samochod: {} });
});

router.post("/dodajSamochod", (req, res, next) => {
   const newSamochod = new Samochod(req.body.marka, req.body.model, req.body.pojemnoscSilnika, req.body.skrzyniaBiegow, req.body.kolor, req.body.numerRejestracyjny);
   if (carValidate(newSamochod) === -1) {
   Samochod.add(newSamochod)
      .then(() => {
         res.redirect("/samochody");
         console.log(req.body.marka, req.body.model, req.body.pojemnoscSilnika, req.body.skrzyniaBiegow, req.body.kolor, req.body.numerRejestracyjny);
      })
      .catch(err => {
         console.log(err);
      }); 
   } 
   else{
      if(alert(komunikat)) {
         res.redirect("/dodawanieSamochodu");
      }
   }  
});

router.get("/usuwanieSamochodu/:id", (req, res, next) => {
   var id = req.params.id;
   console.log(id);
   Samochod.delete(id)
   .then(([]) => {
      res.redirect("/samochody");
   })
   .catch(err => {
      //błąd komunikacji z bazą danych
      console.log(err);
   });
});

router.get("/szczegolySamochodu/:id", (req, res, next) => {
   var id = req.params.id;
   Samochod.details(id)
   .then(s => {
      var sam = s[0];
      console.log(sam); // print user object;
      res.render('szczegolySamochodu',{sam:sam});
  })
  .catch(error => {
      // error;    
  });     
}); 

router.get("/edycjaSamochodu/:id", (req, res, next) => {
   var id = req.params.id;
   Samochod.details(id)
   .then(([samochody, metadane]) => {
      var sam = samochody[0];
      //console.log(sam); // print user object;
      res.render('edycjaSamochodu',{sam:sam});
  })
  .catch(error => {
      // error;    
      console.log(error);
  });     
});

router.post("/edytujSamochod", (req, res, next) => {
   var id = req.body.id;
   const newSamochod = new Samochod(req.body.marka, req.body.model, req.body.pojemnoscSilnika, req.body.skrzyniaBiegow, req.body.kolor, req.body.numerRejestracyjny, req.body.id);
   if (carValidate(newSamochod) === -1) {
   Samochod.edit(newSamochod)
      .then(() => {
         res.redirect("/samochody");
         //console.log(req.body.marka, req.body.model, req.body.pojemnoscSilnika, req.body.skrzyniaBiegow, req.body.kolor, req.body.numerRejestracyjny);
      })
      .catch(err => {
         console.log(err);
      });   
   }
   else{
      if(alert(komunikat)) {
         res.redirect("/edycjaSamochodu/"+ id);
      }
   }
});

router.get("/historiaWypozyczenSamochody/:id", (req, res, next) => {
   var id = req.params.id;
   Samochod.history(id)
   .then(([klientList, metadata]) => {
      Samochod.details(id)
      .then(([s, metadata]) => {
         var sam = s[0];
         res.render('historiaWypozyczenSamochody',{klientList:klientList, sam:sam});
      })
  })
   .catch(error => {
      console.log(err);    
  });     
});  

// KLIENCI

router.get("/klienci", (req, res, next) => {
   Klient.list()
      .then( ([klientList, metadata]) => {
         //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
         res.render('klienci', {klientList: klientList});
      }) 
      .catch(err => {
         //błąd komunikacji z bazą danych
         console.log(err);
      });
});

router.get("/dodawanieKlienta", (req, res, next) => {
   res.render('dodawanieKlienta', {pageTitle: "Nowy klient", formAction: "add", klient: {} });
});

router.post("/dodajKlienta", (req, res, next) => {
   const newKlient = new Klient(req.body.imie, req.body.nazwisko, req.body.dataUrodzenia, req.body.numerDowodu);
   if (clientValidate(newKlient) === -1) {
      Klient.add(newKlient)
         .then(() => {
            res.redirect("/klienci");
            //console.log(req.body.imie, req.body.nazwisko, req.body.dataUrodzenia, req.body.numerDowodu);
         })
         .catch(err => {
            console.log(err);
         });   
   } 
   else{
      if(alert(komunikat)) {
         res.redirect("/dodawanieKlienta");
      }
   }  
});

router.get("/usuwanieKlienta/:id", (req, res, next) => {
   var id = req.params.id;
   Klient.delete(id)
   .then(([]) => {
      res.redirect("/klienci");
   })
   .catch(err => {
      //błąd komunikacji z bazą danych
      console.log(err);
   });
});

router.get("/szczegolyKlienta/:id", (req, res, next) => {
   var id = req.params.id;
   Klient.details(id)
   .then(k => {
      //console.log(k[0]); // print user object;
      var kl = k[0];
      console.log(kl); // print user object;
      res.render('szczegolyKlienta',{kl:kl});
  })
  .catch(error => {
      // error;    
  });     
}); 

router.get("/edycjaKlienta/:id", (req, res, next) => {
   var id = req.params.id;
   Klient.details(id)
   .then(([klienci, metadane]) => {
      var kl = klienci[0];
      res.render('edycjaKlienta',{kl:kl});
  })
  .catch(error => {
      // error;    
      console.log(error);
  });     
});

router.post("/edytujKlienta", (req, res, next) => {
   var id = req.body.id;
   const newKlient = new Klient(req.body.imie, req.body.nazwisko, req.body.dataUrodzenia, req.body.numerDowodu, req.body.id);
   if (clientValidate(newKlient) === -1) {
   Klient.edit(newKlient)
      .then(() => {
         res.redirect("/klienci");
      })
      .catch(err => {
         console.log(err);
      });   
   }
   else{
      if(alert(komunikat)) {
         res.redirect("/edycjaKlienta/"+id);
      }
   }
});

router.get("/historiaWypozyczenKlienci/:id", (req, res, next) => {
   var id = req.params.id;
   Klient.history(id)
   .then(([samochodList, metadata]) => {
      //console.log(JSON.stringify(samochodList));
      Klient.details(id)
      .then(([klient, metadata]) => {
         var kl = klient[0];
         res.render('historiaWypozyczenKlienci',{samochodList:samochodList, kl:kl});
      })
  })
   .catch(error => {
      console.log(error);    
  });     
});  

// WYPOŻYCZENIE

router.get('/wypozyczenie', (req, res) => {
   res.render('dodwypozyczenie');
   //console.log(path.join('views','dodwypozyczenie.pug'));
   //console.log(__dirname);
 });

router.post('/szukanieKlienta', (req, res) => {
   var str = req.body.szukany;
   Klient.search(str)
   .then(([klientList, metadata]) => {
      console.log(JSON.stringify(klientList));
      res.render(('dodawanieWypozyzenia2'),{klientList:klientList});
   })
   .catch(err => {
      console.log(err);
   });
});

router.get("/dokonanieWypozyczenia/:id", (req, res, next) => {
   var id = req.params.id;
   Klient.details(id)
   .then(k => {
      //console.log(k[0]); // print user object;
      var kl = k[0];
      console.log(kl); // print user object;
      res.render('dokonanieWypozyczenia',{kl:kl});
  })
  .catch(error => {
      // error;    
  });     
});

var dataOd;
var dataDo;
router.post('/szukanieSamochodu', (req, res) => {
   if ((dateValidate(req.body.dataOd) === -1) && (dateValidate(req.body.dataDo) === -1 )){
      dataOd = req.body.dataOd;
      dataDo = req.body.dataDo;
      Klient.details(req.body.id)
      .then(([kl, metadata]) => {
         Samochod.search(dataOd, dataDo)
         .then(([samochodList, metadata]) => {
            //console.log(JSON.stringify(samochodList));
            res.render(('dokonanieWypozyzenia2'),{samochodList:samochodList, kl:kl, dataOd:dataOd, dataDo:dataDo});
         })
      })
      .catch(err => {
         console.log(err);
      });
   } else {
      alert(komunikat);
   }
});

router.get('/dokonanieWypozyczenia2/:sam/:kl/', (req, res) => {
   var idSamochodu = req.params.sam;
   var idKlienta = req.params.kl;
      console.log(idSamochodu+' sam');
      console.log(idKlienta+' kli');
      const newWypozyczenie = new Wypozyczenie(idKlienta,idSamochodu,dataOd,dataDo);
      if (rentValidate(newWypozyczenie) === -1) {
         Wypozyczenie.add(newWypozyczenie)
         .then(() => {
            res.redirect('/historiaWypozyczenKlienci/'+idKlienta);
            //console.log(req.body.imie, req.body.nazwisko, req.body.dataUrodzenia, req.body.numerDowodu);
         })
         .catch(err => {
            console.log(err);
         });  
      }
      else{
         if(alert(komunikat)) {
            res.redirect("/wypozyczenie");
         }
      }
 });

router.get("/usuwanieWypozyczenia/:idKl/:idWyp", (req, res, next) => {
   var idWyp = req.params.idWyp;
   var idKl = req.params.idKl;
   console.log(idWyp);
   console.log(idKl);
   Wypozyczenie.delete(idWyp)
   .then(([]) => {
      res.redirect("/historiaWypozyczenKlienci/"+idKl);
   })
   .catch(err => {
      //błąd komunikacji z bazą danych
      console.log(err);
   });
});

router.get('/edycjaWypozyczenia/:id/:idkl/:idsam', (req, res, next) => {
   var idWyp = req.params.id;
   var idKl = req.params.idkl;
   var idSam = req.params.idsam;
   console.log(idWyp)
   Klient.details(idKl)
   .then(([klient, metadata]) => {
      Samochod.details(idSam)
      .then(([samochod, metadata]) =>{
         Wypozyczenie.details(idWyp)
         .then(([wypozyczenie, metadata]) => {
            res.render('edycjaWypozyczenia',{wypozyczenie:wypozyczenie, klient:klient, samochod:samochod});
         })
      })
   })
   .catch(err => {
      //błąd komunikacji z bazą danych
      console.log(err);
   });
});

router.get('/wybierzKlienta/:id/:idsam', (req, res, next) => {
   var idWyp = req.params.id;
   var idSam = req.params.idsam;
   console.log(idWyp)
   Klient.list()
      .then( ([klientList, metadata]) => {
         //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
         res.render('wybierzKlienta', {klientList: klientList, idWyp:idWyp, idSam:idSam});
      }) 
      .catch(err => {
         //błąd komunikacji z bazą danych
         console.log(err);
      });
});

   router.post('/zmianaDat', (req, res) => {
   dataOd = req.body.dataOd;
   dataDo = req.body.dataDo;
   alert('Daty zostały zmienione');
}); 

router.get('/wybierzSamochod/:id/:idkl', (req, res, next) => {
   var idWyp = req.params.id;
   var idKl = req.params.idkl;
   //dod = req.params.dataOd;
   //ddo = req.params.dataDo;
   //var dataOd = req.params.dataOd;
   //var dataDo = req.params.dataDo;
   console.log(dataOd + 'data od ');
   console.log(dataDo+ ' data do');
   console.log(idWyp)
   Samochod.search(dataOd, dataDo)
      .then( ([samochodList, metadata]) => {
         //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
         res.render('wybierzSamochod', {samochodList: samochodList, idWyp:idWyp, idKl:idKl});
      }) 
      .catch(err => {
         //błąd komunikacji z bazą danych
         console.log(err);
      });
});

router.post('/zapisanieEdycji', (req, res) => {
   //dataOd = req.body.dataOd;
   //dataDo = req.body.dataDo;
   id_klienta = req.body.idKlienta;
   id_samochodu = req.body.idSamochodu;
   id_wypozyczenia = req.body.idWypozyczenia;
   console.log('Parametry w zap edycji');
   console.log(id_wypozyczenia);
   console.log(id_klienta);
   console.log(id_samochodu);
   console.log('Koniec parametrów');
   Wypozyczenie.edit(id_wypozyczenia, id_klienta, id_samochodu, dataOd, dataDo)
   .then(([]) => {
      alert('Zmiany zostały zapisane do systemu');
      res.redirect("/historiaWypozyczenKlienci/"+id_klienta);
   })
   .catch(err => {
      console.log(err);
   });
});







// SERVER VALIDATION

var komunikat = '';

function carValidate(car) {
   komunikat = '';
   const regPoj = /\d{4}/;
   const regId = /[A-Z](\d|[A-Z])(\d|[A-Z])(\d|[A-Z])(\d|[A-Z])(\d|[A-Z])(\d|[A-Z])/;
   if (car.marka.length < 3){
      komunikat += '\n Marka musi mieć co najmniej 3 znaki. \n';
   }
   if (car.model.length < 2){
      komunikat += '\n Model musi mieć co najmniej 2 znaki. \n';
   }
   if (!regPoj.test(car.pojemnoscSilnika.trim())){
      komunikat += '\n Podaj poprawną pojemność silnika w cm³ \n';
   }
   if (car.skrzyniaBiegow === null){
      komunikat += '\n Wybierz skrzynie biegów \n';
   }
   if (car.kolor.length < 3){
      komunikat += '\n Kolor musi mieć co najmniej 3 znaki. \n';
   }
   if (!regId.test(car.numerRejestracyjny.trim())){
      komunikat += '\n Podaj poprawny numer rejestracyjny samochodu XX00000 lub X000000 \n';
   }
   if (komunikat === ''){
      return -1;
   } else {
      return komunikat;
   }
}

function clientValidate(klient) {
   komunikat = '';
   const regdata = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
   const regId = /[A-Z]{2}\d{6}/;
   if (klient.imie.length < 3){
      komunikat += '\n Imie musi mieć co najmniej 3 znaki. \n';
   }
   if (klient.nazwisko.length < 2){
      komunikat += '\n Nazwisko musi mieć co najmniej 2 znaki. \n';
   }
   if (!regdata.test(klient.dataUrodzenia.trim())){
      komunikat += '\n Podaj poprawną datę w formacie dzień.miesiąc.rok \n';
   }
   if (!regId.test(klient.numerDowodu.trim())){
      komunikat += '\n Podaj poprawny numer dowodu XX000000 \n';
   }
   if (komunikat === ''){
      return -1;
   } else {
      return komunikat;
   }
}

function rentValidate(wypozyczenie) {
   komunikat = '';
   const regdata = /([12]\d{3}.(0[1-9]|1[0-2]).(0[1-9]|[12]\d|3[01]))/;
   if (wypozyczenie.id_klienta === null){
      komunikat += '\n Klient musi zostać wybrany \n';
   }
   if (wypozyczenie.id_samochodu === null){
      komunikat += '\n Samochód musi zostać wybrany \n';
   }
   if (!regdata.test(wypozyczenie.data_od.trim())){
      komunikat += '\n Podaj poprawną datę w formacie dzień.miesiąc.rok \n';
   }
   if (!regdata.test(wypozyczenie.data_do.trim())){
      komunikat += '\n Podaj poprawną datę w formacie dzień.miesiąc.rok \n';
   }
   if (komunikat === ''){
      return -1;
   } else {
      return komunikat;
   }
}

function dateValidate(data) {
   komunikat = '';
   const regdata = /([12]\d{3}.(0[1-9]|1[0-2]).(0[1-9]|[12]\d|3[01]))/;
   if (!regdata.test(data.trim())){
      komunikat += '\n Podaj poprawną datę w formacie dzień.miesiąc.rok \n';
   } else {
      return -1;
   }
}

module.exports = router;