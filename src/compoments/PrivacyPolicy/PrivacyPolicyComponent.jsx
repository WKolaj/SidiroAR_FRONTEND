import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  mainDiv: {
    margin: theme.spacing(4)
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  }
});

class PrivacyPolicyComponent extends Component {
  renderPPText = () => {
    let { classes } = this.props;
    return (
      <div className={classes.mainDiv}>
        <Typography variant="h3">
          Polityka prywatności - serwis internetowy
        </Typography>
        <hr />
        <Typography variant="h5">
          Polityka prywatności opisuje zasady przetwarzania przez nas informacji
          na Twój temat, w tym danych osobowych oraz ciasteczek, czyli tzw.
          cookies.
        </Typography>
        <hr />
        <div>
          <Typography variant="h4">1. Informacje ogólne</Typography>
          <ol>
            <li>
              <Typography>
                Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod
                adresem url: <b>sidiro.pl</b>
              </Typography>
            </li>
            <li>
              <Typography>
                Operatorem serwisu oraz Administratorem danych osobowych jest:
                Miłosz Rzeźnik ul. Ziębicka 35, 60-164 Poznań
              </Typography>
            </li>

            <li>
              <Typography>
                Adres kontaktowy poczty elektronicznej operatora:
                sidiro.app@gmail.com
              </Typography>
            </li>

            <li>
              <Typography>
                Operator jest Administratorem Twoich danych osobowych w
                odniesieniu do danych podanych dobrowolnie w Serwisie.
              </Typography>
            </li>
            <li>
              <Typography>
                Serwis wykorzystuje dane osobowe w następujących celach:
              </Typography>
            </li>
            <ul>
              <li>
                <Typography>Prowadzenie newslettera</Typography>
              </li>
              <li>
                <Typography>Obsługa zapytań przez formularz</Typography>
              </li>
              <li>
                <Typography>
                  Obsługa zamówień towarów - przygotowanie, pakowanie, wysyłka
                </Typography>
              </li>
              <li>
                <Typography>Realizacja zamówionych usług</Typography>
              </li>
              <li>
                <Typography>
                  Obsługa odpowiednich dokumentów księgowych
                </Typography>
              </li>
              <li>
                <Typography>Windykacja należności</Typography>
              </li>
              <li>
                <Typography>Prezentacja oferty lub informacji</Typography>
              </li>
              <li>
                <Typography>
                  Wykonanie przez Administratora danych osobowych prawnie
                  ciążących na nim obowiązków zgodnie z art. 6 ust. 1 lit. c)
                  RODO w zakresie w jakim przewidują to przepisy szczególne (np.
                  prowadzenie księgowości).
                </Typography>
              </li>
            </ul>
            <li>
              <Typography>
                Serwis realizuje funkcje pozyskiwania informacji o użytkownikach
                i ich zachowaniu w następujący sposób:
              </Typography>
              <ol>
                <li>
                  <Typography>
                    Poprzez dobrowolnie wprowadzone w formularzach dane, które
                    zostają wprowadzone do systemów Operatora.
                  </Typography>
                </li>
                <li>
                  <Typography>
                    Poprzez zapisywanie w urządzeniach końcowych plików cookie
                    (tzw. „ciasteczka”).
                  </Typography>
                </li>
              </ol>
            </li>
          </ol>
          <h2 className="pb-12">
            <strong>
              <Typography variant="h4">
                2. Wybrane metody ochrony danych stosowane przez Operatora
              </Typography>
            </strong>
          </h2>
          <ol>
            <li>
              <Typography>
                Miejsca logowania i wprowadzania danych osobowych są chronione w
                warstwie transmisji (certyfikat SSL). Dzięki temu dane osobowe i
                dane logowania, wprowadzone na stronie, zostają zaszyfrowane w
                komputerze użytkownika i mogą być odczytane jedynie na docelowym
                serwerze.
              </Typography>
            </li>
            <li>
              <Typography>
                Hasła użytkowników są przechowywane w postaci hashowanej.
                Funkcja hashująca działa jednokierunkowo - nie jest możliwe
                odwrócenie jej działania, co stanowi obecnie współczesny
                standard w zakresie przechowywania haseł użytkowników.
              </Typography>
            </li>
          </ol>
          <h2 className="pb-12">
            <Typography variant="h4">3. Hosting</Typography>
          </h2>
          <ol>
            <li>
              <Typography>
                Serwis jest hostowany (technicznie utrzymywany) na serwera
                operatora: nazwa.pl
              </Typography>
            </li>
          </ol>
          <h2 className="pb-12">
            <Typography variant="h4">
              4. Twoje prawa i dodatkowe informacje o sposobie wykorzystania
              danych
            </Typography>
          </h2>
          <ol>
            <li>
              <Typography>
                W niektórych sytuacjach Administrator ma prawo przekazywać Twoje
                dane osobowe innym odbiorcom, jeśli będzie to niezbędne do
                wykonania zawartej z Tobą umowy lub do zrealizowania obowiązków
                ciążących na Administratorze. Dotyczy to takich grup odbiorców:
              </Typography>
              <ul>
                <li>
                  <Typography>
                    osoby upoważnione przez nas, pracownicy i współprcownicy,
                    którzy muszą mieć dostęp do danych osobowych w celu
                    wykonywania swoich obowiązków,
                  </Typography>
                </li>
                <li>
                  <Typography>firma hostingowa,</Typography>
                </li>
                <li>
                  <Typography>firmy obsługująca mailingi,</Typography>
                </li>
                <li>
                  <Typography>firmy obsługująca komunikaty SMS,</Typography>
                </li>
                <li>
                  <Typography>
                    firmy, z którymi Administrator współpracuje w zakresie
                    marketingu własnego,
                  </Typography>
                </li>
                <li>
                  <Typography>kurierzy,</Typography>
                </li>
                <li>
                  <Typography>ubezpieczyciele,</Typography>
                </li>
                <li>
                  <Typography>kancelarie prawne i windykatorzy,</Typography>
                </li>
                <li>
                  <Typography>banki,</Typography>
                </li>
                <li>
                  <Typography>operatorzy płatności,</Typography>
                </li>
                <li>
                  <Typography>organy publiczne.</Typography>
                </li>
              </ul>
            </li>
            <li>
              <Typography>
                Twoje dane osobowe przetwarzane przez Administratora nie dłużej,
                niż jest to konieczne do wykonania związanych z nimi czynności
                określonych osobnymi przepisami (np. o prowadzeniu
                rachunkowości). W odniesieniu do danych marketingowych dane nie
                będą przetwarzane dłużej niż przez 3 lata.
              </Typography>
            </li>
            <li>
              <Typography>
                Przysługuje Ci prawo żądania od Administratora:
              </Typography>
              <ul>
                <li>
                  <Typography>
                    dostępu do danych osobowych Ciebie dotyczących,
                  </Typography>
                </li>
                <li>
                  <Typography>ich sprostowania,</Typography>
                </li>
                <li>
                  <Typography>usunięcia,</Typography>
                </li>
                <li>
                  <Typography>ograniczenia przetwarzania,</Typography>
                </li>
                <li>
                  <Typography>oraz przenoszenia danych.</Typography>
                </li>
              </ul>
            </li>
            <li>
              <Typography>
                Przysługuje Ci prawo do złożenia sprzeciwu w zakresie
                przetwarzania wskazanego w pkt 3.3 c) wobec przetwarzania danych
                osobowych w celu wykonania prawnie uzasadnionych interesów
                realizowanych przez Administratora, w tym profilowania, przy
                czym prawo sprzeciwu nie będzie mogło być wykonane w przypadku
                istnienia ważnych prawnie uzasadnionych podstaw do
                przetwarzania, nadrzędnych wobec Ciebie interesów, praw i
                wolności, w szczególności ustalenia, dochodzenia lub obrony
                roszczeń.
              </Typography>
            </li>
            <li>
              <Typography>
                Na działania Administratora przysługuje skarga do Prezesa Urzędu
                Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.
              </Typography>
            </li>
            <li>
              <Typography>
                Podanie danych osobowych jest dobrowolne, lecz niezbędne do
                obsługi Serwisu.
              </Typography>
            </li>
            <li>
              <Typography>
                W stosunku do Ciebie mogą być podejmowane czynności polegające
                na zautomatyzowanym podejmowaniu decyzji, w tym profilowaniu w
                celu świadczenia usług w ramach zawartej umowy oraz w celu
                prowadzenia przez Administratora marketingu bezpośredniego.
              </Typography>
            </li>
            <li>
              <Typography>
                Dane osobowe nie są przekazywane od krajów trzecich w rozumieniu
                przepisów o ochronie danych osobowych. Oznacza to, że nie
                przesyłamy ich poza teren Unii Europejskiej.
              </Typography>
            </li>
          </ol>
          <h2 className="pb-12">
            <strong>
              <Typography variant="h4">5. Informacje w formularzach</Typography>
            </strong>
          </h2>
          <ol>
            <li>
              <Typography>
                Serwis zbiera informacje podane dobrowolnie przez użytkownika, w
                tym dane osobowe, o ile zostaną one podane.
              </Typography>
            </li>
            <li>
              <Typography>
                Serwis może zapisać informacje o parametrach połączenia
                (oznaczenie czasu, adres IP).
              </Typography>
            </li>
            <li>
              <Typography>
                Serwis, w niektórych wypadkach, może zapisać informację
                ułatwiającą powiązanie danych w formularzu z adresem e-mail
                użytkownika wypełniającego formularz. W takim wypadku adres
                e-mail użytkownika pojawia się wewnątrz adresu url strony
                zawierającej formularz.
              </Typography>
            </li>
            <li>
              <Typography>
                Dane podane w formularzu są przetwarzane w celu wynikającym z
                funkcji konkretnego formularza, np. w celu dokonania procesu
                obsługi zgłoszenia serwisowego lub kontaktu handlowego,
                rejestracji usług itp. Każdorazowo kontekst i opis formularza w
                czytelny sposób informuje, do czego on służy.
              </Typography>
            </li>
          </ol>

