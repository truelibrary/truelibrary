import {
  Avatar,
  Center,
  Container,
  Text,
  Grid,
  Stack,
  Group,
  Flex,
} from "@mantine/core";
import PageTransition from "../animations/PageTransition";
import DrMustafaKhattab from "../assets/scholars/DrMustafaKhattab.jpg";
import ShSaedFoudeh from "../assets/scholars/ShSaedFoudeh.png";
import Bouti from "../assets/scholars/Bouti.jpg";
import ShamsTameez from "../assets/scholars/ShamsTameez .jpg";
import AHM from "../assets/scholars/ahm.jpg";
import HamzaYusuf from "../assets/scholars/HamzaYusuf.jpg";
import Atabek from "../assets/scholars/ShaykhAtabek.png";
import Arshad from "../assets/scholars/arshad.jpg";
import ShaykhMuhammadYasirAlHanafi from "../assets/scholars/ShaykhMuhammadYasirAlHanafi.webp";
import NoumanAliKhan from "../assets/scholars/NoumanAliKhan.jpg";
// import ShaykhHatim from "../assets/scholars/ShaykhHatim.webp";
import AdhamAlAsimi from "../assets/scholars/AdhamAlAsimi.jpg";
import DrHamzaelBekri from "../assets/scholars/DrHamzaelBekri.jpg";
import WalidAtiya from "../assets/scholars/WalidAtiya.jpeg";
// import UstadhMunir from "../assets/scholars/UstadhMunir.jpg";
import AbdulKarimAlShdeifat from "../assets/scholars/AbdulKarimAlShdeifat.jpg";
import AhmadAlDamanhury from "../assets/scholars/AhmadAlDamanhury.jpg";
import SchAhmedAlsharif from "../assets/scholars/SchAhmedAlsharif.jpg";
// import AdnanIbrahim from "../assets/scholars/AdnanIbrahim.jpg";
import ShaykhSulayamanVanAel from "../assets/scholars/ShaykhSulayamanVanAel.png";
import MuftiMenk from "../assets/scholars/menk.jpg";
import Munur from "../assets/scholars/munur.jpg";
import classes from "./Scholar.module.css";
import { Link } from "react-router";

