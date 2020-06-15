# Teknisk nytt i denne appen

* create-react-app
    * bootstrappet med [Create React App](https://github.com/facebook/create-react-app)
    * utvidet med [craco](https://github.com/gsoft-inc/craco) for typescript og less
* express-server er fjenet
    * decorator hentes som en react-komponent
        * personbrukers nye decorator når den er ferdig
    * mock kjøres fra frontend
        * se /mock
    * data hentes via `use-fetch`
        * `saga` er fjernet
        * se /rest
* state håndteres via hooks
    * `redux` er fjernet
    * lokal state med `use-state`
    * global state med `use-context`
    * se /stores
* syfotekster brukes ikke lenger
    * tekstfil lagres sammen med komponenten
    * importeres i komponenten
    * html escapes med [html-react-parser](https://github.com/remarkablemark/html-react-parser)
* less håndteres med webpack
    * lessfil lagres sammen med komponenten
    * importeres i komponenten
    * lokal less-bygging er fjernet
* `nav-frontend`[-komponenter](https://design.nav.no/components) brukes fremfor egne
    * IKKE bruk typografi-klasser på html-elementer
    * IKKE definer egen typografi
    * IKKE definer egne farger
* `digisyfo-npm` brukes ikke lenger

# Funksjonelle endringer fra gammel app

* Banner ligger nå over brødsmulene, i gammel app lå den under
* Kvittering for sendt søknad er helt skrevet om. 
* Kvitteringen er samme side man kommer til om man går inn på en sendt søknad fra oversikten
* Utenlandssøknaden har nå et spørsmål per side, ikke en side med alle spørsmål
* Ved klikk på utgått søknad får man en popup, ikke en egen side
* TODO: Kalendere oppfører seg litt annerledes på mobil  
