// import Category from "./models";

// export const TEACHERS = [
//   new Category(
//     "c1",
//     "Transport",
//     "#d9ebff",
//     // "https://cdn-icons-png.flaticon.com/512/1023/1023362.png",
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABKklEQVRIie3SPy+DURQG8N+LGKqJWCRMJl9CGCS+gq2bQYJBaMPWUH+SDqYuvoLEJBYjIRaJ1cRuk3Z0DfdttE1pVcXSJ7l57jnnuefJvfcwwH8jiVQcJbtPyGHqhz1quCBZY/u1tTgUaWyPUOihOWSwTDinONRaHEk5l/rNsXX7WS6HyPmk+Vhj/miGkRvMk13BaZsbmI7U2Lxb7D4TNuM+HFOebGfwSxTOSC4wgfIfGIB1VJGjvPgHBtsvhENxMk/q2fTz6p/WT8TB6OcTtcXAoGeDHWQJux3Od9TVDW6a05kK+Sqh8n3/L3XXLQb5+XSs7mNc26CSJdlIdXexXl8ddQutN0gRSnjHIbU3koMYh1JvOoabw6snlh5IZjGOR6xSuOxNN0AX+AA8UVbmTGShawAAAABJRU5ErkJggg==",
//     "#00008B",
//     "Bus Details"
//   ),

