'use strict';

var packageScopes = [
    "styler"
];

var otherScopes = [
  'META',
  'CI',
  'examples'
];

module.exports = {
  types: [
    {value: 'feat',     name: 'feat:     Add a new feature'},
    {value: 'fix',      name: 'fix:      Submit a bug fix'},
    {value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature.\
    Includes code style changes.'
    },
    {value: 'test',     name: 'test:     Add tests only'},
    {value: 'docs',     name: 'docs:     Documentation only changes'},
    {value: 'release',  name: 'release:  Publish a new version of a package.'},
    {value: 'chore',    name: 'chore:    Changes to the build process or auxiliary tools\
    and libraries such as documentation generation. META only.'
    },
    {value: 'perf',     name: 'perf:     A code change that improves performance'},
    {value: 'struct',   name: 'struct:   A folder structures change that improves development.'},
  ],

  scopes: packageScopes.concat(otherScopes)
    .sort()
    .map(name => ({name})),

  scopeOverrides: {
    chore: otherScopes,
    feat: packageScopes,
    fix: packageScopes.concat(["CI"]),
    release: packageScopes,
    test: packageScopes,
  },

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
};