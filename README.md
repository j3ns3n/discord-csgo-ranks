# Convert CS:GO Ranks to Discord Roles
Prevent people lying about their CS:GO ranks in Discord by fetching them directly from the game!
![Works like this!](https://please.get-some.help/AEvXp22.gif)
### Setup
1. Clone the repo
2. Rename config.example.json to config.json and fill it in
3. Create a mongodb database to hold role and account data
- The role collection should have this format:
```
 {"0":"707397335977558097",
 "1":"701815565622444102",
 "2":"701815564955287622",
 "3":"701815564183797790",
 "4":"701815301360189450",
 "5":"701815299598712902",
 "6":"701815298935750666",
 "7":"701815298021523487",
 "8":"701815295538364426",
 "9":"701815294309564539",
 "10":"701815292002697306",
 "11":"701815283307774043",
 "12":"701817078004318260",
 "13":"701817715463028826",
 "14":"701817697486241813",
 "15":"701817696983187536",
 "16":"701817692541157457",
 "17":"701817714024644648",
 "18":"701817078872539198",
 "_id":"701812820186103889",
 "default":"706914087141113947"}
```
- Where the numbers 0 to 18 are the role IDs of CS:GO ranks, from 0=Unranked to 18=Global Elite
- _id is the server's ID
- default is the role assigned when a user unlinks their account / joins the server if it is enabled in the config.