//   new Category(
//     "c2",
//     "Calender",
//     "#FFFFE0",
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAj0lEQVRIie2UwQ2AIBAE54hlqA0Y+rASm7IR+zA2IH2IHzVISFDEH/PbkOzecgQoRBBX2IWejRGoE/0MikE6pnDAzAo0ieZXiGjaU1TeYQMg+h78FDtj8QZUKUZv8Bu4k2Th9wbBANGIu4e3OhqQE/+ZZrl7t03ZQZSyg6COBuTk9+/63kAxAOaL+eFReM4OC2IhLdywZsYAAAAASUVORK5CYII=",
//     "#ffD300"
//   ),
//   new Category(
//     "c3",
//     "Markscard",
//     "#feedee",
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABEElEQVRIie1SMU4CQRR9f4KVsSVGsAcSKkorteQGQmK3rYUmhAMQrsB2NOAR7JSEIxj2ApCQsAeAwp1HAZiBzC4bRmIBr5v/3/tv5s8DjgxJQ/IrlYur+bxN4Hld6t5ks837weBnnzaTxuBysWgReDVKb9Mw1AAa+7RbL3gvFqtUyieZs5GVUnckFclhzLwJAa8eBB+/GrOrRTpxwwGApIrIpLXmBfDNwu6K8glikByqJMIKt+YhBd8N7gYioYg8QuT7GAazSOuHp9HoE8CLjRAb01oQWD+zVypxt98vlws6ivo2gfOK1sO/BLi29bdMN7dzhfm6c4rOKToM/5qiyR/MHMcaEPAcTcYi4jnoTxFLaQ5yxweREfAAAAAASUVORK5CYII=",
//     "#A52A2A"
//   ),
//   new Category(
//     "c4",
//     "Academics",
//     // "#A0FEFF",
//     "#e4f4f4",
//     // "https://cdn-icons-png.flaticon.com/512/1125/1125916.png",
//     // "https://img.icons8.com/external-others-inmotus-design/67/000000/external-Graduate-Cap-science-others-inmotus-design.png",
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAABDCAYAAADHyrhzAAAABmJLR0QA/wD/AP+gvaeTAAAEyklEQVR4nO2abYhUVRzGf+fuOutS2gsEWpIuFKJprBRF0BuEZLhr3xajNCxiDaK1VVtzdeaZNS2h3VqVDIPCQkg/hLYhReCHcCsrUNOWwpSMqLUsMSutdef04cy6o602M/dtw/v7MjD3nv88PHfmOef850BCQkJCQkJCQjiY2D8/m52BtbMxZguZzHbAxicmDqQUMBtYDEwpuPINxqxj1KgNNDefjFpWtGZIozFmHtYuAsZd4M6fgPWkUmtZuvSXiNRFZIY0AZgPNAKXlzDyD2ATFRUdLF/+dSjaCgjXDKkWaAYeACp9VMoB2/G8VaTTHweibQjCMMMg3QM0AXUh1O/GmE4mTXqbhob+IAsHZ8ZgKD4N3BBY3fMTeNj6N6P4UAyLwMK2fDMGQ3E+cJkfEQHxF7CFioqV5YZt6Wa0tU0jl3sK/6EYFi5s4Tmkj0oZWKwZYYdiWJQUthc2I/pQDIuDGLMWa19F+vN8Nw1txmAoLgauCUthDPwMvAysQzp67sWzzVixoob+/gXAo8AlkciLBxe2sArpq4E3nRnDPxTD4qywNUjrcdPjxcwPwBwPqMm/sQbYE5+eWNgPzANqkHYU/iS2ITUh3Q60ADOJv/kTFt0Ys5pM5l0Kmkn/zgdpJ7CTtrap5HJPAHOBkZHJDI+Bne+zpNO7hrrh/GGZTu8DGpEyuEx5ErgiDJUh8zvwGpWVHSxbdvhCN/73zCH1AmL16nZOnXoEa5uBa4PRGSpHgFeANUi/FjOg+Gm0peUE0Im0FmNmYu0y4JayZIbLPmAd8AbSqVIGlr6mkHJAF9A1zMJ2yFAsBT8LLIPUDdQj3QgsxO1jUj5qlkofsAXPayed3n1GV5l4ZcuQqpH2Is0FepAeBsYDWeBY2XWL4wRuXXQd0kPkcnvJZuuRdiGNKrdo+WY4pgIbgQNks03Ab0iiuno8xiwAvvNZ/1x6gSxVVeORmoDeMw/D2nfwmWF+zRhgAta+BHyLJE6eHEEm0wnUYMws4FOf9b/A/c1QgyQ873Te/EO4hzHRZ30gODMGuArIAIeROoGryWS6kG4F7gBKDbdujJmFVIu0ARidN/tw3vxA2wth7VAvxS3S5iNtxm2Vi13Z9gFbgReQ3DdqsLXwGFAdkubQt+spYA7wIFLhUriRlSvT9PU9zuDK9gTwOtCO5LLGzVKL6O+PpLUQVe/CA+rI5eqQPgCep7V1ByCkDoy5j6qq91iy5DgA0t3AEuDeiPQB8TRypgPTkfYALzJ58iYaGjbjjifUY+0zwG0x6Iq1q1ULbKSnZynSW0AD1k6KUc+waPFNxM1AsRP01Pq/xsOt6nL514saD9e4uR6pJ24xcVOZ3/MfilvIcCDJjALKN2Ps2D7c2YjhxFHg73IHl29GY2MfnldH+L2LYjkGzCy11VeIv59JOv0ZcCdwwFcd/xzE8+46s7ErE/+ZIe0Hbsb1FaI+3WuBNxk58qb8Xxu+CLaJ6xrE7UTTNf8cWIj0YVAFw+lou13nQmAGwS75TwPvAx1IOwKsC4R/KPZKjKnH2vtxO9ExZVTpBT4BtpFKdYV5fDrqs+NjMGYaMAVrx+HMqcCdFjyOe/JHMOZ7rP2SESN209r6Y6QaExISEhISEhISEhISYuYf/nZ9pDom9nwAAAAASUVORK5CYII=",
//     "#008080"
//   ),

