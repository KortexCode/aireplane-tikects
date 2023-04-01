
const fetchCountries = ()=> fetch("https://restcountries.com/v3.1/region/ame")
.then(rest => rest.json());

export {fetchCountries}