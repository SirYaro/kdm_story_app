const { cdnUrl } = require('./template-renderer')
const {setSettings, getSettings, silentSaveSettings} = require('./../ui/settings')

const promo_hunt_events = {
'baby and the sword': `* | Baby and the Sword
The survivors find a woman\'s corpse riddled with arrows. The body rests in the center of a pattern drawn in blood, a screaming infant in one hand and sword in the other. As the survivors approach, a massive worm bursts from the ground blocking their way!

The survivors may <b>grab and dash</b>!

[TO] Wybór
[td] Co robisz?
[c] Grab and dash
[d<]
[TO] 1k10
[td] Grab and Dash
[c] 1-2
[d<]
Trigger the Harvester hunt event (#10):

<button class="hunt_event_action_button hoverable" id="harvester" onClick="showRandomEvent(10)">Trigger event #10</button>
[>d]
[c] 3-6
[d] Got it! The event revealer gains: 1 random disorder and the <b>Sword of Silence</b>, or +1 courage and the <b>Newborn</b> rare gear.
[c] 7+
[d<]
The survivors madly dash past the worm. Each survivor gains 1 random disorder. The group gains 1 <b>Newborn</b> and 1 <b>Sword of Silence</b> rare gear. Then. trigger the Harvester hunt event (#10).

<i>Remove this card from the hunt event deck permanently:</i>
<button class="hunt_event_action_button hoverable" id="fade" onClick="removePromoCard('fade')">Remove card</button>
<div class="button_outcome" id="fade"> Card removed from the deck.<br/><i>You may enable it again in the <b>Setttings</b> menu</i><br/><br/><button class="hunt_event_action_button hoverable" id="harvester" onClick="showRandomEvent(10)">Trigger event #10</button></div>
[>d]
[T]
[>d]
[c] Go away
[dt] Roll a random hunt event.`,

'dead warrior': `* | Dead Warrior
The survivors stop a man\'s length away from a one-handed skeleton clad in ancient, rusted armor. A strange tablet covered in inscriptions lies next to it.

If the settlement has <b>Pictographs</b>, a survivor with 3+ understanding may investigate.

[TO] Wybór
[td] Co robisz?
[c] Investigate
[d<]
[TO] 1k10
[td] Survivor with 3+ understanding
[c] 1
[d] You sense extreme danger, warning the others, everyone flees to safety. If you have a <b>broken jaw</b>. your garbled warning falls on deaf ears and all survivors are hacked by an unseen force.
[c] 2+
[d<]
You learn from the tablet. Gain the <b>Black Guard Style</b> secret fighting art! If any survivor has the honorable disorder, the group respectfully moves past the skeleton. Otherwise, gain 1 <b>bone</b> basic resource.

<i>Remove the card from the hunt event deck permanently:</i>
<button class="hunt_event_action_button hoverable" id="percival" onClick="removePromoCard('percival')">Remove card</button>
<div class="button_outcome" id="percival"> Card removed from the deck.<br/><i>You may enable it again in the <b>Setttings</b> menu</i></div>

[>d]
[T]
[>d]
[c] Go away
[dt] Roll a random hunt event.`,

'object of desire': `* | Object of Desire
The survivors see a tree in the distance, reaching up from the horizon like a desperate, gnarled hand.

Players may nominate a survivor with 3+ courage to <b>investigate</b>.

[TO] Wybór
[td] Co robisz?
[c] Investigate
[d<]

Add <b>Lonely Tree</b> terrain card to the showdown setup and roll 1k10.

[TO] 1k10
[td] Nominated survivor
[c] 1-3
[d] You are removed from the rest of the Hunt Phase. Start the showdown knocked down adjacent to the Lonely Tree and with <b>priority target</b> token.
[c] 4+
[dt] There is something unsetting about that tree. Suffer 2 brain damage and start the showdown adjacent to the Lonely Tree.-0
[>d]
[c] Go away
[dt] Roll a random hunt event.`,

}

