import Category from "./models";

export const TEACHERSACADEMICS = [
  // new Category(
  //   "c1",
  //   "Homework",
  //   "#F1F6FF",

  //   "data:image/png;base64,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",
  //   "#3559EA"
  // ),
  // new Category(
  //   "c2",
  //   "Timetable",
  //   "#FFFFF1",
  //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABSklEQVRoge2YTW7CMBBGv0HsCAcAlSuUcAJgx5Zyhy7gPGzaK1Rtl93xcwLgCgg4AFGXTDe4tZCaGJLIgzVv5Tijz36yYykmOJKsewMwvwJ4OHdtQfQctedfrhll5lecR2J+sQYBgNa5rxhy5ruLAC0AiOIFRfGC7L6CyJV/jYhoqqbxveoOT8AUQOOagGTV5cJn5ZZ/IKZxrTP/BKwVuUXCMw0mnpoHe2vdk4ShaRrBfCPmdCh9r5eFOeGCWREVkUYwIoo09PiVhopIQ0WkoSLSUBFpqIg0VEQawYhUs0uKh8Gjerx8T6s5rvsj4tOba6aXFYnay4/MmsdZquglXkSIkPkT51JjE8w3oiLSUBFpeBFh/ruGylNj40Uk2fSf0t4zg7JqLtELOmmoiDRURBq2yN7bLG5nZxq/IsQ0wX3J7IkrE9+TUP7jB0nxXZ/0v+m5AAAAAElFTkSuQmCC",
  //   "#F4D03F"
  // ),

  // new Category(
  //   "c3",
  //   "Attendance",
  //   "#feedee",
  //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABuElEQVRIieWVQU7bQBiF3xthR1yADdhcAHVlJAJhxZJ7BAHqoiepIrUqSCzaQ9AdKxKCBGwQHAC7q54gxHReF0kIVifEwdMF8FbWG8//zT8zTwO8N9FldpZr25QOASyWrHNP6VM9y7+VBRvnaqSDGaAAEIr82omCvUpgAEszQEGqCUAkv3Tj2scq4JlUv8uPSO0AkKBWGbgX8Evg3sCzwr2CH+HSPgAIanWjYPe/gc/juUYBnuUHlPYAQORn15w5H2ALc3oWhwVP48+aa473rS6r1w0mbMNKqwBuDZQY2M1qYNqN9bTPQiGHR7DXyPLLetr/sJbmVw9irxKYGjwiDxo/Ji7Pgj8EGAJWgDHk92lg5+t0Fody+ZNkoGQtza9G8HYUJIa8GI2vp/1/OJ4ul+bbUZB04/C6HQUJoPlpM7zl2Ax7GnTq3MiCXnecitLvMpHyEqenUIlbZSL17Bk/jc7oDJ0ebOOPeE+wt5H1bzpRuELq+NnaLvOlcQKAIfQE4MJo3BUnT7caP9tRsA0Ag07H0EnyAga4YIiL6f+NNely/fKwGgCAgKw0mGTTB1xARstm1TpvQ38Bo+jAs5NX/wQAAAAASUVORK5CYII=",
  //   "#C61E06"
  // ),

  // new Category(
  //   "c6",
  //   "Noticeboard",

  //   "#EFFFFD",

  //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACw0lEQVRoge2ZP0wTcRTHP+9aJEKoMQ5GRk2MkwMrOJgQSjXEmB6NJICDJkYXNUZEBzU4AI4uTjIUB1PawdTIYVyMlNFFNoxOmLgYxUH5d88BIYF6x125eiXeZ7u8u/f7vt/f934HERER/wVCLreHhDwA6QMOhS3IH/oZjHEWVu/GScSGQAfCllQZ0gx6iyZD42D3gYBoK8numbCl+WIy14YYbxHtF6y8AtBpSsiyKuOP/riToebZ0vFGWDqCJshAPiFcoT62HxgL0K8ngghkFvQ89QeOkjQfc/LsN+J1dxB+BuDbM+VrxDvvUB2h08wjsnldtZ/5wlQhC3ppZ/K84z8QpYTBKEmz6PpejIescKGiNirA69SyEZnApoWU2UbSLDKVbaRYbHD8oj39EcgFotID2/XWEsI4wigd6blNFm2YpW5xETjm+PWqPULM6AGqfka5jcgYy/ZhkuZFOsy5MqtKCSi5ej+deY/yYmcSveE8Ivav63T1LjjaU+leTy0YOoJKl29lPnEekdjec4G0kOyeQeRNIL5ccB4R1QFyuSdkMquevTmVBFr9rMdtjRyhycj48paIDYEMEEJd475rCYOoPis78BypYkmwnrI7sN05chyrkPLemjQDVKWuSWWm3czbH4gitwMTsxUrX8IqOPayHzyc7NqGNXEiiMbKETuoncBbHiQyCLj33FS2Eb+SOtOBdZC3XEs5hVVo+avt5dMEVv4q2vAhKFGV4D0zVW4CPRvPr58fZHnpMiLXgH3BS/OH90BEu5nMPQK+IsYNVpb7EamvnjR/+KkVYohRs9dF0eVDrREFUmtEgdQa1QnkVaE1cJ/b5HvVuXOydRorXxXXTkRTq9Yon1q79IePsfZDkbWaeLexvgEI88JkfhhhMGRJO0N0OM4P+x5NBoj2b1we7BaEedAs3/V+2FIiIiL+Eb8Bv/S6R3pT3gEAAAAASUVORK5CYII=",
  //   "#00B8AC"
  // ),

  new Category(
    "c1",
    "Homework",
    "#F3FCFC",

    "https://img.icons8.com/nolan/96/00C6FF/0072FF/saving-book.png",
    // "#3559EA"
    "#0072FF"
  ),
  new Category(
    "c2",
    "Timetable",
    "#FFFAED",
    "https://img.icons8.com/nolan/96/D9E021/FB872B/timeline-week.png",
    "#FB872B"
  ),

  new Category(
    "c3",
    "Attendance",
    "#FEF1F1",
    "https://img.icons8.com/nolan/96/FF8177/B12A5B/checklist.png",
    "#B12A5B"
  ),
  new Category(
    "c4",
    "Marksheet",

    "#F0FCF9",

    "https://img.icons8.com/nolan/96/7DE3C3/0BA360/report-card.png",
    "#0BA360"
  ),

  // new Category(
  //   "c5",
  //   "Leave",
  //   "#F3FCFC",

  //   "https://img.icons8.com/nolan/64/00C6FF/0072FF/leave.png",
  //   "#3559EA"
  // ),
];
