import fetch from "node-fetch";

const fetchData = async () => {
  const response = await fetch("https://monogo.pl/competition/input.txt");
  const data = await response.json();
  return data;
};

const list = await fetchData();

const selectedFilters = list.selectedFilters;

const mappedList = list.products.map((item) => {
  return {
    id: item.id,
    price: item.price,
    color: list.colors.find((colorItem) => colorItem.id === item.id).value,
    size: list.sizes.find((sizeItem) => parseInt(sizeItem.id) === item.id)
      .value,
  };
});

const filterItem = (item, filters, filterName) => {
  return filters.includes(item[filterName]);
};

const filterdList = mappedList.filter(
  (item) =>
    item.price > 200 &&
    filterItem(item, selectedFilters.colors, "color") &&
    filterItem(item, selectedFilters.sizes, "size")
);

const maxPrice = filterdList.reduce((a, b) =>
  a.price > b.price ? a : b
).price;

const minPrice = filterdList.reduce((a, b) =>
  a.price < b.price ? a : b
).price;

const score = Math.round(maxPrice * minPrice);

const createArray = (score) => {
  const parsedScore = score.toString();
  const array = [];
  for (let i = 1; i < parsedScore.length; i = i + 2) {
    if (parsedScore[i] === undefined || parsedScore[i - 1] === undefined) {
      break;
    }
    array.push(parseInt(parsedScore[i]) + parseInt(parsedScore[i - 1]));
  }
  return array;
};
const monogoArray = createArray(score);

const buildingNumber = 14
const buildingIndex = monogoArray.indexOf(buildingNumber)
const companyNameLenght = "Monogo".length
const result = buildingIndex * score * companyNameLenght

console.log(result)