const random_hunt_events = {
  1: `1 |  Zniszczone latarnie
1 | Zniszczone latarnie
Ocalali słyszą chrupnięcia pod stopami. Wykonawca wydarzenia może obniżyć lampę by poświecić i przeprowadzić <b>badanie</b> lub zignorować te dźwięki i kontynuować  łowy.

[TO] Wybierz
[td] Wykonawca wydarzenia - Co robisz?
[c] Badaj
[d<]

Wykonawca wydarzenia, otrzymuje +1 odwagi i rzuca 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia - badanie
[c] 1-5
[d] Potykasz się i poszarpana krawędź kaleczy Ci stopę. Wydarzenie to zadaje obrażenie twoim nogom, równe poziomowi potwora w wydarzeniu.
[c] 6-8
[d] Odnajdujesz pożyteczną rzecz. Otrzymujesz 1 podstawowy zasób <b>zniszczona latarnia</b>.
[c] 9+
[d] Ocalali odkrywają opuszczony już dawno temu latarniany kopiec. Widok spustoszeń napełnia lękiem. Wszyscy Ocalali ustawiają swój obłęd na 0. Po uspokojeniu, każdy z Ocalałych myszkując odnajduje 1 podstawowy zasób zniszczona latarnia. Dodaj go do magazynu osady.
[T]

[>d]
[c] Zignoruj
[dt] Rzuć jeszcze raz w liście wydarzeń na łowach nim przesuniecie
się na planszy wydarzeń na łowach.`,

  2: `2 | Ciało

[img] 2 # no-shadow

Ocalałych ogarnia nagły chłód, oddechy zamarzają w płucach. Szczękają zęby. Wszyscy Ocalali tracą przetrwanie równe poziomowi potwora. Pośrodku mroźnego obszaru znajduje się doskonale zachowane ciało.

[TA] Sprawdź
[td] Jaką innowację posiada osada?
[c] Kanibalizm
[d] Wykonawca wydarzenia otrzymuje 1 losowy podstawowy zasób.
[c] Groby
[d] Wykonawca  wydarzens prawdza ciało i otrzymuje +1 odwagi oraz +1 wiedzy.
[c] Memento Mori
[dt]  Wykonawca  wydarzenia nieco pojmuje, co stało się z ciałem. Otrzymuje 1 losową sztukę walki.
`,

  3: `3 |  Zrakowiałe gołębie
Ocalałych otacza skrzekliwe echo dziecięcego bełkotu. Dziwaczne ptaki o twarzach dzieci zaczynają krążyć im nad głowami. Porwani instynktownym przerażeniem Ocalali rzucają się do ucieczki! Każdy Ocalały rzuca 1k10. Ocalały z najniższym wynikiem  (lub Ocalali  w przypadku  remisów) zostaje Spóźnionym.

[i] Jeśli którykolwiek  Ocalały  posiada ekwipunek <i>hałaśliwy</i>, rzut modyfikuje się o -2.

[TO] 1k10
[td] Wybierz Spóźnionego
[c] Spóźniony wybiera
[d<]

Każdy Spóźniony rzuca 1k10.

[i] Jeśli którykolwiek Ocalały ma bicz, trzaska nim, rozpędzając wiele ptaków. Każdy Spóźniony dodaje +4 do swojego rzutu.

[TA] 1k10
[td] Spóźniony
[c] 1-3
[d] Biegając i dziko wymachując, w panice odkrywasz, że jesteś sam. Czekające na to, zrakowiałe gołębie nurkują i bezlitośnie dziobią cię od tyłu, a ich szczęśliwe gruchanie napełnia ci głowę przerażeniem. Godzinę później reszta Ocalałych odnajduje cię szlochającego i zwiniętego w kłębek na ziemi. Jesteś cię <b>wewnętrznie martwy</b>: nie możesz otrzymywać przetrwania. Zapisz to upośledzenie.
[c] 4-6
[d] Zrakowiały gołąb zatrzasnął dziób na twoich plecach! Strząśnij go wydając 1 przetrwania. W możesz przeciwnym razie stajesz się <b>wewnętrznie martwy</b>: nie możesz otrzymywać przetrwania. Zapisz to upośledzenie.
[c] 7-8
[d] Uciekasz przed tymi straszliwymi stworami.
[c] 9+
[dt] Udało ci się uderzyć i strącić jedno z tych paskudnych stworzeń. Zdobywasz 1 losowy podstawowy zasób.
[>d]
[T]`,

  4: `4 | Głód
Ścieżka przed wami jest sucha i martwa. Możesz kontynuować lub poszukać drogi dookoła.

[TO] Wybór
[td] Co robisz?
[c] Kontynuuj, Ocalali zdobywają +1 odwagi #Kontynuuj
[d<]

Wasze żołądki burczą w ciemnościach, gdy brniecie do przodu. Ocalali gromadzą zapasy. Wykonawca wydarzenia rzuca 1k10 i dodaje +2 do rzutu za każdy jadalny ekwipunek lub zasób który posiada grupa.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-8
[d] Łowy zbierają swe żniwo. Potężne głodowe bóle nasilają się. Wszyscy Ocalali otrzymują żeton -1 zzybkości.
[c] 9-14
[d]  Udało wam się przetrwać straszliwy głód.
[c] 15+
[dt]  Przekąska ożywiła wszystkich. Każdy Ocalały otrzymuje +1 przetrwania.

[>d]
[c] Idź dookoła
[dt] Rzuć ponownie w liście wydarzeń na łowach zanim przesuniesz się na planszy.
`,

  5: `5 | Mięsiste pola
Idąc po podłożu z kamiennych twarzy, dochodzicie do pola mięsistych czyraków wielkości człowieka, porośniętych gęsto czarnymi włosami. Wijące się między nimi kręte ścieżki promienieją wilgotnym ciepłem. Każdy Ocalały przechodząc przez nie, staje sie ofiarą buhającego gorąca i traci 1 przetrwania. Wykonawca wydarzenia rzuca 1k10.

[i] Jeśli którykolwiek Ocalały ma sierp, pomaga w oczyszczaniu ścieżki, wycinając przejścia w gęstych, czarnych włosach. Dodaj +4 to twojego rzutu.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1
[d<]

Wykonawca wydarzenia ocierając się o gigantyczne wrzody zaraża się pożerającą ciało chorobą! Losowa kończyna która jest zarażona musi być natychmiast amputowana! 

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-5
[d] Otrzymujesz trwały ciężki uraz <b>odcięte ramię</b>.
[c] 6-10
[dt] Otrzymujesz trwały ciężki uraz <b>odcięta noga</b>.

[>d]
[c] 2-3
[d] Jeśli którykolwiek z Ocalałych jest <b>obłąkany</b>, wyobraża sobie, że mięsiste pole go atakuje! Wpada w histerię, młócąc na oślep wplątuje się w gęstwę włosów. Wydarzenie to zadaje obrażenia każdemu <b>obłąkanemu</b> Ocalałemu, równe poziomowi potwora, w losową część ciała.
[c] 4-7
[d] Jest gorąco i obrzydliwie, ale Ocalali przechodzą poprzez mięsiste pola bez żadnych komplikacji.
[c] 8-9
[d] Wykonawca wydarzenia najlepiej radzi sobie w trudnych chwilach wycinając część mięsistego ciała. Otrzymujesz 1 podstawowy zasób <b>skóra</b>.
[c] 10+
[d] Każdy z Ocalałych zbiera 1 podstawowy zasób <b>skóra</b> z mięsistych pól.
[T]
`,

  6: `6 | Bezimienny Posąg
Ocalali natknęli się na bezimienny posąg trzymający lśniącą latarnię. Ogrzewając się w jej ciepłym świetle, Ocalali odzyskują  siły. 

Każdy Ocalały zyskuje 1  przetrwania.

[TO] Sprawdź
[td] Czy osada posiada Rzeźbę?
[c] Tak #Rzeźba
[d<]

Ocalali  są  poruszeni  i doceniają subtelne rzemiosło artysty. Każdy rzuca 1k10. Zyskuje tyle przetrwania oraz +1 do wiedzy.

[TO] Sprawdź
[td] Czy wszyscy Ocalali są obłąkani?
[c] Tak #Wszyscy obłąkani
[d] Ocalali kontynuują łowy.
[c] Nie
[d<]

Ocalali mogą tutaj dłużej odpocząć.

[TO] Wybór
[td] Czy chcecie odpocząć?
[c] Tak #Odpoczynek
[d] Każdy Ocalały leczy wszystkie poziomy obrażeń i utracone punkty pancerza w jednym miejscu trafienia. W efekcie tracą jednak trop zdobyczy na łowach. Oddal potwora o 1 pole od Ocalałych na planszy łowów. Jeśli Ocalały uleczy tu więcej niż 5 utraconych punktów pancerza, wpatruje się w błyszczące światło zbyt długo i otrzymuje 1 losowe zaburzenie.
[c] Nie
[dt] Ocalali kontynuują łowy.

[>d]
[T]

[>d]
[c] Nie #
[d<]

[TO] Sprawdź
[td] Czy wszyscy Ocalali są obłąkani?
[c] Tak #Wszyscy obłąkani
[d] Ocalali kontynuują łowy.
[c] Nie #
[d<]

Ocalali mogą tutaj dłużej odpocząć.

[TO] Wybór
[td] Czy chcecie odpocząć?
[c] Tak #Odpoczynek
[d] Każdy Ocalały leczy wszystkie poziomy obrażeń i utracone punkty pancerza w jednym miejscu trafienia. W efekcie tracą jednak trop zdobyczy na łowach. Oddal potwora o 1 pole od Ocalałych na planszy łowów. Jeśli Ocalały uleczy tu więcej niż 5 utraconych punktów pancerza, wpatruje się w błyszczące światło zbyt długo i otrzymuje 1 losowe zaburzenie.
[c] Nie #
[dt] Ocalali kontynuują łowy.

[>d]
[T]

[>d]
[T]
`,

  7: `7 | Głodna ziemia
Ziemia nagle pęka, a rozwarte kamienne usta usiłują pożreć wykonawcę wydarzenia! Wykonawca wydarzenia rzuca 1k10.

[i] Jeśli inny Ocalały ma bicz, rzuca go jak linę do wykonawcy wydarzenia. Dodaje on +4 do swojego rzutu.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1
[d] Z przytłumionym krzykiem zapadasz się w ziemi. Udaje ci się chwycić niestabilnego gzymsu nad rozwartą paszczą. Tracisz całe przetrwanie, rozpaczliwie wspinając się na bezpieczną wysokość. Jeśli go nie masz, spadasz. Kości chrupią między kamiennymi zębami. Zostałeś w całości pożarty. Nie żyjesz.
[c] 2-5
[d] Wspiąłeś się, ale twoja noga wpada w potworną paszczę. To wydarzenia zadaje 2 obrażenia twoim nogom.
[c] 6-9
[d] Udaje ci się wyskoczyć w samą porę!
[c] 10+
[d] Blurp! Zabulgotało! Ziemia wymiotuje lśniącymi kawałkami złomu. Zdobywasz 1 podstawowy zasób <b>zniszona latarnia</b>.
[T]
`,

  8: `8 | Zawodzący dym

[img] 8
Nieprzerwany jęk ściga Ocalałych. W końcu wchodzą w obszar spowity gęstą mgłą, a zawodzenie osiąga coraz wyższe tonacje.

Każdy <b>nie-głuchy</b> Ocalały rzuca 1k10.

[TO] 1k10
[td] Wybierz Spóźnionego
[c] Wszyscy Ocalali są <b>głusi</b>
[d] Ocalali idą dalej, nie zważając na kakofonię: zakończ to wydarzenie.
[c] Spóźniony wybiera
[d<]

Ocalały z najniższym wynikiem (lub Ocalali w przypadku remisów) zostaje spóźnionym. 

Każdy Spóźniony rzuca 1k10.

[i] Jeśli któryś z Ocalałych ma <b>hałasliwy</b> ekwipunek, Spóźniony dodaje +2 do swojego rzutu.

[TO] Sprawdź
[td] Czy któryś z Ocalałych ma <b>hałasliwy</b> ekwipunek i osada zna <b>bębny</b>?
[c] Tak #Bębny
[d] Ocalały przeciwdziała zawodzeniu melodią znaną ze swojego domu. Nie rzucacie kośćmi, a każdy Ocalały otrzymuje +2 do obłędu oraz +2 do przetrwania.
[c] Nie #
[d<]

[TA] 1k10
[td] Spóźniony
[c] 1-3
[d] Mgła wokół ciebie staje się czarna i wypełniona kształtami udręczonych twarzy. Doprowadza cię to do szaleństwa. Weź 1 losowe zaburzenie.
[c] 4-6
[d] Mgła się rozrasta i zaczyna wyć. Zatykasz palcami uszy, ale bez efektu. To wydarzenie zadaje Twojemu umysłowi obrażenia równe poziomowi potwora.
[c] 7-9
[d] Wciskasz kciuki do uszu i rzucasz się do ucieczki, pozostawiając za sobą zawodzący dym.
[c] 10+
[dt] Naśladując zatrważający dym, spokojnie zaczynasz wyć razem z nim. Otrzymujesz +2 obłędu.

[>d]
[T]

[>d]
[T]
`,

  9: `9 | Złote światło
Złote światło oślepia Ocalałych, zatrzymując ich w drodze. Świeci ono z jednego punktu. Wykonawca wydarzenia jest zmuszony to <b>zbadać</b>.
Zyskuje +1 odwagi i rzuca 1k10. 

[TO] 1k10
[td] Wykonawca wydarzenia - badanie
[c] Wykonawca wydarzenia jest <b>ślepy</b>
[d] Idzie w złym kierunku i otrzymuje +3 obłędu. Rzuć ponownie na liście wydarzeń na łowach i nie badaj światła.
[c] 1-3
[d] Światło jest przytłaczające. Twój kruchy umysł nie może zrozumieć jego niemego przekazu. Otrzymujesz 1 losowe zaburzenie.
[c] 4-8
[d] Zanurzasz się w światło, skąpany w ciepłym, okropnym uczuciu. Nie znajdujesz niczego eksponując się na działanie promieni. Wydarzenie to zadaje obrażenia równe poziomowi potwora, trafiając w losowe miejsce.
[c] 9+
[d]  Coś w w tym świetle ciebie porusza, a twoja determinacja zwiększa się. Otrzymujesz +1 do przetrwania.
[T]
`,

  10: `10 | Żniwiarz

[img] 10 # no-shadow # width:45%
<b>Tego wydarzenia nie można w żaden sposób ominąć lub powtórzyć rzutu.</b>
Ziemia trzęsie się i pęka pod Ocalałymi. Kolosalny robak wyskakuje z pęknięcia, jego skóra jest mozaiką wrzeszczących twarzy. Widok tego jest zatrważający.
Wszyscy Ocalali, otrzymują 1 losowe zaburzenie i muszą wydać  1 przetrwania lub zostaną  pożarci.

[TO] Sprawdź
[td] Czy jakiś z Ocalałych ma <b>hałasliwy</b> ekwipunek?
[c] Tak #Ocalały z hałasliwym ekwipunkiem
[d<]

Hałas przyciąga Żniwiarza, który natychmiast pożera Ocalałego. Nic nie może go uratować.

Stworzenie jest tak przerażające, że umysły Ocalałych usiłują wymazać to doświadczenie z pamięci. Nie osiągają żadnych korzyści z zasady śmierci.
[>d]
[c] Nie #
[d<]

Stworzenie jest tak przerażające, że umysły Ocalałych usiłują wymazać to doświadczenie z pamięci. Nie osiągają żadnych korzyści z zasady śmierci.

[>d]
[~T]
`,

  11: `11 |  Odchody potwora
Ocalali znajdują nieco odchodów potworów. Wyglądają na pozostawione przez tropioną zdobycz. Wykonawca wydarzenia wybiera <b>badanie</b> lub <b>spożycie</b> odchodów (wybierz tylko jedno z nich).

[TO] Wybór
[td] Wykonawca wydarzenia - Co robisz?
[c] Badanie #Badanie
[d<]

Zdobywasz +1 wiedzy i rzucasz 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia - Badanie
[c] 1-3
[d]  Odkrywasz, jak obrzydliwe jest bawienie się kałem. Tracisz 1 przetrwania i rzucasz ponownie w liście wydarzeń na łowach, przed poruszeniem na planszy łowów..
[c] 4-6
[d] Odchody mówią, że podążasz właściwym tropem. Otrzymujesz +1 do przetrwania.
[c] 7+
[d] Znasz doskonale takie odchody. Możesz pominąć następne pole na łowach. Jeśli ten ruch rozpoczyna Starcie, Ocalali zastawiają <b>zasadzkę</b> na zwierzynę.
[T]

[>d]
[c] Spożycie #Spożycie
[d<]

Zdobywasz +1 odwagi i rzucasz 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia - Spożycie
[c] 1-3
[d<]

Wygląda, że nie byłeś jedynym, który miał taki pomysł! Próbujesz wypluwać je kaszląc, ale twoje usta są pełne wijących się pasożytów! Przebijają się w górę przez jamę nosową do mózgu. Od teraz zawsze czujesz lekkie zawroty Otrzymujesz na stałe -1 do uniku.
Ponaddto jesli masz zaburzenie <b>donkiszoteria</b>, pasożyty delektują się unikalną aktywnością neuronową twojego mózgu. Karmią się łapczywie, wydalając odchody napędzające dodatkowo twoje szaleństwo. Otrzymujesz +10 obłędu i zaburzenie <b>nieśmiertelność</b>. Twoje zaburzenie <b>donkiszoteria</b> nie może być uleczone w żaden sposób.

[>d]
[c] 4-6
[d] To odrażające. Otrzymujesz przydomek „gówniarz”. Wszyscy w osadzie muszą od tej chwili zwracać się do ciebie w ten sposób.
[c] 7+
[d] W kale było coś naprawdę specjalnego. Otrzymujesz żetony: +1 do szybkości oraz +1 do siły.
[T]

[>d]
[T]
`,

  12: `12 | Przyspieszenie przeznaczenia

[img] 12 # no-shadow

Ocalałych ogarnęło wzmożone przeczucie oczekiwania na coś ważnego. Ich cel jest na wyciągnięcie ręki. 

Wykonawca wydarzenia otrzymuje +1 odwagi! Ocalali mogą pominąć następne pole łowów. Jeśli ten ruch uruchomi Starcie, Ocalali zastawiają <b>zasadzkę</b>.
`,

  13: `13 | Przeciążenie
Wykonawca wydarzenia pada na kolana, łkając traci panowanie nad sobą. Tego jest po prostu zbyt wiele. Traci 1k10 przetrwania  i otrzymuje  1 losowe zaburzenie.

[TO] Wybór
[td] Jaką doktrynę społeczną posiada osada?
[c] Akceptacja ciemności
[d<]

Wykonawcę wydarzenia ogarnia rozpacz. Rzuć 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-5
[d] Mizerność twojego istnienia jest większa niż kiedykolwiek mogłeś sobie wyobrazić. Dobierasz zaburzenia tak długo aż będziesz posiadał 3. Tracisz całe przetrwanie.
[c] 6+
[dt] Sięgasz dna, by z pozostałości zbudować nowe fundamenty. Chcesz więcej! Odkrywasz pierwotny gniew, otaczający centrum i niezmąconego spokoju. Otrzymujesz +1 do wiedzy i zaburzenie <b>furia</b>.
[>d]
[c] Praca zbiorowa
[d<]

Powoli podnosisz się na nogi, obiecując, że nigdy nie porzucisz nadziei. Rzuć 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-5
[d]  Powstajesz, a łzy w ciszy spływają po twej twarzy. Świadomość istnienia osady pozwala ci mierzyć się z ciemnością. Otrzymujesz +1 do odwagi i +1k10 do przetrwania.
[c] 6+
[dt] Na krótko pozwoliłeś świadomości osiągnąć dno nędzy istnienia. Dzięki temu doświadczeniu powracasz do pełni sił. Dzielisz się doświadczeniami. Jeśli którykolwiek z Ocalałych powróci do osady w tym roku, dodaj jednorazowo +2 do liczby dostępnych działań w osadzie.

[>d]
[c] Brak doktryny społecznej
[dt] Ocalali kontynuują łowy.
`,

  14: `14 | Przypadkowe spotkanie

[img] 14

Ocalali napotykają urzekającą, bosą bezdomną z pokrytymi sadzą stopami.

[TO] Sprawdź
[td] Czy już wcześniej wylosowałeś to wydarzenie lub wszyscy Ocalali są <b>obłąkani</b>?
[c] Tak #
[d] Odwraca się i znika w ciemności.Rzuć ponownie na liście wydarzeń na łowach, zanim poruszysz się na planszy łowów.
[c] Nie #
[d<]

Pokrzykując donośnie na Ocalałych, obecność kobiety napełnia wszystkich nadzieją. Wszyscy Ocalali otrzymują +1 do odwagi oraz +1 do wiedzy.

[TO] Sprawdź
[td] Czy osada zna Chałupy?
[c] Tak #Chałupa
[d] Bezdomna strzela palcami i starzeje się na waszych oczach! Chłód przechodzi przez Ocalałych. Wasze ciała i pancerze natychmiastowo zrastają się z powrotem. Uzdrów wszystkie poziomy ran i stracone punkty pancerza. Następnie chwyta ona losowo wybranego Ocalałego i szepce mu tajemnice zbliżających się łowów. Otrzymuje on żeton +1 do precyzji.
[c] Nie #
[dt] Kobieta odwraca się i znika w ciemnościach.
[>d]
[T]
`,

  15: `15 | Pułapka

[img] 15 # no-shadow

Wykonawca wydarzenia wdeptuje w straszliwą pułapkę! Rzuć 1k10.
[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-2
[d] Ze straszliwym trzaskiem stalowe ciężki szczęki przecinają Twoją stopę. Otrzymujesz ciężki uraz <b>odcięta noga</b>.
[c] 3-6
[d] Okalecznie nóg. Usuń cały pancerz w miejscu trafienia: nogi. Następnie to wydarzenie zadaje 1 obrażenie nogom.
[c] 7-9
[d] Pułapka okazuje się stara i słaba. To wydarzenie zadaje 1 obrażenie nogom.
[c] 10+
[d] Wykonawca wydarzenia kopie w pułapkę, strasząc wszystkich! Uszkadza ją, a w zaciśniętych szczękach pułapki odnajduje coś. Otrzymujesz 1 losowo wybrany podstawowy zasób.
[T]
`,

  16: `16 | Nocna groza
Wasz sen jest nękany przez koszmary. Każdy Ocalały rzuca 1k10.

[TA] 1k10
[td] Każdy Ocalały - Czy wynik jest wyższy niż obłęd?
[c] Tak
[d] Uczysz się czegoś o budzącej się grozie i otrzymujesz +1 do wiedzy.
[c] Nie
[d] Otrzymujesz 1 losowe zaburzenie.
[c] Jeśli którykolwiek z Ocalałych jest zbawcą lub zna sztukę walki  <b>szósty zmysł</b>,  znikają w tym  śnie.  Wynurzają  się z ciemności kilka godzin później. Każdy z nich otrzymuje +4
doświadczenia łowieckiego i losowy podstawowy zasób.
`,

  17: `17 | Twarzą w twarz
Pośród morza kamiennych twarzy, jedna przyciąga spojrzenie wykonawcy wydarzenia.Coś zmusza go do podjęcia <b>badania</b>. Otrzymuje +1 do odwagi i rzuca 1k10.
[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1
[d] Twarz wygląda identycznie jak Twoja. Wydaj 1k5 przetrwania lub zredukuj swoją wiedzę do 0.
[c] 2-7
[d] Twarz przypomina ci kogoś bliskiego. Twoje serce wypełnia ból samotności. Jeśli twoje przetrwanie jest większe niż twój obłęd, to wydarzenie zadaje twojemu umysłowi obrażenia równe poziomowi potwora.
[c] 8+
[dt] To twoja twarz,jednakże starsza i bardziej doświadczona. Otrzymujesz +1 do przetrwania i +1 do wiedzy.
`,

  18: `18 | Martwy chwast

[img] 18 # no-shadow # width:35%

Znajdujesz dziwną roślinę wyrastającą z oczu kamiennejtwarzy. Wykonawca wydarzenia próbuje ją wyrwać. Rzuć 1k10.

[i] Jeśli jakikolwiek Ocalały ma sierp, dodaj +4 do swojego rzutu.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-7
[d]  Próbujesz ze wszystkich sił, ale nie możesz wyciągnąć głęboko ukorzenionego chwastu.
[c] 8+
[dt] Łatwo wyciągasz chwast! Ma ogromną moc regeneracyjną. Każdy z ocalałych wciera go w skórę i trwale usuwa 1 ciężki uraz. Następnie chwast rozpada się w pył w twoich rękach.
`,

  19: `19 | Opary Ciemności

[img] 19 # width:25%

Ocalałych spowijają opary ciemności zaciemniającej światła  ich latarni.  Oddzielają  się od siebie i gubią  w mroku.

[TO] Sprawdź
[td] Czy jakiś Ocalały posiada sztukę walki <b>przywódca</b>?
[c] Tak #Przywódca
[d] Rzucasz się odważnie w gęstą ciemność i zbierasz wszystkich. Zakończ to wydarzenie.
[c] Nie #
[d<]

Każdy Ocalały rzuca 1k10. Ocalały z najniższym wynikiem (lub Ocalali w przypadku remisów) zostaje Spóźnionym i rzuca 1k10.

[TA] 1k10
[td] Spóźniony
[c] 1-2
[d] Biegnąc potykasz się i wpadajsz na kości starożytnego potwora. Niszczysz przy tym część swojego ekwipunku. Wybierz i zarchiwizuj 1 ekwipunek ze swojego siatki ekwipunku.
[c] 3-5
[d] Atakuje cię coś niewidzialnego. To wydarzenie zadaje 1 obrażenie umysłowi i 1 obrażenie w losowe miejsce trafienia.
[c] 6-8
[d] Uderzasz w nos gigantycznej kamiennej twarzy! To wydarzenie zadaje ci 1 obrażenie w głowę.
[c] 9+
[dt] Nie wiesz jak to się stało, ale wypadasz z ciemności, z pełnymi rękoma. Otrzymujesz 1 losowy podstawowy zasób.

[>d]
[T]
`,

  20: `20 | Sucha ziemia
Maszerujących Ocalałych spowija gorące powietrze, a ziemia pod ich stopami pęka. Nieznośne gorąco wysysa z Ocalałych siły. Każdy traci 1 przetrwania. Jeśli ma na sobie futro lub ciężki ekwipunek, zamiast tego traci 1k5 przetrwania.

[TO] Sprawdź
[td] Czy jakis Ocalały posiada kilof?
[c] Tak #Kilof
[d] Ocalali natrafiają w popekanej ziemi na ineresującą żyłę żelaza. Otrzymujesz 1 dziwny zasób <b>żelazo</b>.
[c] Nie #Brak kilofa
[dt] Ocalali kontynuują łowy.
`,

  21: `21 |  Rysunki
Kryjąc się w jaskini, Ocalali odnajduja dziwne rysunki dekorujące ściany. Odkrywają, że zawierają one wiadomość.

[TO] Sprawdź
[td] Czy jakiś Ocalały ma 3+ wiedzy albo osada odkryła piktogramy?
[c] Tak #Odszyfruj

[d<]

[i] Jeśli zna <b>piktogramy</b>, każdy Ocalały może rzucić 1k10 (nawet bez wymaganej wiedzy) i dodać +4 do wyrzuconego przez siebie wyniku.

[TA] 1k10
[td] Każdy ocalały z wiedzą na 3+
[c] 1-3
[d] Twój nos zaczyna krwawić. To wydarzenie zadaje 1 obrażenie umysłowi, równe poziomowi potwora.
[c] 4-7
[d] Prawdziwe znaczenie umyka Ci. Otrzymujesz +1 do obłędu.
[c] 8+
[dt] Rysunki uczą cię nowego sposobu walki z potworami! Otrzymujesz +2 przetrwania i losową sztukę walki.
[>d]

[c] Nie
[d] Ocalali kontunuują łowy.
[T]
`,

  22: `22 | Kwasowy deszcz
Ciemność nad wami nagle rozbłyska burzą kwasowego deszu. Cuchnie okropnie, pali ciało i tworzy syczące kałuże w rozwartych ustach kamiennych twarzy. To wydarzenie zadaje wszystkim Ocalałym obrażenia, równe poziomowi potwora w każde miejsce trafienia, gdy miotają się by znaleźć schronienie.

[TO] Sprawdź
[td] Czy osada zna Rzeźbę?
[c] Tak #Rzeźba
[d<]

Ocalali w milczeniu oglądają deszcz erodujący kamienne twarze, usuwający z nich rysy. Zastanawiają się, kto lub co naprawia zniszczone twarze po takim zdarzeniu. Ocalali wymieniają markotne uśmiechy. Każdy otrzymuje przetrwanie równe poziomowi potwora.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-5
[d] Burza powoli mija.
[c] 6+
[dt] Kwasowa burza przemieszcza się ku domowi. Dodaj wydarzenie <b>Kwasowa burza</b> na osi czasu w przyszłym roku.

[>d]
[c] Nie #Brak Rzeźby
[d<]

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-5
[d] Burza powoli mija.
[c] 6+
[dt] Kwasowa burza przemieszcza się ku domowi. Dodaj wydarzenie <b>Kwasowa burza</b> na osi czasu w przyszłym roku.

[>d]
[T]
`,

  23: `23 | Czysta woda
Ocalali podchodzą do samotnej fontanny w kształcie lwiego łba. Strumień krystalicznie czystej wody wypływa z jego paszczy. Każdy ocalały spożywa wodę, zyskując +1 do przetrwania i +1 odwagi. Dowolna liczba ocalałych może zanurzyć głowę w wodzie i rzucić 1k10.

[TA] 1k10
[td] Każdy ocalały
[c] 1-2
[d] Głowa błyskawicznie staje się mokra, twoje włosy zmieniają się w białe. Zyskujesz 1 losowe zaburzenie.
[c] 3-5
[d]  Twoje włosy są mokre. Gratulacje.
[c] 6-8
[d] Woda jest orzeźwiająca. Zyskujesz +1 wiedzy lub usuń dowolne wybrane przez siebie zaburzenie.
[c] 9+
[d] Woda jest szokująco zimna! Przepływa nad tobą jak fala przyboju i pozostawia uczucie orzeźwienia. Ustaw swój obłęd na 0 i usuń wszystkie zaburzenia.
[T]
`,

  24: `24 | Pokarm w ustach innych

[img] 24 # no-shadow

Ocalali mijają kamienną twarz, wydającą się mieć coś w ustach. Wykonawca  wydarzenia  przeprowadza  <b>badanie</b>. Otrzymuje +1 odwagi i rzuca 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia - Badaj
[c] 1-2
[d] Wrzeszczysz z bólu i cofasz rękę pokazując krwawe rany. Czyżby kamienna twarz po prostu ugryzła? To wydarzenie zadaje obrażenie umysłowi, równe poziomowi potwora oraz obrażenie rąk, równe poziomowi potwora.
[c] 3-5
[d] Nic tu nie ma. To było tylko złudzenie.
[c] 6-8
[d] To tylko skały, ekwipunek czego się odłamek spodziewałeś? Otrzymujesz 1 początkowy ekwipunek <b>odłamek podłoża</b>.
[c] 9+
[d] Wyciągasz przeżutą masę. Otrzymujesz 1 losowy podstawowy zasób oraz +2 do obłędu.
[T]
`,

  25: `25 |  Tytani w ciemności

[img] 25 # no-shadow # width:50%

Przeszywający uszy ryk obwieścił nadejście prawdziwie tytanicznej bestii. To wydarzenie, zadaje obrażenie umysłom wszystkim  <b>niegłuchych</b>  Ocalałych,  równe  poziomowi potwora. Ocalali kryją się na ziemi, leżąc tak bardzo płasko, jak to tylko możliwe, mając nadzieję, że są zbyt mali, by zostać zjedzonymi.

Każdy Ocalały rzuca 1k10. Ocalały z najniższym wynikiem (lub którykolwiek Ocalali w Ocalały przypadku ma remisów) zostaje Spóźnionym.

[i] Jeśli którykolwiek Ocalały ma ekwipunek <b>hałaśliwy</b>,  otrzymuje -2 do tego rzutu.

[TO] 1k10
[td] Wybierz Spóźnionego
[c] Spóźniony wybrany
[d<]

Każdy Spóźniony rzuca 1k10.

[TA] 1k10
[td] Spóźniony
[c] 1
[d<]

Zostałeś porwany z ziemi i pożarty w całości.

[TO] Sprawdź
[td] Czy osada zna Przetrwanie najsilniejszych?
[c] Tak #Przetrwanie najsilniejszych
[d] skręcasz się i wyrywasz z ust lądując na ziemi z głuchym łomotem. Otrzymujesz ciężki uraz złamana ręka i złamana noga, ale nie umierasz.
[c] Nie #
[dt] Nie żyjesz.

[>d]
[c] 2-4
[d] Coś chwyta cię w wielką paszczę i chwilę przeżuwa cię. To wydarzenie zadaje po 1 obrażeniu, w wylosowane 1k5 miejsc trafień.
[c] 5-6
[d] Zaciskające się szczęki tylko cię uszczypnęły! To wydarzenie zadaje obrażenie równe poziomowi potwora, w losowe miejsce trafienia.
[c] 7-9
[d] Rozpłaszczasz się na ziemi najbardziej jak potrafisz, co pozwala uniknąć straszliwych tarapatów.
[c] 10+
[dt] Nigdy nie przestaniesz uciekać od tego, co zobaczyłeś. Zdobywasz na stałe +1 do ruchu.
[>d]
[T]
`,

  26: `26 | Dół
Ziemia pod stopami wykonawcy wydarzenia zapada się i spada on do dołu. Wykonawca wydarzenia rzuca 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] Jeśli inny Ocalały ma bicz #Bicz
[d] Zdąży ci go rzucić na czas, nie rzucaj  kością.
[c] Wykonawca  wydarzenia zna sztukę walki <b>sprężysty</b> #Sprężysty 
[d] Zwinnie chwyta się kamiennej półki i podciąga w górę; Otrzymuje żeton +1 do szybkości i nie rzuca kością.
[c] 1
[d] Lądujesz z obrzydliwym chrupnięciem, okaleczając nogi. Otrzymujesz dwukrotnie ciężki uraz <b>złamanej nogi</b>.
[c] 2-3
[d] Łamiesz nogę przy upadku. Otrzymujesz ciężki uraz <b>złamana noga</b>.
[c] 4-6
[d] Lądujesz w dole z głośnym łomotem. To wydarzenie zadaje 2 obrażenia, w losowe miejsce trafienia. Zarchiwizuj każdy <b>kruchy>/b> ekwipunek ze swojej siatki ekwipunku.
[c] 7-9
[d] Lądujesz na dnie z cichym łomotem. To wydarzenie zadaje 1 obrażenie, w losowe miejsce trafienia.
[c] 10+
[dt] Udaje ci się chwycić krawędzi dołu i uciec bez szwanku.
`,

  27: `27 | Złodziej męskości

[img] 27 # no-shadow

Wyczerpani Ocalali odpoczywają. Podczas niespokojnego snu, wślizgują się niepostrzeżenie małe insekty.

Wybierz losowo 1 Ocalałego mężczyznę i rzuć 1k10.

[TO] Wybór
[td] Wybierz losowo 1 Ocalałego mężczyznę
[c] Ocalały wybrany
[d<]

Rzuć 1k10.

[TO] 1k10
[td] Ocalały mężczyzna
[c] Wybrany Ocalały zna sztukę walki <b>Walczący w szoku</b> #Walczący w szoku
[d] Chrapiąc bezwiednie rozgniata robaka; nie rzuca kością. Budzi się zdezorientowany z losowym zasobem <b>robactwa</b> w dłoniach.
[c] 1-5
[d] Po przebudzeniu stwierdzasz, że Twoje genitalia zostały skradzione. W ich miejscu masz tylko gładką skórę. Otrzymujesz ciężki uraz zniszczone genitalia.
[c] 6+
[dt] Budzisz się przerażony, widząc zbliżające się groźnie szczypce. Twoja obrona jest szybka. Bez zastanowienia, walczysz z owadem czołgającym się po spodniach. To wydarzenie zadaje tobie 1 obrażenie w talię.

[>d]
[c] Brak męskich Ocalałych
[d] nic się nie dzieje.
[T]
`,

  28: `28 | Troloptak

Na drodze Ocalałych stanął nastroszony, brzydki ptak. Jego paciorkowate, mokre oczy mrugają wyczekująco. Wybucha on niesamowitym, ludzkim chichotem. Ocalali mogą zarchiwizować 1 <b>jadalny</b> przedmiot lub ekwipunek, oferując go ptakowi.

[i] Jeśli którykolwiek z Ocalałych jest obłąkany, musi nakarmić śpiewoptaka, jeśli ma czym.

[TO] Wybór
[td] Co robisz?
[c] Nakarm ptaka #Karmi
[d] Karmisz ptaka który podskakuje straszliwie gdacząc.
[c] Zignoruj ptaka #Zignoruj
[d<]

Troloptak podąża za Ocalałymi podczas łowów, nieustannie kpiąc z nich swoim chichotem. Rzuć 1k10.

[i] Jeśli którykolwiek z ocalałych ma zaburzenie <b>koprolalia</b>, klnie na ptaka energicznie czyniąc wulgarne gesty. Wyraźnie robi na ptaku wrażenie. Dodaj +3 do swojego rzutu.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-5
[d] Troloptak robi straszną awanturę, ostrzegając potwora. Wszyscy Ocalali otrzymują +1 do wiedzy. Na początku starcia, potwór zastawia <b>zasadzkę</b> na Ocalałych..
[c] 6+
[dt] Ptak kpi i odwraca uwagę potwora od skradających się Ocalałych. Wszyscy Ocalali zyskują +1 obłędu. Na początku starcia, Ocalali zastawiają <b>zasadzkę</b> na potwora.
[>d]
[T]
`,

  29: `29 | Mroczny kowal

[img] 29 # no-shadow

Ścieżki Ocalałych krzyżują się z wysokim, nienaturalnie chudym mężczyzną w zakapturzonym płaszczu. Tam, gdzie jego stopy uderzają o ziemię, iskry oświetlają jego przejście. Każdy z Ocalałych o odwadze 3+ może dać mu jeden element ze swojej siatki ekwipunku i rzucić kością.

[i] Jeśli ma zaburzenie honorowy, dodaje  3 do swojego rzutu.

[TA] 1k10
[td] Dowolny Ocalały z odwagą 3+
[c] 1-2
[d] Istota podnosi przedmiot do swoich ust i zjada go. Poczym odchodzi. Zarchiwizuj kartę ekwipunku.
[c] 3-6
[d] Istota odrzuca ekwipunek i wgapia się w ciebie swoim pojedynczym, wielkim okiem. To wydarzenie zadaje Twojemu umysłowi 1k10 obrażeń.
[c] 7-8
[d] Istota kłapnęła szczękami i rozgryza fragmenty ekwipunku.W zamian dostajesz lśniącą tarczę. Otrzymujesz rzadki ekwipunek <b>stalowa tarcza</b>.
[c] 9+
[dt] Istota kłapnęła szczękami i rozgryza fragmenty ekwipunku. W zamian dostajesz lśniący miecz. Otrzymujesz rzadki ekwipunek <b>stalowy  miecz</b>.
`,

  30: `30 | Zgniłe twarze
Kamienne twarze zapadają się lekko pod nogami Ocalałych. Są wzdęte i śmierdzą okropnie. Każdy Ocalały rzuca 1k10.

[TA] 1k10
[td] Każdy Ocalały
[c] 1
[d] Twoja stopa utknęła i szybko zaczyna zanurzać się w ziemi. Po szarpaninie udaje ci się ją uwolnić. Jeśli miałeś pancerz na nogach, zaginął w błocie. Wydaj 3 przetrwania albo zarchiwizuj ten ekipunek.
[c] 2-5
[d] Ugrzązłeś! Walczysz by się wyrwać! Rzuć ponownie w tej tabeli lub wydaj 1 przetrwania byc uciec.
[c] 6-9
[d] Uciekasz bez żadnego przykrego incydentu
[c] 10+
[dt] Znalazłeś coś ciężkiego. Wyciągasz mozolnie obiekt ze zgnilizny! Otrzymujesz losowo 1 podstawowy zasób.
`,

  31: `31 | Dziwna ścieżka
Ocalali stają na początku ścieżki. Małe latarnie migoczą, znacząc jej krawędzie.

Wykonawca wydarzenia decyduje, czy Ocalali podążą ścieżką, czy też nie.
[i] Jeśli wykonawca wydarzenia jest dotknięty <b>obłędem</b>, muszą przez nią przejść. 

[TO] Wybór
[td] Wykonawca wydarzenia - podążacie ścieżką?
[c] Tak #Podążacie
[d<]

Wykonawca wydarzenia otrzymuje +1 wiedzy, następnie rzuca 1k10 dodając swoją wiedzę do wyniku.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1
[d] Gigantyczny palec spada z góry, zgniatając losowego Ocalałego. To wydarzenie zadaje mu 2 obrażenia w każde miejsce trafienia.
[c] 2-4
[d] Losowy Ocalały z histerycznym płaczem odbiega, porzucając marsz ścieżką. Wraca wiele godzin później, upiornie blady i bez pamięci co się stało. Traci 1k10 przetrwania.
[c] 5-7
[d] Ścieżka skręca i ginie w mroku. To wydarzenie zadaje wszystkim Ocalałym 1 uszkodzenia umysłu, a wykonawca wydarzenia rzuca ponownie na tej liście wydarzeń, dodając +2 do tego rzutu.
[c] 8-9
[d] Ścieżka prowadzi Ocalałych do olbrzymiej kamiennej twarzy z latarniami w oczach. Wewnątrz jej otwartych ust jest dar. Każdy Ocalały otrzymuje 1 losowy podstawowy zasób.
[c] 10+
[d<]

Ścieżka prowadzi do bestii, na którą polujecie! Ocalali zastawiają <b>zasadzkę</b> na potwora.
[i] Jeśli którykolwiek z Ocalałych posiada zaburzenie <b>Honorowy</b>, zdaje sobie sprawę z szaleństwa w jakie popadł i może usunąć to zaburzenie. Jeśli którykolwiek Ocalały pozostanie <b>honorowy</b>, ogłasza swoją obecność potworowi i to potwór urządza <b>zasadzkę</b> na Ocalałych.

[>d]
[T]

[>d]
[c] Nie #Nie podążacie
[dt] Rzuć jeszcze raz na liście wydarzeń na łowach, przed ruchem na planszy łowów.
`,

  32: `32 | Nagłe szaleństwo
Głowę wykonawcy wydarzenia przeszywa dewastująca zmysły kakofonia. Rzuć 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] Wynik jest niższy lub równy aktualnemu poziomowi obłędu Wykonawcy #
[d<]

Wykonaca wydarzenia wariuje rzucając się na swoich towarzyszy. To wydarzenie zadaje każdemu innemu Ocalałemu 1 trafienie w losowe miejsce trafienia, zanim wykonawca wydarzenia wydarzenia odzyskuje kontrolę nad sobą.

[TO] Sprawdź
[td] Czy Wykonaca wydarzenia posiada sztukę walki <b>Oszalały</b>?
[c] Tak #Oszalały
[d] Pozostają mu spostrzeżenia po tych mękach. Zyskuje +10 do obłędu i +2 do wiedzy.
[c] Nie #
[d] Nie wyciągnął żadnej nauki z tego doświadczenia.
[T]

[>d]
[c] Wynik jest wyższy niż aktualny poziomo obłędu Wykonawcy wydarzenia #
[d<]

Odzyskuje kontrolę nad sobą.

[TO] Sprawdź
[td] Czy Wykonaca wydarzenia posiada sztukę walki <b>Oszalały</b>?
[c] Tak #Oszalały
[d] Pozostają mu spostrzeżenia po tych mękach. Zyskuje +10 do obłędu i +2 do wiedzy.
[c] Nie #
[d] Nie wyciągnął żadnej nauki z tego doświadczenia.
[T]

[>d]
[T]
`,

  33: `33 |  To szepcze Twoje imię

[img] 33

Gdy wykonawca wydarzenia przechodzi ponad wystającym nosem z ziemi, kamienne usta zaczynają się poruszać! 

[TO] Sprawdź
[td] Czy Wykonawca wydarzenia ma imię?
[c] Tak #
[d<]

Usta zaczynają uwodzicielsko szeptać imię Ocalałego.

[TO] Sprawdź
[td] Czy Wykonawca jest obłąkany?
[c] Tak #Obłąkany
[d<]

Dziko i brutalnie zaczyna całować twarz. Reszta Ocalałych jest zniesmaczona i oburzona. To wydarzenie zadaje umysłom reszty Ocalałych, po 1 obrażeniu, zanim odciągną szaleńca od twarzy i ruszą  dalej.

[TO] Sprawdź
[td] Czy któryś z Ocalałych ma zaburzenie <b>Głód szpiku</b>?
[c] Tak #Głód szpiku
[d] Twarz szepce sekretne przesłanie o celu jego życia. Dodaj wydarzenie <b>morderstwo</b> do osi czasu w przyszłym roku.
[c] Nie #
[d] Ocalali kontunuują łowy.
[T]

[>d]
[c] Nie #Nie jest obłąkany
[d<]

Wykonawca zyskuje +1 do wiedzy, czując, że czegoś się nauczył.

[TO] Sprawdź
[td] Czy któryś z Ocalałych ma zaburzenie <b>Głód szpiku</b>?
[c] Tak #Głód szpiku
[d] Twarz szepce sekretne przesłanie o celu jego życia. Dodaj wydarzenie <b>morderstwo</b> do osi czasu w przyszłym roku.
[c] Nie #
[d] Ocalali kontunuują łowy.
[T]

[>d]
[T]

[>d]
[c] Nie #
[dt] Usta przestają się poruszać i nic więcej sie nie dzieje.
`,

  34: `34 |  Nieszczęśliwe okaleczenie
Każdy Ocalały rzuca 1k10. Ocalały z najniższym wynikiem (lub Ocalali w przypadku remisu) zostaje Spóźnionym. 

[i] Jeśli którykolwiek  Ocalony (lub  Ocalali)  ma zaburzenie  <b>niepokój</b>, automatycznie staje się Spóźnionym. Nie rzuca wtedy kością.

[TO] 1k10
[td] Wybierz Spóźnionego
[c] Spóźniony wybrany
[d<]

Spóźnionego zaczyna gnębić silne zwątpienie. Nim się ocknął - zagubił się. Nie mając dość energii i woli by się w porę złapać, ześlizgnął się po stromym wzgórzu kamiennych twarzy. Niezgrabnie lądując z nieprzyjemnym chrzęstem, otrzymuje ciężki uraz:  <b>złamana noga</b>. W trosce o siebie, zdaje sobie sprawę jak okropne jest jego życie. Zyskuje +1 wiedzy.

[TA] Check
[td] Czy Spóźniony ma zaburzenie <b>Napady obżarstwa</b>?
[c] Tak #Napady obżarstwa
[d] Zmywa łzy i wyciąga rękę po pobliskie stworzonko, instynktownie wpychając je sobie do ust jako pocieszenie. Dobierz 1 losowy zasób robactwa i go <b>spożyj</b>.
[c] Nie #Brak napadów obżarstwa
[d] Nic się nie dzieje.
[T]

[>d]
[T]
`,

  35: `35 |  Zepsuty latarniany piec
Ocalali, natknęli się na roztrzaskane ruiny małej osady. Popielate zwłoki pokrywają ruiny, rozsypując się przy najlżejszym dotyku. Wygasły latarniany piec stoi nietkniętyw centrum osady. 

Wykonawca  wydarzenia  rzuca 1k10  i dodaje  swoją wiedzę.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-4
[d<]

[TO] Sprawdź
[td] Czy osada zna <b>Pieść o bohaterach</b>?
[c] Tak #Pieść o bohaterach
[d<]

Grupa wybiera Ocalałego bohatera, aby zbadał ruiny latarnianego kopca. Otrzymuje +1 do odwagi i rzuca kością 1k10.

[TO] 1k10
[td] Wybrany Ocalały
[c] 1-5
[d] Próbujesz wejść do zrujnowanego latarnianego kopca ale pokonuje Cię strach, padasz na kolana i wymiotujesz wszędzie. Kiedy wstaniesz, czujesz, że jesteś fizycznie niezdolny by brnąć dalej. Otrzymujesz zaburzenie <b>Apatia</b>.
[c] 6+
[dt] Jesteś odpychany przez zrujnowany latarniany kopiec, ale dotarłeś wystarczająco blisko, aby złapać parę owadów biegających w środku. Będąc tak blisko czujesz przyjemne odprężenie. Wybierz 2 zasoby robactwa według własnego uznania.

[>d]
[c] Nie #
[d<]

Ocalali kontunuują łowy.

[>d]
[T]

[>d]
[c] 5+
[d<]

Zdobywacie innowację <b>Latarniany piec</b>:

<button class="hunt_event_action_button hoverable" id="lantern_oven" onClick="placeReminder('lantern_oven')">Dodaj innowację</button>

[i] Jeśli osada posiada już tę innowację, wykonawca wydarzenia zabiera z pozostałości podstawowy zasób <b>zniszczona latarnia</b>.

[TO] Sprawdź
[td] Czy osada zna <b>Pieść o bohaterach</b>?
[c] Tak #Pieść o bohaterach
[d<]

Grupa wybiera Ocalałego bohatera, aby zbadał ruiny latarnianego kopca. Otrzymuje +1 do odwagi i rzuca kością 1k10.

[TO] 1k10
[td] Wybrany Ocalały
[c] 1-5
[d] Próbujesz wejść do zrujnowanego latarnianego kopca ale pokonuje Cię strach, padasz na kolana i wymiotujesz wszędzie. Kiedy wstaniesz, czujesz, że jesteś fizycznie niezdolny by brnąć dalej. Otrzymujesz zaburzenie <b>Apatia</b>.
[c] 6+
[dt] Jesteś odpychany przez zrujnowany latarniany kopiec, ale dotarłeś wystarczająco blisko, aby złapać parę owadów biegających w środku. Będąc tak blisko czujesz przyjemne odprężenie. Wybierz 2 zasoby robactwa według własnego uznania.

[>d]
[c] Nie #
[d<]

Ocalali kontunuują łowy.

[>d]
[T]

[>d]
[T]
`,

  36: `36 | Na szlaku
Ocalali ruszają naprzód czując, że tropiona zdobycz jest już blisko. Pomiń następne pole łowów.Jeśli ten ruch rozpoczyna  starcie, Ocalali organizują <b>zasadzkę</b> na zdobycz. Jeśli którykolwiek z Ocalałych ma <b>hałaśliwy</b> ekwipunek, Oca-
lali nie organizują zasadzki. Rozpocznij Starcie normalnie.
`,

  37: `37 | Zagubieni
Ocalali zagubili się beznadziejnie w nieprzeniknionej ciemności. Cofnij Ocalałych o 2 pola na planszy łowów.
`,

  38: `38 |  Gigantylopa

Ogromna Antylopa stanęła okrakiem na granicy horyzontu, jej stare ciało pokryte jest guzami i bliznami. Gdy jej mleczne oczy dostrzegają Ocalałych – odskakuje. Nagłe pragnienie pcha Ocalałych w pościg. Wykonawca wydarzenia rzuca 1k10  i dodaje  swój ruch  do wyniku  rzutu.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] Czy jakiś Ocalały posiada sztuke walki <b>Strateg</b>? #Strateg
[d<]
Ocalali zamiast ścigać Gigantylopę mogą ją zagnać w miejsce bez mozliwości ucieczki obok gigantycznej kamiennej twarzy.

Jeśli to robią, natychmiast zakończ łowy.

Rozpocznij Starcie z Wrzeszczącą Antylopą 2 poziomu, używając jej zasad rozstawienia.
Dodatkowo umieść <b>Gigantyczną kamienną twarz</b> przylegającą do potwora i daj potworowi kartę cechy Rzeźnika: <b>Berserk</b>. 

Jeśli Ocalali przeżyją, zdobywają normalne nagrody za starcie oraz dodatkowe 3 zasoby Wrzeszczącej Antylopy.

<button class="hunt_event_action_button hoverable" id="gregalope" onClick="placeReminder('gregalope')">Rozpocznij starcie!</button>

[>d]
[c] 1-6
[d] Ocalali szybko pozostają w tyle za majestatyczną bestią. Odsuń ich o jedno pole od zdobyczy na planszy łowów.
[c] 7-14
[d] Gigantylopa jest zdecydowanie za szybka. Zniknęła nim zdążyłeś się zorientować co sie dzieje.
[c] 15-16
[d] Ocalali tracą z oczu Gigantylopę, ale odkrywają ukrytą ścieżkę. Będziesz mógł ponowić najbliższy rzut na liście wydarzeń.
[c] 17+
[dt] Zanim Gigantylopa uskoczyła poza pole widzenia, skłoniła swe potężne rogi. To zdarzenie wpływa nawykonawcę wydarzenia. Otrzymuje na stałe +1 do ruchu.
`,

  39: `39 | Gęsta mgła
Gęsta mgła oplata Ocalałych, zasłaniając światła ich latarń. Rzuć 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] Wynik parzysty #Przysty
[d] Ocalali brną we właściwym kierunku. Jeśli Starcie zacznie się się na następnym polu na planszy łowów, potwór zaczaja się w <b>zasadzce</b> na Ocalałych.
[c] Wynik nieparzysty #Nieparzysty
[dt] Jeśli wynik jest nieparzysty, Ocalali kręcą się w kółko. Rzuć ponownie w tabeli wydarzeń na łowach zanim poruszysz się dalej na planszy łowów.
`,

  40: `40 | Sen
Wykonawca wydarzenia śni o nadchodzących łowach. Stają przed wielką bestią, ale ta ich powala.

[TO] Sprawdź
[td] Czy Wykonawca wydarzenia ma odwagę 3+ albo którykolwiek z Ocalałych jest zbawcą?
[c] Tak #
[d<]

Wykonawca zdarzenia jest ośmielony przez sen i otrzymuje żeton +1 do uników.

[TO] Sprawdź
[td] Czt którykolwiek z Ocalałych ma <b>Miecz zmierzchu</b>?
[c] Tak #Miecz zmierzchu
[d] Śni o masowej rzezi. Dodaj zdarzenie <b>morderstwo</b> na osi czasu za 1k5 lat od teraz.
[c] Nie #Brak Miecza zmierzchu
[d] Nic się nie dzieje.
[T]

[>d]
[c] Nie #
[d<]

Sen jest tylko zmorą. To wydarzenie zadaje 1 obrażenie umysłowi Wykonawcy.

[TO] Sprawdź
[td] Czt którykolwiek z Ocalałych ma <b>Miecz zmierzchu</b>?
[c] Tak #Miecz zmierzchu
[d] Śni o masowej rzezi. Dodaj zdarzenie <b>morderstwo</b> na osi czasu za 1k5 lat od teraz.
[c] Nie #Brak Miecza zmierzchu
[d] Nic się nie dzieje.
[T]
[>d]
[T]
`,

  41: `41 | Koszmar
Wykonawca wydarzenia śni o nadchodzących łowach. Wielka bestia znika podczas walki i potajemnie śledzi ich powrót do osady. Bezradnie patrzą, jak pożera wszystko, co znają i kochają.

Wykonawca wydarzenia otrzymuje +1k10 obłędu i żeton -1 do zwodów.

[TO] Sprawdź
[td] Czy osada posiada zbawiciela?
[c] Tak #
[d<]

Zbawiciel, objawia się we śnie i broni ich domu. Wykonawca wydarzenia otrzymuje +1k5 przetrwania.
[TO] Sprawdź
[td] Czy jakiś z Ocalałych w osadzie lub grupie łowieckiej posiada <b>Miecz zmierzchu</b>?
[c] Tak #Miecz zmierzchu
[d] Ocalali budzą się i kontynuuja łowy.
[c] Nie #Brak Miecza zmierzchu
[dt] Wykonawca wydarzenia widzi w śnie szaloną wersję siebie władającego poteżnym ostrzem i radośnie mordującego bestię. Budzi się, odnajdując przy sobie <b>Miecz zmierzchu</b> leżący tuż przy ciele. Ocalały instynktownie rozpoznaje moc klątwy nałożonej na broń i obietnicę mocy. Wykonawca wydarzenia zyskuje rzadki ekwipunek <b>Miecz zmierzchu</b> Może również wybrać <b>Miecz zmierzchu</b> jako rodzaj biegłości w broni i zdobyć +1 do umiejętności biegłości w posługiwaniu się tą bronią.

[>d]
[c] Nie #
[d<]

[TO] Sprawdź
[td] Czy jakiś z Ocalałych w osadzie lub grupie łowieckiej posiada <b>Miecz zmierzchu</b>?
[c] Tak #Miecz zmierzchu
[d] Ocalali budzą się i kontynuuja łowy.
[c] Nie #Brak Miecza zmierzchu
[dt] Wykonawca wydarzenia widzi w śnie szaloną wersję siebie władającego poteżnym ostrzem i radośnie mordującego bestię. Budzi się, odnajdując przy sobie <b>Miecz zmierzchu</b> leżący tuż przy ciele. Ocalały instynktownie rozpoznaje moc klątwy nałożonej na broń i obietnicę mocy. Wykonawca wydarzenia zyskuje rzadki ekwipunek <b>Miecz zmierzchu</b> Może również wybrać <b>Miecz zmierzchu</b> jako rodzaj biegłości w broni i zdobyć +1 do umiejętności biegłości w posługiwaniu się tą bronią.

[>d]
[T]
`,

  42: `42 | Chirurg
Skrzypiący powóz zbliża się do Ocalałych. Bogato zdobiony, w kolorze czerwieni i złota, pokryty z każdej strony reliefami przedstawiającymi ponure twarze. Ogromne, drżące oko zdobi przód, a otwierające się wielkie usta okazują się być drzwiami. Z małego okna skinęła sękata dłoń.
Jeden z Ocalałych z odwagą 3+ może wejść do powozu.

[TO] Wybór
[td] Ocalałych z odwagą 3+
[c] Wejdź
[d] Usuwasz jedno uposledzenie lub ciężki uraz i otrzymujesz 1 losowe zaburzenie.
[c] Nie wchodź
[d] Ocalali kontynuują łowy.
[T]
`,

  43: `43 |  Świeża ofiara
Dywan pełzających owadów wskazuje Ocalałym, niedawno zabitego potwora. Owady oczyszczające truchło próbują bronić swojego obiadu, ale Ocalali walczą z nimi, by odebrać nagrodę.
Każdy Ocalały rzuca 2k10 i dodaje swoje doświadczenie łowieckie. Ocalały z największą liczbą punktów (remisujący ponawiają rzut) zabija najwięcej robactwa i wygrywa od nich zgniłą nagrodę. Zyskuje 1 losowy podstawowy zasób oraz 1 losowy zasób robactwa.
`,

  44: `44 | Oportuniści
Podczas badania tropów zdobyczy, Ocalali zdają sobie sprawę, że polują nie na jednego, ale dwa potwory. Dwa zestawy tropów rozdzielają się, pozostawiając Wykonawcy wydarzenia dylemat którymi śladami podążyć.

[TO] Wybór
[td] Wykonawca wydarzenia wybiera
[c] Większe ślady
[d] Kontunuujcie łowy normalnie.
[c] Mniejsze ślady
[dt] Natychmiast rozpocznij starcie. Na początku starcia potwór otrzymuje 5 obrażeń. Jeśli Ocalali zwyciężą, otrzymają połowę podstawowych zasobów i połowę zasobów potwora (zaokrąglając w górę) w ramach zwyczajowej nagrody po walce.
`,

  45: `45 | Dolina Strzępów
Przes Ocalałymi rozpostarła się dolina pełna ostrych, białych kamieni, wyglądająca jak zębata paszcza. Kiedy Ocalalali rozpoczeli wspinaczkę przez poszarpane iglice, odkrywają, że nawet najłagodniejsze draśnięcie krwawi obficie. To wydarzenie zadaje każdemu Ocalałemu 1 uszkodzenie korpusu. 
Jeśli żaden Ocalały nie ma opatrunków do opatrzenia obrażeń, wszyscy otrzymują również 2 żetony krwawienia!

[i] Jeśli którykolwiek z Ocalałych by kilof, może spróbować namówić pozostałych Ocalałych by pozwolili mu <b>badać</b>. Jeśli zostaną przekonani, rzuć 1k10.

[TA] 1k10
[td] Ocalały z kilofem - Badanie
[c] 1
[d] Białe kamienie to zęby, a Ocalali są w gigantycznych ustach! Każdy musi wydać 1 przetrwania by wydostać się z ust. Ktokolwiek pozostanie w środku, zostaje przeżuty na miezgę i ginie. Osada nie otrzymuje zysków wynikających z <b>Kanibalizmu</b>.
[c] 2-5
[d] Biały kamień jest niezwykle twardy. Kiedy Ocalali w końcu przez niego się przebijają, hordy robaków wybiegają z dziur. Otrzymujesz 1 zasób robactwa <b>syczący karaluch</b>. Kopanie było czasochłonne. Rzuć ponownie na liście wydarzeń na łowach, zanim przesuniecie się na planszy łowów.
[c] 6+
[dt] Ocalali znajdują pęknięcie i je zasób poszerzają. Wewnątrz jest skrytka! Znajdujesz 1 dziwny zasób <b>Żelazo</b> i 1 zasób  robactwa <b>Syczący karaluch</b>. Kopanie było czasochłonne. Rzuć ponownie na liście wydarzeń na łowach, zanim przesuniecie się na planszy łowów.
`,

  46: `46 | Rzeka
Ocalali dotarli do brzegu rzeki krwi. To wydarzenie swoim widokiem, zadaje umysłom <b>nieobłąkanych</b> Ocalałych 1 obrażenie. Ocalali muszą kolejno przeprowadzić <b>badanie</b>, aby podjąć trop zdobyczy. Każdy rzuca 1k10.
Jeśli żaden z Ocalałych nie znajdzie ponownie tropu potwora, rzuć ponownie na liście wydarzeń na łowach zanim poruszycie się na planszy łowów.

[TA] 1k10
[td] Każdy Ocalały - Badanie
[c] 1-2
[d] Tracisz równowagę i wpadasz do rzeki krwi! Natychmiast wielki pasożyt wpycha się w usta, w głąb gardła, rozrywając wnętrzności po drodze.  Otrzymujesz ciężki uraz złamane żebro. Masz nadzieję, że to wszystko co pasożyt ci zrobił.
[c] 3-5
[d] Twoja zdobycz wypróżniała się do krwi. To wydarzenie zadaje Ci 1 obrażenie, w losowe miejsce trafienia, z powodu wchłonięcia zbyt dużej ilości skażonej fekaliami krwi.
[c] 6-8
[d<]

Orientujesz się, że rzeka krwi jest wypełniona rozdętymi zwłokami nierozpoznawalnych potworów. Coś Cię popycha by jakieś wyłowić! Otrzymujesz 1 losowy podstawowy zasób. 
[i]Jeśli nosisz <b>ciężkie</b> wyposażenie, zanurzając się połykasz krew i miękką, rozdętą część potwora. Zmniejsz swoje przetrwanie do 1.

[>d]
[c] 9+
[dt] Z powodzeniem odnajdujesz trop potwora.
`,

  47: `47 | Biesiadne drzewa
Niewielki zagajnik drzew wyrasta na martwej równinie. Kuszące czerwone owoce zwisają z gałęzi. Każdy z Ocalałych musi wydać 1 przetrwania, aby oprzeć się pokusie <b>spożycia</b> owocu.

<b>Obłąkani</b> Ocalali i Ocalali z zaburzeniami <b>Napady obżarstwa</b>, muszą <b>spożyć</b>.

[i] Jeśli którykolwiek Ocalały ma sierp, wyrąbuje przejście poprzez drzewa, siekając je! Owoce natychmiast gniją. Zakończ to wydarzenie.

[TA] 1k10
[td] Każdy spożywający Ocalały
[c] 1-5
[d] Uzależniające owoce atakują twoje wnętrzności. Tracisz 1 przetrwania, a następnie rzuć ponownie kością. Jeśli nie masz przetrwania, to wydarzenie zadaje 2 obrażenia, w losowe miejsce trafienia.
[c] 6+
[dt] Usatysfakcjonowany bekasz głośno i odchodzisz.
`,

  48: `48 | Zakład śmierci

[img] 48 # width:25%

Ocalałych budzi podróżny, owinięty szczelnie płaszczem.Podróżnik zsuwa kaptur i odsłania zdeformowaną twarzz dwoma podbródkami zakrzywiającymi się od siebie,z których każdy ma własne wyszczerzone usta.

Niczym we śnie, wszyscy Ocalali rozumieją, że ta postać jest znana jako Hazardzista i jeśli tylko zaczną mówić to umrą. Do zakończenia tego wydarzenia tylko wykonawca tego wydarzenia może mówić. Jeśli którykolwiek inny gracz przemówi, Ocalałych ogarnia chłód. Umierają. Ocalali muszą zagrać w grę Hazardzisty lub zostaną uwięzieni w pułapce na zawsze. Każdy Ocalały rzuca 1k10.

[TA] 1k10
[td] Każdy Ocalały
[c] 1
[d] Hazardzista wyciąga rękę i zgarnia kości do gry. Gdy znikają w fałdzie jego płaszcza, czujesz, jak powietrze opuszcza twoje płuca, a nie jesteś w stanie zaczerpnąć kolejnego oddechu. Nie żyjesz.
[c] 2-9
[d] Nie przegrywasz, ani nie wygrywasz. Możesz zagrać kolejny raz jeśli zechcesz. Ponów swój rzut i sprawdź rezultat.
[c] 10+
[dt] Wygrałeś. Otrzymujesz na stałe +1 do szczęścia.
`,

  49: `49 | Ropne pola
Krajobraz jest usiany dużymi, obrzękniętymi ropiejącymi kopcami. Najmniejsze muśnięcie grozi ich eksplozją. Ocalali mogą <b>ostrożnie przechodzić</b> przez wzgórza lub </b>przebiec przez nie.

[TO] Wybór
[td] Co robisz?
[c] Ostrożnie przechodzisz
[d] Ostrożne przejście: Przemkneliście się bez incydentów, ale wasz ruch jest spowolniony. Rzuć ponownie na liście wydarzeń na łowach nim przesuniecie się na planszy łowów.
[c] Przebiegasz
[dt] Przebiegnięcie: Każdy z ocalałych rzuca 1k10 i dodaje wartość swojego uniku do wyniku. Przy 7 lub mniej, detonuje jeden z ropnych kopców! To wydarzenie zadaje mu 2 obrażenia w losowe miejsca trafienia i sprawia, że <b>cuchnie</b> do końca tego roku.
`,

  50: `50 | Szubienica
Prymitywna żelazna klatka kołysze się na gałęzi potężnego drzewa. Gdy Ocalali zbliżają się, uwięziony mężczyzna krzyczy do nich z klatki, błagając o uwolnienie.

[TO] Wybór
[td] Co robisz?
[c] Ignorujesz go
[d] Ocalali mijają uwięzionego, a to wydarzenie zadaje 1 obrażenie ich umysłom, gdy słyszą płacz i błagania więźnia. 
[c] Uwolnij go
[d<]

Wykonawca wydarzenia rzuca 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1
[d] Ocalali otwierają klatkę, ale wszystko, co znajdują w środku to szkielet. To wydarzenie zadaje umysłom Ocalałych 2 obrażenia.
[c] 2-7
[d] Więzień jest wdzięczny i podąża z Ocalałymi do postoju i odpoczynku. Kiedy się obudzą, każdy z Ocalałych traci 1 losowy zasób (jeśli go posiadał).
[c] 8+
[dt] Więzień jest wdzięczny i podąża do domu Ocalałych po starciu. Osada zyskuje +1 populacji.
[>d]
[T]
`,

  51: `51 | Refugees
The survivors encounter a group of fleeing settlers.

[TO] Sprawdź
[td] Czy osada zna <b>Symposium</b> and <b>Language</b>?
[c] Tak #Symposium and Language
[d<]

The survivors manage to crudely communicate. The survivors may offer a resource or gear to help the distressed refugees.

[TO] Wybór
[td] Share resource or gear?
[c] Tak #Share
[d<]

Archive the offering. The refugees frantically share their mournful tale. While much is lost in translation, they relate the savage invasion of a monster that destroyed their home. The tale prepares the survivors for what lies ahead. At the start of the showdown, reveal the top 5 Al cards of the Al deck and put them back in any order.
[i] If any survivor has the <b>Leader</b> fighting art, one of the settlers is drawn to their charisma. Gain +1 population.

[>d]
[c] Nie #Do not share
[dt] Survivors continue their hunt.
[>d]
[c] Nie #
[d] Survivors continue their hunt.
[T]
`,

  52: `52 | Madflies
Tiny, persistent insects swarm the survivors, flying into their ears and nostrils. The bugs buzz maddeningly in their heads, growing louder as they nest.
Each survivor rolls 1k10.

[TA] 1k10
[td] Each survivor
[c] 1-2
[d] You dive into a nearby marsh to flush out the disgusting insects. It works, but now you're constantly distracted by the tiny bug corpses you occasionally hack up. Gain -1 evasion token.
[c] 3-7
[d] The buzzing immediately stops and the flies depart. Their rejection makes you feel strangely despondent. Gain +1 insanity.
[c] 8+
[d<]

Their eggs gestate incredibly quickly and madflies explode forth from your mouth! The experience is gruesome, but makes you feel so alive! Suffer the <b>frenzy</b> brain trauma.
[i] If you have the <b>Rageholic</b> disorder or <b>Berserker</b> fighting art, giving birth to disgusting new life kindles your rage. Suffer the <b>frenzy</b> brain trauma again.

[>d]
[T]
`,

  53: `53 | Mask Salesman
The survivors meet a traveling Mask Salesman on the road. He insists that he has special wares to offer.
Shuffle one copy of each mask gear from the Mask Maker settlement location and draw one at random. The salesman is offering this mask. The event revealer rolls 1k10 to determine the price, then gains the mask.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-3
[d] The salesman silently points at you. You instinctively hand him his asking price in exchange for the mask. Archive 1 gear of your choice from your gear grid and lose all survival.
[c] 4-7
[d] The salesman slowly gestures for an offering. Archive 1 gear of your choice from your gear grid.
[c] 8+
[dt] As he imparts the mask to you, the salesman's lips form the sounds of your name. It is gone. Give your survivor a new name (it must be different) and +1 survival for naming your survivor.
`,

  54: `54 | Bone Storm
Mighty winds tear across the landscape, collecting chips of stones and skeletal remains. The survivors huddle together on the outskirts of the storm.
They may either <b>brave the storm</b> or <b>wait it out</b>.

[TO] Wybór
[td] Co robisz?
[c] Brave the storm
[d] All survivors gain +1 courage and suffer 1 event damage to 3 random hit locations. Archive all <b>fragile</b> gear.
[c] Wait it out
[dt] Roll twice on the hunt event table before moving on the hunt board.
`,

  55: `55 | Mudslide
A flash mudslide sweeps the survivors away. Each survivor rolls 1k10.
[i] If any survivor has a whip, they catch it around a pillar-shaped bone and swing to safety; they do not roll.

[TA] 1k10
[td] Each survivor
[c] 1-2
[d] You're violently swept along, drowning in mud. Suffer 2 event damage to a random hit location and archive all <b>fragile</b> and <b>soluble</b> gear in your gear grid. Roll again on the table.
[c] 3-7
[d] You manage to scramble free, but not before taking a serious beating. Suffer 2 event damage to your body and archive all <b>fragile</b> and <b>soluble</b> gear in your gear grid.
[c] 8-9
[d] You reach higher ground. You're caked in mud but otherwise unscathed.
[c] 10+
[dt] You remember being pulled under, the sensation of mud forcing itself down your throat, then nothing else. After the mudslide passes, the other survivors find you unharmed. Gain +1 insanity.
`,

  56: `56 | Dead Monster
The survivors find a decomposed monster corpse. It's too rotten to yield any resources.

[TO] Sprawdź
[td] Does any survivor have 3+ understanding?
[c] Tak #3+ understanding
[d<]

The survivors cover themselves in the dead monster's spilled blood. The stench will help them sneak up on their quarry. When the showdown starts, the survivors <b>ambush</b> the monster.
[i] If any survivor has the <b>Squeamish</b> disorder, they refuse to soil themselves. Do not <b>ambush</b> the monster.

[>d]
[c] Nie #
[dt] The starving survivors feast on the rotting corpse, immediately losing control of their twisting guts. Each survivor loses 1 survival and cannot <b>consume</b> for the rest of this lantern year.
`,

  57: `57 | Gorm's Laughter
The rhythmic wail of a Gorm's laughter reaches the survivors, filling them with fear. The cackling follows the survivors, tormenting them until they reach their quarry.

Place a token on every hunt board space between the survivors and their quarry. When the survivors move into a space with a token, remove it and all <b>non-deaf</b> survivors suffer 1 brain event damage.

<button class="hunt_event_action_button hoverable" id="gorms_laughter" onClick="placeReminder('gorms_laughter')">Place a reminder</button>
`,

  58: `58 | Scent on the Wind
A strong wind blows, bringing with it the scents of distant places and things.
The event revealer rolls 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-5
[d] The monster catches your scent. It moves one space closer. If this movement starts the showdown, the monster <b>ambushes</b> the survivors.
[c] 6+
[dt] The survivors smell their quarry's foul odor and surge forward. The survivors may skip the next hunt space. If this movement starts the showdown, the survivors <b>ambush</b> the monster.
`,

  59: `59 | Signs of Battle
The survivors come upon the remains of a terrible battle between their quarry and some unknown foe. The event revealer may choose to <b>investigate</b>.

[TO] Wybór
[td] Wykonawca wydarzenia - What do you do?
[c] Investigate
[d<]

The event revealer gains +1 courage and rolls 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia - Investigate
[c] 1-2
[d<]
The monster springs out of the dark, taking advantage of the distracted survivors.

The monster <b>ambushes</b> the survivors.

During showdown setup, place the event revealer directly in front of the monster.

<button class="hunt_event_action_button hoverable" id="signs_of_battle" onClick="placeReminder('signs_of_battle')">Start showdown!</button>

[>d]
[c] 3-7
[d<]

The remains are human. The distraught and enraged survivors each suffer 1 brain event damage.
[i] If the settlement has <b>Graves</b>, they bury the dead and each survivor gains +1 survival.
[i] If the settlement has <b>Cannibalize</b>, gain 1 random basic resource.

[>d]
[c] 8+
[d] The quarry has left the remains of another monster in its wake. Gain 1 random basic resource.
[T]

[>d]
[c] Ignore
[dt] Roll again on the hunt event table before moving on the hunt event board.
`,

  60: `60 | Wildfire
A massive wall of flame obstructs the survivors, incinerating the ground. It has destroyed whatever awaited the survivors and left chaos in its wake. Archive all hunt event cards in the next 2 hunt spaces. Place two basic hunt event cards in those spaces.
`,

  61: `61 | Frozen Lightning
A storm sweeps over the survivors. Deep purple lightning flashes overhead. The bolts freeze in midstrike and rain down on the survivors as jagged, glowing spikes.
Each survivor rolls 1k10. The lowest scoring survivor (or survivors, in case of ties) becomes a straggler.

[TO] 1k10
[td] Determine straggler
[c] Straggler chosen
[dt] A bolt crashes beside the straggler, catching them in an explosion of razorsharp crystals. They suffer 1d5 event damage to 2 random hit locations. Archive all <b>fragile</b> gear in their gear grid.
`,

  62: `62 | Space Between the Rocks
The survivors are distracted by a dark crack in the endless sea of stone faces.

[TO] Sprawdź
[td] Does any survivor have a pickaxe?
[c] Tak #Pickaxe
[d] They strike the ground, causing the crack to expand into a gaping hole. Bravely reaching inside the survivor produces a blackened, twisted hunk. Gain 1 <b>iron</b> strange resource.
[c] Nie #
[d<]

Each survivor rolls 1k10. The lowest scoring survivor (or survivors, in case of ties) becomes a straggler.

[TO] 1k10
[td] Determine straggler
[c] Straggler chosen
[dt] The straggler stoops to gaze into the depths and refuses to stop staring. When the other survivors drag them away, they babble incoherently. Whatever they saw changed them forever; they gain 1 random disorder. If all the survivors end up as stragglers, no one ever pulls them away and they are all lost. Dead.

[>d]
[T]
`,

  63: `63 | Feet

[img] 63 # width:35%

The stone faces ahead are replaced by an expanse of stone feet sprouting from the ground. The survivors walk sole-to-sole with the feet.

[TO] Sprawdź
[td] Are all survivors insane?
[c] Tak #All insane
[d<]

[TO] Sprawdź
[td] Czy osada zna Survival of the Fittest?
[c] Tak #Survival of the Fittest
[d] They fall off the underside of the world. The survivors bite down hard on the feet. Their teeth grind against stone as they refuse to let go. At once, the feet shatter, revealing ordinary stone faces beneath. Set all survivors' insanity to 0. Each survivor suffers the <b>shattered jaw</b> severe head injury. Do not roll any additional hunt events caused by <b>Feet</b>.
[c] Nie #
[dt] They fall off the underside of the world. The survivors are dead.

[>d]
[c] Nie #Someone sane
[dt] If any survivor is <b>insane</b>, they are convinced they have reached the underside of the world. They clutch the ground for dear life, terrified of falling off. Their raucous terror slows the survivors and attracts unwanted attention. Roll once on the hunt event table for each <b>insane</b> survivor before moving on the hunt board. If any of these rolls result in <b>Feet</b>, ignore it and re-roll.
`,

  64: `64 | Stone Fountain
Two cupped stone hands rise out of the ground. The hands hold clear, cold water that trickles through the stone fingers in a seemingly endless supply. Any survivor may <b>consume</b> from the fountain. If they do, gain +1 courage and roll 1k10.

If no one consumes, roll again on the hunt event table before moving on the hunt board.

[TA] 1k10
[td] Any survivor - Consume
[c] 1-4
[d<]

The water is clear until it enters your lips, where it suddenly turns to blood. You spit out the foul liquid and suffer monster level brain event damage.
[i] If you have the <b>Hemophobia</b> disorder, you also suffer monster level event damage to the body as you vomit violently in disgust.

[>d]
[c] 5-8
[d] It's water. Refreshing.
[c] 9+
[dt] The water is clean and pure, like none the survivor has ever tasted. Gain +1 survival.
`,

  65: `65 | Statue

[img] 65

Cresting a hill, the survivors find a statue of a man sitting on a throne.

[i] If any survivor has 5+ understanding, the survivors may ignore the statue and end this event.

Otherwise, each survivor rolls 1k10. The lowest scoring survivor (roll off in case of ties) becomes a straggler.
[TO] 1k10
[td] Determine straggler
[c] Straggler chosen
[d<]

The straggler is drawn to the statue, touching it gently. In an instant, they are gone, replaced by the man from the throne, now flesh and blood. The straggler sits in his place on the throne, stone mouth open in a silent yell. They are gone forever. Consider them dead, but do not apply <b>Cannibalize</b> death principle; there is no body.
[TO] Sprawdź
[td] Czy osada zna <b>Momento Mori</b>?
[c] Tak #Momento Mori
[d] The satue resembles a deceased survivor. Replace the straggler with the record sheet of a fallen survivor. Remove all of their severe injuries. Set their Hunt XP to 2 (they Age again, as this is a new lifetime). They gain +1k10 survival, +1k10 insanity. You may give them 3 ranks of proficiency in a random weapon type.
[c] Nie #
[dt] The man offers his thanks and joins the hunting party without any explanation. He is a new survivor with the straggler's gear, 2 random disorders, and 2 Hunt XP. Shuffle all weapon specialization cards (including expansions, if any) and draw one. The survivor has 3 ranks of proficiency in that weapon type. They gain +1k10 survival, +1k10 insanity. Give him a name and +1 survival for being named.

[>d]
[T]
`,

  66: `66 | Forbidden Word
There is a great rush of air. A booming, inhuman voice declares a single word in an unknown language. For one instant, the survivors understand.
All <b>non-deaf</b> survivors gain +1 understanding and suffer 1 brain event damage.
[i] If they are <b>insane</b> they also gain 1 random disorder.
`,

  67: `67 | Saliva Pools
The ground ahead is pockmarked with pools filled with a gooey liquid. They bubble merrily and stink of digesting meat. As the survivors move between them, they are overcome by waves of nausea.

[TO] Sprawdź
[td] Does any survivor have a sickle?
[c] Tak #Sickle
[d<]

They slice a few leaves from a nearby plant and everyone uses them to plug their noses and mask the smell. All survivors gain +1 understanding.

[TO] Sprawdź
[td] Does any survivor have 3+ understanding?
[c] Tak #3+ understanding
[d] They devise a way to use the pools. Each survivor may place one piece of gear in a pool. Archive the gear and gain the resources used to craft it (if any).
[c] Nie #
[dt] The survivors continue their hunt.

[>d]
[c] Nie #
[d<]

Each survivor rolls 1k10.

[TA] 1k10
[td] Each survivor - Is result less than survival?
[c] Tak #Less than survival
[d] They continue on.
[c] Nie #Greater than survival
[dt] They vomit into a nearby pool, suffering 1 event damage to the body. Before their eyes, the pool greedily dissolves their vomit, they gain +1 understanding.
[br]
[TO] After all rolls
[td] Does any survivor have 3+ understanding?
[c] Tak #3+ understanding
[d] They devise a way to use the pools. Each survivor may place one piece of gear in a pool. Archive the gear and gain the resources used to craft it (if any).
[c] Nie #
[d] The survivors continue their hunt.
[T]

[>d]
[T]
`,

  68: `68 | A Familiar Face
[i] If no survivors have died yet this campaign, ignore this event and roll again on the hunt event table before moving on the hunt board.

Each survivor rolls 1k10. The lowest scoring survivor (or survivors, in case of ties) becomes a straggler.

[TO] 1k10
[td] Determine straggler
[c] Straggler chosen
[dt] While examining the stone faces underfoot, the straggler recognizes the face of a fallen friend. Bittersweet memories reduce them to tears. Reduce their insanity to 0 and they gain +1 understanding.
`,

  69: `69 | Time Lapse
The glow of the survivors' lanterns blurs, forming trails of light behind them.
[i] If the settlement has fought a Phoenix, the group recognizes the phenomenon. All survivors gain +1 understanding.
The event revealer rolls 1k10 on the table below. If any survivor has an <b>Hours Ring</b>, they may instead select a die result.
[TA] 1k10
[td] Wykonawca wydarzenia
[c] 1-3
[d] The survivors' bodies suddenly age. All survivors with less than 10 Hunt XP gain +3 Hunt XP. Do not gain the benefits of Age. Your bodies have physically aged, no practical experience has been learned.
[c] 3-9
[d<]

The survivors' minds fill with alien memories. They are no longer just themselves. They walk differently and speak with strange accents. Give each survivor a new name and +1 survival for being named. Each survivor gains +1 Hunt XP and 1 random disorder.
[i] If your settlement has <b>Survival of Fittest</b>, and you've already used your once-per-lifetime reroll, you may use it again.

[>d]
[c] 10+
[dt] The survivors are suddenly standing by their quarry! Start the showdown immediately.
`,

  70: `70 | Tomb of Excellence
The survivors find a serene, luxurious tomb, immaculate in its construction and condition. Elegant murals decorate the walls, depicting glorious victories over the very monster the survivors are hunting. The survivors are baffled by its presence.
The event revealer <b>investigates</b> and rolls 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia - Investigate
[c] 1
[d] The survivors bemoan how weak they are compared to the warriors in the murals. All survivors loses 1 survival.
[c] 2-5
[d] It's nice to see something pretty for once, eh?
[c] 6-9
[d] The survivors can't remember ever feeling so cheerful and inspired. Each survivor gains +1 courage.
[c] 10+
[d<]

The doorway to the tomb is framed with a wood that has small hands for grain. Inside, murals depict a hero at the center of a labyrinth that is holding a giant, human-filled fruit above his head. Each survivor gains +1 understanding.
[i] If the settlement has <b>Pictographs</b>, the survivors find information about their quarry. At the start of the showdown, they may place the monster's trap at the bottom of the hit location deck.

<button class="hunt_event_action_button hoverable" id="tomb_of_excelence" onClick="placeReminder('tomb_of_excelence')">[Pictographs] Place reminder</button>

[>d]
[T]
`,

  71: `71 | Found Relic
Amidst the endless stone faces, the event revealer notices an unusual object on the ground.
The event revealer <b>investigates</b> and rolls 1k10.
[i] If the settlement has <b>Records</b>, add +6 to the result.
[TO] 1k10
[td] Wykonawca wydarzenia - Investigate
[c] 1-2
[d] You find a weathered, purple stone with a swirling texture. It is shockingly heavy. Mesmerized by the stone, you hide it from the other survivors. Gain the <b>Secretive</b> disorder and -1 movement token from lugging the stone around.
[c] 3-4
[d] Useless junk litters the ground.
[c] 5-9
[d] You find a stone heart that pulses with warmth as you hold it in your hands. Gain +1 insanity.
[c] 10+
[d<]

You find a mask with living lips. If you return to the settlement with the mask, it quickly learns your language and shares its secrets before crumbling to dust. At the start of the next settlement phase, draw 3 innovations from the innovation deck and add one to your settlement at no cost.
[i] If any survivor has a <b>Final Lantern</b>, it begins to flash and vibrate wildly. The mask disintegrates and all survivors suffer 1 brain event damage.

<button class="hunt_event_action_button hoverable" id="found_relic" onClick="placeReminder('found_relic')">Place a reminder</button>

[>d]
[T]
`,

  72: `72 | Something to Pass the Time
[i] If the settlement does not have <b>Symposium</b>, ignore this event and roll again on the hunt event table before moving on the hunt board.
Otherwise, the event revealer suggests a word game to lighten the mood as the survivors trudge forward. The event revealer rolls 1k10.
[i] If the settlement has <b>Song of the Brave</b>, add +4 to your roll.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-2
[d] The survivors' boisterous voices attract their quarry. The monster <b>ambushes</b> them.
[c] 3-7
[d] No one else is in the mood for a game. The event revealer loses 1 courage.
[c] 8-9
[d] The survivors play the simple but entertaining game. Each survivor gains +1 courage.
[c] 10+
[dt] The game is astonishingly fun and the survivors' spirits soar with their booming laughter. Each survivor rolls 1k10. On a 6+, they gain 1 survival or cure 1 disorder.
`,

  73: `73 | Golden Ember
The way forward is blocked by dense, gold-flecked smoke. The survivors may push ahead and brave the smoke.
[i] If the survivors have a <b>Final Lantern</b>, it guides them through the smoke without any trouble; end this event.

[TO] Wybór
[td] Co robisz?
[c] Brave the smoke
[d<]

Each survivor gains +1 courage and the event revealer rolls 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-5
[d] The smoke overwhelms the survivors. As they run through the glittering smog, each survivor suffers 1 event damage to the head and chest locations. When they finally breach the haze's end, they silently walk on. No one is comfortable sharing the terrible things they glimpsed. Each survivor gains 1 random disorder.
[c] 6+
[d<]

The survivors grasp each other's hands, form a line, and traverse the smoke. They breathe through rags and take turns peeking out for orientation. Somewhere, deep within the smoke, they stumble across a crater. They may ignore it and escape the smoke (ending this event) or explore the crater.

[TO] Wybór
[td] Co robisz?
[c] Explore the crater
[d<]

The survivors carefully descend into the crater, finding the ruins of a settlement surrounded by a ring of skulls. The settlement is absolutely demolished and almost everything has been ground to powder from some tremendous force. The skulls face away from the ruins and in each gaping mouth, a golden ember spews smoke.
The sight is haunting; each survivor suffers 1k10 brain event damage and gains 1 random disorder. The survivors gingerly sift through the ruins.
Nominate a survivor to <b>investigate</b> and roll 1k10.

[TO] 1k10
[td] Nominated survivor - Investigate
[c] 1
[d<]

Against all reason, you feel compelled to reach into a skull and take an ember. Your flesh sizzles, blinding you with pain yet you cannot stop yourself from reaching for your own mouth.

[TO] Sprawdź
[td] Do you have a broken jaw?
[c] Tak #Broken jaw
[d] You're thwarted. You drop the golden ember from your burning hand. Suffer the <b>dismembered arm</b> severe injury. Shaken, the survivors flee the smoke.
[c] Nie #No broken jaw
[d<]

Your jaw clamps shut around the ember, the flesh of your mouth melts shut, muffling your cries of pain. Smoke pours from your eyes, nose, and ears.

[TO] Sprawdź
[td] Czy osada zna <b>Survival of the Fittest</b>?
[c] Tak #Survival of the Fittest
[d] The urge to live wins out and you savagely break open your own jaw, Suffer the <b>broken jaw</b> severe head injury. The ember tumbles to the ground, its sputtering hiss ringing in your ears as all survivors flee in horror.
[c] Nie #
[dt] Your smoking, melting body marches robotically into the ring of skulls, laying itself in the place of the disturbed skull. The putrid smell of your burning brain suffuses the smoke in the air. The sight is so disturbing that all other survivors flee, never to speak of what happened.
[>d]
[>d]
[T]
[c] 2-4
[d] You sense the extreme danger from the golden embers and linger just long enough to grab a small trinket. Gain 1 <b>Broken Lantern</b> basic resource.
[c] 5-8
[d] You notice that the settlement is strewn with lanterns, all extinguished and smashed nearly beyond recognition. The survivors resolve that this will never happen to them. If any survivor returns to the settlement this year, gain +2 endeavors.
[c] 9+
[dt] Amidst the ruins, you find only one unbroken object. A Twilight Sword. It rests, respectfully laid across a mostly undamaged survivor's skeleton. If the settlement does not have a <b>Twilight Sword</b>, and no survivor in the group has the <b>Honorable</b> disorder, you may nominate a survivor to gain the <b>Twilight Sword</b> rare gear. If you do and the <b>Hooded Knight</b> story event is not on the timeline, add it to the timeline 2 years from now.

[>d]
[c] Escape the smoke
[dt] Survivors escape the smoke and continue their hunt.

[>d]
[T]
[>d]
[c] Go around
[dt] They take the long way around; roll again on the hunt event table before moving on the hunt board.
`,

  74: `74 | Antler-Gouged
A great battle for dominance between two enormous antelopes has left the stone-faced ground gouged with criss-crossing scars.
Each survivor rolls 1k10.

[TA] 1k10
[td] Each survivor
[c] 1-2
[d] You trip over the jagged ground and shred your flesh! Suffer the <b>torn muscle</b> severe leg injury.
[c] 3-8
[d] You carefully tread over the destroyed faces.
[c] 9+
[dt] You find a loosened stone. Gain a <b>Founding Stone</b> starting gear.
`,

  75: `75 | Oops!
Stumbling through the darkness, the event revealer crashes into the ground, crushing their lantern beneath them. The living light inside the lantern becomes agitated by the survivor's clumsiness and burns a piece of gear. The event revealer archives 1 gear of their choice from their gear grid.
`,

  76: `76 | Dream the Way
The survivors have vivid, fevered visions of what lies ahead. All at once, they are startled awake and frantically compare the horrors they saw.
Each survivor rolls 1k10.
[i] If any survivor is a savior, their powerful dream envelopes the group; each survivor may select whatever die roll result they want.
If any survivors' rolls are the same, those survivors discover they had the exact same dream. They gain +1 insanity. If any duplicate rolls are 10s, the event revealer may re-roll any one roll result this hunt phase (any one die roll, not just their roll).
`,

  77: `77 | Sinkhole
A gaping sinkhole suddenly opens under the survivors, revealing a swirling black pool of ichor beneath them. Each survivor rolls 1k10. The lowest scoring survivor (or survivors, in case of ties) becomes a straggler.
Each straggler rolls 1k10.
[i] If any other survivor has a whip, they throw a line to the straggler. Each straggler adds +4 to their roll.

[TA] 1k10
[td] Spóźniony
[c] 1
[d] You are swallowed by the sinkhole. Moments later it regurgitates you completely naked. Your gear is hopelessly lost in the miasma. Archive all gear in your gear grid.
[c] 2-4
[d] The other survivors haul you up, but not before something is sucked below the surface. Archive 1 gear of your choice from your gear grid.
[c] 5-9
[d] You are dragged to safety, terrified but unharmed.
[c] 10+
[dt] After a monumental effort, the other survivors pull you free. Someone is clinging tightly to your feet (+1 population)! As they reatreat to your settlement, each survivor suffers 1 brain event damage.
`,

  78: `78 | Dead Great Game Hunter

The survivors find a corpse dressed in brightly-colored clothing, clutching something to its chest. The event revealer may <b>investigate</b>.

[TO] Wybór
[td] Wykonawca wydarzenia
[c] Investigate
[d<]

They gain +1 courage and roll 1k10.
[i] If any survivor has a whip, they lash the corpse from afar; add +4 to your roll.

[TO] 1k10
[td] Wykonawca wydarzenia -Investigate
[c] 1
[d] He was holding an explosive! Moving it causes it to detonate, blowing off your hand. Suffer the <b>dismembered arm</b> severe arm injury.
[c] 2-4
[d] He was holding an explosive! It explodes, but you pull away before disaster strikes. Gain -1 accuracy token.
[c] 5-9
[d<]

His hands are empty.
[i] If the settlement has <b>Cannibalize</b>, gain 1 random basic resource.
[i] If the settlement has <b>Graves</b>, gain +1 understanding.

[>d]
[c] 10+
[dt] His hands contain a jeweled bottle filled with a chartreuse liquid. Gain 1 <b>Frenzy Drink</b> gear.
[>d]
[c] Move on
[dt] Roll again on the hunt event table before moving on the hunt board.
`,

  79: `79 | Dying Small Prospector
[i] If your settlement already has a <b>Portcullis Key</b>, the prospector is gone. Roll again on the hunt event table before moving on the hunt board.
The survivors discover a body slumped against a large stone face. Moving closer, they find a small, dying prospector riddled with arrows. As they approach, he growls a warning, threatening them with a huge stone shard. When he sees that they are not evil monsters, he calms down and gives them a key. With his dying breath he says: This is the key to the portcullis. Without it, you will never get through.
Record the <b>Portcullis Key</b> in the settlement record sheet notes.

[TO] Sprawdź
[td] Czy osada zna Graves?
[c] Tak #Graves
[d] The event revealer builds a small monument of broken stone noses and gains +1 understanding.
[c] Nie #
[d] The survivors continue their hunt.
[T]
`,

  80: `80 | Lovelorn Rock
The survivors pass a ring of stones with an unassuming boulder at the center. Each survivor rolls 1k10. The lowest scoring survivor (randomize in case of ties) becomes a straggler.

[TO] 1k10
[td] Determine straggler
[c] Straggler chosen
[dt] The straggler hefts the boulder (it's heavy!) and promises to carry it everywhere, forever in love. They must always leave one space in their gear grid empty, as it contains their beloved rock. Record this on your survivor sheet. The rock can be lost or archived like other gear; if it is lost, the survivor mourns their beloved and reclaims the space in their gear grid.
`,

  81: `81 | Field of Arms

[img] 78

The survivors carefully tread along the back of a massive, sleeping monster. Instead of fur, it has elongated arms, several of them twitching to whatever dream the great beast is in the midst of. The survivors don't disturb the monster's deep sleep and cross without issue.

[TO] Sprawdź
[td] Does any survivor have a sickle?
[c] Tak #Sickle
[d] They gingerly remove some tough skin from one of the arms and gain 1 <b>Hide</b> basic resource.
[c] Nie #No sickle
[dt] The survivors continue their hunt.
[T]
`,

  82: `82 | Consuming Grass
Vibrant green grass grows in patches ahead of the survivors. Closer inspection of the delicate leaves reveals they are as sharp as any blade. Each survivor rolls 1k10. The lowest scoring survivor (or survivors, in case of ties) becomes a straggler.

[TO] 1k10
[td] Determine straggler
[c] Straggler chosen
[d<]

As the survivors carefully pick their way past the verdant hazards, the straggler stumbles into the brush. They roll 1k10.
[i] If any survivor has a whip, a hasty tether is made. Add +4 to your roll.

[TA] 1k10
[td] Spóźniony
[c] 1
[d] You land in the grass patch. As you climb to your feet, you realize it's too late. The parts of your body that touched the ground have sprouted with sharp blades of grass. Any attempt to remove them only spreads them further over your body. During the showdown, you are never a threat (ignore any effect that would make you a threat, even the White Lion's <b>Sniff</b>). At the end of the showdown, your body blossoms into a whorl of immaculate green grass. Dead.
[c] 2-9
[d] You fall but manage to interpose something between the grass and your bare skin. Either archive 1 gear of your choice from your gear grid to protect yourself, or treat this result as if you rolled a 1.
[c] 10+
[d] You stop your fall before it's too late.
[>d]
[T]
`,

  83: `83 | Flesh Monolith

[img] 83

The survivors approach a 5-sided monolith made of flesh that stretches into the darkness overhead. Limbs and faces both human and bizarre protrude from all sides. The event revealer gains +1 courage and <b>investigates</b>.

[TO] 1k10
[td] Wykonawca wydarzenia - investigate
[c] 1
[d<]

The monolith's limbs spring to life, grabbing hold before you can react.
[TO] Sprawdź
[td] Czy osada zna Survival of the Fittest?
[c] Tak #Survival of the Fittest
[d] You fight the monolith! The horrible edifice tears your arm off, but you bite one of its appendages in return, severing it! The monolith retreats into the ground as you roar in triumph. Suffer the <b>dismembered arm</b> severe injury and gain +1 permanent strength. All other survivors stand in awe and gain +3 insanity and +1 courage.
[c] Nie #
[dt] They join your body parts to its own with maddening efficiency as you are ripped apart in a shower of gore. Dead. The horrible sight causes all other survivors to suffer 3 brain event damage and they all gain <b>Post Traumatic Stress</b> disorder.

[>d]
[c] 2-4
[d] Hands and tentacles grasp at you. Spend 1 survival to wriggle away or treat this result as if you rolled a 1.
[c] 5-9
[d] All survivors are driven back with horror. They all suffer quarry's monster level brain event damage.
[c] 10+
[d<]

As the survivors draw near, they discover that this flesh monolith is actually an enormous pile of survivors' corpses, many with badly broken limbs. The pile is covered in chunks of strange, sweet-smelling viscera.
[TO] Sprawdź
[td] Czy osada zna Graves?
[c] Tak #Graves
[d] You ascend the heap and find 3 barely living survivors, their bodies devoid of nourishment and their eyes too sensitive for lantern light. If you return to the settlement, +3 population. These new survivors cannot depart for 2 lantern years as they need time to recover (note this on the timeline).
[c] Nie #
[dt] All you manage to harvest from the pile of emaciated corpses is 2 <b>Organ</b> basic resources. Their skin is too soft and bones too brittle to be of any use.
[>d]
[T]
`,

  84: `84 | Scribe's Book

[img] 84

A huge, ornately bound book lays open before the survivors.

[TO] Sprawdź
[td] Czy osada zna Pictographs?
[c] Tak #Pictographs
[d<]

Any survivor with 3+ courage may write their name in the book. <b>Insane</b> survivors with 3+ courage must write.

Each survivor who writes their name in the book rolls 1k10 and adds their understanding. If no one writes, roll again on the event table before moving on the hunt board.

[TA] 1k10
[td] Any survivor with 3+ courage
[c] 1-4
[d] As you finish writing your name, you know that you did something terribly wrong. You vanish from history. Dead. Archive your gear.
[c] 5-8
[d] Nothing happens.
[c] 9-10
[d] As you write your name, you feel restored. Heal all injury levels and lost armor points. Gain +2 survival.
[c] 11-14
[d] You feel assured that as long as your name is in the book, nothing bad can happen to you. Gain two of the following: +2 courage, +2 understanding or +2 survival.
[c] 15+
[dt] The book proves the undeniable mark you leave on the world. Gain +1 survival, +1 understanding, +1 courage, +1 permanent speed and +1 permanent strength.

[>d]
[c] Nie #
[dt] Survivors continue their hunt. Roll again on the event table before moving on the hunt board.
`,

  85: `85 | Test of Courage
Lava flows from the eyes of a huge, grimacing stone face. Its gritted teeth hold a worn sword. If there are any survivors with 6+ courage, choose one to brave the lava.

[TO] Sprawdź
[td] Does any survivor have 6+ courage?
[c] Tak #6+ courage
[d<]

They gain the <b>Adventure Sword</b> rare gear.

[TO] Sprawdź
[td] Does the settlement already have Adventure Sword and Storytelling?
[c] Tak #
[d<]

The survivors share stories of bravery; each survivor gains +1 survival.
[i] If the settlement also has <b>Saga</b>, the stories are exceptionally moving; each survivor also gains +1 courage.

[>d]
[c] Nie #
[dt] The group moves on.

[>d]
[c] Nie #
[d] The group moves on with a feeling of inadequacy.
[T]
`,

  86: `86 | Putrid Tunnels
The survivors smell it long before they see it, a series of cave mouths that emit noxious odors.
Each survivor rolls 1k10.

[TA] 1k10
[td] Each survivor
[c] 1-8
[d] They overcome the desire to investigate.
[c] 9+
[dt] They enter one of the tunnels and discover a wretched group of diseased survivors living in filth. All survivors who enter the cave catch their foul rotting disease. They have <b>Leprosy</b>: reduce all damage suffered by 1 to a minimum of 1. Suffer -2 to severe injury rolls. Record this impairment.
`,

  87: `87 | Weeping Faces
Water flows from the eyes of the surrounding stone faces, gathering in a small pool. Any survivor may <b>consume</b> from the pool and roll 1k10.
[i] If they have 3+ understanding, add +2 to their roll.

<b>Insane</b> survivors are inconsolable, they lay on the ground sobbing heavily. If any survivor is <b>insane</b>, roll again on the hunt event table before moving on the hunt board.

[TA] 1k10
[td] Any survivor - Consume
[c] 1-3
[d] The water is salty and sour. You can't help thinking about what you might be drinking. Suffer 1 brain event damage.
[c] 4-6
[d] Refreshing!
[c] 7-8
[d] The water is cleaner than most. You may heal up to 2 injury levels at any one hit location.
[c] 9+
[dt] The water is invigorating. Gain +1 speed token.
`,

  88: `88 | The Sword and the Statue
A one-eyed statue, twice as tall as any man, sits before a great anvil with a hammer in each of its six hands. Transfixed, the survivors watch the statue beat a red-hot sword that lies across the anvil. Each survivor, starting with the event revealer and proceeding clockwise, may make one attempt to grab the sword from the anvil. If they do, they gain +1 courage, roll 1k10 and add their Hunt XP to their roll.

[TA] 1k10
[td] Any survivor
[c] 1-2
[d] As you get near the anvil, the statue grabs the sword and plunges it into your body. There is a sharp hiss as the hot metal cools in your blood. Dead.
[c] 3-8
[d] You make a quick grab for the sword, but not quick enough. Suffer the <b>dismembered arm</b> severe arm injury.
[c] 9-13
[d] You may not be quick enough to grab the sword, but at least you're not foolish enough to die trying.
[c] 14+
[dt] Your speed is legendary. Gain the <b>Muramasa</b> rare gear. Zakończ to wydarzenie.
`,

  89: `89 | Cleaner Birds
Tiny, ragged birds with needle-thin beaks fly overhead. Each survivor rolls 1k10. The lowest-scoring survivor (roll off in case of ties) becomes a straggler.

[TO] 1k10
[td] Determine straggler
[c] Straggler chosen
[d<]

The birds swarm the straggler. One forces its way into the straggler's mouth and down their throat. The survivor vomits up the well-fed bird, their insides scrambled and scarred. Gain +1 permanent luck, -1 permanent speed.
[i] If any survivor has a whip, they crack it and fell the offensive creature. Gain 1 random basic resource.

[>d]
[T]
`,

  90: `90 | Light on the Horizon
The survivors hear a screeching howl, followed by a crash. They see an explosion of multicolored light on the horizon. The unnatural light illuminates the survivors' way.

[TO] Sprawdź
[td] Is any survivor sane?
[c] Tak #Sane survivor
[d<]

Survivors follow the light. You may reroll the next result on the hunt event table.
The light reaches the settlement. Add the <b>Lights in the Sky</b> settlement event to the timeline next year.
[>d]
[c] Nie #All insane
[d<]

Survivors turn away from the light, walking into the darkness. Move the survivors 2 spaces back on the hunt board.
The light reaches the settlement. Add the <b>Lights in the Sky</b> settlement event to the timeline next year.

[>d]
[T]
`,

  91: `91 | The Beginning
The survivors stumble upon the scene of their settlement's first hunt. Whether they've seen it themselves or heard of it through stories, they immediately recognize it. Seeing the spot of their settlement's first triumph is electrifying.

Each survivor gains +1 survival.

[TA] Check
[td] What innovations does the settlement have?
[c] Saga
[d] Each survivor gains +1 courage.
[c] Storytelling
[dt] Each survivor gains +1 understanding.
`,

  92: `92 | Failed Start
The survivors find the tattered remains of four humans. Clad in loincloths and clutching stone shards, they bear the distinct marks of White Lion claws.
Each survivor suffers 1 brain event damage and gains 1 <b>Founding Stone</b> starting gear. Survivors with 3+ understanding also gain +1k10 insanity.
`,

  93: `93 | Lost Survivor

[img] 93 # width:25%

In a hollow between two identical rocks, you find a corpse with fabulous hair clutching a book to its chest.

[TO] Sprawdź
[td] Czy osada zna Pictographs?
[c] Tak #Pictographs
[d<]

The event revealer may read from the book and roll 1k10.

[TO] Wybór
[td] Wykonawca wydarzenia
[c] Read
[d<]

The book tells the tragic tale of two survivors who found a love they could never have.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-3
[d] Page 3 - Dual Nature. The lovers' settlement was destroyed, and they were stolen away. The event revealer feels conflicted. After the showdown, they leave the settlement forever in search of something.
[c] 4-6
[d] Page 6 - The man spent years enduring horrible torture for the sake of his beloved. Each wound only strengthened the man's resolve. Gain +1 permanent speed and the <b>Anxiety</b> and <b>Traumatized</b> disorders.
[c] 7+
[dt] Page 9 - The man escaped, yet never returned. He knew that if he did, it would doom his beloved. He decided it was best for him to fade into memory to protect the few smiles his existence had inspired. Gain +1 courage and the <b>Tough</b> and <b>Last Man Standing</b> fighting arts.

[>d]
[c] Don't read
[dt] The survivors move on, deeply confused.

[>d]
[c] Nie #
[dt] The survivors move on, deeply confused.
`,

  94: `94 | Sickening Mess
The survivors come upon a patch of badly damaged ground. The stone faces are cracked and debris is strewn everywhere. Piles of toxic-smelling dung and half-digested viscera litter the area. The survivors approach, but survivors with <b>Squeamish</b> disorder refuse to go any closer.

<b>Insane</b> survivors <b>consume</b> what they find and make themselves sick; they gain -1 strength token. Sane survivors stop to <b>investigate</b> the mess. Each gains +1 courage, rolls 1k10, and adds their understanding.

[TA] 1k10
[td] Each sane survivor - Investigate
[c] 1-2
[d] You become lightheaded sifting through the piles of dung; uncontrollable gagging ensues. Gain -1 strength token.
[c] 3-8
[d] Heaving, eyes filled with tears, your sickening hunt pays off. Gain 1 random basic resource and suffer 1 event damage to a random hit location.
[c] 9+
[dt] Your intuition pays off! Gain 1 random basic resource.
`,

  95: `95 | Grim and Frostbitten
There is a dead stillness in the air. The atmosphere becomes thick with worry and the survivors carry on nervously. A bitter, evil cold sets in and there is no shelter.
The survivors huddle together for warmth, shivering loudly. Unless a survivor has armor gear at each hit location, they lose quarry monster level survival.
`,

  96: `96 | Cloaked Stranger
A cloaked form steps out from a patch of darkness ahead of the survivors. Its illfitting garment shifts atop its form and its trudging leaves dark, black puddles in the mouths of the rain-slick stone on the ground.
The event revealer approaches the stranger and rolls 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1-2
[d] The stranger's approach fills your ears with painful static. There is a flash of light and a loud crack. You fall to the ground, holding your bloody chest in pain. Suffer the <b>ruptured spleen</b> severe body injury. All <b>non-deaf</b> survivors suffer 2 brain event damage.
[c] 3-4
[d] The stranger ripples in and out of focus as you approach. When you reach them, they are gone, their form impossible to remember. Gain 1 bleeding token and forget 1 fighting art of your choice.
[c] 5-6
[d] As you near the stranger, you realize that they're floating in the air! You barely make out a dry rasping coming from the form that seems to resemble... laughter? After the stranger departs, you return to the group, face bone-white, refusing to speak of what you saw. Suffer 3 brain event damage.
[c] 7-8
[d] The stranger raises its arms and moves to meet your approach. From beneath the folds of its cloak, you can just make out a hint of violet, scaly hide. A claw extends from a sleeve and gently strokes your cheek, leaving a layer of viscous liquid behind. Wiping off the sludge, you find the bizarre experience strangely touching. You gain +1 survival, +1 understanding.
[c] 9+
[d<]

The stranger orders you to organize a test of strength among the survivors. Each survivor must roll 1k10 (roll off in case of ties). The highest scoring survivor wins the melee.
[TO] 1k10
[td] Determine winner
[c] Winner chosen
[dt] The stranger marks their face with its glistening claw, granting them the <b>Iron Will</b> ability: You cannot be knocked down. Reduce all knockback you suffer to knockback 1. Record this ability. All survivors lose 4 survival from the exhausting fight.

[>d]
[T]
`,

  97: `97 | Living Stone
The ground suddenly shifts and rises sharply into the air! The survivors find themselves clutching the back of a giant creature that lay sleeping beneath their feet. The survivors hold on for dear life, absolutely terrified.
Nominate a survivor to climb toward the top of the giant and see what lies ahead. They roll 1k10.

[TO] 1k10
[td] Nominated survivor
[c] 1
[d] Your motion irritates the giant, sending the survivors flying off! All survivors suffer 1d5 event damage to a random hit location. Archive all <b>fragile</b> gear.
[c] 2-7
[d] You reach the top and have a perfect vantage point to see the world, if only there were enough light to see it. Set your insanity to O. The giant carries you exactly where you're going! Start the showdown immediately.
[c] 8+
[dt] You discover a bizarre creature with an inverted face diligently carving upon the giant's back. It discards damaged stone faces as it works. Each survivor catches a fragment, gaining 1 <b>Founding Stone</b> starting gear. Eventually, the giant settles down into the ground again. You dismount and discover your quarry! <b>Ambush</b> the monster!
`,

  98: `98 | Bloody Eyes

[img] 98 # width:35%

The survivors find a trail of blood. It pools in the eye sockets of the stonefaced ground. The blood is still warm.
The event revealer may <b>investigate</b> and roll 1k10, or ignore the trail and end this event.

[TO] 1k10
[td] Wykonawca wydarzenia - Investigate
[c] 1-3
[d] One of your own is slumped at the end of the trail, bleeding terribly. Choose a random survivor, they gain 3 bleeding tokens. All survivors suffer 3 brain event damage.
[c] 4-6
[d] The trail leads to a huge box. Trapped inside is a young, red-haired survivor. Gain +1 population. The carvings adorning the box are haunting. All survivors suffer 3 brain event damage.
[c] 7+
[dt] The trail leads to your quarry! The monster is wounded from a previous battle. Start the showdown immediately. At the start of the showdown, the monster suffers 1 wound.
`,

  99: `99 | Portcullis

[img] 99

The survivors approach a massive portcullis standing in the darkness. It is not attached to anything and does not bar their way. They may choose to walk around it.

[TO] Sprawdź
[td] Czy osada zna the Portcullis Key?
[c] Tak #Portcullis Key
[d<]

They may erase it from the settlement record sheet and use it.
[TO] Wybór
[td] Use the Portcullis Key?
[c] Tak #Open the portcullis
[d<]

Each survivor gains +1 courage. The portcullis creaks open and the survivors step through. A dank gloom awaits the survivors inside.
[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1
[d] The portcullis suddenly slams shut behind them and the lights of their lanterns begin to dim. The last thing the survivors see is the grimace of fear on each other's faces as the dark closes in. The survivors are dead.
[c] 2+
[dt] At their feet lies an ornate crucible with a void in the shape of a mighty weapon. Gain the <b>Perfect Crucible</b> strange resource. If they have a Blacksmith in their settlement, they may now craft a <b>Perfect Slayer</b>.

[>d]
[c] Nie #Walk around
[dt] Roll again on the hunt event table before moving on the hunt board.

[>d]
[c] Nie #Walk around
[d] Roll again on the hunt event table before moving on the hunt board.
[T]
`,

  100: `100 | The Finale

An enormous, metallic sound rings out from a distance. All survivors are electrified with dread; they suffer 2 brain event damage.

[TO] Wybór
[td] Follow the sound?
[c] Tak #Follow the sound
[d<]

Each survivor gains +1 courage and gingerly approaches the sound's origin. As they travel, they pass the shattered corpses of strange beasts.

[TO] Sprawdź
[td] Does any survivor have 3+ understanding?
[c] Tak #3+ understanding
[d<]

Survivors follow the trail of corpses.

[img] 100

Arriving at a massive anvil, the survivors see a giant, one-eyed knight, its charcoal-colored armor reflecting their lantern light.
The event revealer rolls 1k10.

[TO] 1k10
[td] Wykonawca wydarzenia
[c] 1
[d] The knight stares at the survivors. All survivors with less than 3 courage are struck dead. All other survivors flee in horror.
[c] 2-8
[d] The knight approaches the survivors. In an instant, it chops off a random survivor's ear; they gain 1 bleeding token. Then, it strikes the anvil, blinding the survivors with a churning wall of sound. When they open their eyes, the knight is gone and the <b>Steel Sword</b> and <b>Steel Shield</b> rare gear rest in its place. The group divides the gear between them.
[c] 9+
[dt] The knight smashes the object in its hands upon the anvil. When the molten orange object cools, it sets into a massive lion-faced hammer. The knight places it in the hands of the survivor with the highest courage (roll off in case of ties). They gain the <b>Thunder Maul</b> rare gear. A current of electricity runs through their body, joining weapon and survivor forever.
[>d]
[c] Nie #Less than 3 understanding
[dt] Harvest 3 random basic resources from the corpses and end this event.

[>d]
[c] Nie #Retreat
[dt] Survivors panic and retreat in the opposite direction; end this event and move the survivors 2 spaces back on the hunt board.`,
}