const englishScholars = [
  {
    avatar: DrMustafaKhattab,
    name: "Dr Mustafa Khattab",
    link: "https://www.youtube.com/user/mustafakhattab",
    description:
      "A prominent Canadian–Egyptian Muslim scholar, translator, and imam best known for The Clear Quran®, a modern and highly readable English translation of the Qur’an.",
  },
  {
    avatar: ShSaedFoudeh,
    name: "Saed Foudeh",
    link: "",
    description:
      "He doesn't speak English but lots of his stuff been translated and best in Kalaam. A prominent Canadian–Egyptian Muslim scholar, translator, and imam best known for The Clear Quran®, a modern and highly readable English translation of the Qur’an.",
  },
  {
    avatar: Bouti,
    name: "Muhammad Said Ramadan al-Bouti",
    description:
      "Among greatest of all time. Syrian Sunni scholar known for his defense of traditional Islam. He taught at the University of Damascus and was killed in a mosque during the Syrian civil war.",
  },
  {
    avatar: Munur,
    name: "Ustadh Munir",
    link: "https://m.youtube.com/@lh4horg",
    description: (
      <>
        Focused on works of Nursi RA (best for strengthening faith). There is
        also an Turkish lectures{" "}
        <a href="https://www.youtube.com/@RisaleiNurBSN?" target="_target">
          here
        </a>
      </>
    ),
  },
  {
    avatar: ShamsTameez,
    name: "Shams Tameez",
    link: "https://x.com/ShamsTameez",
    description:
      "Instructor at Khairabadi Institute, UK Jamia al-Karam graduate, Cambridge Muslim College alumnus, former Aylesbury Mosque imam, now pursuing further studies at Abu Hanifa Institute in Istanbul.",
  },
  {
    avatar: AHM,
    name: "Abdul Hakim Murad",
    link: "https://m.youtube.com/@CambridgeMuslimCollege",
    description:
      "Abdul Hakim Murad is a British Muslim scholar, theologian, and Dean of Cambridge Muslim College. A convert to Islam, he’s known for promoting traditional Sunni thought, translating classical works, and founding the Cambridge Central Mosque.",
  },
  {
    avatar: HamzaYusuf,
    name: "Hamza Yusuf",
    link: "https://m.youtube.com/@SandalaMediaCenter",
    description:
      "Shaykh Hamza Yusuf is an American Islamic scholar and co-founder of Zaytuna College. A convert to Islam, he’s known for promoting classical Sunni thought, translating key texts, and advancing Islamic education in the West.",
  },
  {
    avatar: Atabek,
    name: "Atabek Shukurov",
    link: "https://m.youtube.com/@Nazam44",
    description:
      "An Uzbek-born, UK-based Islamic scholar and Māturīdī theologian. Trained in Uzbekistan, Damascus, and Al-Azhar, he founded Afiya Institute and Avicenna Academy, teaching traditional Islamic sciences and addressing contemporary issues.",
  },
  {
    avatar: Arshad,
    name: "Asrar Rashid",
    link: "https://www.youtube.com/@AsrarRashidOfficial?app=desktop",
    description:
      "Shaykh Asrar Rashid is a British-Pakistani Sunni scholar based in Birmingham, trained in Damascus and the UK. He teaches fiqh, kalām, and eschatology, and is known for public debates and books on theology and atheism.",
  },
  {
    avatar: ShaykhMuhammadYasirAlHanafi,
    name: "Muhammad Yasir Al‑Hanafi",
    link: "https://m.youtube.com/@hanafifiqh",
    description:
      "UK-based Islamic scholar and Imam in Aylesbury, combining traditional Alim training with academic studies in philosophy (BA & MA) and a PhD in kalām. A graduate of the Islamic Institute of Dewsbury, he now teaches creed, fiqh, and philosophy, bridging classical Islamic sciences with modern intellectual thought.",
  },
  {
    avatar: MuftiMenk,
    name: "Mufti Menk",
    link: "https://m.youtube.com/@muftimenkofficial",
    description:
      "Mufti Menk for speeches. Was the Grand Mufti of Zimbabwe and a popular global Islamic speaker, known for accessible, motivational talks on faith, compassion, and daily life.",
  },
  {
    avatar: NoumanAliKhan,
    name: "Nouman Ali Khan",
    link: "https://m.youtube.com/@bayyinah",
    description:
      "Nouman Ali for some Quranic tafsirs. Khan is founder of Bayyinah Institute, known for teaching Qur’anic Arabic and tafsīr.",
  },
  // {
  //   avatar: ShaykhHatim,
  //   name: "Shaykh Hatim al-Awni",
  //   link: "https://m.youtube.com/@bayyinah",
  //   description:
  //     "A big Hanbali scholar and some of his works is translated., Shaykh Hatim al-Awni is a Saudi Hanbali scholar, hadith expert, and professor at Umm al-Qura University. A former member of Saudi Arabia’s Shura Council, he is known for his reformist critique of Wahhabism, emphasis on limiting takfīr, promoting intra-Sunni unity, and opposing extremism.",
  // },
  {
    avatar: ShaykhSulayamanVanAel,
    name: "Sulayaman Van Ael",
    link: "https://www.youtube.com/@drsulaymanvanael",
    description:
      "Belgian-born convert and UK-based scholar. He memorised the Qur’an in Sudan, holds ijāzahs in recitation and hadith, and degrees in theology and mental care. He teaches at Cambridge Muslim College and serves as chaplain at UK universities.",
  },
];