          <h2 className="pb-12">
            <Typography variant="h4">6. Logi Administratora</Typography>
          </h2>
          <ol>
            <li>
              <Typography>
                Informacje zachowaniu użytkowników w serwisie mogą podlegać
                logowaniu. Dane te są wykorzystywane w celu administrowania
                serwisem.
              </Typography>
            </li>
          </ol>
          <h2 className="pb-12">
            <strong>
              <Typography variant="h4">
                7. Istotne techniki marketingowe
              </Typography>
            </strong>
          </h2>
          <ol>
            <li>
              <Typography>
                Operator stosuje analizę statystyczną ruchu na stronie, poprzez
                Google Analytics (Google Inc. z siedzibą w USA). Operator nie
                przekazuje do operatora tej usługi danych osobowych, a jedynie
                zanonimizowane informacje. Usługa bazuje na wykorzystaniu
                ciasteczek w urządzeniu końcowym użytkownika. W zakresie
                informacji o preferencjach użytkownika gromadzonych przez sieć
                reklamową Google użytkownik może przeglądać i edytować
                informacje wynikające z plików cookies przy pomocy narzędzia:
                https://www.google.com/ads/preferences/
              </Typography>
            </li>
            <li>
              <Typography>
                Operator stosuje techniki remarketingowe, pozwalające na
                dopasowanie przekazów reklamowych do zachowania użytkownika na
                stronie, co może dawać złudzenie, że dane osobowe użytkownika są
                wykorzystywane do jego śledzenia, jednak w praktyce nie dochodzi
                do przekazania żadnych danych osobowych od Operatora do
                operatorom reklam. Technologicznym warunkiem takich działań jest
                włączona obsługa plików cookie.
              </Typography>
            </li>
            <li>
              <Typography>
                Operator stosuje korzysta z piksela Facebooka. Ta technologia
                powoduje, że serwis Facebook (Facebook Inc. z siedzibą w USA)
                wie, że dana osoba w nim zarejestrowana korzysta z Serwisu.
                Bazuje w tym wypadku na danych, wobec których sam jest
                administratorem, Operator nie przekazuje od siebie żadnych
                dodatkowych danych osobowych serwisowi Facebook. Usługa bazuje
                na wykorzystaniu ciasteczek w urządzeniu końcowym użytkownika.
              </Typography>
            </li>
            <li>
              <Typography>
                Operator stosuje rozwiązanie badające zachowanie użytkowników
                poprzez tworzenie map ciepła oraz nagrywanie zachowania na
                stronie. Te informacje są anonimizowane zanim zostaną przesłane
                do operatora usługi tak, że nie wie on jakiej osoby fizycznej
                one dotyczą. W szczególności nagrywaniu nie podlegają wpisywane
                hasła oraz inne dane osobowe.
              </Typography>
            </li>
            <li>
              <Typography>
                Operator stosuje rozwiązanie automatyzujące działanie Serwisu w
                odniesieniu do użytkowników, np. mogące przesłać maila do
                użytkownika po odwiedzeniu konkretnej podstrony, o ile wyraził
                on zgodę na otrzymywanie korespondencji handlowej od Operatora.
              </Typography>
            </li>
            <li>
              <Typography>
                Operator może stosować profilowanie w rozumieniu przepisów o
                ochronie danych osobowych
              </Typography>
            </li>
          </ol>

