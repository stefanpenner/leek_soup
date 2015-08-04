import compareFunction from 'smhw-frontend/utils/class-group/compare-function';
import Ember from 'ember';
const { isPresent, get } = Ember;

export default function(owner, exceptIds = []) {
  if (!owner.get('classGroups.isFulfilled')) {
    return [];
  }
  let groups = [];
  let items = owner.get('classGroups').toArray().reject(classGroup => {
    return exceptIds.contains(classGroup.get('id'));
  }).sort(compareFunction('classYear'));

  items.forEach(function(item) {
    // Group the array by a property. In this case, the classGroups will be grouped for each classYear.
    // It will return a new array here each group contains the concerned classGroups.

    let value = item.get('classYear');
    let group = groups.findBy('text', value);

    if (isPresent(group)) {
      get(group, 'children').push(item);
    } else {
      group = { text: value, children: [item] };
      groups.push(group);
    }
  });

  groups.forEach(function(group) {
    group.children.sort(compareFunction('name'));
  });

  return groups;
}
