export const lessons = [
  {
    id: "lesson2",
    title: "Lesson 2",
    gradeLabel: "YBM 초등영어 5학년",
    unitLabel: "2단원",
    homeDescription: "5장의 그림 카드로 허락 표현 수업을 시작하는 골든 벨 자료",
    gameDescription:
      "카드판의 그림 다섯 장을 보며 수업을 시작하고, 버튼을 눌러 랜덤으로 한 장씩 골든 벨 무대로 올려 보세요.",
    usesStatusCardGridSlot: true,
    boardColumnCount: 3,
    cards: [
      {
        id: "lesson2-card-1",
        title: "그림 1",
        src: "./lesson2-pictures/Hpdf_8RYJVGrmA3.png",
        alt: "Lesson 2 그림 카드 1"
      },
      {
        id: "lesson2-card-2",
        title: "그림 2",
        src: "./lesson2-pictures/Hpdf_iXRPHmceIk.png",
        alt: "Lesson 2 그림 카드 2"
      },
      {
        id: "lesson2-card-3",
        title: "그림 3",
        src: "./lesson2-pictures/Hpdf_JY9QnLb8kn.png",
        alt: "Lesson 2 그림 카드 3"
      },
      {
        id: "lesson2-card-4",
        title: "그림 4",
        src: "./lesson2-pictures/Hpdf_kZKJYy9cf2.png",
        alt: "Lesson 2 그림 카드 4"
      },
      {
        id: "lesson2-card-5",
        title: "그림 5",
        src: "./lesson2-pictures/Hpdf_ZDBnsFkULR.png",
        alt: "Lesson 2 그림 카드 5"
      }
    ]
  },
  {
    id: "lesson3",
    title: "Lesson 3",
    gradeLabel: "YBM 초등영어 5학년",
    unitLabel: "3단원",
    homeDescription: "6장의 그림 카드를 한 번씩 랜덤으로 보여 주는 Lesson 3 자료",
    gameDescription:
      "세 줄 두 칸 카드판 전체를 사용해 Lesson 3 그림 여섯 장을 랜덤으로 보여 주세요.",
    usesStatusCardGridSlot: true,
    boardColumnCount: 4,
    cards: [
      {
        id: "lesson3-card-1",
        title: "그림 1",
        src: "./lesson3-pictures/chrome_21jkUaVIxT.png",
        alt: "Lesson 3 그림 카드 1"
      },
      {
        id: "lesson3-card-2",
        title: "그림 2",
        src: "./lesson3-pictures/chrome_3vVfvejsgv.png",
        alt: "Lesson 3 그림 카드 2"
      },
      {
        id: "lesson3-card-3",
        title: "그림 3",
        src: "./lesson3-pictures/chrome_AaRPj5NSFz.png",
        alt: "Lesson 3 그림 카드 3"
      },
      {
        id: "lesson3-card-4",
        title: "그림 4",
        src: "./lesson3-pictures/chrome_aM7QIhA1Hu.png",
        alt: "Lesson 3 그림 카드 4"
      },
      {
        id: "lesson3-card-5",
        title: "그림 5",
        src: "./lesson3-pictures/chrome_aPrEuUxNUS.png",
        alt: "Lesson 3 그림 카드 5"
      },
      {
        id: "lesson3-card-6",
        title: "그림 6",
        src: "./lesson3-pictures/chrome_tEYhxJFXlx.png",
        alt: "Lesson 3 그림 카드 6"
      }
    ]
  }
];

export function getLessonById(lessonId) {
  return lessons.find((lesson) => lesson.id === lessonId) || null;
}