module.exports = {
  md_to_html_2,
  is_promo_event
}

// var no_reload = false

function removePromoCard(card) {
  let settings = getSettings()
  settings['whiteboxes'][card] = 'Disabled'
  setSettings(settings);
  // saveSettings();
  localStorage.setItem('settings', JSON.stringify(settings))
  sessionStorage.setItem('settings', JSON.stringify(settings))
  silentSaveSettings(settings)
  // no_reload = true

  $('.hunt_event_action_button#'+card).fadeOut(300)
  $('.button_outcome#'+card).delay(400).fadeIn(300)
}
window.removePromoCard = removePromoCard



function is_promo_event () {
  let settings = getSettings();

  let promos = []

  let size_of_base = settings['size_of_basic_hunt_deck']

  if (settings['whiteboxes']['percival'] == 'Enabled') {
    promos.push('dead warrior')
  }

  if (settings['whiteboxes']['fade'] == 'Enabled') {
    promos.push('baby and the sword')
  }

  if (promos.length == 0) {
    return 'false'
  }

  let_guess = Math.random()

  let promos_length = promos.length
  let promo_probability = 1/(1+size_of_base/promos_length)

  console.log('Num of promos: '+promos.length+' Size of base: '+size_of_base)
  console.log('Promo probability: '+ promo_probability+' Guess: '+let_guess)

  if (let_guess > promo_probability) {
    return 'false'
  } else {
    return promos[Math.floor(Math.random() * promos.length)];
  }

}

