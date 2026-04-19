/**
 * EN/KK строки для стадий растений (совпадают по индексу с data/petGrowthStages PLANT_SPECIES_STAGES).
 */

const DEFAULT = [
  {
    en: { title: 'Seed', detail: 'Seed in the soil.' },
    kk: { title: 'Тұқым', detail: 'Топырақта тұқым.' },
  },
  {
    en: { title: 'Sprout', detail: 'Stem and leaves appeared.' },
    kk: { title: 'Өркен', detail: 'Сабақ пен жапырақ пайда болды.' },
  },
  {
    en: { title: 'Young plant', detail: 'Clearly growing.' },
    kk: { title: 'Жас өсімдік', detail: 'Өсуі байқалады.' },
  },
  {
    en: { title: 'Almost mature', detail: 'Shape is almost adult.' },
    kk: { title: 'Дәл емес ересек', detail: 'Пішіні дерлік қалыпталды.' },
  },
  {
    en: { title: 'Flowering / almost ripe', detail: 'Bloom or ripening.' },
    kk: { title: 'Гүлдеу / дерлік пісіп жетті', detail: 'Гүлдеу немесе пісу.' },
  },
  {
    en: { title: 'Before full growth', detail: 'Almost there.' },
    kk: { title: 'Толық өсу алдында', detail: 'Сәл қалды.' },
  },
];