//   new Category(
//     "c5",
//     "Leave",
//     "#d9ebff",
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAmElEQVRIiWNgGDjQ/R+CKVPHRE0nYQOMqNwuLwYGxpkMDAwyZJr3hIGBMY2BoWQ7TADNBxQZzgDR+38msgB6EFFiOAzI4rOA6oDmFrBgFy5lxC5OCGAm16EfRCRaQGzuJtsC0sGoBQNvAY6MhguQngHp7oMnDAwMMphpHeZymDg6HwU8Ruag1wdp6ApIBI8ZGP6nUaB/JAIAGcUdgG4IXtAAAAAASUVORK5CYII=",
//     "#00008B"
//   ),
//   new Category(
//     "c6",
//     "Profile",
//     "#FFFFE0",
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADKUlEQVRoge2ZT0hUURTGf2dmlMqEEioxiP4jjZO4aWPaplpItDNqFSFJUbvaBG2lXSspodpUSEQ7TSRyUZZgi8R5TkVZiVBRFC1MCLU5LUaZasZx5t4zWeBv++73nfNx35037zxYYomiIMUy1iE2EqEBpQqoJEQS5TNJnhChX6JMWdYzDaJKiICjCGeBHTmWjgOnJEa3VW2zIPqUNZTQDezKUzID3EHolBq6fOubBNE4qxEeADFHix5KOCzVTLj2EHIV/uFyEfcQAE3McMOnBe8dmT3Uo0DY14ske6WWPhep/45EaMYiBIDQ4ir1DyLUe3ukvRpdpf5BlM3eHmmqNEGpi9DisNvcVimEH5S5CC2C/DDwSBNm2kVmEcSp8Dx8lSjfXIQWQUYNPOZ44yq0OOwj3h5pnrsKLXYkMPBIofS7Si2CrDDwSBHiu7vUF+GUt8ccSqur1GJHKgw8vL0sgjgf0Cw8cxVa/Gp5vxT94uX8xugfZIqbwENvH6GfMJ3ucgM0QSlJxoF1jhYfCbHBZyBh8oYoUaZQep0NlF7fqYrNq27K6YqzVrnmX94IqeExcNdBel9q3Z/oc9jtCEAJrcDnAhQTzHDcorRpEKnmPcrrAiTvpI4xi9q2OwIglJh75oF9EBjMe6XQY1XUPsgEZ4Bbeay8jnDOqqzd7HeYGkLUSSw1MdQ4jQitCPUolbPLPgCPgA6JMTC77hhhBiXq/j/LBE2wVeO0a8C0BqjGadchVuWhq9CASxqgGjClAR0ap9q1D6cdUSXECE3AaWAfmbfoF+A2SjcRXjHN+5SQ9YTZDhwAmsn8265AH0o7L+iWQ/lPaAoKoglWkuQEcBJMB3OZCGPAZSJczmdKn1cQVYQELShtwFrfHgvkE8J5olwVQedbtGAQHaYMoRPhoG1/BdNFkiNSy2S2izmD6ADLKecesLsorRWK0E8Z+2VT5pAi93OknAv8KyEAlAYmact2ad4d0YAtwEuK8/T3IYmyTXb+PpXM1WTLAtcXi1C2D0K5Gt1TxGZ8yfgglCuI81P2L5DxDT9rEB1gObaDN2sq9C3LFruJJZb4n/gJuOjEKih/ULkAAAAASUVORK5CYII=",
//     "#ffD300"
//   ),
// ];

import Category from "./models";

