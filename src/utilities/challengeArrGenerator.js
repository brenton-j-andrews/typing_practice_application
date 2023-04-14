/**
 * The fetchChallengeArray function returns the specified array needed to populate the text box for the typing challenge.
 * Arrays used for non random word challenges are built in, random word arrays are constructed via API. 
 **/

const storedArrays = {
  test_arr : ["one", "two", "three"],
  
  us_states : [
    'Alabama','Alaska','Arizona','Arkansas','California',
    'Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii',
    'Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana',
    'Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
    'Missouri','Montana','Nebraska','Nevada','New_Hampshire','New Jersey',
    'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma',
    'Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee',
    'Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
  ],

  south_american_countries : [
    "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "French Guiana",
    "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela"
  ],

  european_countries : ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan",
   "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus",
    "Czechia", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", 
    "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Kosovo", "Latvia", "Liechtenstein",
    "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", 
    "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", 
    "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", 
    "United Kingdom", "Vatican City"
  ]
}

const generate1To100 = () => {
  let arr = [];
  for (let i = 1; i <= 100; i++) {
    arr.push(i.toString());
  }

  return arr;
}

const fetchBuiltInArray = (selectedArrayName) => {
  let key = selectedArrayName.toLowerCase().replaceAll(" ", "_");
  
  if (key === 'one_to_one_hundred') { 
    let arr = generate1To100();
    return arr;
  } 
  
  else {
    let array = storedArrays[key];
    const shuffledArray = array.sort((a, b) => .5 - Math.random());
    return shuffledArray;
  }
}

export { fetchBuiltInArray };