function get_random_event () {
  let keys = Object.keys(random_hunt_events)
  let key = keys[Math.floor(Math.random() * keys.length)]

  return random_hunt_events[key]
}

function md_to_html_2 (event_id, init = true, current_table = 0, current_class = -1, condition = '') {
  let html = ''
  let html_end = ''
  let in_table = 0
  let parsing_child = 0
  let event = ''
  if (!isNaN(event_id)) {
    console.log('It is a number:'+event_id)
    event = random_hunt_events[event_id]
  } else {
    console.log('Its a promo!!'+event_id)
    event = promo_hunt_events[event_id]
  }

  let rows = event.split('\n')

  console.log('Number of rows:')
  console.log(rows.length)

  let table_idx = 0
  let class_idx = 0
  let table_type = ''
  let text = ''
  let text2 = ''
  let width = ''
  let my_table = ''
  let global_table_ctr = -1
  let prev_table = []
  let prev_class = []
  let first_text = true
  let skip_table = false

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i].replace(/1k10/g, '<b>1k10</b>').replace('Dead.', '<b>Dead</b>.')

    console.log('Row: ' + row)
    console.log('class_idx: ' + class_idx + ' table_idx: ' + table_idx + ' my_table: ' + my_table + ' in_tab: ' + in_table + ' parse: ' + parsing_child + ' global: ' + global_table_ctr + ' prev: ' + prev_table)

    if (i == 0) {
      if (init) {
        let parts = row.split(' | ')
        html += "<div class='" + event_id + "' id='hunt_event_title'><div style='color:#9EB6D0;display:inline;'>" + parts[0] + ' | </div>' + parts[1] + '</div>'
        // 9EB6D0
      }
    } else if (row.includes('[img]')) {
      // if (init) {
      if ((init || parsing_child > 0) && in_table == 0) {
        if (row.includes('#')) {
          text = row.replace('[img] ', '').split(' # ')[0]

          if (row.includes('no-shadow')) {
            text2 = ''
          } else {
            text2 = "id='event_img_shadow'"
          }

          if (row.includes('width:')) {
            if (row.split(' # ')[1].includes('width:')) {
              width = row.split(' # ')[1].replace('width:', '')
            } else {
              width = row.split(' # ')[2].replace('width:', '')
            }
          } else {
            width = '50%'
          }

          if (row.includes('fading')) {

          }
        } else {
          text = row.replace('[img] ', '')
          text2 = "id='event_img_shadow'"
          width = '50%'
        }

        let addition = "<img style='position:static;width:" + width + ";float:center;' " + text2 + " src='" + cdnUrl(`images/hunt/random_events/event_${text}.png`) + "'>"

        if (init) {
          html = addition + html
        } else {
          html += addition
        }
      }
    } else if (row.includes('[TO] ')) {
      if (in_table > 0) {
        in_table += 1
      }

      global_table_ctr += 1
      prev_table.push(table_idx)
      table_idx = global_table_ctr
      prev_class.push(class_idx)
      class_idx = 0

      if ((init || parsing_child > 0) && in_table == 0) {
        html += "<table class='once " + table_idx + "' id='hunt_event_table'>"
        html += "<tr id='hunt_event_header_row'>"
        html += "<th id='hunt_event_1st_cell' style='width:20%;'>" + row.replace('[TO] ', '') + ': </th>'

        table_type = 'once'
        in_table += 1
        // my_table = table_idx
      }
    } else if (row.includes('[TA] ')) {
      if (in_table > 0) {
        in_table += 1
      }

      global_table_ctr += 1
      prev_table.push(table_idx)
      table_idx = global_table_ctr
      prev_class.push(class_idx)
      class_idx = 0

      if ((init || parsing_child > 0) && in_table == 0) {
        html += "<table class='all " + table_idx + "' id='hunt_event_table'>"
        html += "<tr id='hunt_event_header_row'>"
        html += "<th id='hunt_event_1st_cell' style='width:20%;'>" + row.replace('[TA] ', '') + ': </th>'

        table_type = 'all'
        in_table += 1
      }
    } else if (row.includes('[c] ')) {
      if (in_table == 1) {
        html += "<tr id='hunt_event_row'>"
        html += "<td id='hunt_event_1st_cell' style='height:2em;'></td>"

        if (row.includes('#')) {
          text = row.replace('[c] ', '').split(' #')[0]
          text2 = row.replace('[c] ', '').split(' #')[1]
        } else {
          text = row.replace('[c] ', '')
          text2 = row.replace('[c] ', '')
        }

        html += "<td class='re_key " + class_idx + ' ' + table_idx + "' id='hunt_event_cell' style='height:2em;' condition='" + text2 + "'>" + text + '</td>'
        html += '</tr>'
      }
    } else if (row.includes('[d] ')) {
      // if ((current_table == table_idx)&& (current_class == -1) || ((current_table > table_idx) || (table_type == 'all'))) {
      //   html += "</tr>"
      // }

      if ((current_table == table_idx) && (current_class == class_idx)) {
        // html += "<td class='re_value "+class_idx+" "+table_idx+"' id='hunt_event_cell' style='padding-bottom: 0.5em;'>"+row.replace('[d] ', '')+"</td>"

        if (!condition == '') {
          text = '[<b>' + condition + '</b>] ' + row.replace('[d] ', '')
        } else {
          text = row.replace('[d] ', '')
        }

        html_end += add_text(text, current_class + ' ' + current_table)
      }

      // if ((in_table == 1) || ((current_table == table_idx) && (in_table == 0))) {
      class_idx += 1
      // }
      // if (in_table == 1) {
      //   class_idx += 1;
      // }
    } else if (row.includes('[d<]')) {
      if ((current_table == table_idx) && (current_class == class_idx)) {
        // html += "<td class='re_value "+class_idx+" "+table_idx+"'>"
        // html += ''
        parsing_child += 1
      }

      // if ((in_table == 1) || ((current_table == table_idx) && (in_table == 0))) {
      class_idx += 1
      // }
      // if (in_table == 1) {
      //   class_idx += 1;
      // }
    } else if (row.includes('[>d]')) {
      // html += "</td>"
      // html += ''
      if (parsing_child > 0) {
        parsing_child -= 1
      }
    } else if (row.includes('[dt] ')) {
      if ((current_table == table_idx) && (current_class == class_idx)) {
        // html += "<td class='re_value "+class_idx+" "+table_idx+"' id='hunt_event_cell' style='padding-bottom: 0.5em;'>"+row.replace('[dt] ', '')+"</td>"
        if (!condition == '') {
          text = '[<b>' + condition + '</b>] ' + row.replace('[dt] ', '')
        } else {
          text = row.replace('[dt] ', '')
        }

        html_end += add_text(text, current_class + ' ' + current_table)
      }

      if (in_table > 0) {
        if (in_table == 1) {
          html += '</table>'
        }
        in_table -= 1
      }

      table_idx = prev_table.pop()
      class_idx = prev_class.pop()
    } else if (row.includes('[td] ')) {
      if (in_table == 1) {
        html += "<th id='hunt_event_cell' style='background:#47749e;width:80%;height:2em;'>" + row.replace('[td] ', '') + '</th>'
        // #729AC0
        html += '</tr>'
      }
    } else if (row.includes('[T]')) {
      if (in_table > 0) {
        if (in_table == 1) {
          html += '</table>'
        }
        in_table -= 1
      }

      table_idx = prev_table.pop()
      class_idx = prev_class.pop()
    } else if (row.includes('[global_tip]')) {
      console.log('Something global is happening here!')
    } else if (row.includes('[i] ')) {
      if ((init || parsing_child > 0) && in_table == 0) {
        if (!init && !condition == '' && first_text) {
          html += add_text('<i>' + '[<b>' + condition + '</b>] ' + row.replace('[i] ', '') + '</i>')
          first_text = false
        } else {
          html += add_text('<i>' + row.replace('[i] ', '') + '</i>')
        }
      }
    } else if (row.includes('[br]')) {
      if ((init || parsing_child > 0) && in_table == 0) {
        if (!init && !condition == '' && first_text) {
          html += add_text('<br/>' + '[<b>' + condition + '</b>] ' + row.replace('[br]', ''))
          first_text = false
        } else {
          html += add_text('<br/>' + row.replace('[br]', ''))
        }
      }
    } else {
      if ((init || parsing_child > 0) && in_table == 0) {
        // html += add_text(row)
        if (row.length < 4) {
          continue
        }

        if (!init && !condition == '' && first_text && row.length > 4) {
          html += add_text('[<b>' + condition + '</b>] ' + row)
          first_text = false
        } else {
          html += add_text(row)
        }
      }
    }

    console.log('class_idx: ' + class_idx + ' table_idx: ' + table_idx + ' my_table: ' + my_table + ' in_tab: ' + in_table + ' parse: ' + parsing_child + ' global: ' + global_table_ctr + ' prev: ' + prev_table)
  }

  return html + html_end
}

function add_text (text, class_id = '') {
  return "<div class='" + class_id + "' id='hunt_event_text'>" + text + '</div>'
}
