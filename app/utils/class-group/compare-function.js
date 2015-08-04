// 'Natural Sort' function. If there are any numbers in the string, replace with
// integer rather than treating each number as a character of the string.
export default function classGroupCompareFunction(field) {
  return function(a, b){
    let ax = [];
    let bx = [];

    a.get(field).replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]); });
    b.get(field).replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]); });

    while(ax.length && bx.length) {
      let an = ax.shift();
      let bn = bx.shift();
      let nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
      if(nn) {
        return nn;
      }
    }

    return ax.length - bx.length;
  };
}