const ROWS = {
  tulip: [
    { en: { title: 'Bulb', detail: 'Tulip bulb in the soil.' }, kk: { title: 'Соқасы', detail: 'Топырақта қызғалдақ соқасы.' } },
    { en: { title: 'Sprout', detail: 'Thin stem and first leaf.' }, kk: { title: 'Өркен', detail: 'Жіңішке сабақ пен алғашқы жапырақ.' } },
    { en: { title: 'Young tulip', detail: 'Bud is visible.' }, kk: { title: 'Жас қызғалдақ', detail: 'Бүршік көрінеді.' } },
    { en: { title: 'Almost blooming', detail: 'Bud is opening.' }, kk: { title: 'Гүлдеу алдында', detail: 'Бүршік ашылады.' } },
    { en: { title: 'Blooming tulip', detail: 'Bright flower in full bloom.' }, kk: { title: 'Гүлдеп тұрған қызғалдақ', detail: 'Толық гүлдеді.' } },
    { en: { title: 'Full bloom', detail: 'Best look before fading.' }, kk: { title: 'Толық гүлдеу', detail: 'Солу алдындағы ең жақсы сәт.' } },
  ],
  apple: [
    { en: { title: 'Seed', detail: 'Apple seed in soil.' }, kk: { title: 'Тұқым', detail: 'Топырақта алма тұқымы.' } },
    { en: { title: 'Sprout', detail: 'Thin sapling with shoots.' }, kk: { title: 'Өркен', detail: 'Жіңішке көшет.' } },
    { en: { title: 'Young tree', detail: 'Trunk thickens, twigs appear.' }, kk: { title: 'Жас ағаш', detail: 'Сабақ қалыңдап, бұтақтар пайда болады.' } },
    { en: { title: 'Almost a tree', detail: 'Crown forms, dense leaves.' }, kk: { title: 'Ағашқа жақын', detail: 'Таспа қалыптасады.' } },
    { en: { title: 'Flowering apple', detail: 'Blooming — fruit will set soon.' }, kk: { title: 'Гүлдеп тұрған алма', detail: 'Гүлдеу — жеміс бекітіледі.' } },
    { en: { title: 'Fruit setting', detail: 'Green apples growing.' }, kk: { title: 'Жеміс бекітілуде', detail: 'Жасыл алмалар өседі.' } },
  ],
  sunflower: [
    { en: { title: 'Seed', detail: 'Sunflower seed in soil.' }, kk: { title: 'Тұқым', detail: 'Күнбағыс тұқымы топырақта.' } },
    { en: { title: 'Sprout', detail: 'Two cotyledons.' }, kk: { title: 'Өркен', detail: 'Екі жапырақша.' } },
    { en: { title: 'Young sunflower', detail: 'Stem stretches up.' }, kk: { title: 'Жас күнбағыс', detail: 'Сабақ жоғары өседі.' } },
    { en: { title: 'Tall stem', detail: 'Bud grows larger on top.' }, kk: { title: 'Ұзын сабақ', detail: 'Бүршік үсте ірілееді.' } },
    { en: { title: 'Bud maturing', detail: 'Petals will open soon.' }, kk: { title: 'Бүршік пісіп жатыр', detail: 'Жапырақшалар ашылады.' } },
    { en: { title: 'Blooming sunflower', detail: 'Large head with seeds.' }, kk: { title: 'Гүлдеп тұрған күнбағыс', detail: 'Тұқымды үлкен басы.' } },
  ],
  rose: [
    { en: { title: 'Seed / cutting', detail: 'Future rose bush starts.' }, kk: { title: 'Тұқым / кесінді', detail: 'Болашақ бұта басталады.' } },
    { en: { title: 'Sprout', detail: 'Shoots and thorns.' }, kk: { title: 'Өркен', detail: 'Бұтақтар мен тікендер.' } },
    { en: { title: 'Young bush', detail: 'First buds.' }, kk: { title: 'Жас бұта', detail: 'Алғашқы бүршіктер.' } },
    { en: { title: 'Bush with buds', detail: 'Roses almost open.' }, kk: { title: 'Бүршікпен бұта', detail: 'Розалар дерлік ашылды.' } },
    { en: { title: 'Blooming rose', detail: 'Rich color and scent.' }, kk: { title: 'Гүлдеп тұрған роза', detail: 'Түс пен иіс.' } },
    { en: { title: 'Abundant bloom', detail: 'Many buds on branches.' }, kk: { title: 'Мол гүлдеу', detail: 'Көптеген бүршіктер.' } },
  ],
  cactus: [
    { en: { title: 'Seed', detail: 'Tiny cactus seed.' }, kk: { title: 'Тұқым', detail: 'Кішкентай кактус тұқымы.' } },
    { en: { title: 'Sprout', detail: 'First spines on the pad.' }, kk: { title: 'Өркен', detail: 'Алғашқы тікендер.' } },
    { en: { title: 'Young cactus', detail: 'Shape is clear.' }, kk: { title: 'Жас кактус', detail: 'Пішіні айқын.' } },
    { en: { title: 'Growing cactus', detail: 'Ribs and spines sharper.' }, kk: { title: 'Өсіп жатқан кактус', detail: 'Жиектер мен тікендер анық.' } },
    { en: { title: 'Almost adult', detail: 'May sprout a pup.' }, kk: { title: 'Дәл ересек емес', detail: 'Балаша бұтақ шығуы мүмкін.' } },
    { en: { title: 'Large cactus', detail: 'Strong and sturdy.' }, kk: { title: 'Ірі кактус', detail: 'Мықты және берік.' } },
  ],
  bamboo: [
    { en: { title: 'Seed / sprout', detail: 'First bamboo shoot.' }, kk: { title: 'Тұқым / өркен', detail: 'Алғашқы бамбук өскіні.' } },
    { en: { title: 'Sprout', detail: 'Stem grows upward.' }, kk: { title: 'Өркен', detail: 'Сабақ жоғары өседі.' } },
    { en: { title: 'Young bamboo', detail: 'Stems still thin.' }, kk: { title: 'Жас бамбук', detail: 'Сабақтар әлі жіңішке.' } },
    { en: { title: 'Clump', detail: 'Several stems, rustling leaves.' }, kk: { title: 'Бұта', detail: 'Бірнеше сабақ, жапырақ шуылы.' } },
    { en: { title: 'Dense bamboo', detail: 'Tall stems.' }, kk: { title: 'Тығыз бамбук', detail: 'Биік сабақтар.' } },
    { en: { title: 'Mature bamboo', detail: 'Dense green wall.' }, kk: { title: 'Ересек бамбук', detail: 'Тығыз жасыл қабырға.' } },
  ],
  oak: [
    { en: { title: 'Acorn', detail: 'Oak acorn in soil.' }, kk: { title: 'Желудь', detail: 'Топырақта емен желуді.' } },
    { en: { title: 'Sprout', detail: 'Seedling with several leaves.' }, kk: { title: 'Өркен', detail: 'Бірнеше жапырақты көшет.' } },
    { en: { title: 'Young oak', detail: 'Trunk thicker, crown starts.' }, kk: { title: 'Жас емен', detail: 'Сабақ қалыңдап, таспа басталады.' } },
    { en: { title: 'Growing oak', detail: 'Strong trunk, wider shade.' }, kk: { title: 'Өсіп жатқан емен', detail: 'Күшті сабақ, көлеңке кеңейеді.' } },
    { en: { title: 'Mature oak', detail: 'Spreading crown.' }, kk: { title: 'Ересек емен', detail: 'Кең таспа.' } },
    { en: { title: 'Old oak', detail: 'Mighty tree.' }, kk: { title: 'Ескі емен', detail: 'Күшті ағаш.' } },
  ],
  cherry: [
    { en: { title: 'Stone', detail: 'Cherry / sakura seed.' }, kk: { title: 'Сүйек', detail: 'Шие / сакура тұқымы.' } },
    { en: { title: 'Sprout', detail: 'Tender shoots.' }, kk: { title: 'Өркен', detail: 'Нәзік өскіндер.' } },
    { en: { title: 'Young tree', detail: 'Thin trunk, soft leaves.' }, kk: { title: 'Жас ағаш', detail: 'Жіңішке сабақ, нәзік жапырақ.' } },
    { en: { title: 'Before bloom', detail: 'Buds swell.' }, kk: { title: 'Гүлдеу алдында', detail: 'Бүршіктер толысады.' } },
    { en: { title: 'Sakura bloom', detail: 'Cloud of soft pink flowers.' }, kk: { title: 'Сакура гүлдеуі', detail: 'Нәзік қызғылт гүл бұлты.' } },
    { en: { title: 'Berries forming', detail: 'After bloom — cherry set.' }, kk: { title: 'Жеміс бекітілуде', detail: 'Гүлден кейін — шие бекітіледі.' } },
  ],
  lavender: [
    { en: { title: 'Seed', detail: 'Small lavender seeds.' }, kk: { title: 'Тұқым', detail: 'Лаванда тұқымдары.' } },
    { en: { title: 'Sprout', detail: 'Thin shoots, mild scent.' }, kk: { title: 'Өркен', detail: 'Жіңішке өскіндер, әлсіз иіс.' } },
    { en: { title: 'Small bush', detail: 'Gray-green leaves.' }, kk: { title: 'Кіші бұта', detail: 'Сұр-жасыл жапырақтар.' } },
    { en: { title: 'Growing lavender', detail: 'Bush shape denser.' }, kk: { title: 'Өсіп жатқан лаванда', detail: 'Бұта тығыздалады.' } },
    { en: { title: 'Buds', detail: 'Purple spikes filling out.' }, kk: { title: 'Бүршіктер', detail: 'Күлгін сыпыртылар толысады.' } },
    { en: { title: 'Blooming lavender', detail: 'Strip of fragrant bloom.' }, kk: { title: 'Гүлдеп тұрған лаванда', detail: 'Хош иісті гүл жолағы.' } },
  ],
  fern: [
    { en: { title: 'Spore', detail: 'Fern life begins.' }, kk: { title: 'Спора', detail: 'Папоротник өмірі басталады.' } },
    { en: { title: 'Sprout', detail: 'First fiddleheads.' }, kk: { title: 'Өркен', detail: 'Алғашқы иірімдер.' } },
    { en: { title: 'Young fern', detail: 'Fronds unfurl.' }, kk: { title: 'Жас папоротник', detail: 'Жапырақтар жайылады.' } },
    { en: { title: 'Clump', detail: 'Lush green.' }, kk: { title: 'Бұта', detail: 'Мол жасылдық.' } },
    { en: { title: 'Mature fern', detail: 'Large fronds.' }, kk: { title: 'Ересек папоротник', detail: 'Ірі жапырақтар.' } },
    { en: { title: 'Lush fern', detail: 'Dense green carpet.' }, kk: { title: 'Мол папоротник', detail: 'Тығыз жасыл кілем.' } },
  ],
};

export function mergePlantStage(speciesId, stageIdx, ruRow, lang) {
  if (lang === 'ru') return { title: ruRow.title, detail: ruRow.detail };
  const pack = ROWS[speciesId]?.[stageIdx] || DEFAULT[stageIdx];
  if (!pack) return { title: ruRow.title, detail: ruRow.detail };
  const loc = lang === 'en' ? pack.en : pack.kk;
  return { title: loc.title, detail: loc.detail };
}
