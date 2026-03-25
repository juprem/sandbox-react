import { useGetAllTodo } from '../TodoEffect/services/TodoService';
import { Calendar } from '../Calendar/Calendar';

const newHtml =
  '<section data-mw-section-id="1" id="mwIQ">\n' +
  '        <h2 id="Biographie">Biographie</h2>\n' +
  '\n' +
  '        <p id="mwIg">Dès la fin des années 1950, Michael Harner a étudié et pratiqué le chamanisme parmi les <a\n' +
  '                rel="mw:WikiLink" href="./Shuar" title="Shuar" class="mw-redirect" id="mwIw">Shuar</a> (Jívaros), puis\n' +
  "            les Conibo et effectua de brefs séjours parmi quelques d'autres peuples amérindiens (Haute-Amazonie, ainsi\n" +
  '            que chez les Pomo et les Salish de la Côte Nord-Ouest des États-Unis). Il déclare avoir été initié à la\n' +
  '            pratique dans ces peuples, comme il l\'explique dans son ouvrage <i id="mwJA">La Voie du Chamane</i>, publié\n' +
  '            en 1980 aux États-Unis sous le titre\n' +
  '            <i id="mwJQ">The Way of the Shaman</i><sup about="#mwt14" class="mw-ref reference" id="cite_ref-5" rel="dc:references" typeof="mw:Extension/ref" data-mw=\'{"name":"ref","attrs":{},"body":{"id":"mw-reference-text-cite_note-5"}}\'><a href="./Michael_Harner#cite_note-5" id="mwJg"><span class="mw-reflink-text" id="mwJw"><span class="cite-bracket" id="mwKA">[</span>5<span class="cite-bracket" id="mwKQ">]</span></span></a></sup>.\n' +
  '        </p>\n' +
  '\n' +
  '        <p id="mwKg">Parmi ses publications, <i id="mwKw">La Voie du Chamane</i> est considéré par ses admirateurs comme\n' +
  "            étant l'ouvrage qui a réintroduit le chamanisme en Occident. Michael Harner est d'ailleurs considéré comme\n" +
  '            l\'un des pionniers développement du <a rel="mw:WikiLink" href="./Néo-chamanisme" title="Néo-chamanisme"\n' +
  '                id="mwLA">néo-chamanisme</a> dans les pays\n' +
  '            occidentaux<sup about="#mwt16" class="mw-ref reference" id="cite_ref-6" rel="dc:references" typeof="mw:Extension/ref" data-mw=\'{"name":"ref","attrs":{},"body":{"id":"mw-reference-text-cite_note-6"}}\'><a href="./Michael_Harner#cite_note-6" id="mwLQ"><span class="mw-reflink-text" id="mwLg"><span class="cite-bracket" id="mwLw">[</span>6<span class="cite-bracket" id="mwMA">]</span></span></a></sup>,\n' +
  '            et il enseigne sa vision du chamanisme de par le monde depuis plus de 30 ans. Deux autres auteurs ont joué\n' +
  '            un rôle important pour renouveler le regard occidental sur le chamanisme, <a rel="mw:WikiLink"\n' +
  '                href="./Mircea_Eliade" title="Mircea Eliade" id="mwMQ">Mircea Eliade</a> (à partir de 1950) et <a\n' +
  '                rel="mw:WikiLink" href="./Carlos_Castaneda" title="Carlos Castaneda" id="mwMg">Carlos Castaneda</a> (dès\n' +
  '            1968).</p>\n' +
  '\n' +
  '        <p id="mwMw">Ses recherches l\'ont amené à définir le <a rel="mw:WikiLink/Interwiki"\n' +
  '                href="https://en.wikipedia.org/wiki/Core%20Shamanism" title="en:Core Shamanism" class="extiw"\n' +
  '                id="mwNA">Core Shamanism</a> (chamanisme essentiel/fondamental ou core chamanisme), qui synthétise ce\n' +
  '            que Harner considère être le tronc commun essentiel des techniques issues des traditions chamaniques, dans\n' +
  '            le but de les rendre utilisables et accessibles aux personnes de culture occidentale en décontextualisant\n' +
  '            les pratiques chamaniques. Des stages de core chamanisme sont proposés par sa\n' +
  '            Fondation<sup about="#mwt17" class="mw-ref reference" id="cite_ref-:0_2-1" rel="dc:references" typeof="mw:Extension/ref" data-mw=\'{"name":"ref","attrs":{"name":":0"}}\'><a href="./Michael_Harner#cite_note-:0-2" id="mwNQ"><span class="mw-reflink-text" id="mwNg"><span class="cite-bracket" id="mwNw">[</span>2<span class="cite-bracket" id="mwOA">]</span></span></a></sup>,\n' +
  "            notamment en Suisse où se trouve l'antenne européenne de cette fondation.</p>\n" +
  '\n' +
  '    </section>';

const parseHTML = (html: string) => new DOMParser().parseFromString(html, 'text/html').documentElement.textContent;

export function CrashTest() {
  console.log(parseHTML(newHtml));
  return <div></div>;
}