const arabicScholar = [
  {
    avatar: AdhamAlAsimi,
    name: "آدهم العاسمي",
    link: "https://m.youtube.com/@adhmasmi2",
    description: "Best lecture series by far on all subjects",
  },
  {
    avatar: DrHamzaelBekri,
    name: "حمزة البكري",
    link: "https://www.youtube.com/@dr.hamzael-bekri8642?app=desktop",
    description: "Arguably the smartest scholar alive right now",
  },
  {
    avatar: ShSaedFoudeh,
    name: "سعيد فوده",
    link: "https://m.youtube.com/@Saeedfodeh",
    description:
      "Leading Ashʿarī theologian and critic of Salafī-Wahhābī thought.",
  },
  {
    avatar: Bouti,
    name: "البوطي",
    link: "https://m.youtube.com/@naseemalsham1",
    description: "Among greatest of all time",
  },
  {
    avatar: WalidAtiya,
    name: "وليد عطية",
    link: "https://m.youtube.com/@الشيخ_وليد_عطية",
    description: "Excellent Imam incredibly knowledgeable on many subjects",
  },
  {
    avatar: Munur,
    name: "Ustadh Munir",
    link: "https://m.youtube.com/channel/UC-Bec3z00xEkXotVpPSpKiw",
    description: (
      <div>
        Focused on works of Nursi RA (best for strengthening faith). He has
        another channel{" "}
        <a
          href="https://m.youtube.com/channel/UC-Bec3z00xEkXotVpPSpKiw"
          target="_target"
        >
          here{" "}
        </a>
        and
        <a href="https://m.youtube.com/@asyilaislamiyya" target="_target">
          {" "}
          here
        </a>
      </div>
    ),
  },
  {
    avatar: AbdulKarimAlShdeifat,
    name: "عبدالكريم الشديفات",
    link: "https://m.youtube.com/@ThakafahTV",
    description:
      "Excellent lectures especially on Aqeeda... channel is 'الثقافت TV' but he's not the only one there",
  },
  {
    avatar: AhmadAlDamanhury,
    name: "أحمد الدمنهوري",
    link: "https://www.youtube.com/@ahmadaldamanhury?app=desktop",
    description: "Great Tafsir series on Aqeeda Books",
  },
  {
    avatar: SchAhmedAlsharif,
    name: "الشيخ عبد الكريم الشديفات",
    link: "https://www.youtube.com/@sch-Ahmed-Alsharif?app=desktop",
    description: "Great series on Aqeeda Books",
  },
  // {
  //   avatar: AdnanIbrahim,
  //   name: "عدنان ابراهيم",
  //   link: "https://m.youtube.com/@Adnan-Ibrahim",
  //   description:
  //     "Islamic scholar known for his thought-provoking lectures and critical engagement with religious and scientific topics.",
  // },
];

function Scholars() {
  return (
    <Container>
      <Center>
        <Stack>
          <h1>Arabic-Speaking Scholars</h1>
          <Text c="dimmed">
            We recommend you to follow these scholars below. They come from
            traditional backgrounds and have well-rounded knowledge
          </Text>
          <Grid>
            {arabicScholar.map((scholar) => (
              <Grid.Col mt={"lg"} span={{ base: 12, sm: 6, md: 4 }}>
                <Link
                  to={scholar.link || ""}
                  target="_target"
                  style={{ color: "white" }}
                >
                  <Stack className={classes.scholar__card}>
                    <Flex justify={"center"}>
                      <Avatar size={200} src={scholar.avatar} alt="it's me" />
                    </Flex>
                    <Text>{scholar.name}</Text>
                    <Text c="dimmed" size="sm">
                      {scholar.description}
                    </Text>
                  </Stack>
                </Link>
              </Grid.Col>
            ))}
          </Grid>
          <Group gap={0}>
            <h1>English-Speaking Scholars</h1>
          </Group>
          <Grid>
            {englishScholars.map((scholar) => (
              <Grid.Col mt={"lg"} span={{ base: 12, sm: 6, md: 4 }}>
                <Link
                  to={scholar.link || ""}
                  target="_target"
                  style={{ color: "white" }}
                >
                  <Stack className={classes.scholar__card}>
                    <Flex justify={"center"}>
                      <Avatar size={200} src={scholar.avatar} alt="it's me" />
                    </Flex>
                    <Text>{scholar.name}</Text>
                    <Text c="dimmed" size="sm">
                      {scholar.description}
                    </Text>
                  </Stack>
                </Link>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Center>
    </Container>
  );
}

export default PageTransition(Scholars);