export const TEACHERS = [
  // new Category(
  //   "c1",
  //   "Transport",
  //   "#F1F6FF",
  //   // "https://cdn-icons-png.flaticon.com/512/1023/1023362.png",
  //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC+klEQVRoge2ZT0hUURSHv3Pf02EsC9TEEgNBUCqKygmkaFVtIlrUoAbVqpZGtWhRC6HANoU7oTbRPwshahHUJoRALWsTUViLgizjWYkUmTjvnRaOMgwz4/ic0DfNBwNv7jn3/s6Pc+97bxgoUKDAf4HMXDS2OAdFaAO2AMsWryQAJkA/iMoTsayuZ7fK38w1QQAirU4ncOKfl+cPV1XO17oVF3p6xE2XZBpbnIMsXRMAloi2fywavZwpycS309JHaYu0OM3pwobpMxEMhEsbD39NeX4Ni3+w50N1aErOpApIpNVRgMHuSkmVkMh8cv3kZ5rTeOjrflFzH5iw1F03cGf1x8S4yVZgsXlxu+oB8BgIu8a6mBwPjBEAyzMngSmU5sghZ2diLFBGBu5WvEXoAkDppF1n6w+UEYAQxe3AN2BzZGj06Mz47GEPKJ8Hu1fVgGjgOpJEdVP0+xoI4NZKxrWphzwworgNkAdGEMmPjqB5srVg2og9822pv2sl0xT9FI7ZoV/A2q37vpQEtiP9PTUTgnwCjL3cqgusEQBPdAjAQxoCbcR4vANApD7QRpC4EfWCbUS86a0F0hD0l8YZfga6IwmU5ouRvHiyAwUjS49sjQyrEi0Oy4risKxA9ADw/h/V5Esrm9vvsB0LbervWfkjcbApOl4WsydfAdULKDpnWgYYybSyKieTFwaIj53yWXCutUaMot2ZFg+VyON0MS9mp435wbeWyC17eej32V+TJQjSCqxOzolNmqx/SywUH1ojoLfHxsbP2b3Xav8Ap+OfWba1Ok8Vdnga2wXcS7WKWLHd8cung92VO1PlZEMutNLetTzkJgAqHduODJcnx5ui42UGOuI5N+Zffm610rZy63EtMj9H+4BG4DNwyhjrEYDrunsMdKhQB/p82Ujl9t5eifk1kgutjHsyEnWqKOIhmvZfrRdFtre370aV49dErrTmPFzro1octkaPGZHDim6YniSvFe+6V1p59eUVmVpA/YumVaBAgYDyF2wAQNEGCgG3AAAAAElFTkSuQmCC",
  //   "#3559EA",
  //   "Bus Details"
  // ),

  // new Category(
  //   "c2",
  //   "Calender",
  //   "#FFFFF1",
  //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAj0lEQVRIie2UwQ2AIBAE54hlqA0Y+rASm7IR+zA2IH2IHzVISFDEH/PbkOzecgQoRBBX2IWejRGoE/0MikE6pnDAzAo0ieZXiGjaU1TeYQMg+h78FDtj8QZUKUZv8Bu4k2Th9wbBANGIu4e3OhqQE/+ZZrl7t03ZQZSyg6COBuTk9+/63kAxAOaL+eFReM4OC2IhLdywZsYAAAAASUVORK5CYII=",
  //   "#F4D03F"
  // ),
  // new Category(
  //   "c3",
  //   "Markscard",
  //   "#feedee",
  //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABXElEQVRoge3XP04CQRTH8e8DXKK2FsYCPIKdBuIJDBdQE0ttPAIdpVfwBFpobLUxLo12ngBEG+OfxgQmWcZCtyPLEgj7lrxPvTN5v0wmvx0wxiSRdiUIgVrWg0xHQmlXAp/1GLNQyHqAWbEg2lgQbSzIvHihiXAADJO+0x7kot5xrdW+uwYGSR+W0uxW6zqZyVj/RpawyLt42Yeo4ZFT4I2hOwH4KZfPwC8n7ZkqyFx4/7LTHdwJ3IbV4F584bvW4zOslvfw/njccm2/KDcR7mi3yxfA0wZrrhQ8A+vjFmq7I40iwWO4ubTloTAoBeekCAH6TiQWAT2gmnaBthOJFZkgBOgNMjELMi9eaIpwSM6b/bLeca2Vvrsiz81ejBak2bdf+bBmz5g1u7YTiVmz5576IPZmH8Xe7JOwN/sfbXfEml3bicSs2XPPgmizSEEkzHqIaXnkIesZjNHuF6ByuSkZm9v+AAAAAElFTkSuQmCC",
  //   "#C61E06"
  // ),
  // new Category(
  //   "c4",
  //   "Academics",
  //   // "#A0FEFF",
  //   "#EFFFFD",
  //   // "https://cdn-icons-png.flaticon.com/512/1125/1125916.png",
  //   // "https://img.icons8.com/external-others-inmotus-design/67/000000/external-Graduate-Cap-science-others-inmotus-design.png",
  //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACWElEQVRIie2WP2gTURzHP79L2qBihGZws6VaLKmLk4sgEaFnUSzkD6gQ7VInFceC1UKFOoljq1gwBYfmMinNZerQJUMHwYjVWCIuRRqQpqBNNTmHJE299M7EtHHxCwfv3o/7fn7vvd+99+C/WiRp+Iv5eSf57BWQEcAAmSBXeEEoVNgb8NiYwqk+PyLjwHFTNIPIQ9o7pvH5fu4O2B5oVt0JWIMbAzacQC24OWDdCVTBuwv8YwKyx0DLBAQ9tgDG6T0GmrWgtBi4JYXkmzMYRgh43wJeBpEbuDxn/2FxmTU768AtV0HuAj1NAtMg41tb6uJUG1nPddTAU+sNpLkEPoA8qNnDdS0DdKEGxK64HKjBCC6PF4xrpezrAobJFb2o/hnAYYp3VRrWYLeSRtduwycnajBCMtVrU4SVoulD9c/Q/VVBj4ZxK2+t7O1GfAR4TP7gEonYMF6vk/PBKC7PifIMvCs9EiZX7KHf/4TVVYVEbJisJw3yHDhmZW69xrpmmHo+A49wrU/hG9r4LbI41Ua24zLIaA1MDVQZFU81IE6bEZtVmYE7xKMTONpfAlDYvEhWRoDOBrywARtfQA7vEOhEZJLij0kAxPZIX7EKWK+xSMTOsT5Ze1iD29fvAfEmqK8o7rvfONg3tEEydQGRW9hM2Q5aAW6STF1iYCC/1avHzm1v13fZm5tzId/7EUNFOIlBN3CoHF0DWQbjNUKctWKCUGizxkPXPgJHy2/LjV9v/1a6lqb6q6Vbdx4Lz7a1p1s34kTkAMb+pRL4W2/LuCW4NkhCGwT4BcBczXQWWjzGAAAAAElFTkSuQmCC",
  //   "#00B8AC"
  // ),

  // new Category(
  //   "c5",
  //   "Leave",
  //   "#F1F6FF",
  //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABZklEQVRoge2aQUrDUBBA35RewUrVguARbOoV3LpLPUAX3sZFN7o32y7FG2jxEFJRjODWXcdNfxsQMWkz9DfMg8DPJ8z8RyaTkEQoSTLMz4Fb4GgxNQNG06xzXzaGZfxWhVw3hSQAvcVcXWwUv4pID2CadWSadaQ4VxMbxa8iEjXtMBikHxcqMga6VQIkw1xrX1W5+O+CXj1l+xMonJF1JLZMV5Fx2CmW1i5JBA7CoDHXSOgO5rVuRehwjTkjLhIbjRFxYsPbb2y4SGy4SBkUzVoi/ZZIX4UHy1zt/w9ZH0FeHu/2ngGSNH9b9cj68dKKDReJDReJDReJDReJDReJDdOHRuD47PLzFGCuemiZyFoknaumxjmABpWWi5TkevlNULXOD6e/sBb5Xo5EviwTNaa0zLtWMsxPAAQZKHYvM83vI4sNSwloUGm5SGwURV63tor1mYXB6s+HOSN2S2YGjLa9COcvfgCRxlYpdNqODAAAAABJRU5ErkJggg==",
  //   "#3559EA"
  // ),
  // new Category(
  //   "c6",
  //   "Profile",
  //   "#FFFFF1",
  //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADKUlEQVRoge2ZT0hUURTGf2dmlMqEEioxiP4jjZO4aWPaplpItDNqFSFJUbvaBG2lXSspodpUSEQ7TSRyUZZgi8R5TkVZiVBRFC1MCLU5LUaZasZx5t4zWeBv++73nfNx35037zxYYomiIMUy1iE2EqEBpQqoJEQS5TNJnhChX6JMWdYzDaJKiICjCGeBHTmWjgOnJEa3VW2zIPqUNZTQDezKUzID3EHolBq6fOubBNE4qxEeADFHix5KOCzVTLj2EHIV/uFyEfcQAE3McMOnBe8dmT3Uo0DY14ske6WWPhep/45EaMYiBIDQ4ir1DyLUe3ukvRpdpf5BlM3eHmmqNEGpi9DisNvcVimEH5S5CC2C/DDwSBNm2kVmEcSp8Dx8lSjfXIQWQUYNPOZ44yq0OOwj3h5pnrsKLXYkMPBIofS7Si2CrDDwSBHiu7vUF+GUt8ccSqur1GJHKgw8vL0sgjgf0Cw8cxVa/Gp5vxT94uX8xugfZIqbwENvH6GfMJ3ucgM0QSlJxoF1jhYfCbHBZyBh8oYoUaZQep0NlF7fqYrNq27K6YqzVrnmX94IqeExcNdBel9q3Z/oc9jtCEAJrcDnAhQTzHDcorRpEKnmPcrrAiTvpI4xi9q2OwIglJh75oF9EBjMe6XQY1XUPsgEZ4Bbeay8jnDOqqzd7HeYGkLUSSw1MdQ4jQitCPUolbPLPgCPgA6JMTC77hhhBiXq/j/LBE2wVeO0a8C0BqjGadchVuWhq9CASxqgGjClAR0ap9q1D6cdUSXECE3AaWAfmbfoF+A2SjcRXjHN+5SQ9YTZDhwAmsn8265AH0o7L+iWQ/lPaAoKoglWkuQEcBJMB3OZCGPAZSJczmdKn1cQVYQELShtwFrfHgvkE8J5olwVQedbtGAQHaYMoRPhoG1/BdNFkiNSy2S2izmD6ADLKecesLsorRWK0E8Z+2VT5pAi93OknAv8KyEAlAYmact2ad4d0YAtwEuK8/T3IYmyTXb+PpXM1WTLAtcXi1C2D0K5Gt1TxGZ8yfgglCuI81P2L5DxDT9rEB1gObaDN2sq9C3LFruJJZb4n/gJuOjEKih/ULkAAAAASUVORK5CYII=",
  //   "#F4D03F"
  // ),

  new Category(
    "c1",
    "Transport",
    "#F1F6FF",
    "https://img.icons8.com/nolan/64/00C6FF/0072FF/bus.png",
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC+klEQVRoge2ZT0hUURSHv3Pf02EsC9TEEgNBUCqKygmkaFVtIlrUoAbVqpZGtWhRC6HANoU7oTbRPwshahHUJoRALWsTUViLgizjWYkUmTjvnRaOMgwz4/ic0DfNBwNv7jn3/s6Pc+97bxgoUKDAf4HMXDS2OAdFaAO2AMsWryQAJkA/iMoTsayuZ7fK38w1QQAirU4ncOKfl+cPV1XO17oVF3p6xE2XZBpbnIMsXRMAloi2fywavZwpycS309JHaYu0OM3pwobpMxEMhEsbD39NeX4Ni3+w50N1aErOpApIpNVRgMHuSkmVkMh8cv3kZ5rTeOjrflFzH5iw1F03cGf1x8S4yVZgsXlxu+oB8BgIu8a6mBwPjBEAyzMngSmU5sghZ2diLFBGBu5WvEXoAkDppF1n6w+UEYAQxe3AN2BzZGj06Mz47GEPKJ8Hu1fVgGjgOpJEdVP0+xoI4NZKxrWphzwworgNkAdGEMmPjqB5srVg2og9822pv2sl0xT9FI7ZoV/A2q37vpQEtiP9PTUTgnwCjL3cqgusEQBPdAjAQxoCbcR4vANApD7QRpC4EfWCbUS86a0F0hD0l8YZfga6IwmU5ouRvHiyAwUjS49sjQyrEi0Oy4risKxA9ADw/h/V5Esrm9vvsB0LbervWfkjcbApOl4WsydfAdULKDpnWgYYybSyKieTFwaIj53yWXCutUaMot2ZFg+VyON0MS9mp435wbeWyC17eej32V+TJQjSCqxOzolNmqx/SywUH1ojoLfHxsbP2b3Xav8Ap+OfWba1Ok8Vdnga2wXcS7WKWLHd8cung92VO1PlZEMutNLetTzkJgAqHduODJcnx5ui42UGOuI5N+Zffm610rZy63EtMj9H+4BG4DNwyhjrEYDrunsMdKhQB/p82Ujl9t5eifk1kgutjHsyEnWqKOIhmvZfrRdFtre370aV49dErrTmPFzro1octkaPGZHDim6YniSvFe+6V1p59eUVmVpA/YumVaBAgYDyF2wAQNEGCgG3AAAAAElFTkSuQmCC",
    "#0072FF",
    "Bus Details"
  ),
  new Category(
    "c2",
    "Calender",
    "#FFFFF1",
    "https://img.icons8.com/nolan/64/D9E021/FB872B/planner.png",
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA/ElEQVR4nO1ayw7CIBDcL+te9aZfzvoLGv0BtmcMPpoG2wS1BDbMJHtom+4yzMC2CUSZUOGdd8NFhUMM7/gc7+W+Xzv/hFfiR5F5MTKSf8I7+dp16/ntERndcPTCt1TeNNJCWwdl5o9jHR0fPojkkGiJiD7JXFeltUREl6zXHRFtLAhEpL4KCkXEkCJAa9AGbKJY7DPUnlkokqL2zEKRFP80oJLP9NvxgAhBEYK1ZIM10lpQ90SowDZqavtVEGEoErqwljYW1D0R+tFaJSyp+PoV/I8EWEuwa3H13qDoI4TOHmAtKbRG/OxkjpXwS4du9DTsLZHxpY5BAbQN7iFjubwKga1hAAAAAElFTkSuQmCC",
    "#FB872B"
  ),

  new Category(
    "c3",
    "Notifications",
    "#feedee",
    "https://img.icons8.com/nolan/64/FF8177/B12A5B/apple-notes.png",
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC7ElEQVRoge2Zz0sUYRjHP+/sOguJSidJdCSLCAIPnXZXPXgs6Jgk9ONQl7r0i8w6RNRB7RhEpzzoJexo/0Dojh4ikOyUZI4/oEuIIjWzu/N2MMHUmZ3ZfbfZaD635dl5nu/zvL+edwZiYmL+C8SnU+jrm/pTAZeAI1ELCsmagPHGBueRmDH0YQn3o1ZUIcPCNPRVoAXhdmWXCmbUisIwayS7XbQpYE2Yhi4BspYjItZVFjv6k16GWmdv4bWohKhGZSKLQsobtuYcRjKq0G8gVCQyD/KKbTknMsv5l71fWdeSdQ+BHwp8B6aSRD4AfRnL6cxa+bFeKOwY0otb30CMVS4vOPsWe2lETsBIxrIn/f5VRDxLIK+WFyM8QUfEBd4g5OmsZXdnLHtyrpn69y0c8nqgx/r5BcmEGpmlKVUtBynGNclIesX+vNuwldLnARuck55PS4YR9ANVP6O8R0QyipvoyC7b1/YmsW0mhyTn5zy74nwE3lYuszSeI6KlnNvpBTa87F2WczFQBOEOI7VzZWgLheeIuE7dBRUBsksFEyHeqfDlh88aEQMT8KoPikGdeV4JZPW7Hr9d61hrm94XxtnGpv5EwAAR3Gv8dy2NQQmvBQQqqdweCapxJdjVsh+I/zki6cy1p86EiNcCv9eFYtJWYdrPXvJAFJIH6uT8iWnouZyR8qxyGEonguyebkv2qAi2F4lwg07bUgTqgxJCGwR8KzfXTP1WyOBdlq2sQIF6LQlnZ9rrTh9kmz1Oo2mkbm6l9AVVosohRGcq7gH9O79mj9Y3F4v5667DLZBNVdAWisCJSMn5XHvyudQS3xNF7rrF/GUBqWqKC0OYu0JCSM0URalmdSomfvlQa8SJ1BpxIrVGVRKZMZJdqn2W6veq8s5Jok2bhl4N157EU6vW2De1/tUPPhqwBtt34oi1hGbXBrAqTEMfAgajFKSAocSd1uKU7STqgA6gIWpFIVkFXjQ1OI+jFhITE/OX+AVhAuAF71xJagAAAABJRU5ErkJggg==",
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB9klEQVR4nO2Yv07CMRDHz8gdD6E9VuNg1NHopvElfBN1878Orm7G0ZfQKFdegMFNjcCgcVMnE0x/PzRCgNTSVtB+ky7A3fXzu9J++wNISvo9VaeBROG+VtjQTE2/A+uacdfUgNDSjHv+AdqHMO6EBwnSiY6hsBEeJDREa0ACsVTqCA/p0oIRzf+lBGKp1JEYT+wCoCBMm1rhveeD806YNs4BxqOAZBABD8+KovUoIObJ5QWLK+BRMllczbyZwts4IAG3VO2aOwaIViTCdB1qPs6BtjHZpqDw4PP3ovDAfOZ7Ps6BtjFa4VGXnenQ93ycA21jhOmpy6706Hs+4TviYCB1AuHUkWa/JVJWhaXeJ3dhcWSWlutFSw8byHeZw1AzXYWaj3PgH7IoWDcx5RLOgkdJCecyB8BYi2Tjcafbuv/0U+Y+IUyXrjZeGLejgGTvizOYvDPfQN7M92XGNUeAmoFwelfsY71rxvmWj7qpTOCMMD3neYvLIf9PbRq0kHGzWtFZC6QhTK95Tjz2kd9agxYSptOOJfIujFtNgDEf+a01aCHNdCJML5qpamy7lGjKZ35rhS6UQOC/d0QHHpBALPWvOiJcWOgVby5JIwNS6XOj63cTjAyCbcYvxBDGhxgguxFAfm7LfypjmXMY/50ZyJYnJUFwfQDvIwxxa+x/3wAAAABJRU5ErkJggg==",
    "#B12A5B"
  ),
  new Category(
    "c4",
    "Academics",

    "#EFFFFD",
    "https://img.icons8.com/nolan/64/7DE3C3/0BA360/graduation-cap.png",
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACWElEQVRIie2WP2gTURzHP79L2qBihGZws6VaLKmLk4sgEaFnUSzkD6gQ7VInFceC1UKFOoljq1gwBYfmMinNZerQJUMHwYjVWCIuRRqQpqBNNTmHJE299M7EtHHxCwfv3o/7fn7vvd+99+C/WiRp+Iv5eSf57BWQEcAAmSBXeEEoVNgb8NiYwqk+PyLjwHFTNIPIQ9o7pvH5fu4O2B5oVt0JWIMbAzacQC24OWDdCVTBuwv8YwKyx0DLBAQ9tgDG6T0GmrWgtBi4JYXkmzMYRgh43wJeBpEbuDxn/2FxmTU768AtV0HuAj1NAtMg41tb6uJUG1nPddTAU+sNpLkEPoA8qNnDdS0DdKEGxK64HKjBCC6PF4xrpezrAobJFb2o/hnAYYp3VRrWYLeSRtduwycnajBCMtVrU4SVoulD9c/Q/VVBj4ZxK2+t7O1GfAR4TP7gEonYMF6vk/PBKC7PifIMvCs9EiZX7KHf/4TVVYVEbJisJw3yHDhmZW69xrpmmHo+A49wrU/hG9r4LbI41Ua24zLIaA1MDVQZFU81IE6bEZtVmYE7xKMTONpfAlDYvEhWRoDOBrywARtfQA7vEOhEZJLij0kAxPZIX7EKWK+xSMTOsT5Ze1iD29fvAfEmqK8o7rvfONg3tEEydQGRW9hM2Q5aAW6STF1iYCC/1avHzm1v13fZm5tzId/7EUNFOIlBN3CoHF0DWQbjNUKctWKCUGizxkPXPgJHy2/LjV9v/1a6lqb6q6Vbdx4Lz7a1p1s34kTkAMb+pRL4W2/LuCW4NkhCGwT4BcBczXQWWjzGAAAAAElFTkSuQmCC",
    "#0BA360"
  ),

  new Category(
    "c5",
    "My Classes",
    "#F1F6FF",
    "https://img.icons8.com/nolan/96/00C6FF/0072FF/class.png",
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC00lEQVRoge2ZPUwUQRiGn29utcI/CEcM0mklCYUcmmANUtlyEFs10dJEaQxaoTHSWdCp/EiI0cZACIkNag4ojFETgpV/CWdAgUbgdj8LuHP5OeB2b7kj7JNcMvPNzM377nezuzMHISEh+wJxV2LNM1WI3Qk0AIcKI2lbFoARjUjbRHf5ZDqYMbJiIvUepLQg8nJGZ42xahI9Zd8BTCYudufeMQEgpY5jP0zXjKuloQBq/NKYLliu4No1oVo//qzi7W4p2gm1rdP14sioK3Q4XTCb9Aeg2EwATPRUvMnWZmVrSBOLJzW/crwx3heVrdqzZmSvERopNkIjxUZoZHt0SdCbKZXKlEqlCLdAl4KabdvniFdE5PZYb/S+K3SvriWJKh1BzBdYRmwjT9bHdJnHQc0XmBEnxYYnsYWJBDWfLyMKr6yUOWFMpAph0N12wOil9f1TlrMmttX4XPG1RiImcvXdQNkPgFjzzBXE/poRqXq3riXJsiNPYcWYqt5xb0q3Gp8rgS12kIOqdFiiHQCqwMZfW97wZcRRu+ts68xlx0YQu2u3x7vxlxGlyVH7m+cL7Xe8i0DuWoIkQK+BXb1oOSWLllMCdrUq1xU+BDGn3zXyE+QzaAq4AGAcbUz0R4c36ftp5aOP6uLJi4q8WI0PgVigp4HjXoV4NfJRRG+M9UaHQRT+7yQT/RWbmXAhOtbHy1g8CcB4X7QJgHY1sclfDSAPVk3lhCcjv//M1X4ZPLXoZWxW2sUZh6GTTVOvjx098jfX4Z7WSN5N5OG7PWVkqwOJXA8r8nW4Ee5Hio3QSLER4EtjdrY7NYTcbwL7JyM7uXpBkOu8WTNS2zpd719OfjkTT57P1ubOyAKu/0jEkdH0+1ARM5cuuDMyUgAhfslozhjRiLSBzhZGjxd01ght6VrGyER3+aQxVg0wAMwXQtoOmQeeG5Fzid7oVKHFhISE7DL/AK3T8tbn0kEnAAAAAElFTkSuQmCC",
    "#0072FF"
  ),
];
