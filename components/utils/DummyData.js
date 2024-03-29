import Category from "./models";

export const CATEGORIES = [
  new Category(
    "c1",
    "Transport",
    "#F3FCFC",
    "https://img.icons8.com/nolan/64/00C6FF/0072FF/bus.png",
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC+klEQVRoge2ZT0hUURSHv3Pf02EsC9TEEgNBUCqKygmkaFVtIlrUoAbVqpZGtWhRC6HANoU7oTbRPwshahHUJoRALWsTUViLgizjWYkUmTjvnRaOMgwz4/ic0DfNBwNv7jn3/s6Pc+97bxgoUKDAf4HMXDS2OAdFaAO2AMsWryQAJkA/iMoTsayuZ7fK38w1QQAirU4ncOKfl+cPV1XO17oVF3p6xE2XZBpbnIMsXRMAloi2fywavZwpycS309JHaYu0OM3pwobpMxEMhEsbD39NeX4Ni3+w50N1aErOpApIpNVRgMHuSkmVkMh8cv3kZ5rTeOjrflFzH5iw1F03cGf1x8S4yVZgsXlxu+oB8BgIu8a6mBwPjBEAyzMngSmU5sghZ2diLFBGBu5WvEXoAkDppF1n6w+UEYAQxe3AN2BzZGj06Mz47GEPKJ8Hu1fVgGjgOpJEdVP0+xoI4NZKxrWphzwworgNkAdGEMmPjqB5srVg2og9822pv2sl0xT9FI7ZoV/A2q37vpQEtiP9PTUTgnwCjL3cqgusEQBPdAjAQxoCbcR4vANApD7QRpC4EfWCbUS86a0F0hD0l8YZfga6IwmU5ouRvHiyAwUjS49sjQyrEi0Oy4risKxA9ADw/h/V5Esrm9vvsB0LbervWfkjcbApOl4WsydfAdULKDpnWgYYybSyKieTFwaIj53yWXCutUaMot2ZFg+VyON0MS9mp435wbeWyC17eej32V+TJQjSCqxOzolNmqx/SywUH1ojoLfHxsbP2b3Xav8Ap+OfWba1Ok8Vdnga2wXcS7WKWLHd8cung92VO1PlZEMutNLetTzkJgAqHduODJcnx5ui42UGOuI5N+Zffm610rZy63EtMj9H+4BG4DNwyhjrEYDrunsMdKhQB/p82Ujl9t5eifk1kgutjHsyEnWqKOIhmvZfrRdFtre370aV49dErrTmPFzro1octkaPGZHDim6YniSvFe+6V1p59eUVmVpA/YumVaBAgYDyF2wAQNEGCgG3AAAAAElFTkSuQmCC",
    "#0072FF"
  ),
  new Category(
    "c2",
    "Calender",
    "#FFFAED",

    "https://img.icons8.com/nolan/64/D9E021/FB872B/planner.png",
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA/ElEQVR4nO1ayw7CIBDcL+te9aZfzvoLGv0BtmcMPpoG2wS1BDbMJHtom+4yzMC2CUSZUOGdd8NFhUMM7/gc7+W+Xzv/hFfiR5F5MTKSf8I7+dp16/ntERndcPTCt1TeNNJCWwdl5o9jHR0fPojkkGiJiD7JXFeltUREl6zXHRFtLAhEpL4KCkXEkCJAa9AGbKJY7DPUnlkokqL2zEKRFP80oJLP9NvxgAhBEYK1ZIM10lpQ90SowDZqavtVEGEoErqwljYW1D0R+tFaJSyp+PoV/I8EWEuwa3H13qDoI4TOHmAtKbRG/OxkjpXwS4du9DTsLZHxpY5BAbQN7iFjubwKga1hAAAAAElFTkSuQmCC",
    "#FB872B"
  ),

  new Category(
    "c3",
    "Notifications",
    "#FEF1F1",
    "https://img.icons8.com/nolan/96/FF8177/B12A5B/appointment-reminders.png",
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC7ElEQVRoge2Zz0sUYRjHP+/sOguJSidJdCSLCAIPnXZXPXgs6Jgk9ONQl7r0i8w6RNRB7RhEpzzoJexo/0Dojh4ikOyUZI4/oEuIIjWzu/N2MMHUmZ3ZfbfZaD635dl5nu/zvL+edwZiYmL+C8SnU+jrm/pTAZeAI1ELCsmagPHGBueRmDH0YQn3o1ZUIcPCNPRVoAXhdmWXCmbUisIwayS7XbQpYE2Yhi4BspYjItZVFjv6k16GWmdv4bWohKhGZSKLQsobtuYcRjKq0G8gVCQyD/KKbTknMsv5l71fWdeSdQ+BHwp8B6aSRD4AfRnL6cxa+bFeKOwY0otb30CMVS4vOPsWe2lETsBIxrIn/f5VRDxLIK+WFyM8QUfEBd4g5OmsZXdnLHtyrpn69y0c8nqgx/r5BcmEGpmlKVUtBynGNclIesX+vNuwldLnARuck55PS4YR9ANVP6O8R0QyipvoyC7b1/YmsW0mhyTn5zy74nwE3lYuszSeI6KlnNvpBTa87F2WczFQBOEOI7VzZWgLheeIuE7dBRUBsksFEyHeqfDlh88aEQMT8KoPikGdeV4JZPW7Hr9d61hrm94XxtnGpv5EwAAR3Gv8dy2NQQmvBQQqqdweCapxJdjVsh+I/zki6cy1p86EiNcCv9eFYtJWYdrPXvJAFJIH6uT8iWnouZyR8qxyGEonguyebkv2qAi2F4lwg07bUgTqgxJCGwR8KzfXTP1WyOBdlq2sQIF6LQlnZ9rrTh9kmz1Oo2mkbm6l9AVVosohRGcq7gH9O79mj9Y3F4v5667DLZBNVdAWisCJSMn5XHvyudQS3xNF7rrF/GUBqWqKC0OYu0JCSM0URalmdSomfvlQa8SJ1BpxIrVGVRKZMZJdqn2W6veq8s5Jok2bhl4N157EU6vW2De1/tUPPhqwBtt34oi1hGbXBrAqTEMfAgajFKSAocSd1uKU7STqgA6gIWpFIVkFXjQ1OI+jFhITE/OX+AVhAuAF71xJagAAAABJRU5ErkJggg==",
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB9klEQVR4nO2Yv07CMRDHz8gdD6E9VuNg1NHopvElfBN1878Orm7G0ZfQKFdegMFNjcCgcVMnE0x/PzRCgNTSVtB+ky7A3fXzu9J++wNISvo9VaeBROG+VtjQTE2/A+uacdfUgNDSjHv+AdqHMO6EBwnSiY6hsBEeJDREa0ACsVTqCA/p0oIRzf+lBGKp1JEYT+wCoCBMm1rhveeD806YNs4BxqOAZBABD8+KovUoIObJ5QWLK+BRMllczbyZwts4IAG3VO2aOwaIViTCdB1qPs6BtjHZpqDw4PP3ovDAfOZ7Ps6BtjFa4VGXnenQ93ycA21jhOmpy6706Hs+4TviYCB1AuHUkWa/JVJWhaXeJ3dhcWSWlutFSw8byHeZw1AzXYWaj3PgH7IoWDcx5RLOgkdJCecyB8BYi2Tjcafbuv/0U+Y+IUyXrjZeGLejgGTvizOYvDPfQN7M92XGNUeAmoFwelfsY71rxvmWj7qpTOCMMD3neYvLIf9PbRq0kHGzWtFZC6QhTK95Tjz2kd9agxYSptOOJfIujFtNgDEf+a01aCHNdCJML5qpamy7lGjKZ35rhS6UQOC/d0QHHpBALPWvOiJcWOgVby5JIwNS6XOj63cTjAyCbcYvxBDGhxgguxFAfm7LfypjmXMY/50ZyJYnJUFwfQDvIwxxa+x/3wAAAABJRU5ErkJggg==",
    "#B12A5B"
  ),
  new Category(
    "c4",
    "Academics",

    "#F0FCF9",
    "https://img.icons8.com/nolan/96/7DE3C3/0BA360/books.png",
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACWElEQVRIie2WP2gTURzHP79L2qBihGZws6VaLKmLk4sgEaFnUSzkD6gQ7VInFceC1UKFOoljq1gwBYfmMinNZerQJUMHwYjVWCIuRRqQpqBNNTmHJE299M7EtHHxCwfv3o/7fn7vvd+99+C/WiRp+Iv5eSf57BWQEcAAmSBXeEEoVNgb8NiYwqk+PyLjwHFTNIPIQ9o7pvH5fu4O2B5oVt0JWIMbAzacQC24OWDdCVTBuwv8YwKyx0DLBAQ9tgDG6T0GmrWgtBi4JYXkmzMYRgh43wJeBpEbuDxn/2FxmTU768AtV0HuAj1NAtMg41tb6uJUG1nPddTAU+sNpLkEPoA8qNnDdS0DdKEGxK64HKjBCC6PF4xrpezrAobJFb2o/hnAYYp3VRrWYLeSRtduwycnajBCMtVrU4SVoulD9c/Q/VVBj4ZxK2+t7O1GfAR4TP7gEonYMF6vk/PBKC7PifIMvCs9EiZX7KHf/4TVVYVEbJisJw3yHDhmZW69xrpmmHo+A49wrU/hG9r4LbI41Ua24zLIaA1MDVQZFU81IE6bEZtVmYE7xKMTONpfAlDYvEhWRoDOBrywARtfQA7vEOhEZJLij0kAxPZIX7EKWK+xSMTOsT5Ze1iD29fvAfEmqK8o7rvfONg3tEEydQGRW9hM2Q5aAW6STF1iYCC/1avHzm1v13fZm5tzId/7EUNFOIlBN3CoHF0DWQbjNUKctWKCUGizxkPXPgJHy2/LjV9v/1a6lqb6q6Vbdx4Lz7a1p1s34kTkAMb+pRL4W2/LuCW4NkhCGwT4BcBczXQWWjzGAAAAAElFTkSuQmCC",
    "#0BA360"
  ),

  new Category(
    "c6",
    "Leave",
    "#F3FCFC",

    "https://img.icons8.com/nolan/64/00C6FF/0072FF/leave.png",
    "#3559EA"
  ),
  new Category(
    "c5",
    "Profile",
   
  
    "#FFFAED",

    "https://img.icons8.com/nolan/96/D9E021/FB872B/user-default.png",
    "#FB872B"
  ),
];