          <h2 className="pb-12">
            <strong>
              <Typography variant="h4">
                8. Informacja o plikach cookies
              </Typography>
            </strong>
          </h2>
          <ol>
            <li>
              <Typography>Serwis korzysta z plików cookies.</Typography>
            </li>
            <li>
              <Typography>
                Pliki cookies (tzw. „ciasteczka”) stanowią dane informatyczne, w
                szczególności pliki tekstowe, które przechowywane są w
                urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do
                korzystania ze stron internetowych Serwisu. Cookies zazwyczaj
                zawierają nazwę strony internetowej, z której pochodzą, czas
                przechowywania ich na urządzeniu końcowym oraz unikalny numer.
              </Typography>
            </li>
            <li>
              <Typography>
                Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika
                Serwisu pliki cookies oraz uzyskującym do nich dostęp jest
                operator Serwisu.
              </Typography>
            </li>
            <li>
              <Typography>
                Pliki cookies wykorzystywane są w następujących celach:
              </Typography>
              <ol>
                <li>
                  <Typography>
                    utrzymanie sesji użytkownika Serwisu (po zalogowaniu),
                    dzięki której użytkownik nie musi na każdej podstronie
                    Serwisu ponownie wpisywać loginu i hasła;
                  </Typography>
                </li>
                <li>
                  <Typography>
                    realizacji celów określonych powyżej w części "Istotne
                    techniki marketingowe";
                  </Typography>
                </li>
              </ol>
            </li>
            <li>
              <Typography>
                W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików
                cookies: „sesyjne” (session cookies) oraz „stałe” (persistent
                cookies). Cookies „sesyjne” są plikami tymczasowymi, które
                przechowywane są w urządzeniu końcowym Użytkownika do czasu
                wylogowania, opuszczenia strony internetowej lub wyłączenia
                oprogramowania (przeglądarki internetowej). „Stałe” pliki
                cookies przechowywane są w urządzeniu końcowym Użytkownika przez
                czas określony w parametrach plików cookies lub do czasu ich
                usunięcia przez Użytkownika.
              </Typography>
            </li>
            <li>
              <Typography>
                Oprogramowanie do przeglądania stron internetowych (przeglądarka
                internetowa) zazwyczaj domyślnie dopuszcza przechowywanie plików
                cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu
                mogą dokonać zmiany ustawień w tym zakresie.&nbsp;Przeglądarka
                internetowa umożliwia usunięcie plików cookies. Możliwe jest
                także automatyczne blokowanie plików cookies Szczegółowe
                informacje na ten temat zawiera pomoc lub dokumentacja
                przeglądarki internetowej.
              </Typography>
            </li>
            <li>
              <Typography>
                Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre
                funkcjonalności dostępne na stronach internetowych Serwisu.
              </Typography>
            </li>
            <li>
              <Typography>
                Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika
                Serwisu wykorzystywane mogą być również przez współpracujące z
                operatorem Serwisu podmioty, w szczególności dotyczy to firm:
                Google (Google Inc. z siedzibą w USA), Facebook (Facebook Inc. z
                siedzibą w USA), Twitter (Twitter Inc. z siedzibą w USA).
              </Typography>
            </li>
          </ol>
          <h2 className="pb-12">
            <strong>
              <Typography variant="h4">
                9. Zarządzanie plikami cookies – jak w praktyce wyrażać i cofać
                zgodę?
              </Typography>
            </strong>
          </h2>
          <ol>
            <li>
              <Typography>
                Jeśli użytkownik nie chce otrzymywać plików cookies, może
                zmienić ustawienia przeglądarki. Zastrzegamy, że wyłączenie
                obsługi plików cookies niezbędnych dla procesów
                uwierzytelniania, bezpieczeństwa, utrzymania preferencji
                użytkownika może utrudnić,&nbsp;a w skrajnych przypadkach może
                uniemożliwić korzystanie ze stron www
              </Typography>
            </li>
            <li>
              <Typography>
                W celu zarządzania ustawienia cookies wybierz z listy poniżej
                przeglądarkę internetową, której używasz i postępuj zgodnie z
                instrukcjami:
              </Typography>
              <ul>
                <li>
                  <a
                    className={classes.link}
                    href="https://support.microsoft.com/pl-pl/help/10607/microsoft-edge-view-delete-browser-history"
                  >
                    Edge
                  </a>
                </li>
                <li>
                  <a
                    className={classes.link}
                    href="https://support.microsoft.com/pl-pl/help/278835/how-to-delete-cookie-files-in-internet-explorer"
                  >
                    Internet Explorer
                  </a>
                </li>
                <li>
                  <a
                    className={classes.link}
                    href="http://support.google.com/chrome/bin/answer.py?hl=pl&amp;answer=95647"
                  >
                    Chrome
                  </a>
                </li>
                <li>
                  <a
                    className={classes.link}
                    href="http://support.apple.com/kb/PH5042"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    className={classes.link}
                    href="http://support.mozilla.org/pl/kb/W%C5%82%C4%85czanie%20i%20wy%C5%82%C4%85czanie%20obs%C5%82ugi%20ciasteczek"
                  >
                    Firefox
                  </a>
                </li>
                <li>
                  <a
                    className={classes.link}
                    href="http://help.opera.com/Windows/12.10/pl/cookies.html"
                  >
                    Opera
                  </a>
                </li>
              </ul>
              <p>
                <Typography>Urządzenia mobilne:</Typography>
              </p>
              <ul>
                <li>
                  <a
                    className={classes.link}
                    href="http://support.google.com/chrome/bin/answer.py?hl=pl&amp;answer=95647"
                  >
                    Android
                  </a>
                </li>
                <li>
                  <a
                    className={classes.link}
                    href="http://support.apple.com/kb/HT1677?viewlocale=pl_PL"
                  >
                    Safari (iOS)
                  </a>
                </li>
                <li>
                  <a
                    className={classes.link}
                    href="http://www.windowsphone.com/pl-pl/how-to/wp7/web/changing-privacy-and-other-browser-settings"
                  >
                    Windows Phone
                  </a>
                </li>
              </ul>
            </li>
          </ol>
        </div>
        <br />
        <br />
        <Typography variant="h3">
          Polityka prywatności - aplikacja mobilna
        </Typography>
        <div>
          <ol>
            <li>
              <Typography>
                Niniejszy dokument opisuje Politykę Prywatności aplikacji
                mobilnej SidiroAR (dalej „Polityka Prywatności").
              </Typography>
            </li>
            <li>
              <Typography>
                Alikacja SidiroAR, jest instalowana na urządzeniach mobilnych, w
                szczególności na telefonach komórkowych i tabletach i po
                uprzednim pobraniu Aplikacji przez użytkownika za pośrednictwem
                sklepu Play (Android)).
              </Typography>
            </li>
            <li>
              <Typography>
                Korzystanie z Aplikacji wymaga posiadania urządzenia mobilnego z
                systemem Android oraz połączenia z Internetem w postaci
                włączonego pakietu transmisji danych lub włączonego połączenia
                wi-fi.
              </Typography>
            </li>
            <li>
              <Typography>
                Korzystanie z Aplikacji wymaga rejestracji w serwisie sidiro.pl.
                Polityka prywatności serwisu sidiro.pl została przedstawiona
                powyżej
              </Typography>
            </li>
            <li>
              <Typography>
                W przypadku braku akceptacji na zasady Polityki Prywatności
                prosimy nie instalować Aplikacji lub ją odinstalować. Trwałe
                usunięcie Aplikacji z urządzenia mobilnego jest równoznaczne z
                zakończeniem korzystania z Aplikacji.
              </Typography>
            </li>
            <li>
              <Typography>
                Polityka Prywatności ma jedynie charakter uzupełniający w
                stosunku do polityki prywatności Google Play Store. Witold Kolaj
                nie ponosi jakiejkolwiek odpowiedzialności za politykę
                prywatności realizowaną przez podmioty zarządzające aplikacjami
                Google Play store, Apple Appstore i Microsoft Store oraz
                przestrzeganie przez nie przepisów Rozporządzenia Parlamentu
                Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w
                sprawie ochrony osób fizycznych w związku z przetwarzaniem
                danych osobowych i w sprawie swobodnego przepływu takich danych
                oraz uchylenia dyrektywy 95/46/WE (Dz. Urz. UE L 119 z 2016 r.,
                str. 1-88), ustawy z dnia z dnia 10 maja 2018 r. o ochronie
                danych osobowych (t.j. Dz.U.2018.1000) oraz ustawy z dnia 18
                lipca 2002 r. o świadczeniu usług drogą elektroniczną (t.j.
                Dz.U.2017.1219) w ramach Google Play store , Apple Appstore oraz
                Microsoft Store.
              </Typography>
            </li>
            <li>
              <Typography>
                W przypadku pytań lub wątpliwości prosimy o kontakt na:
                sidiro.app@gmail.com
              </Typography>
            </li>
          </ol>
        </div>
      </div>
    );
  };
  render() {
    return this.renderPPText();
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

const componentWithStyles = withStyles(styles)(PrivacyPolicyComponent);

export default connect(mapStateToProps, {})(componentWithStyles);
