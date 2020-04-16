const FileScan = require("./nodes/FileScan");
const Projection = require("./nodes/Projection");
const Selection = require("./nodes/Selection");
const Sort = require("./nodes/Sort"); // Super naive in memory sort

function search({ columns, dataPath, selectionPred, sortPred }) {
  const fileScan = new FileScan(dataPath);
  const selection = new Selection(selectionPred, fileScan);
  const projection = new Projection(columns, selection);

  const results = [];

  let searching = true;

  while (searching) {
    const { value, done } = projection.next();
    if (!done) {
      results.push(value);
    } else {
      searching = false;
    }
  }

  let sort;
  let sortedResults;

  if (sortPred) {
    sort = new Sort(results, sortPred);
    sortedResults = sort.getValues();
  }

  return sortPred ? sortedResults : results;
}

// Manual RUN BELOW
const selectionPredicate = (val) => val.title && val.title.charAt(0) === "A";
const columns = ["movieId", "title", "genres"];
const dataPath = "/Users/chuck/projects/bradfield/executor/data/movies.csv";
const sortPredicate = alphabeticalTitle;

const results = search({
  dataPath,
  columns: columns,
  selectionPred: selectionPredicate,
  sortPred: sortPredicate,
});

console.log(" => ", results);

//
// Helpers
//

function alphabeticalTitle(a, b) {
  const capA = a.title.toUpperCase();
  const capB = b.title.toUpperCase();
  let val = 0;

  if (capA > capB) {
    val = 1;
  } else if (capA < capB) {
    val = -1;
  }
  return val;
}

// example interface?
// [
//   ["AVERAGE"],
//   ["PROJECTION", ["rating"]],
//   ["SELECTION", ["movie_id", "EQUALS", "5000"]],
//   ["FILESCAN", ["ratings"]]
// ]
